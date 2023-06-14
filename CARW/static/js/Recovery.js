const correo = document.getElementById("Email");
const telefono = document.getElementById("#cel");

// verificar el email de usuario 
function RecoveryCT(event) {
    event.preventDefault();
    axios.get('/fronted/consulRC', {
            responseType: 'json'
        })
        .then(function(response) {
            let datos = response.data
            let nombre = correo.value;
            let password = telefono.value;
            for (let i = 1; i <= Object.keys(datos).length; i++) {
                if (datos[i].email == nombre && datos[i].numero == password) {
                    let nuevaContraseña = Math.floor(1000 + Math.random() * 9000);
                    let Destinatario = datos[i].email;
                    axios.post('/fronted/actualizar_contraseña', {
                            Usuario: datos[i].nombreu,
                            Contraseña: nuevaContraseña
                        })
                        .then(function(response) {
                            enviarCorreo(nuevaContraseña, Destinatario);

                        })
                        .catch(function(error) {
                            window.alert("Algo salió mal");
                            console.log(error);
                        });
                    return;
                }
            }
            const alerta = document.getElementById("alerta");
            alerta.classList.remove("oculto");
            setTimeout(function() {
                alerta.classList.add("oculto");
            }, 3000);
            return;
        })
        .catch(function(error) {
            console.log(error);
        });
}
// verificar el email de usuario fin

// enviar al email la new contra
function enviarCorreo(nuevaContraseña, Destinatario) {
    const formData = new FormData();
    formData.append('destinatario', Destinatario);
    formData.append('asunto', 'Cambio de contraseña');
    formData.append('cuerpo', `Su nueva contraseña es ${nuevaContraseña}`);

    axios.post('/enviar_correo', formData)
        .then(function(response) {
            const alerta = document.getElementById("alerta2");
            alerta.classList.remove("oculto");
            setTimeout(function() {
                alerta.classList.add("oculto");
            }, 3000);
            return;
        })
        .catch(function(error) {
            window.alert('Error al enviar el correo');
            console.log(error);
        });
}
// enviar al email la new contra fin