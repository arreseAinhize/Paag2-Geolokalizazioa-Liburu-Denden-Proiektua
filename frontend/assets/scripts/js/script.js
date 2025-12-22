document.addEventListener("DOMContentLoaded", function(event) {
    cargar_tiendas(); // al cargar la pagina devolvera la tablageneral de productos 
});

function cargar_tiendas(){
    console.log("Cargando tiendas...");

    // Aqui iria el codigo para cargar las tiendas desde una base de datos o un archivo JSON
    // Por ahora, vamos a simularlo con datos ficticios

    var myHtml = "<div class='col-12 text-center mb-5'><h2 class='fw-bold'>Durangaldeko Liburu denda zein Liburutegiak</h2></div>"

    for (var i = 1; i <= 6; i++) {
        myHtml += `
        <!-- Shop Card ${i} -->
        <div class="mb-4">
            <div class="card h-100 p-3">
                <div class="card-body d-flex flex-column">
                    <div class="feature-icon">
                        <h5 class="card-title">Shop name ${i}</h5>
                    </div>
                    <p class="card-text">Shop description for shop ${i}...</p>
                    <a href="kokapena.html" class="btn btn-primary mt-auto">Non dago</a>
                </div>
            </div>
        </div>
        `;
    }
    document.getElementById("shop-row").innerHTML = myHtml;
}   