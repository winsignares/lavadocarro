let remplazo = document.getElementById('cambio');

function ver_paquetes() {
    axios.get('fronted/consulpaquetes', {
            responseType: 'json'
        })
        .then(function(response) {
            let datos = response.data;
            var length = (Object.keys(datos).length) + 1;
            let opciones = '';
            for (let index = 1; index < length; index++) {
                opciones +=
                    `<div id="${datos[index].id}" class="mi-div d-flex flex-wrap col-md-5" style="max-width: 100%;">
                    <div class="col-md-4" style="text-align: center;">
                        <img src="/static/img/logo.jpg" class="img-fluid rounded-start" alt="...">
                        <a onclick="seleccionado(${datos[index].id})" class="btn btn-primary">Seleccionar</a>
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${datos[index].titulo} $${datos[index].valor}</h5>
                            <div class="card-content">
                                <p class="card-text">${datos[index].descripcion}</p>
                            </div>
                        </div>
                    </div>
                </div>                
                </br>`;
            }
            remplazo.innerHTML = opciones;
        })
        .catch(function(error) {
            console.log(error);
        });
}

document.addEventListener('DOMContentLoaded', function() {
    // Código a ejecutar una vez que se haya cargado el DOM
    // Aquí puedes realizar operaciones con los elementos del DOM
    // y añadir eventos u otras acciones necesarias
    miFuncion();
    setTimeout(function() {
        document.removeEventListener('DOMContentLoaded', arguments.callee);
    }, 1000);
});

function miFuncion() {
    ver_paquetes();
}