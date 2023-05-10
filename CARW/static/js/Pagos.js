let Lusuarios = document.getElementById('lusuarios');
// odtener los usuarios inicio
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
                    `<option id="${index}" value="1">${datos[index].nombreu}</option>`;
            }
            Lusuarios.innerHTML = opciones;
        })
        .catch(function(error) {
            console.log(error);
        });
}
// odtener los procedimientos fin