const usuario = document.getElementById("nombre");
const contra = document.getElementById("contraseña");

function ingresar2() {
    axios.get('consulusuario', {
            responseType: 'json'
        })
        .then(function(response) {
            let datos = response.data
            if (nombreu in datos == usuario && password in datos == contra) {
                window.alert("esta chinga funciona we")
            }

        })

    .catch(function(error) {
        console.log(error);
    });
}

function ingresar() {
    axios.get('consulusuario', {
            responseType: 'json'
        })
        .then(function(response) {
            let datos = response.data
            if (datos.hasOwnProperty(usuario.value) && datos[usuario.value] == contra.value) {
                window.alert("esta chinga funciona we")
            }

        })
        .catch(function(error) {
            console.log(error);
        });
}