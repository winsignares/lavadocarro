const IDC = "1";

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

function seleccionado(id) {
    console.log("ID seleccionado:", id);
    const IDC = id;
    localStorage.setItem('IDC', IDC);
    window.location.href = '/Pagos';
    window.alert(IDC);
}