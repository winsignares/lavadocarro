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

function back_to_login() {
    window.location.href = '/';
    return;
}

function seleccionado(id) {
    localStorage.setItem('IDC', id);
    window.location.href = '/Pagos';
}