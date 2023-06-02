// mostrar u ocultar menus
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
// mostrar u ocultar menus fin

// guardar vehiculos
function guardar_vehiculos() {
    const newMatricula = document.getElementById("Rmatricula").value;
    const newModelo = document.getElementById("Rmodelo").value;
    const newColor = document.getElementById("Rcolor").value;
    const newTipo = document.getElementById("Rtipo").value;
    console.log(newMatricula, newModelo, newColor, newTipo);

    if (newMatricula.trim() === "" || newModelo.trim() === "" || newColor.trim() === "" || newTipo.trim() === "") {
        const alerta = document.getElementById("alerta");
        alerta.classList.remove("oculto");
        alerta.classList.add("alerta-campo-vacio3");
        setTimeout(function() {
            alerta.classList.add("oculto");
            alerta.classList.remove("alerta-campo-vacio3");
        }, 3000);
        return;
    }

    axios.post('fronted/guardarvehiculosAJ', {
            Matricula: newMatricula,
            Modelo: newModelo,
            Color: newColor,
            Tipo: newTipo
        }).then((res) => {
            console.log(res.data);
            const alerta = document.getElementById("alerta2");
            alerta.classList.remove("oculto");
            alerta.classList.add("alerta-Exito2");
            setTimeout(function() {
                alerta.classList.add("oculto");
                alerta.classList.remove("alerta-Exito2");
            }, 3000);
        })
        .catch((err) => {
            console.log(err);
        })
    limpiartodo();
}
// guardar vehiculos fin

// guardar usuarios
function guardar_usuarios() {
    const newUsuario = document.getElementById("Rusuario").value;
    const newNombre = document.getElementById("Rnombre").value;
    const newApellido = document.getElementById("Rapellido").value;
    const newCedula = document.getElementById("Rcedula").value;
    const newCorreo = document.getElementById("Rmail").value;
    const newTelefono = document.getElementById("Rtelefono").value;
    const newContraseña = document.getElementById("Rpassword").value;
    const newid_vehiculo = document.getElementById("Rmatricula2").value;
    const newid_rol = document.getElementById("rolSelect").value;
    console.log(newUsuario, newNombre, newApellido, newCedula, newCorreo, newTelefono, newContraseña, newid_vehiculo, newid_rol);

    if (newUsuario.trim() === "" || newNombre.trim() === "" || newApellido.trim() === "" || newCedula.trim() === "" ||
        newCorreo.trim() === "" || newTelefono.trim() === "" || newContraseña.trim() === "" ||
        newid_vehiculo.trim() === "") {
        const alerta = document.getElementById("alerta");
        alerta.classList.remove("oculto");
        alerta.classList.add("alerta-campo-vacio3");
        setTimeout(function() {
            alerta.classList.add("oculto");
            alerta.classList.remove("alerta-campo-vacio3");
        }, 3000);
        return;
    }

    axios.get('fronted/consulvehiculosPAG', {
            responseType: 'json'
        })
        .then(function(response) {
            let datos = response.data
            for (let i = 1; i <= Object.keys(datos).length; i++) {
                if (datos[i].Matricula == newid_vehiculo) {
                    axios.post('fronted/guardarusuariosAJ', {
                            Usuario: newUsuario,
                            Nombre: newNombre,
                            Apellido: newApellido,
                            Cedula: newCedula,
                            Correo: newCorreo,
                            Telefono: newTelefono,
                            Contraseña: newContraseña,
                            id_vehiculo: newid_vehiculo,
                            id_rol: newid_rol
                        }).then((res) => {
                            console.log(res.data);
                            const alerta = document.getElementById("alerta2");
                            alerta.classList.remove("oculto");
                            alerta.classList.add("alerta-Exito2");
                            setTimeout(function() {
                                alerta.classList.add("oculto");
                                alerta.classList.remove("alerta-Exito2");
                            }, 3000);
                        })
                        .catch((err) => {
                            console.log(err);
                        })
                    limpiartodo2();
                    return;
                }
            }
            window.alert("Matricula no registrada");
        })
        .catch(function(error) {
            console.log(error);
        });
}
// guardar usuarios fin

// limpiar
function limpiartodo() {
    const linMatricula = document.getElementById("Rmatricula");
    const linModelo = document.getElementById("Rmodelo");
    const linColor = document.getElementById("Rcolor");
    const linTipo = document.getElementById("Rtipo");
    linMatricula.value = "";
    linModelo.value = "";
    linColor.value = "";
    linTipo.value = "";
}

function limpiartodo2() {
    const newUsuario = document.getElementById("Rusuario");
    const newNombre = document.getElementById("Rnombre");
    const newApellido = document.getElementById("Rapellido");
    const newCedula = document.getElementById("Rcedula");
    const newCorreo = document.getElementById("Rmail");
    const newTelefono = document.getElementById("Rtelefono");
    const newContraseña = document.getElementById("Rpassword");
    const newid_vehiculo = document.getElementById("Rmatricula2");

    newUsuario.value = "";
    newNombre.value = "";
    newApellido.value = "";
    newCedula.value = "";
    newCorreo.value = "";
    newTelefono.value = "";
    newContraseña.value = "";
    newid_vehiculo.value = "";
}
// limpiar fin

// probar consultas y asy
function test() {
    axios.get('fronted/consulvehiculosPAG', {
            responseType: 'json'
        })
        .then(function(response) {
            let datos = response.data;
            const newid_vehiculo = document.getElementById("Rmatricula2").value;
            for (let i = 1; i <= Object.keys(datos).length; i++) {
                if (datos[i].Matricula == newid_vehiculo) {
                    window.alert("Sí existe");
                    return;
                }
            }
            window.alert("Matrícula no registrada");
        })
        .catch(function(error) {
            console.error('Error al obtener los datos:', error);
        });
}

// probar consultas y asy fin