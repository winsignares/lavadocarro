const correo = document.getElementById("Email");
const telefono = document.getElementById("#cel");

// verificar el email de usuario 
function RecoveryCT() {
    axios.get('/fronted/consulRC', {
            responseType: 'json'
        })
        .then(function(response) {
            let datos = response.data;
            let nombre = correo.value;
            let password = telefono.value;
            for (let i = 1; i <= Object.keys(datos).length; i++) {
                if (datos[i].email === nombre && datos[i].numero === password) {
                    let nuevaContraseña = Math.floor(1000 + Math.random() * 9000);
                    axios.post('fronted/actualizar_contraseña', {
                            Usuario: datos[i].nombreu,
                            Contraseña: nuevaContraseña
                        })
                        .then(function(response) {
                            console.log(response.data.mensaje);
                            window.alert("Contraseña actualizada revisa tu correo");
                        })
                        .catch(function(error) {
                            console.log(error);
                        });

                    return;
                }
            }
            window.alert("Correo o Teléfono incorrectos");
        })
        .catch(function(error) {
            console.log(error);
        });
}
// verificar el email de usuario fin