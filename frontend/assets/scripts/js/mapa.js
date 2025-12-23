// Usar URL relativa para la API
const API_BASE_URL = '/api';

async function cargarDatosMapa() {
    try {
        const response = await fetch(`${API_BASE_URL}/dendak-geojson`);
        const data = await response.json();
        
        if (data.success) {
            tiendasData = data.data.features;
            mostrarMarcadores();
        }
    } catch (error) {
        console.error('Error cargando datos del mapa:', error);
    }
}