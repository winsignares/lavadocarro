const usuario = document.getElementById("nombre");
const contra = document.getElementById("contraseña");

function updateSessionValue(newValue) {
    fetch('/update_session', {
            method: 'POST',
            body: JSON.stringify({ 'new_value': newValue }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error))
}

function ingresar() {
    let nombreu = document.getElementById('nombre').value;
    let password = document.getElementById('contraseña').value;

    axios.post('/verificar_credenciales', { usuario: nombreu, contrasena: password })
        .then(function(response) {
            let resultado = response.data;
            if (resultado.success) {
                updateSessionValue('aprovado');
                sessionStorage.setItem('rol', resultado.id_rol);
                window.location.href = '/Principal';
            } else {
                window.alert("Usuario o contraseña incorrectos");
            }
        })
        .catch(function(error) {
            console.log(error);
        });
}