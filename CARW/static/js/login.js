const usuario = document.getElementById("nombre");
const contra = document.getElementById("contraseña");

// verificar el usuario 
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
// verificar el usuario fin

// mirar y ocultar contraseña 
function togglePasswordVisibility() {
    var contraseñaInput = document.getElementById('contraseña');
    var mostrarOcultarIcono = document.getElementById('mostrar-ocultar');

    if (contraseñaInput.type === 'password') {
        contraseñaInput.type = 'text';
        mostrarOcultarIcono.innerHTML = '<i class="fas fa-eye"></i>';
    } else {
        contraseñaInput.type = 'password';
        mostrarOcultarIcono.innerHTML = '<i class="fas fa-eye-slash"></i>';
    }
}
// mirar y ocultar contraseña fin