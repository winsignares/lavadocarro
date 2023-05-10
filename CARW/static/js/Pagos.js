let Lusuarios = document.getElementById('lusuarios');
let Lpaquetes = document.getElementById('lpaquetes');
let Cmatri = document.getElementById('matri');

// odtener los usuarios inicio
function ver_usuarios() {
    axios.get('fronted/consulusuario', {
        responseType: 'json'
    })

    .then(function(response) {
            let datos = response.data
            var length = (Object.keys(datos).length) + 1;
            let opciones = '';
            for (let index = 1; index < length; index++) {
                opciones +=
                    `<option id="${index}" value="${index}">${datos[index].nombreu}</option>`;
            }
            Lusuarios.innerHTML = opciones;
        })
        .catch(function(error) {
            console.log(error);
        });
}
// odtener los usuarios fin

// odtener los paquetes inicio
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
                    `<select id="${index}" class="form-select " aria-label="Default select example " onclick="false">
                    <option selected></option>
                    <option value="${index}">${datos[index].titulo}</option>
                  </select>`;
            }
            Lpaquetes.innerHTML = opciones;
        })
        .catch(function(error) {
            console.log(error);
        });
}
// odtener los paquetes fin