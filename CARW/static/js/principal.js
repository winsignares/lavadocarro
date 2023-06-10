function mostrar() {
    document.getElementById('sidebar').classList.toggle('active');
}

function gopredeterminados() {
    window.location.href = '/Ppredeterminados';
    return;
}

function goeditables() {
    window.location.href = '/Peditables';
    return;
}

function gopagos() {
    window.location.href = '/Pagos';
    return;
}

function goturnos() {
    window.location.href = '/Turnos';
    return;
}

function gobalances() {
    window.location.href = '/Balances';
    return;
}

function goajustes() {
    window.location.href = '/Ajustes';
    return;
}

function gorecovery() {
    window.location.href = '/Recovery';
    return;
}

function backtologin() {
    let ROL = "0";
    const data = new FormData();
    data.append('rol', ROL);
    axios.post('/verificar_usuario', data)
        .then(function(response) {
            sessionStorage.removeItem('userROL');
            window.location.href = "/";
            // Reemplazar la URL actual en el historial del navegador
            history.replaceState(null, '', '/');
        })
        .catch(function(error) {
            window.alert("Algo salió mal");
            console.log(error);
        });
}

function seleccionado(id) {
    localStorage.setItem('IDC', id);
    window.location.href = '/Pagos';
}