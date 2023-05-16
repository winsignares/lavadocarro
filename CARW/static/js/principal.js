const paqueteT = document.getElementById("Tpaquete");
const valorP = document.getElementById("Pvalor");
const FechaACT = document.getElementById("Fecha");
const Tduracion = document.getElementById("Testimado");
const IDC = 1;

function gopredeterminados() {
    window.location.href = '/Ppredeterminados';
    return;
}

function goeditables() {
    window.location.href = '/Peditables';
    return;
}

function gopagos() {
    window.location.href = '/Pagos';
    return;
}

function verificarpaquete(event) {
    event.preventDefault();
    axios.get('fronted/consulpaquetesPAG')
        .then(function(response) {
            let datos = response.data;
            let identidad = IDC.value.trim();
            for (let i = 1; i <= Object.keys(datos).length; i++) {
                if (datos[i].id == identidad) {
                    paqueteT.innerHTML = `<li id="Tpaquete" class="list-group-item" style="display: inline;">${datos[i].Nombre}</li>`;
                    valorP.innerHTML = `<li id="Pvalor" class="list-group-item" style="display: inline;">${datos[i].Matricula}</li>`;
                    FechaACT.innerHTML = `<li id="Fecha" class="list-group-item" style="display: inline;">${datos[i].Tipo}</li>`;
                    Tduracion.innerHTML = `<li id="Testimado" class="list-group-item" style="display: inline;">${datos[i].Tipo}</li>`;
                    return;
                }
            }
            const alerta = document.getElementById("alerta");
            alerta.classList.remove("oculto");
            alerta.classList.add("alerta-campo-vacio");
            setTimeout(function() {
                alerta.classList.add("oculto");
                alerta.classList.remove("alerta-campo-vacio");
            }, 3000);
            return;
        })
        .catch(function(error) {
            console.log(error);
        });
}

function seleccionado(id) {
    window.location.href = '/Pagos';
    const IDC = id;

    return;
}