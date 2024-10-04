function applyMaskDate(event) {
    let value = this.value.replace(/\D/g, '');

    if (value.length === 1) {
        value = value.replace(/^(\d{1})$/, '$1');
    }
    else if (value.length === 2) {
        value = value.replace(/^(\d{2})$/, '$1/');
    }
    else if (value.length === 3) {
        value = value.replace(/^(\d{2})(\d{1})$/, '$1/$2');
    }
    else if (value.length >= 4) {
        value = value.replace(/^(\d{2})(\d{2})(\d{0,4})$/, '$1/$2/$3');
    }

    this.value = value;
}

document.addEventListener('DOMContentLoaded', () => {
    const inputDate = document.getElementById('date');
    inputDate.addEventListener('input', applyMaskDate);
})