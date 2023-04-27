function mostrarContenido(id) {
    // Ocultar todos los mosaicos
    var tiles = document.getElementsByClassName("tile");
    for (var i = 0; i < tiles.length; i++) {
        tiles[i].style.display = "none";
    }

    // Animar el iframe correspondiente hacia arriba
    var contenido = document.getElementById(id);
    contenido.style.transform = "translateY(100%)";
    contenido.style.display = "block";
    contenido.animate([
        { transform: "translateY(100%)" },
        { transform: "translateY(0)" }
    ], {
        duration: 500,
        easing: "ease-in-out"
    }).onfinish = function() {
        contenido.style.transform = "";
    };
}

function ocultarContenido(id) {
    // Ocultar el iframe correspondiente
    var contenido = document.getElementById(id);
    contenido.style.display = "none";

    // Mostrar todos los mosaicos
    var tiles = document.getElementsByClassName("tile");
    for (var i = 0; i < tiles.length; i++) {
        tiles[i].style.display = "block";
    }
}

function animarEtiqueta() {
    var etiqueta = document.querySelector('.animacion');
    etiqueta.style.opacity = 0.1;
    etiqueta.style.fontSize = '10px';
}

function revertirAnimacion() {
    var etiqueta = document.querySelector('.animacion');
    etiqueta.style.opacity = 1;
    etiqueta.style.fontSize = '30px';
}