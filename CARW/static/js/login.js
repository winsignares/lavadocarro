const usuario = document.getElementById("nombre");
const contra = document.getElementById("contraseña");

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
                    window.location.href = "{{url_for('templates', filename='main/Principal.html')}}";
                    return;
                }
            }
            window.alert("Usuario o contraseña incorrectos");
        })
        .catch(function(error) {
            console.log(error);
        });
}