let remplazo = document.getElementById('cambio');

function ver_paquetes() {
    axios.get('fronted/consulpaquetes', {
        responseType: 'json'
    })

    .then(function(response) {
            let datos = response.data
            var length = (Object.keys(datos).length) + 1;
            let opciones = '';
            for (let index = 1; index < length; index++) {
                opciones +=
                    `<div class="mi-div d-flex flex-wrap col-md-5" style="max-width: 100%;">
                    <div class="col-md-4">
                        <img src="/static/img/logo.jpg" class="img-fluid rounded-start" alt="...">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${datos[index].titulo}</h5>
                            <p class="card-text">${datos[index].descripcion}</p>
                            <p class="card-text">$${datos[index].valor}</p>
                            <a href="#" class="btn btn-primary">Go somewhere</a>
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