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
                opciones += `
          <div class="card">
            <img src="{{url_for('static', filename='img/logo.jpg')}}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${datos[index].titulo}</h5>
              <p class="card-text">${datos[index].descripcion}</p>
              <p class="card-text">${datos[index].valor}</p>
              <a href="#" class="btn btn-primary">Seleccionar</a>
            </div>
          </div>`;
            }
            remplazo.innerHTML = opciones;
        })
        .catch(function(error) {
            console.log(error);
        });
}