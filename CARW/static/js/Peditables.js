let remplazo = document.getElementById('cambio');
let valorcito = document.getElementById('Valor');
let inputValor = document.getElementById("Valor");
let titulo = document.getElementById("Titulo");

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
                    `<ul id="${index}" class="list-group2">
                    <li class="list-group-item" onclick="añadir(event)" value="${datos[index].valor}">>${datos[index].descripcion}</li><li class="list-group-item">$${datos[index].valor}</li>
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

    const elementoOriginal = contenedorOriginal.querySelector('.list-group-item');
    const elementoCopia = elementoOriginal.cloneNode(true);
    const texto = elementoCopia.textContent;
    elementoCopia.removeAttribute('onclick');

    const botonEliminar = document.createElement('button');
    botonEliminar.innerText = '';
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
    titulo.value = "";
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
    const suma = sumarValores();
    const newNombre = document.getElementById("Titulo").value;
    const newDescripcion = document.getElementById("miContainer").textContent;
    const newValor = suma;
    console.log(newNombre, newDescripcion, newValor);

    if (newNombre.trim() === "" || newDescripcion.trim() === "") {
        console.log("Debe llenarse todos los campos");
        const alerta = document.getElementById("alerta2");
        alerta.classList.remove("oculto");
        alerta.classList.add("alerta-exito");
        setTimeout(function() {
            alerta.classList.add("oculto");
            alerta.classList.remove("alerta-exito");
        }, 3000);
        return;
    }

    axios.post('fronted/guardarpaquetes', {
            Nombre: newNombre,
            Descripcion: newDescripcion,
            Valor: newValor,
            Duracion: '00: 30: 00'
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
    eliminarTodo();
}
// guardarpaquetes fin