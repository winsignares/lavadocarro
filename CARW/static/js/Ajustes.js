function mostrarmenuUS() {
    document.getElementById('ajustes-botones2').style.visibility = 'visible';
    document.getElementById('ajustes-botones3').style.visibility = 'hidden';
    document.getElementById('ajvehiculos').style.visibility = 'hidden';
    document.getElementById('ajusuarios').style.visibility = 'hidden';
    document.getElementById('ajpaquetes').style.visibility = 'hidden';
    document.getElementById('ajeliminar').style.visibility = 'hidden';
    document.getElementById('ajeliminarPQ').style.visibility = 'hidden';
}

function mostrarmenuPQ() {
    document.getElementById('ajustes-botones3').style.visibility = 'visible';
    document.getElementById('ajustes-botones2').style.visibility = 'hidden';
    document.getElementById('ajvehiculos').style.visibility = 'hidden';
    document.getElementById('ajusuarios').style.visibility = 'hidden';
    document.getElementById('ajpaquetes').style.visibility = 'hidden';
    document.getElementById('ajeliminar').style.visibility = 'hidden';
    document.getElementById('ajeliminarPQ').style.visibility = 'hidden';
    document.getElementById('ajregistrarPQ').style.visibility = 'hidden';
}

function mostrarRvehiculos() {
    document.getElementById('ajvehiculos').style.visibility = 'visible';
    document.getElementById('ajusuarios').style.visibility = 'hidden';
    document.getElementById('ajpaquetes').style.visibility = 'hidden';
    document.getElementById('ajeliminar').style.visibility = 'hidden';
    document.getElementById('ajeliminarPQ').style.visibility = 'hidden';
    document.getElementById('ajregistrarPQ').style.visibility = 'hidden';
}

function mostrarRuarios() {
    document.getElementById('ajusuarios').style.visibility = 'visible';
    document.getElementById('ajvehiculos').style.visibility = 'hidden';
    document.getElementById('ajpaquetes').style.visibility = 'hidden';
    document.getElementById('ajeliminar').style.visibility = 'hidden';
    document.getElementById('ajeliminarPQ').style.visibility = 'hidden';
    document.getElementById('ajregistrarPQ').style.visibility = 'hidden';
}

function mostrarRpaquetes() {
    document.getElementById('ajpaquetes').style.visibility = 'visible';
    document.getElementById('ajusuarios').style.visibility = 'hidden';
    document.getElementById('ajvehiculos').style.visibility = 'hidden';
    document.getElementById('ajeliminar').style.visibility = 'hidden';
    document.getElementById('ajeliminarPQ').style.visibility = 'hidden';
    document.getElementById('ajregistrarPQ').style.visibility = 'hidden';
}

function eliminarRuarios() {
    document.getElementById('ajeliminar').style.visibility = 'visible';
    document.getElementById('ajusuarios').style.visibility = 'hidden';
    document.getElementById('ajvehiculos').style.visibility = 'hidden';
    document.getElementById('ajpaquetes').style.visibility = 'hidden';
    document.getElementById('ajeliminarPQ').style.visibility = 'hidden';
    document.getElementById('ajregistrarPQ').style.visibility = 'hidden';
}

function eliminarpaquetes() {
    document.getElementById('ajeliminarPQ').style.visibility = 'visible';
    document.getElementById('ajusuarios').style.visibility = 'hidden';
    document.getElementById('ajvehiculos').style.visibility = 'hidden';
    document.getElementById('ajpaquetes').style.visibility = 'hidden';
    document.getElementById('ajeliminar').style.visibility = 'hidden';
    document.getElementById('ajregistrarPQ').style.visibility = 'hidden';
}

function mostrarpaquetesPQ() {
    document.getElementById('ajregistrarPQ').style.visibility = 'visible';
    document.getElementById('ajusuarios').style.visibility = 'hidden';
    document.getElementById('ajvehiculos').style.visibility = 'hidden';
    document.getElementById('ajpaquetes').style.visibility = 'hidden';
    document.getElementById('ajeliminar').style.visibility = 'hidden';
    document.getElementById('ajeliminarPQ').style.visibility = 'hidden';
}
ajregistrarPQ