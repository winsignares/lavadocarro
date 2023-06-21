const IDC = localStorage.getItem('IDC');
const MTC = localStorage.getItem('MTC');
const VLR = localStorage.getItem('VLR');
const FCH = localStorage.getItem('FCH');
const DCP = localStorage.getItem('DCP');
const matriculaN = document.getElementById("PNmatricula");
const vehiculoT = document.getElementById("PTvehiculo");
const paqueteT = document.getElementById("PTpaquete");
const valorP = document.getElementById("PPvalor");
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

function obtenerdatosguardados() {}