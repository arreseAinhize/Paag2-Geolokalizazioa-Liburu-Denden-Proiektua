const API_BASE_URL = 'http://localhost';

let allTiendasData = [];

async function cargar_tiendas() {
    console.log("Cargando tiendas desde la API...");
    
    try {
        const response = await fetch(`${API_BASE_URL}/dendak-geojson`);
        const data = await response.json();
        
        if (data.success) {
            allTiendasData = data.data.features || [];
            mostrar_tiendas(allTiendasData);
            cargar_municipios();
        } else {
            throw new Error('Error al cargar las tiendas');
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById("shop-row").innerHTML = `
            <div class="col-12 text-center">
                <div class="alert alert-warning" role="alert">
                    Error al cargar las tiendas. Asegúrate de que el servidor esté funcionando.
                </div>
            </div>
        `;
    }
}

async function cargar_municipios() {
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

function mostrar_tiendas(features) {
    const container = document.getElementById("shop-row");
    if (!container) return;

    if (features.length === 0) {
        container.innerHTML = `
            <div class="col-12 text-center">
                <div class="alert alert-info" role="alert">
                    No se encontraron tiendas.
                </div>
            </div>
        `;
        return;
    }

    container.innerHTML = ''; // Limpiar contenido anterior

    features.forEach(feature => {
        const props = feature.properties || {};
        const card = document.createElement('div');
        card.className = 'col-lg-4 col-md-6 mb-4';
        card.innerHTML = `
            <div class="card h-100 shadow-sm">
                <div class="card-body">
                    <h5 class="card-title">${escapeHtml(props.nombre || 'Sin nombre')}</h5>
                    <p class="card-text">
                        <strong>Municipio:</strong> ${escapeHtml(props.municipio || '')}<br>
                        <strong>Tipo:</strong> ${escapeHtml(props.tipo || '')}<br>
                        <strong>Dirección:</strong> ${escapeHtml(props.direccion || '')}
                    </p>
                    ${props.telefono ? `<p class="card-text"><strong>Teléfono:</strong> <a href="tel:${escapeHtml(props.telefono)}">${escapeHtml(props.telefono)}</a></p>` : ''}
                    ${props.email ? `<p class="card-text"><strong>Email:</strong> <a href="mailto:${escapeHtml(props.email)}">${escapeHtml(props.email)}</a></p>` : ''}
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

// Helper para prevenir XSS
function escapeHtml(str) {
    if (!str && str !== 0) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('shop-row')) {
        cargar_tiendas();
        
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
                mostrar_tiendas(filteredFeatures);
            });
        }
    }
});