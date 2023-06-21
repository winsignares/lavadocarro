const IDC = localStorage.getItem('IDC');
const MTC = localStorage.getItem('MTC');
const VLR = localStorage.getItem('VLR');
const FCH = localStorage.getItem('FCH');
const TLP = localStorage.getItem('TLP');
const DCP = localStorage.getItem('DCP');
const CTventa = localStorage.getItem('CTventa');
const matriculaN = document.getElementById("PNmatricula");
const paqueteT = document.getElementById("PTpaquete");
const valorP = document.getElementById("PPvalor");
const descri = document.getElementById("exdescripcion");
const FechaACT = document.getElementById("PFecha");

// datos para venta y turno 
document.addEventListener('DOMContentLoaded', function() {
    miFuncion();
    setTimeout(function() {
        document.removeEventListener('DOMContentLoaded', arguments.callee);
    }, 1000);
});


function miFuncion() {
    obtenerdatosguardados();
}
// datos para venta y turno fin

function obtenerdatosguardados() {
    matriculaN.innerHTML = MTC;
    paqueteT.innerHTML = TLP;
    valorP.innerHTML = VLR;
    FechaACT.innerHTML = FCH;
    descri.innerHTML = DCP;
}

// Función para generar el turno y guardar el pago 
function guardar_ventas() {
    if (!localStorage.getItem('MTC') ||
        !localStorage.getItem('IDC') ||
        !localStorage.getItem('VLR') ||
        !localStorage.getItem('DCP')
    ) {
        const alerta = document.getElementById("alerta5");
        alerta.classList.remove("oculto");
        setTimeout(function() {
            alerta.classList.add("oculto");
        }, 3000);
        return;
    }

    const newidvehiculo = MTC;
    const newidpaquete = IDC;
    const newtotal = VLR;
    const newdescripcion = DCP;
    console.log(newidvehiculo, newidpaquete, newtotal, newdescripcion);

    axios
        .post('fronted/guardarventa', {
            Matricula: newidvehiculo,
            id_paquete: newidpaquete,
            Total: newtotal,
            Descripcion: newdescripcion
        })
        .then((res) => {
            console.log(res.data);
            const alerta = document.getElementById('alerta6');
            alerta.classList.remove('oculto');
            setTimeout(function() {
                alerta.classList.add('oculto');
            }, 3000);

            axios
                .post('fronted/guardarturno', {
                    Matricula: newidvehiculo,
                    id_paquete: newidpaquete
                })
                .then(function(response) {
                    console.log(response.data);

                    localStorage.removeItem('IDC');
                    localStorage.removeItem('MTC');
                    localStorage.removeItem('VLR');
                    localStorage.removeItem('FCH');
                    localStorage.removeItem('TLP');
                    localStorage.removeItem('DCP');
                    localStorage.removeItem('CTventa');
                })
                .catch(function(error) {
                    console.log(error);
                });
        })
        .catch((err) => {
            console.log(err);
        });
}
// Función para generar el turno y guardar el pago fin