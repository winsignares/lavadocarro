const usuario = document.getElementById("nombre");
const contra = document.getElementById("contraseña");

function ingresar() {
    axios.get('consulusuario', {
            responseType: 'json'
        })
        .then(function(response) {
            nombreu = usuario
            let datos = response.data
            if (datos.hasOwnProperty(nombreu.value) && datos[password.value] == contra.value) {
                window.alert("esta chinga funciona we")
            }

        })
        .catch(function(error) {
            console.log(error);
        });
}