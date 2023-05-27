let chart;

function ver_ventas() {
    let buscafecha = document.getElementById("buscafecha").value;
    let fechaBusqueda = buscafecha.split('/');
    let diaBusqueda = fechaBusqueda[0] || '';
    let mesBusqueda = fechaBusqueda[1] || '';
    let anoBusqueda = fechaBusqueda[2] || '';

    axios.get('fronted/consulBalances', {
            responseType: 'json'
        })
        .then(function(response) {
            let datos = response.data;
            console.log(datos);

            let opciones = '';
            for (let index = 0; index < datos.length; index++) {
                let fecha = new Date(datos[index].Fecha);
                let fechaFormateada = fecha.toLocaleDateString('es-ES');

                let dia = fecha.getDate();
                let mes = fecha.getMonth() + 1;
                let ano = fecha.getFullYear();

                if (buscafecha === '' ||
                    (diaBusqueda && !mesBusqueda && !anoBusqueda && dia.toString() === diaBusqueda) ||
                    (diaBusqueda && mesBusqueda && !anoBusqueda && dia.toString() === diaBusqueda && mes.toString() === mesBusqueda) ||
                    (diaBusqueda && mesBusqueda && anoBusqueda && dia.toString() === diaBusqueda && mes.toString() === mesBusqueda && ano.toString() === anoBusqueda) ||
                    (!diaBusqueda && mesBusqueda && !anoBusqueda && mes.toString() === mesBusqueda) ||
                    (!diaBusqueda && !mesBusqueda && anoBusqueda && ano.toString() === anoBusqueda)) {
                    opciones +=
                        `<tr>
                        <td>${fechaFormateada}</td>
                        <td>${datos[index].Matricula}</td>
                        <td>${datos[index].Paquete}</td>
                        <td>${datos[index].Total}</td>
                        <td>${datos[index].Descripcion}</td>
                      </tr>`;
                }
            }
            document.getElementById("tablaBody3").innerHTML = opciones;
        })
        .catch(function(error) {
            console.log(error);
        });
}

function imprimirTabla() {
    var tablaBody = document.getElementById("tablaBody3");

    if (tablaBody.innerHTML.trim() === "") {
        const alerta = document.getElementById("alerta");
        alerta.classList.remove("oculto");
        alerta.classList.add("alerta-campo-vacio2");
        setTimeout(function() {
            alerta.classList.add("oculto");
            alerta.classList.remove("alerta-campo-vacio2");
        }, 3000);
        return;
    }

    window.print();
}

function generarGrafica(dataLabels, dataValues1, dataValues2) {
    var ctx = document.getElementById('myChart').getContext('2d');
    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dataLabels,
            datasets: [{
                    label: 'Ventas 04/2023',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    data: dataValues1,
                },
                {
                    label: 'Ventas 05/2023',
                    borderColor: 'rgba(0, 0, 0, 1)',
                    backgroundColor: 'rgba(0, 0, 0, 0.2)',
                    data: dataValues2,
                },
            ],
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                },
            },
        },
    });
}

function comparar_ventas() {
    let buscafecha1 = document.getElementById('buscafechac1').value;
    let buscafecha2 = document.getElementById('buscafechac2').value;

    if (buscafecha1 === '' || buscafecha2 === '') {
        const alerta = document.getElementById("alerta2");
        alerta.classList.remove("oculto");
        alerta.classList.add("alerta-campo-vacio2");
        setTimeout(function() {
            alerta.classList.add("oculto");
            alerta.classList.remove("alerta-campo-vacio2");
        }, 3000);
        return;
    }

    let fechaBusqueda1 = buscafecha1.split('/');
    let fechaBusqueda2 = buscafecha2.split('/');
    let mesBusqueda1 = parseInt(fechaBusqueda1[0]) || 0;
    let anoBusqueda1 = parseInt(fechaBusqueda1[1]) || 0;
    let mesBusqueda2 = parseInt(fechaBusqueda2[0]) || 0;
    let anoBusqueda2 = parseInt(fechaBusqueda2[1]) || 0;

    axios
        .get('fronted/consulBalances', {
            responseType: 'json',
        })
        .then(function(response) {
            let datos = response.data;
            console.log(datos);

            let dataLabels = [];
            let dataValues1 = [];
            let dataValues2 = [];

            for (let index = 0; index < datos.length; index++) {
                let fecha = new Date(datos[index].Fecha);
                let mes = fecha.getMonth() + 1;
                let ano = fecha.getFullYear();

                if (
                    (mesBusqueda1 && anoBusqueda1 && mes === mesBusqueda1 && ano === anoBusqueda1) ||
                    (mesBusqueda2 && anoBusqueda2 && mes === mesBusqueda2 && ano === anoBusqueda2)
                ) {
                    let fechaFormateada = fecha.toLocaleDateString('es-ES');
                    dataLabels.push(fechaFormateada);

                    if (mes === mesBusqueda1 && ano === anoBusqueda1) {
                        dataValues1.push(datos[index].Total);
                        dataValues2.push(null);
                    } else {
                        dataValues1.push(null);
                        dataValues2.push(datos[index].Total);
                    }
                }
            }

            if (dataLabels.length === 0) {
                alert('No hay resultados para los meses y años proporcionados.');
                return;
            }
            generarGrafica(dataLabels, dataValues1, dataValues2);
            mostrarGrafica();
        })
        .catch(function(error) {
            console.log(error);
        });
}

function mostrarGrafica() {
    document.getElementById('Grafica').style.visibility = 'visible';
}

function ocultarGrafica() {
    document.getElementById('Grafica').style.visibility = 'hidden';
    document.getElementById('buscafechac1').value = '';
    document.getElementById('buscafechac2').value = '';
    chart.destroy();
}