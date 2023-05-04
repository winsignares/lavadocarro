let remplazo = document.getElementById('cambio');

function ver_procedimientos() {
    axios.get('fronted/consulprocedimientos', {
        responseType: 'json'
    })

    .then(function(response) {
            let datos = response.data
            var length = (Object.keys(datos).length) + 1;
            let opciones = '';
            for (let index = 1; index < length; index++) {
                opciones +=
                    `<ul id="${index}" class=" list-group2 ">
                    <li class="list-group-item " onclick="Añadir() ">${datos[index].descripcion} $${datos[index].valor}</li>
                </ul>`;
            }
            remplazo.innerHTML = opciones;
        })
        .catch(function(error) {
            console.log(error);
        });
}

function gopredeterminados2() {
    window.location.href = '/Ppredeterminados';
    return;
}