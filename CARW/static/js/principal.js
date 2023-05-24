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

function seleccionado(id) {
    localStorage.setItem('IDC', id);
    window.location.href = '/Pagos';
}