const cedula = document.getElementById("identificacion");
const usuarioN = document.getElementById("Nusuario");
const correo = document.getElementById("Email");
const matriculaN = document.getElementById("Nmatricula");
const vehiculoT = document.getElementById("Tvehiculo");
const paqueteT = document.getElementById("Tpaquete");
const valorP = document.getElementById("Pvalor");
const FechaACT = document.getElementById("Fecha");
const Tduracion = document.getElementById("Testimado");
const idpaquete = "0";
const IDC = localStorage.getItem('IDC');
const apagar = document.getElementById("Vacan");
let remplazo = document.getElementById('cambio');
let resultadoPayU = "";

// odtener el usuario inicio
function verificarCedula(event) {
    event.preventDefault();
    axios.get('fronted/consulusuarioPAG')
        .then(function(response) {
            let datos = response.data;
            let identidad = cedula.value.trim();
            for (let i = 1; i <= Object.keys(datos).length; i++) {
                if (datos[i].Cedula == identidad) {
                    usuarioN.innerHTML = `<li id="Nusuario" class="list-group-item" style="display: inline;">${datos[i].Nombre} ${datos[i].Apellido}</li>`;
                    correo.innerHTML = `<li id="Email" class="list-group-item" style="display: inline;">${datos[i].Correo}</li>`;
                    matriculaN.innerHTML = `<li id="Nmatricula" class="list-group-item" style="display: inline;">${datos[i].Matricula}</li>`;
                    vehiculoT.innerHTML = `<li id="Tvehiculo" class="list-group-item" style="display: inline;">${datos[i].Tipo}</li>`;

                    document.getElementsByName('buyerEmail')[0].value = datos[i].Correo;

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
// odtener el usuario fin

// odtener los paquetes inicio
function verificarpaquete() {
    axios.get('fronted/consulpaquetesPAG')
        .then(function(response) {
            let datos = response.data;
            let identidad = IDC;
            for (let i = 1; i <= Object.keys(datos).length; i++) {
                if (datos[i].id == identidad) {
                    paqueteT.innerHTML = `<li id="Tpaquete" class="list-group-item" style="display: inline;">${datos[i].titulo}</li>`;
                    valorP.innerHTML = `<li id="Pvalor" class="list-group-item" style="display: inline;">${datos[i].valor}</li>`;
                    Tduracion.innerHTML = `<li id="Testimado" class="list-group-item" style="display: inline;">${datos[i].tiempo}</li>`;
                    apagar.innerHTML = `<li id="Vacan" class="list-group-item" style="display: inline;">${datos[i].valor}</li>`;
                    idpaquete = datos[i].id;
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
function obtenerFechaActual() {
    var fechaActual = new Date();


    var dia = fechaActual.getDate();
    var mes = fechaActual.getMonth() + 1;
    var anio = fechaActual.getFullYear();

    var fechaFormateada = dia + '/' + mes + '/' + anio;
    FechaACT.innerHTML = `<li id="Fecha" class="list-group-item" style="display: inline;">${fechaFormateada}</li>`;

    return fechaFormateada;
}
// odtener fecha fin

// llenar descripcion del paquete inicio
function ver_descrpcion() {
    axios.get('fronted/consulpaquetes', {
            responseType: 'json'
        })
        .then(function(response) {
            let datos = response.data;
            var length = (Object.keys(datos).length) + 1;
            let opciones = '';
            for (let index = 1; index < length; index++) {
                if (datos[index].id == IDC) {
                    opciones +=
                        `<p class="card-text">${datos[index].descripcion}</p>`;
                }
            }
            remplazo.innerHTML = opciones;
        })
        .catch(function(error) {
            console.log(error);
        });
}
// llenar descripcion del paquetefin

// calcular pago 
function calcularpago() {
    const apagar = document.getElementById("Vacan").innerText;
    const valorcito = parseFloat(apagar);

    const pagado = document.getElementById("Vacancel").value;
    const valorPagado = parseFloat(pagado);

    const resultado = document.getElementById("Vareturn");

    if (valorcito <= valorPagado) {
        resultado.innerHTML = valorPagado - valorcito;
        resultadoPayU = "exitoso";
        const alerta = document.getElementById("alerta4");
        const alerta2 = document.getElementById("pagofisico");
        alerta.classList.remove("oculto");
        alerta.classList.add("alerta-exito");
        setTimeout(function() {
            alerta.classList.add("oculto");
            alerta.classList.remove("alerta-exito");
            alerta2.classList.add("oculto");
        }, 3000);
    } else {
        const alerta = document.getElementById("alerta3");
        alerta.classList.remove("oculto");
        alerta.classList.add("alerta-campo-vacio");
        setTimeout(function() {
            alerta.classList.add("oculto");
            alerta.classList.remove("alerta-campo-vacio");
        }, 3000);
    }
}
// calcular pago fin

// auto seleccion del paquete elegido por el cliente inicio
document.addEventListener('DOMContentLoaded', function() {
    // Código para guardar y recuperar datos del almacenamiento local
    const cedula = document.getElementById("identificacion");
    const usuarioN = document.getElementById("Nusuario");
    const correo = document.getElementById("Email");
    const matriculaN = document.getElementById("Nmatricula");
    const vehiculoT = document.getElementById("Tvehiculo");
    const paqueteT = document.getElementById("Tpaquete");
    const valorP = document.getElementById("Pvalor");
    const FechaACT = document.getElementById("Fecha");
    const Tduracion = document.getElementById("Testimado");

    // Recuperar los datos del almacenamiento local
    const storedData = JSON.parse(localStorage.getItem("datosFormulario"));

    if (storedData) {
        cedula.value = storedData.cedula;
        usuarioN.textContent = storedData.usuario;
        correo.textContent = storedData.correo;
        matriculaN.textContent = storedData.matricula;
        vehiculoT.textContent = storedData.vehiculo;
        paqueteT.textContent = storedData.paquete;
        valorP.textContent = storedData.valor;
        FechaACT.textContent = storedData.fecha;
        Tduracion.textContent = storedData.duracion;
    }

    document.querySelector("form").addEventListener("submit", function(event) {
        // Guardar los datos en el almacenamiento local
        const data = {
            cedula: cedula.value,
            usuario: usuarioN.textContent,
            correo: correo.textContent,
            matricula: matriculaN.textContent,
            vehiculo: vehiculoT.textContent,
            paquete: paqueteT.textContent,
            valor: valorP.textContent,
            fecha: FechaACT.textContent,
            duracion: Tduracion.textContent
        };

        localStorage.setItem("datosFormulario", JSON.stringify(data));
    });

    // Código adicional para verificar el resultado de PayU al regresar
    const urlParams = new URLSearchParams(window.location.search);
    const resultado = urlParams.get('resultado');

    // Verificar si hay un resultado válido de PayU
    if (resultado && (resultado === "exitoso" || resultado === "fallido")) {
        resultadoPayU = resultado;
    }

    // Código adicional que quieres agregar
    miFuncion();
    setTimeout(function() {
        document.removeEventListener('DOMContentLoaded', arguments.callee);
    }, 1000);
});

function miFuncion() {
    verificarpaquete();
    ver_descrpcion();
    obtenerFechaActual();
}
// auto seleccion del paquete elegido por el cliente fin

// Función para verificar si se puede usar el botón PayU
function verificarCampos() {
    const usuario = document.getElementById("Nusuario").textContent.trim();

    if (usuario === "Nombre Del Usuario") {
        const alerta = document.getElementById("alerta2");
        alerta.classList.remove("oculto");
        alerta.classList.add("alerta-campo-vacio");
        setTimeout(function() {
            alerta.classList.add("oculto");
            alerta.classList.remove("alerta-campo-vacio");
        }, 3000);
        return false; // Evita que el formulario se envíe
    }
    return true; // Permite continuar con el envío del formulario
}
// Función para verificar si se puede usar el botón PayU fin

// Función para pago fisico
function pagofisico() {
    const usuario = document.getElementById("Nusuario").textContent.trim();

    if (usuario === "Nombre Del Usuario") {
        const alerta = document.getElementById("alerta2");
        alerta.classList.remove("oculto");
        alerta.classList.add("alerta-campo-vacio");
        setTimeout(function() {
            alerta.classList.add("oculto");
            alerta.classList.remove("alerta-campo-vacio");
        }, 3000);
        return;
    }
    const alerta = document.getElementById("pagofisico");
    alerta.classList.remove("oculto");
}
// Función para pago fisico fin 

// Función para generar el turno y guardar el pago 
function guardar_ventas() {
    const newFecha = FechaACT.value;
    const newidvehiculo = matriculaN.value;
    const newidpaquete = idpaquete;
    const newtotal = valorP.value;
    const newdescripcion = document.getElementById("miContainer").textContent;
    console.log(newFecha, newidvehiculo, newidpaquete, newtotal, newdescripcion);

    if (resultadoPayU === "exitoso") {
        axios.post('fronted/guardarventa', {
                Fecha: newFecha,
                Matricula: newidvehiculo,
                id_paquete: newidpaquete,
                Total: newtotal,
                Descripcion: newdescripcion
            }).then((res) => {
                console.log(res.data);
                const alerta = document.getElementById("alerta");
                alerta.classList.remove("oculto");
                alerta.classList.add("alerta-exito");
                setTimeout(function() {
                    alerta.classList.add("oculto");
                    alerta.classList.remove("alerta-exito");
                }, 3000);
            })
            .catch((err) => {
                console.log(err);
            })
        window.alert("Venta Registrada y turno elavorado");
    } else {
        window.alert("Pago No registrado o Fallido");
    }
}
// Función para generar el turno y guardar el pago fin