let Lpaquetes = document.getElementById('lpaquetes');
let cedula = document.getElementById("lusuarios");
let Cmatri = document.getElementById('matri');

// odtener los usuarios inicio
function verificarCedula() {
    axios.get('fronted/consulusuarioPAG', {
            responseType: 'json'
        })
        .then(function(response) {
            let usuarios = response.data;
            let password = document.getElementById("lusuarios").value;
            for (let i = 0; i < usuarios.length; i++) {
                if (usuarios[i].cedula == password) {
                    window.alert("Cedula encontrada");
                }
            }
            window.alert("Cedula incorrecta");
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