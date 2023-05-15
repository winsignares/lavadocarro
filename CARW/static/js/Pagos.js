const cedula = document.getElementById("identificacion");
const usuarioN = document.getElementById("Nusuario");
const matriculaN = document.getElementById("Nmatricula");
const vehiculoT = document.getElementById("Tvehiculo");

function verificarCedula(event) {
    event.preventDefault();
    axios.get('fronted/consulusuarioPAG')
        .then(function(response) {
            let datos = response.data;
            let identidad = cedula.value.trim();
            for (let i = 1; i <= Object.keys(datos).length; i++) {
                if (datos[i].Cedula == identidad) {
                    usuarioN.innerHTML = `<li id="Nusuario" class="list-group-item" style="display: inline;">${datos[i].Nombre} ${datos[i].Apellido}</li>`;
                    matriculaN.innerHTML = `<li id="Nmatricula" class="list-group-item" style="display: inline;">${datos[i].Matricula}</li>`;
                    vehiculoT.innerHTML = `<li id="Tvehiculo" class="list-group-item" style="display: inline;">${datos[i].Tipo}</li>`;
                    return;
                }
            }
            const alerta = document.getElementById("alerta");
            alerta.classList.remove("oculto");
            alerta.classList.add("alerta-campo-vacio");
            setTimeout(function() {
                alerta.classList.add("oculto");
                alerta.classList.remove("alerta-campo-vacio");
            }, 3000);
            return;
        })
        .catch(function(error) {
            console.log(error);
        });
}


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