const Lpaquetes = document.getElementById('lpaquetes');
const cedula = document.getElementById("Ncedula");
const Cmatri = document.getElementById('matri');

// odtener los usuarios inicio
function verificarCedula() {

    if (cedula.trim() === "") {
        console.log("Debe llenarse todos los campos");
        const alerta = document.getElementById("alerta2");
        alerta.classList.remove("oculto");
        alerta.classList.add("alerta-exito");
        setTimeout(function() {
            alerta.classList.add("oculto");
            alerta.classList.remove("alerta-exito");
        }, 3000);
        return;
    }

    axios.get('fronted/consulusuarioPAG', {
            responseType: 'json'
        })
        .then(function(response) {
            let datos = response.data
            let cedulita = cedula.value;
            for (let i = 0; i < Object.keys(datos).length; i++) {
                if (datos[i].cedula == cedulita) {
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