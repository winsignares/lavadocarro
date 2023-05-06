let remplazo = document.getElementById('cambio');
let valorcito = document.getElementById('Valor');
const inputValor = document.getElementById("Valor");

function ver_procedimientos() {
    axios.get('fronted/consulprocedimientos', {
        responseType: 'json'
    })

    .then(function(response) {
            let datos = response.data
            var length = (Object.keys(datos).length) + 1;
            let opciones = '';
            for (let index = 1; index < length; index++) {
                opciones +=
                    `<ul id="${index}" class=" list-group2 ">
                    <li class="list-group-item " onclick="añadir(event)" value="${datos[index].valor}">${datos[index].descripcion} $${datos[index].valor}</li>
                </ul>`;
            }
            remplazo.innerHTML = opciones;
        })
        .catch(function(error) {
            console.log(error);
        });
}

function sumarValores() {
    const contenedores = document.querySelectorAll("#miContainer li");
    let suma = 0;
    contenedores.forEach(contenedor => {
        suma += parseFloat(contenedor.value);
    });
    return suma;
}

function mostrarSuma() {
    const suma = sumarValores();
    inputValor.value = `$${suma}`;
}

function añadir(event) {
    const boton = event.target;
    const contenedorOriginal = boton.parentNode;

    const elementoCopia = contenedorOriginal.querySelector('.list-group-item').cloneNode(true);

    elementoCopia.removeAttribute('onclick');

    const botonEliminar = document.createElement('button');
    botonEliminar.innerText = 'Eliminar';
    botonEliminar.classList.add('btn', 'btn-danger', 'ms-3');
    botonEliminar.addEventListener('click', function() {
        const contenedorCopia = this.parentNode;
        contenedorCopia.parentNode.removeChild(contenedorCopia);
    });

    const contenedorCopia = document.createElement('div');
    contenedorCopia.classList.add('d-flex', 'align-items-center', 'mb-3');
    contenedorCopia.appendChild(elementoCopia);
    contenedorCopia.appendChild(botonEliminar);

    const container = document.getElementById("miContainer");
    container.appendChild(contenedorCopia);
    mostrarSuma();

}


function eliminar(elemento) {
    const contenedor = elemento.parentNode;
    contenedor.removeChild(elemento);
    mostrarSuma();
}

new Promise(function(resolve) {

    resolve(eliminar(elemento));

}).then(function(result) {

    mostrarSuma();

})

function eliminarTodo() {
    const contenedor = document.getElementById("miContainer");
    while (contenedor.firstChild) {
        contenedor.removeChild(contenedor.firstChild);
    }
    mostrarSuma();
}

function gopredeterminados2() {
    window.location.href = '/Ppredeterminados';
    return;
}