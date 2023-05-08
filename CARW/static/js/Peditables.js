let remplazo = document.getElementById('cambio');
let valorcito = document.getElementById('Valor');
const inputValor = document.getElementById("Valor");

// odtener los procedimientos inicio
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
// odtener los procedimientos fin
// sumar los valores en el div inicio
function sumarValores() {
    const contenedores = document.querySelectorAll("#miContainer li");
    let suma = 0;
    contenedores.forEach(contenedor => {
        suma += parseFloat(contenedor.value);
    });
    return suma;
}
// sumar los valores en el div fin
// actualizar la suma inicio
function mostrarSuma() {
    const suma = sumarValores();
    inputValor.value = `$${suma}`;
}
// actualizar la suma fin
// añadir procedimientos al div inicio
function añadir(event) {
    const boton = event.target;
    const contenedorOriginal = boton.parentNode;

    const elementoCopia = contenedorOriginal.querySelector('.list-group-item');
    const texto = elementoCopia.textContent;

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
// añadir procedimientos al div fin
// eliminar elementos de forma individual inicio
function eliminar(elemento) {
    const contenedor = elemento.parentNode;
    contenedor.removeChild(elemento);
}
// eliminar elementos de forma individual fin
// controlar el estado del container inicio
const contenedor = document.querySelector('#miContainer');
const observer = new MutationObserver(() => {
    mostrarSuma();
});
const config = { childList: true };
observer.observe(contenedor, config);
// controlar el estado del container fin
// eliminar todos los  elementos inicio
function eliminarTodo() {
    const contenedor = document.getElementById("miContainer");
    while (contenedor.firstChild) {
        contenedor.removeChild(contenedor.firstChild);
    }
    mostrarSuma();
}
// eliminar todos los  elementos fin
// cambiar html inicio
function gopredeterminados2() {
    window.location.href = '/Ppredeterminados';
    return;
}
// cambiar html fin
// guardarpaquetes inicio
function guardar_paquete() {
    const newNombre = document.getElementById("Titulo").value;
    const newDescripcion = document.getElementById("miContainer").innerHTML;
    const newValor = inputValor.value;
    console.log(newNombre, newDescripcion, newValor);

    axios.post('fronted/guardarpaquetes', {
            Nombre: newNombre,
            Descripcion: newDescripcion,
            Valor: newValor
        }).then((res) => {
            console.log(res.data)
        })
        .catch((err) => {
            console.log(err);
        })
}

// guardarpaquetes fin