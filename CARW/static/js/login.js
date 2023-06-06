const usuario = document.getElementById("nombre");
const contra = document.getElementById("contraseña");

function ingresar() {
    axios.get('fronted/consulusuariolG', {
            responseType: 'json'
        })
        .then(function(response) {
            let datos = response.data
            let nombre = usuario.value;
            let password = contra.value;
            for (let i = 1; i <= Object.keys(datos).length; i++) {
                if (datos[i].nombreu == nombre && datos[i].password == password) {
                    window.alert(datos[i].rol);
                    return;
                }
            }
            window.alert("Usuario o contraseña incorrectos");
        })
        .catch(function(error) {
            console.log(error);
        });
}

function ingresar2() {
    var nombre = document.getElementById("nombre").value;
    var contrasena = document.getElementById("contraseña").value;

    var data = {
        nombre: nombre,
        contraseña: contrasena
    };

    axios.post('/verificar_usuario', data)
        .then(function(response) {
            window.location.replace('/principal');
        })
        .catch(function(error) {
            window.alert("Usuario o contraseña incorrectos");
            console.log(error);
        });
}

function ingresar3() {
    axios.get('fronted/consulusuariolG', {
            responseType: 'json'
        })
        .then(function(response) {
            let datos = response.data
            let nombre = usuario.value;
            let password = contra.value;
            for (let i = 1; i <= Object.keys(datos).length; i++) {
                if (datos[i].nombreu == nombre && datos[i].password == password) {
                    let ROL = datos[i].rol;
                    const data = new FormData();
                    data.append('rol', ROL);
                    axios.post('/verificar_usuario', data)
                        .then(function(response) {
                            window.location.replace('/Principal');
                        })
                        .catch(function(error) {
                            window.alert("algo esta mal");
                            console.log(error);
                        });
                    return;
                }
            }
            window.alert("Usuario o contraseña incorrectos");
        })
        .catch(function(error) {
            console.log(error);
        });
}