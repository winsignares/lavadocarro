const usuario = document.getElementById("nombre");
const contra = document.getElementById("contraseña");

function ingresar() {
    axios.get('consulusuario', {
            responseType: 'json'
        })
        .then()
}