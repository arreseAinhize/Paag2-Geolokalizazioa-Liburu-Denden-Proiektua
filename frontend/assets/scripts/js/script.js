const API_BASE_URL = '/api';

async function cargar_tiendas() {
    console.log("Cargando tiendas desde la API...");
    
    try {
        const response = await fetch(`${API_BASE_URL}/dendak-geojson`);
        const data = await response.json();
        
        if (data.success) {
            mostrar_tiendas(data.data);
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