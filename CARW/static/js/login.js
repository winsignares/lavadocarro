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
    axios.get('fronted/consulusuario', {
            responseType: 'json'
        })
        .then(function(response) {
            let datos = response.data
            let nombreu = usuario.value;
            let password = contra.value;
            for (let i = 1; i <= Object.keys(datos).length; i++) {
                if (datos[i].nombreu == nombreu && datos[i].password == password) {
                    window.location.href = '/Principal';
                    return;
                }
            }
            window.alert("Usuario o contraseña incorrectos");
        })
        .catch(function(error) {
            console.log(error);
        });
}