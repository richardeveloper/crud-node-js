function showSuccessToast(message) {
    _disposeToast();
    _resetToast();
    _fillToast('bg-success', 'Sucesso', message);
    _showToast();
}

function showErrorToast(message) {
    _disposeToast();
    _resetToast();
    _fillToast('bg-danger', 'Erro', message);
    _showToast();
}

function showWarningToast(message) {
    _disposeToast();
    _resetToast();
    _fillToast('bg-warning', 'Aviso', message);
    _showToast();
}

function _disposeToast() {
    $("#toast").toast("dispose");
}

function _showToast() {
    $("#toast").toast("show");
}

function _fillToast(background, title, message) {
    document.getElementById('toast').classList.add(background);
    document.getElementById('toast-header').classList.add(background);
    document.getElementById('toast-title-header').textContent = title;
    document.getElementById('toast-title-body').textContent = message;
}

function _resetToast() {
    document.getElementById('toast').classList.remove('bg-success', 'bg-danger', 'bg-warning');
    document.getElementById('toast-header').classList.remove('bg-success', 'bg-danger', 'bg-warning');
    document.getElementById('toast-title-header').textContent = '';
    document.getElementById('toast-title-body').textContent = '';
}

window.ToastUtils = {
    showSuccessToast,
    showWarningToast,
    showErrorToast
};