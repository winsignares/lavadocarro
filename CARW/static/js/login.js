const usuario = document.getElementById("nombre");
const contra = document.getElementById("contraseña");

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
                    window.location.replace('/Principal');
                    return;
                }
            }
            window.alert("Usuario o contraseña incorrectos");
        })
        .catch(function(error) {
            console.log(error);
        });
}