// Usar URL relativa para la API
const API_BASE_URL = 'http://localhost';

let map = null;
let markers = [];
let allTiendasData = [];

// Inicializa el mapa si existe un contenedor con id "map" y MapLibre está cargado
function initMap() {
    const mapEl = document.getElementById('map');
    if (!mapEl) {
        console.info('No hay elemento #map en esta página — mapa no inicializado.');
        return;
    }

    if (typeof maplibregl === 'undefined') {
        // MapLibre no está cargado; mostrar alternativa
        mapEl.innerHTML = '<div class="alert alert-secondary p-3">Map rendering requires <strong>MapLibre GL JS</strong>. The page will show an alternative list if available.</div>';
        console.warn('MapLibre GL JS no está disponible. Añade maplibre-gl.js para ver el mapa interactivo.');
        return;
    }

    // Crear mapa con un estilo minimal basado en OpenStreetMap raster tiles
    map = new maplibregl.Map({
        container: mapEl,
        style: {
            version: 8,
            sources: {
                osm: {
                    type: 'raster',
                    tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
                    tileSize: 256
                }
            },
            layers: [
                {
                    id: 'osm-raster',
                    type: 'raster',
                    source: 'osm'
                }
            ]
        },
        center: [-2.6, 43.1667], // [lon, lat]
        zoom: 11
    });

    // Controles básicos
    map.addControl(new maplibregl.NavigationControl());
    map.addControl(new maplibregl.ScaleControl({ maxWidth: 80, unit: 'metric' }));
}

// Añade marcadores a partir de tiendasData (GeoJSON features) usando MapLibre
function mostrarMarcadores(features) {
    if (!features || features.length === 0) {
        console.info('No hay datos de tiendas para mostrar.');
        return;
    }

    const mapEl = document.getElementById('map');

    // Si MapLibre está inicializado, crear markers HTML y popups
    if (map) {
        // Eliminar marcadores previos
        markers.forEach(m => m.remove());
        markers = [];

        const bounds = new maplibregl.LngLatBounds();

        features.forEach(feature => {
            const coords = feature.geometry && feature.geometry.coordinates;
            if (!coords || coords.length < 2) return;

            const lon = parseFloat(coords[0]);
            const lat = parseFloat(coords[1]);
            if (Number.isNaN(lat) || Number.isNaN(lon)) return;

            const props = feature.properties || {};

            // Crear elemento HTML para marcador
            const el = document.createElement('div');
            el.className = 'liburu-marker';
            el.style.background = props.color || '#2262BF';
            el.style.color = '#fff';
            el.style.width = '36px';
            el.style.height = '36px';
            el.style.borderRadius = '50%';
            el.style.display = 'flex';
            el.style.alignItems = 'center';
            el.style.justifyContent = 'center';
            el.style.fontSize = '1.2rem';
            el.style.boxShadow = '0 1px 3px rgba(0,0,0,0.2)';
            el.textContent = props.icon || '📍';

            const marker = new maplibregl.Marker(el).setLngLat([lon, lat]).addTo(map);

            const popup = new maplibregl.Popup({ offset: 25 }).setHTML(buildPopupHtml(props));
            marker.setPopup(popup);

            markers.push(marker);
            bounds.extend([lon, lat]);
        });

        // Ajustar vista al conjunto de marcadores si hay al menos uno
        if (!bounds.isEmpty()) {
            try {
                map.fitBounds(bounds, { padding: 40 });
            } catch (err) {
                console.warn('No se pudo ajustar bounds del mapa:', err.message);
            }
        }

        return;
    }

    // Fallback: si MapLibre no está disponible, renderizar una lista simple dentro del contenedor #map o #map-list
    const listContainerId = mapEl ? 'map' : 'map-list';
    const container = document.getElementById(listContainerId) || document.getElementById('map-list');

    if (!container) return;

    const ul = document.createElement('ul');
    ul.className = 'list-unstyled';

    features.forEach(feature => {
        const props = feature.properties || {};
        const li = document.createElement('li');
        li.className = 'mb-3 p-2 border rounded';
        li.innerHTML = `<strong>${escapeHtml(props.nombre || 'Sin nombre')}</strong><br>
                        <small>${escapeHtml(props.municipio || '')} — ${escapeHtml(props.direccion || '')}</small><br>
                        ${props.telefono ? `<a href="tel:${escapeHtml(props.telefono)}">${escapeHtml(props.telefono)}</a>` : ''}`;
        ul.appendChild(li);
    });

    container.innerHTML = '';
    container.appendChild(ul);
}

function buildPopupHtml(props) {
    const parts = [];
    if (props.nombre) parts.push(`<h5 class="mb-1">${escapeHtml(props.nombre)}</h5>`);
    const meta = [];
    if (props.municipio) meta.push(escapeHtml(props.municipio));
    if (props.tipo) meta.push(escapeHtml(props.tipo));
    if (meta.length) parts.push(`<small class="text-muted">${meta.join(' — ')}</small>`);
    if (props.direccion) parts.push(`<div>${escapeHtml(props.direccion)}</div>`);
    if (props.telefono) parts.push(`<div>☎️ <a href="tel:${escapeHtml(props.telefono)}">${escapeHtml(props.telefono)}</a></div>`);
    if (props.email) parts.push(`<div>✉️ <a href="mailto:${escapeHtml(props.email)}">${escapeHtml(props.email)}</a></div>`);
    return parts.join('');
}

// Helper para prevenir XSS en strings simples
function escapeHtml(str) {
    if (!str && str !== 0) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

// Cargar municipios
async function cargarMunicipiosMapa() {
    try {
        const response = await fetch(`${API_BASE_URL}/herriak`);
        const data = await response.json();
        
        if (data.success) {
            const select = document.getElementById('municipio-filter');
            if (select) {
                data.data.forEach(municipio => {
                    const option = document.createElement('option');
                    option.value = municipio;
                    option.textContent = municipio;
                    select.appendChild(option);
                });
            }
        }
    } catch (error) {
        console.error('Error cargando municipios:', error);
    }
}

// Cargar datos GeoJSON desde la API
async function cargarDatosMapa() {
    try {
        const response = await fetch(`${API_BASE_URL}/dendak-geojson`);
        const data = await response.json();

        if (data && data.success && data.data && data.data.features) {
            allTiendasData = data.data.features;
            mostrarMarcadores(allTiendasData);
            cargarMunicipiosMapa();
        } else {
            console.warn('Respuesta de /dendak-geojson no contiene features válidas');
        }
    } catch (error) {
        console.error('Error cargando datos del mapa:', error);
    }
}

// Inicializar automáticamente si estamos en una página con #map o con iframe comentado
document.addEventListener('DOMContentLoaded', () => {
    initMap();
    cargarDatosMapa();
    
    // Event listener for filter
    const filterSelect = document.getElementById('municipio-filter');
    if (filterSelect) {
        filterSelect.addEventListener('change', () => {
            const selectedMunicipio = filterSelect.value;
            let filteredFeatures = allTiendasData;
            if (selectedMunicipio) {
                filteredFeatures = allTiendasData.filter(feature => 
                    feature.properties && feature.properties.municipio === selectedMunicipio
                );
            }
            mostrarMarcadores(filteredFeatures);
        });
    }
});

// Exportar funciones para pruebas/uso manual
window.LiburuMapa = {
    initMap,
    cargarDatosMapa,
    mostrarMarcadores
};