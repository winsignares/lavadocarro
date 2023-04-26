const usuario = document.getElementById("nombre");
const contra = document.getElementById("contraseña");

function ingresar() {
    axios.get('consulusuario', {
            responseType: 'json'
        })
        .then(function(response) {
            let datos = response.data
            let nombreu = usuario.value;
            let password = contra.value;
            for (let i = 1; i <= Object.keys(datos).length; i++) {
                if (datos[i].nombreu == nombreu && datos[i].password == password) {
                    window.alert("esta chinga funciona we")
                    return;
                }
            }
            window.alert("Usuario o contraseña incorrectos");
        })
        .catch(function(error) {
            console.log(error);
        });
}