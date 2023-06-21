let usuarioaDEL = "";
let remplazo = document.getElementById('Mvehiculos');

// mostrar u ocultar menus
function mostrarmenuUS() {
    document.getElementById('ajustes-botones2').style.visibility = 'visible';
    document.getElementById('ajustes-botones3').style.visibility = 'hidden';
    document.getElementById('ajustes-botones4').style.visibility = 'hidden';
    document.getElementById('ajvehiculos').style.visibility = 'hidden';
    document.getElementById('ajusuarios').style.visibility = 'hidden';
    document.getElementById('ajeliminar').style.visibility = 'hidden';
    document.getElementById('ajeliminarPQ').style.visibility = 'hidden';
    document.getElementById('confirdelete').style.visibility = 'hidden';
}

function mostrarmenuPQ() {
    document.getElementById('ajustes-botones3').style.visibility = 'visible';
    document.getElementById('ajustes-botones2').style.visibility = 'hidden';
    document.getElementById('ajustes-botones4').style.visibility = 'hidden';
    document.getElementById('ajvehiculos').style.visibility = 'hidden';
    document.getElementById('ajusuarios').style.visibility = 'hidden';
    document.getElementById('ajeliminar').style.visibility = 'hidden';
    document.getElementById('ajeliminarPQ').style.visibility = 'hidden';
    document.getElementById('ajregistrarPQ').style.visibility = 'hidden';
    document.getElementById('confirdelete').style.visibility = 'hidden';
}

function mostrarRvehiculos() {
    document.getElementById('ajvehiculos').style.visibility = 'visible';
    document.getElementById('ajusuarios').style.visibility = 'hidden';
    document.getElementById('ajeliminar').style.visibility = 'hidden';
    document.getElementById('ajeliminarPQ').style.visibility = 'hidden';
    document.getElementById('ajregistrarPQ').style.visibility = 'hidden';
    document.getElementById('confirdelete').style.visibility = 'hidden';
    document.getElementById('ajustes-botones4').style.visibility = 'hidden';
}

function mostrarRuarios() {
    document.getElementById('ajusuarios').style.visibility = 'visible';
    document.getElementById('ajvehiculos').style.visibility = 'hidden';
    document.getElementById('ajeliminar').style.visibility = 'hidden';
    document.getElementById('ajeliminarPQ').style.visibility = 'hidden';
    document.getElementById('ajregistrarPQ').style.visibility = 'hidden';
    document.getElementById('confirdelete').style.visibility = 'hidden';
    document.getElementById('ajustes-botones4').style.visibility = 'visible';
}

function eliminarRuarios() {
    document.getElementById('ajeliminar').style.visibility = 'visible';
    document.getElementById('ajusuarios').style.visibility = 'hidden';
    document.getElementById('ajvehiculos').style.visibility = 'hidden';
    document.getElementById('ajeliminarPQ').style.visibility = 'hidden';
    document.getElementById('ajregistrarPQ').style.visibility = 'hidden';
    document.getElementById('confirdelete').style.visibility = 'hidden';
    document.getElementById('ajustes-botones4').style.visibility = 'hidden';
}

function eliminarpaquetes() {
    document.getElementById('ajeliminarPQ').style.visibility = 'visible';
    document.getElementById('ajusuarios').style.visibility = 'hidden';
    document.getElementById('ajvehiculos').style.visibility = 'hidden';
    document.getElementById('ajeliminar').style.visibility = 'hidden';
    document.getElementById('ajregistrarPQ').style.visibility = 'hidden';
    document.getElementById('confirdelete').style.visibility = 'hidden';
    document.getElementById('ajustes-botones4').style.visibility = 'hidden';
}

function mostrarpaquetesPQ() {
    document.getElementById('ajregistrarPQ').style.visibility = 'visible';
    document.getElementById('ajusuarios').style.visibility = 'hidden';
    document.getElementById('ajvehiculos').style.visibility = 'hidden';
    document.getElementById('ajeliminar').style.visibility = 'hidden';
    document.getElementById('ajeliminarPQ').style.visibility = 'hidden';
    document.getElementById('confirdelete').style.visibility = 'hidden';
    document.getElementById('ajustes-botones4').style.visibility = 'hidden';
}

function mostrarconfirdeleteUS() {
    document.getElementById('confirdelete').style.visibility = 'visible';
}

function ocultarconfirdeleteUS() {
    document.getElementById('confirdelete').style.visibility = 'hidden';
    nombrecillo = document.getElementById("Dusuario");
    contra = document.getElementById("Dcontra");
    nombrecillo.value = "";
    contra.value = "";
}
// mostrar u ocultar menus fin

// guardar vehiculos
function guardar_vehiculos() {
    const newMatricula = document.getElementById("Rmatricula").value;
    const newModelo = document.getElementById("Rmodelo").value;
    const newColor = document.getElementById("Rcolor").value;
    const newTipo = document.getElementById("Rtipo").value;
    console.log(newMatricula, newModelo, newColor, newTipo);

    if (newMatricula.trim() === "" || newModelo.trim() === "" || newColor.trim() === "" || newTipo.trim() === "0") {
        const alerta = document.getElementById("alerta");
        alerta.classList.remove("oculto");
        alerta.classList.add("alerta-campo-vacio3");
        setTimeout(function() {
            alerta.classList.add("oculto");
            alerta.classList.remove("alerta-campo-vacio3");
        }, 3000);
        return;
    }

    if (newMatricula !== newMatricula.toUpperCase()) {
        const alerta = document.getElementById("alerta4");
        alerta.classList.remove("oculto");
        setTimeout(function() {
            alerta.classList.add("oculto");
        }, 3000);
        return;
    }

    if (!/^[a-zA-Z]+$/.test(newModelo)) {
        const alerta = document.getElementById("alerta6");
        alerta.classList.remove("oculto");
        setTimeout(function() {
            alerta.classList.add("oculto");
        }, 3000);
        return;
    }

    if (!/^[a-zA-Z]+$/.test(newColor)) {
        const alerta = document.getElementById("alerta6");
        alerta.classList.remove("oculto");
        setTimeout(function() {
            alerta.classList.add("oculto");
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
        newid_vehiculo.trim() === "" || newid_rol.trim() === "0") {
        const alerta = document.getElementById("alerta");
        alerta.classList.remove("oculto");
        setTimeout(function() {
            alerta.classList.add("oculto");
        }, 3000);
        return;
    }

    if (!/^\d+$/.test(newTelefono) || !/^\d+$/.test(newCedula)) {
        const alerta = document.getElementById("alerta5");
        alerta.classList.remove("oculto");
        setTimeout(function() {
            alerta.classList.add("oculto");
        }, 3000);
        return;
    }


    if (!validarCorreo(newCorreo)) {
        const alerta = document.getElementById("alerta3");
        alerta.classList.remove("oculto");
        setTimeout(function() {
            alerta.classList.add("oculto");
        }, 3000);
        return;
    }

    if (newid_vehiculo !== newid_vehiculo.toUpperCase()) {
        const alerta = document.getElementById("alerta4");
        alerta.classList.remove("oculto");
        setTimeout(function() {
            alerta.classList.add("oculto");
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
                            setTimeout(function() {
                                alerta.classList.add("oculto");
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

function limpiartodo3() {
    const newTitulo = document.getElementById("Rtitulo");
    const newDescripcion = document.getElementById("Rdescripcion");
    const newValor = document.getElementById("Rvalor");
    const newDuracion = document.getElementById("Rduracion");

    newTitulo.value = "";
    newDescripcion.value = "";
    newValor.value = "";
    newDuracion.value = "";
}
// limpiar fin

// eliminar usuario y vehiculo
function eliminarusuario(Usuario) {
    fetch(`fronted/eliminarUS/${Usuario}`, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(data => {
            console.log(data.message);
            window.alert("Usuario eliminado");
            location.reload();
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function deletearUS() {
    let Usuario = usuarioaDEL;
    eliminarusuario(Usuario);
}
// eliminar usuario y vehiculo fin

//verficar usuario a borrar
function verificarUSaDL() {
    axios.get('fronted/verifyusuario', {
            responseType: 'json'
        })
        .then(function(response) {
            let datos = response.data;
            const nombrecillo = document.getElementById("Dusuario").value;
            const contra = document.getElementById("Dcontra").value;
            let carrito = "";
            for (let i = 1; i <= Object.keys(datos).length; i++) {
                if (nombrecillo.trim() === "" || contra.trim() === "") {
                    const alerta = document.getElementById("alerta");
                    alerta.classList.remove("oculto");
                    alerta.classList.add("alerta-campo-vacio3");
                    setTimeout(function() {
                        alerta.classList.add("oculto");
                        alerta.classList.remove("alerta-campo-vacio3");
                    }, 3000);
                    return;
                }
                if (datos[i].nombreu == nombrecillo && datos[i].password == contra) {
                    let dnombre = document.getElementById("USpaDEL");
                    let dvehi = document.getElementById("VHpaDEL");
                    dnombre.innerHTML = `<label id="USpaDEL">${datos[i].nombre}-${datos[i].apellido}</label>`;
                    dvehi.innerHTML = `<label id="VHpaDEL">${datos[i].matricula}</label>`;
                    usuarioaDEL = datos[i].nombreu;
                    mostrarconfirdeleteUS();
                    return;
                }
            }
            window.alert("Usuario Inexistente");
        })
        .catch(function(error) {
            console.error('Error al obtener los datos:', error);
        });
}

//verficar usuario a borrar fin

// guardarpaquetes 
function guardar_paqueteAJ() {
    var duracionRegex = /^(?:[01]\d|2[0-3]):(?:[0-5]\d):(?:[0-5]\d)$/;
    var duracionMaxima = "01:59:59";
    const newNombre = document.getElementById("Rtitulo").value;
    const newDescripcion = document.getElementById("Rdescripcion").value;
    const newValor = document.getElementById("Rvalor").value;
    const newDuracion = document.getElementById("Rduracion").value;
    console.log(newNombre, newDescripcion, newValor, newDuracion);

    if (newNombre.trim() === "" || newDescripcion.trim() === "" || newValor.trim() === "" || newDuracion.trim() === "") {
        console.log("Debe llenarse todos los campos");
        const alerta = document.getElementById("alerta");
        alerta.classList.remove("oculto");
        alerta.classList.add("alerta-campo-vacio3");
        setTimeout(function() {
            alerta.classList.add("oculto");
            alerta.classList.remove("alerta-campo-vacio3");
        }, 3000);
        return;
    }

    if (!/^\d+$/.test(newValor)) {
        const alerta = document.getElementById("alerta9");
        alerta.classList.remove("oculto");
        setTimeout(function() {
            alerta.classList.add("oculto");
        }, 3000);
        return;
    }

    if (/[a-zA-Z]/.test(newDuracion)) {
        const alerta = document.getElementById("alerta7");
        alerta.classList.remove("oculto");
        setTimeout(function() {
            alerta.classList.add("oculto");
        }, 3000);
        return;
    }

    if (!duracionRegex.test(newDuracion) || newDuracion > duracionMaxima) {
        const alerta = document.getElementById("alerta8");
        alerta.classList.remove("oculto");
        setTimeout(function() {
            alerta.classList.add("oculto");
        }, 3000);
        return;
    }

    axios.post('fronted/guardarpaquetes', {
            Nombre: newNombre,
            Descripcion: newDescripcion,
            Valor: newValor,
            Duracion: newDuracion
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
    limpiartodo3();
}
// guardarpaquetes fin

// probar consultas y asy
function DEL_PQ() {
    axios.get('fronted/consulpaquetes', {
            responseType: 'json'
        })
        .then(function(response) {
            let datos = response.data;
            const titulito = document.getElementById("Dpaquete").value;
            for (let i = 1; i <= Object.keys(datos).length; i++) {
                if (titulito.trim() === "") {
                    console.log("Debe llenarse todos los campos");
                    const alerta = document.getElementById("alerta");
                    alerta.classList.remove("oculto");
                    alerta.classList.add("alerta-campo-vacio3");
                    setTimeout(function() {
                        alerta.classList.add("oculto");
                        alerta.classList.remove("alerta-campo-vacio3");
                    }, 3000);
                    return;
                }

                if (datos[i].titulo == titulito) {
                    id = datos[i].id;
                    eliminarPQ(id);
                    window.alert("Paquete eliminado");
                    titulito.value = "";
                    return;
                }
            }
            window.alert("Paquete no encontrado");
        })
        .catch(function(error) {
            console.error('Error al obtener los datos:', error);
        });
}

// probar consultas y asy fin

// eliminar paquete 
function eliminarPQ(id) {
    fetch(`fronted/eliminarPQ/${id}`, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(data => {
            console.log(data.message);
            window.alert("paquete eliminado");
            location.reload();
        })
        .catch(error => {
            console.error('Error:', error);
        });
}
// eliminar paquete fin

// validar correo
function validarCorreo(correo) {
    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (regexCorreo.test(correo)) {
        return true;
    } else {
        return false;
    }
}
// validar correo fin

// mostrar matriculas  registradas
function ver_matriculasR() {
    axios.get('fronted/consulvehiculosPAG', {
        responseType: 'json'
    })

    .then(function(response) {
            let datos = response.data
            var length = (Object.keys(datos).length) + 1;
            let opciones = '';
            for (let index = 1; index < length; index++) {
                Matricula = datos[index].Matricula;
                opciones +=
                    `<li id="listH" class="list-group-item" onclick="copiar(Matricula)" value="${datos[index].Matricula}">>${datos[index].Matricula}</li>`;
            }
            remplazo.innerHTML = opciones;
        })
        .catch(function(error) {
            console.log(error);
        });
}
// mostrar matriculas  registradas fin

// copiar matriculas 
function copiar(Matricula) {
    let matricula = document.getElementById("Rmatricula2");
    matricula.value = Matricula;
}
// copiar matriculas fin