const correo = document.getElementById("Email");
const telefono = document.getElementById("#cel");

// verificar el email de usuario 
function RecoveryCT() {
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
                    axios.post('/fronted/actualizar_contraseña', {
                            Usuario: datos[i].nombreu,
                            Contraseña: nuevaContraseña
                        })
                        .then(function(response) {
                            window.alert(response.data.mensaje);
                            enviarCorreo();
                        })
                        .catch(function(error) {
                            window.alert("Algo salió mal");
                            console.log(error);
                        });
                    return;
                }
            }
            window.alert("Email o Telefono incorrectos");
        })
        .catch(function(error) {
            console.log(error);
        });
}
// verificar el email de usuario fin

function enviarCorreo() {
    var destinatario = correo.value;
    var asunto = "Cambio de contraseña";
    var cuerpo = "Esta será su nueva contraseña asignada: " + nuevaContraseña;

    $.ajax({
        url: '/enviar_correo',
        method: 'POST',
        data: {
            destinatario: destinatario,
            asunto: asunto,
            cuerpo: cuerpo
        },
        success: function(response) {
            console.log(response);
            window.alert("revisa tu Email");
        },
        error: function(error) {
            console.error(error);
            // Aquí puedes manejar errores en la solicitud AJAX
        }
    });
}