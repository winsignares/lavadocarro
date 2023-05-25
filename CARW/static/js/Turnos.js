function ver_turnos() {
    axios.get('fronted/consulTurnos')
        .then(function(response) {
            let datos = response.data;
            var length = Object.keys(datos).length;
            let opciones = '';
            let dura; // Variable "dura" declarada aquí

            for (let index = 0; index < length; index++) {
                let idHI = `HI${datos[index].ID}`;
                let idDU = `DU${datos[index].ID}`;
                let idHF = `HF${datos[index].ID}`;
                let idET = `ET${datos[index].ID}`;
                dura = `${datos[index].Duracion}`; // Asignar el valor de datos[index].Duracion a la variable "dura"
                opciones +=
                    `<tr>
              <td>${datos[index].ID}</td>
              <td>${datos[index].Matricula}</td>
              <td>${datos[index].Paquete}</td>
              <td id="${idHI}">Fila ${index + 1}, Columna 4</td>
              <td id="${idDU}">Fila ${index + 1}, Columna 5</td>
              <td id="${idHF}">Fila ${index + 1}, Columna 6</td>
              <td id="${idET}">Por Iniciar</td>
              <td><button type="button" class="btn btn-dark" onclick="Empezar('${idHI}','${idDU}', '${idHF}', '${idET}', '${dura}')">Empezar</button></td>
            </tr>`;
            }
            document.getElementById("tablaBody").innerHTML = opciones;
        })
        .catch(function(error) {
            console.log(error);
        });
}

function Empezar(idHI, idDU, idHF, idET, dura) {
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

    // Convertir la duración en milisegundos
    var duracionMilisegundos = parseInt(dura.split(':')[0]) * 60 * 60 * 1000 + parseInt(dura.split(':')[1]) * 60 * 1000 + parseInt(dura.split(':')[2]) * 1000;

    // Calcular la hora de finalización sumando la duración en milisegundos al tiempo actual en milisegundos
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

    // Guardar los datos en el almacenamiento local del navegador
    localStorage.setItem(idHI, horaActual);
    localStorage.setItem(idDU, dura);
    localStorage.setItem(idHF, horaFin + ":" + minutosFin + ":" + segundosFin);
    localStorage.setItem(idET, "En proceso");
}


document.addEventListener('DOMContentLoaded', function() {
    miFuncion();
    setTimeout(function() {
        document.removeEventListener('DOMContentLoaded', arguments.callee);
    }, 1000);
});

function miFuncion() {
    ver_turnos();
}