const cedula = document.getElementById("identificacion");
const usuarioN = document.getElementById("Nusuario");
const correo = document.getElementById("Email");
const matriculaN = document.getElementById("Nmatricula");
const vehiculoT = document.getElementById("Tvehiculo");
const paqueteT = document.getElementById("Tpaquete");
const valorP = document.getElementById("Pvalor");
const FechaACT = document.getElementById("Fecha");
const Tduracion = document.getElementById("Testimado");
const idpaquete = document.getElementById("GID");
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

                    setTimeout(function() {
                        verpagoenlinea();
                        savepagodigital();
                    }, 100);
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
                    idpaquete.value = datos[i].id;
                    return;
                }
            }
            const alerta = document.getElementById("alerta");
            alerta.classList.remove("oculto");
            setTimeout(function() {
                alerta.classList.add("oculto");
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

    if (!/^\d+$/.test(pagado)) {
        const alerta = document.getElementById("alerta7");
        alerta.classList.remove("oculto");
        setTimeout(function() {
            alerta.classList.add("oculto");
        }, 3000);
        return;
    }

    if (valorcito <= valorPagado) {
        resultado.innerHTML = valorPagado - valorcito;
        resultadoPayU = "exitoso";
        const alerta = document.getElementById("alerta4");
        const alerta2 = document.getElementById("pagofisico");
        alerta.classList.remove("oculto");
        setTimeout(function() {
            alerta.classList.add("oculto");
            alerta2.classList.add("oculto");
        }, 3000);
    } else {
        const alerta = document.getElementById("alerta3");
        alerta.classList.remove("oculto");
        setTimeout(function() {
            alerta.classList.add("oculto");
        }, 3000);
    }
}
// calcular pago fin

// auto seleccion del paquete elegido por el cliente inicio
document.addEventListener('DOMContentLoaded', function() {
    // Verificar si se accedió desde Stripe
    if (document.referrer.startsWith("https://checkout.stripe.com/")) {
        window.alert("funciona");
        resultadoPayU = "exitoso";
    }
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

// Función para verificar si se puede usar el botón strip
function verpagoenlinea() {
    if (IDC == 1) {
        document.getElementById('containerSTsencillo').style.visibility = 'visible';
        document.getElementById('containerSTprofundo').style.visibility = 'hidden';
        document.getElementById('containerSTprofundo+DS').style.visibility = 'hidden';
        document.getElementById('containerSTdesinfeccion').style.visibility = 'hidden';
    }
    if (IDC == 2) {
        document.getElementById('containerSTprofundo').style.visibility = 'visible';
        document.getElementById('containerSTsencillo').style.visibility = 'hidden';
        document.getElementById('containerSTprofundo+DS').style.visibility = 'hidden';
        document.getElementById('containerSTdesinfeccion').style.visibility = 'hidden';
    }
    if (IDC == 3) {
        document.getElementById('containerSTprofundo+DS').style.visibility = 'visible';
        document.getElementById('containerSTsencillo').style.visibility = 'hidden';
        document.getElementById('containerSTprofundo').style.visibility = 'hidden';
        document.getElementById('containerSTdesinfeccion').style.visibility = 'hidden';
    }
    if (IDC == 4) {
        document.getElementById('containerSTdesinfeccion').style.visibility = 'visible';
        document.getElementById('containerSTsencillo').style.visibility = 'hidden';
        document.getElementById('containerSTprofundo').style.visibility = 'hidden';
        document.getElementById('containerSTprofundo+DS').style.visibility = 'hidden';
    }
}
// Función para verificar si se puede usar el botón strip fin

// Función para pago fisico
function pagofisico() {
    const usuario = document.getElementById("Nusuario").textContent.trim();

    if (usuario === "Nombre Del Usuario") {
        const alerta = document.getElementById("alerta2");
        alerta.classList.remove("oculto");
        setTimeout(function() {
            alerta.classList.add("oculto");
        }, 3000);
        return;
    }
    const alerta = document.getElementById("pagofisico");
    alerta.classList.remove("oculto");
}
// Función para pago fisico fin 

// Función para generar el turno y guardar el pago 
function guardar_ventas() {
    const newidvehiculo = matriculaN.textContent;
    const newidpaquete = idpaquete.value;
    const newtotal = valorP.textContent;
    const newdescripcion = document.getElementById("miContainer").textContent;
    console.log(newidvehiculo, newidpaquete, newtotal, newdescripcion);

    if (resultadoPayU === "exitoso") {
        axios.post('fronted/guardarventa', {
            Matricula: newidvehiculo,
            id_paquete: newidpaquete,
            Total: newtotal,
            Descripcion: newdescripcion
        }).then((res) => {
            console.log(res.data);
            const alerta = document.getElementById("alerta6");
            alerta.classList.remove("oculto");
            setTimeout(function() {
                alerta.classList.add("oculto");
            }, 3000);

            // Realizar otra consulta POST para guardar en otra tabla
            axios.post('fronted/guardarturno', {
                Matricula: newidvehiculo,
                id_paquete: newidpaquete
            }).then(function(response) {
                console.log(response.data);
            }).catch(function(error) {
                console.log(error);
            });
        }).catch((err) => {
            console.log(err);
        });
    } else {
        const alerta = document.getElementById("alerta5");
        alerta.classList.remove("oculto");
        setTimeout(function() {
            alerta.classList.add("oculto");
        }, 3000);
    }
}
// Función para generar el turno y guardar el pago fin

// Función para generar el turno y guardar el pago de una venta con tarjeta fin
function savepagodigital() {
    const newidvehiculo = matriculaN.textContent;
    const newidpaquete = idpaquete.value;
    const newtotal = valorP.textContent;
    const newdescripcion = document.getElementById("miContainer").textContent;

    localStorage.setItem('MTC', newidvehiculo);
    localStorage.setItem('IDC', newidpaquete);
    localStorage.setItem('VLR', newtotal);
    localStorage.setItem('FCH', fechaFormateada);
    localStorage.setItem('DCP', newdescripcion);
}
// Función para generar el turno y guardar el pago de una venta con tarjeta fin