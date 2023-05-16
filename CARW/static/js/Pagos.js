const cedula = document.getElementById("identificacion");
const usuarioN = document.getElementById("Nusuario");
const matriculaN = document.getElementById("Nmatricula");
const vehiculoT = document.getElementById("Tvehiculo");
const paqueteT = document.getElementById("Tpaquete");
const valorP = document.getElementById("Pvalor");
const FechaACT = document.getElementById("Fecha");
const Tduracion = document.getElementById("Testimado");
const IDC = "1";

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
function verificarpaquete(event) {
    event.preventDefault();
    axios.get('fronted/consulpaquetesPAG')
        .then(function(response) {
            let datos = response.data;
            let identidad = IDC;
            for (let i = 1; i <= Object.keys(datos).length; i++) {
                if (datos[i].id == identidad) {
                    paqueteT.innerHTML = `<li id="Tpaquete" class="list-group-item" style="display: inline;">${datos[i].titulo}</li>`;
                    valorP.innerHTML = `<li id="Pvalor" class="list-group-item" style="display: inline;">${datos[i].valor}</li>`;
                    Tduracion.innerHTML = `<li id="Testimado" class="list-group-item" style="display: inline;">${datos[i].tiempo}</li>`;
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
// odtener los paquetes fin

// odtener fecha inicio
function obtenerFechaActual(event) {
    event.preventDefault();
    var fechaActual = new Date();


    var dia = fechaActual.getDate();
    var mes = fechaActual.getMonth() + 1;
    var anio = fechaActual.getFullYear();

    var fechaFormateada = dia + '/' + mes + '/' + anio;
    FechaACT.innerHTML = `<li id="Fecha" class="list-group-item" style="display: inline;">${fechaFormateada}</li>`;

    return fechaFormateada;
}
// odtener fecha fin