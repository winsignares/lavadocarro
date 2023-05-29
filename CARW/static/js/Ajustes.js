function mostrarRvehiculos() {
    document.getElementById('ajvehiculos').style.visibility = 'visible';
    document.getElementById('ajusuarios').style.visibility = 'hidden';
    document.getElementById('ajpaquetes').style.visibility = 'hidden';
}

function mostrarRuarios() {
    document.getElementById('ajusuarios').style.visibility = 'visible';
    document.getElementById('ajvehiculos').style.visibility = 'hidden';
    document.getElementById('ajpaquetes').style.visibility = 'hidden';
}

function mostrarRpaquetes() {
    document.getElementById('ajpaquetes').style.visibility = 'visible';
    document.getElementById('ajusuarios').style.visibility = 'hidden';
    document.getElementById('ajvehiculos').style.visibility = 'hidden';
}

function eliminarRuarios() {
    document.getElementById('ajeliminar').style.visibility = 'visible';
    document.getElementById('ajusuarios').style.visibility = 'hidden';
    document.getElementById('ajvehiculos').style.visibility = 'hidden';
    document.getElementById('ajpaquetes').style.visibility = 'hidden';
}