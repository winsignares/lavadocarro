let Lpaquetes = document.getElementById('lpaquetes');
let cedula = document.getElementById("lusuarios");
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
                    `<option value="${index}">${datos[index].nombreu}</option>`;
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
                    `<option id="${index}" value="${index}">${datos[index].titulo}</option>`;
            }
            Lpaquetes.innerHTML = opciones;
        })
        .catch(function(error) {
            console.log(error);
        });
}
// odtener los paquetes fin
function verificarCedula() {
    axios.get('fronted/consulusuarioPAG', {
            responseType: 'json'
        })
        .then(function(response) {
            let datos = response.data
            let password = cedula.value;
            for (let i = 1; i <= Object.keys(datos).length; i++) {
                if (datos[i].cedula == password) {
                    window.alert("Cedula encontrada");
                    return;
                }
            }
            window.alert("Cedula incorrecta");
        })
        .catch(function(error) {
            console.log(error);
        });
}