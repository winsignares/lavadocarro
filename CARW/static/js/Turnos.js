function ver_turnos() {
    axios.get('fronted/consulTurnos')
        .then(function(response) {
            let datos = response.data;
            var length = Object.keys(datos).length;
            let opciones = '';
            let dura;
            let idt;
            let idArray = []; // Array para almacenar los IDs existentes

            // Obtener los IDs existentes del HTML
            let idElements = document.querySelectorAll('[id^="HI"]');
            idElements.forEach(function(element) {
                idArray.push(element.id);
            });

            for (let index = 0; index < length; index++) {
                let idHI = `HI${datos[index].ID}`;

                // Verificar si el ID ya existe en el HTML
                if (idArray.includes(idHI)) {
                    continue; // Pasar al siguiente turno si ya existe el ID
                }

                let idDU = `DU${datos[index].ID}`;
                let idHF = `HF${datos[index].ID}`;
                let idET = `ET${datos[index].ID}`;
                dura = `${datos[index].Duracion}`;
                idt = `${datos[index].ID}`;
                opciones +=
                    `<tr>
                        <td>${datos[index].ID}</td>
                        <td>${datos[index].Matricula}</td>
                        <td>${datos[index].Paquete}</td>
                        <td id="${idHI}">Fila ${index + 1}, Columna 4</td>
                        <td id="${idDU}">Fila ${index + 1}, Columna 5</td>
                        <td id="${idHF}">Fila ${index + 1}, Columna 6</td>
                        <td id="${idET}">Por Iniciar</td>
                        <td><button type="button" class="btn btn-dark" onclick="Empezar('${idHI}','${idDU}', '${idHF}', '${idET}', '${dura}', '${idt}')">Empezar</button></td>
                    </tr>`;
            }
            document.getElementById("tablaBody").innerHTML += opciones; // Agregar los nuevos turnos al final de la tabla
        })
        .catch(function(error) {
            console.log(error);
        });
}

function Empezar(idHI, idDU, idHF, idET, dura, idt) {
    var horaActual = obtenerHoraActual(); // Obtener la hora actual utilizando la función obtenerHoraActual() definida anteriormente

    // Convertir la duración en milisegundos
    var duracionMilisegundos = parseInt(dura.split(':')[0]) * 60 * 60 * 1000 + parseInt(dura.split(':')[1]) * 60 * 1000 + parseInt(dura.split(':')[2]) * 1000;

    // Calcular la hora de finalización sumando la duración en milisegundos al tiempo actual en milisegundos
    var fecha = new Date();
    var horaFinMilisegundos = fecha.getTime() + duracionMilisegundos;

    // Crear un objeto Date con la hora de finalización
    var horaFinDate = new Date(horaFinMilisegundos);

    // Obtener la hora, minutos y segundos de la hora de finalización
    var horaFin = horaFinDate.getHours();
    var minutosFin = horaFinDate.getMinutes();
    var segundosFin = horaFinDate.getSeconds();

    // Formatear la hora, minutos y segundos de la hora de finalización para que siempre tengan 2 dígitos
    if (horaFin < 10) {
        horaFin = "0" + horaFin;
    }
    if (minutosFin < 10) {
        minutosFin = "0" + minutosFin;
    }
    if (segundosFin < 10) {
        segundosFin = "0" + segundosFin;
    }

    // Actualizar los elementos de la tabla con la hora actual, la duración y la hora de finalización
    document.getElementById(idHI).textContent = horaActual;
    document.getElementById(idDU).textContent = dura;
    document.getElementById(idHF).textContent = horaFin + ":" + minutosFin + ":" + segundosFin;
    document.getElementById(idET).textContent = "En proceso";
    Id = idt;

    clonarTurnos(event);
    location.reload();
    eliminarTurno(Id);
}


document.addEventListener('DOMContentLoaded', function() {
    const tablaClones = document.getElementById("tablaTurnos-por-empezar").getElementsByTagName("tbody")[0];

    // Restaurar clones desde el localStorage
    const clonesGuardados = JSON.parse(localStorage.getItem("clones")) || [];

    clonesGuardados.forEach(function(clon) {
        tablaClones.innerHTML += clon;
    });

    miFuncion();
    setTimeout(function() {
        document.removeEventListener('DOMContentLoaded', arguments.callee);
    }, 1000);
});

function miFuncion() {
    ver_turnos();
}

// para clonar los turnos
function clonarTurnos(event) {
    const botonPresionado = event.target;
    const contenedorOriginal = botonPresionado.closest("tr");
    const contenedorClon = contenedorOriginal.cloneNode(true);
    contenedorClon.querySelector("button").remove();

    const tablaClones = document.getElementById("tablaTurnos-por-empezar").getElementsByTagName("tbody")[0];
    tablaClones.appendChild(contenedorClon);

    guardarClonesEnLocalStorage();
}
// para clonar los turnos fin
// guardar clones 
function guardarClonesEnLocalStorage() {
    const tablaClones = document.getElementById("tablaTurnos-por-empezar").getElementsByTagName("tbody")[0];
    const filasClones = tablaClones.getElementsByTagName("tr");
    const clones = [];

    for (let i = 0; i < filasClones.length; i++) {
        clones.push(filasClones[i].outerHTML);
    }

    localStorage.setItem("clones", JSON.stringify(clones));
}
// guardar clones fin

// eliminar turnos completos
function borrarclones() {
    localStorage.clear();
    location.reload();
}
// eliminar turnos completos fin
function eliminarTurno(Id) {
    fetch(`fronted/eliminarTurno/${Id}`, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(data => {
            console.log(data.message); // Mensaje de respuesta del servidor
            // Aquí puedes realizar cualquier acción adicional después de eliminar el turno
            // Por ejemplo, recargar la página o actualizar la interfaz de usuario
            location.reload();
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

// odetener la hora
function obtenerHoraActual() {
    var fecha = new Date();
    var hora = fecha.getHours();
    var minutos = fecha.getMinutes();
    var segundos = fecha.getSeconds();

    // Formatear la hora, minutos y segundos para que siempre tengan 2 dígitos
    if (hora < 10) {
        hora = "0" + hora;
    }
    if (minutos < 10) {
        minutos = "0" + minutos;
    }
    if (segundos < 10) {
        segundos = "0" + segundos;
    }

    var horaActual = hora + ":" + minutos + ":" + segundos;
    return horaActual;
}
// odetener la hora fin