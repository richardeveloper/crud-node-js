function applyMaskPhone(event) {
    let value = this.value.replace(/\D/g, '');

    switch (value.length) {
        case 1:
            value = value.replace(/^(\d{1})$/, '($1');
            break;
        case 2:
            value = value.replace(/^(\d{2})$/, '($1)');
            break;
        case 3:
            value = value.replace(/^(\d{2})(\d{1})$/, '($1) $2');
            break;
        case 4:
            value = value.replace(/^(\d{2})(\d{2})$/, '($1) $2');
            break;
        case 5:
            value = value.replace(/^(\d{2})(\d{3})$/, '($1) $2');
            break;
        case 6:
            value = value.replace(/^(\d{2})(\d{4})$/, '($1) $2');
            break;
        case 7:
            value = value.replace(/^(\d{2})(\d{5})$/, '($1) $2-');
            break;
        case 8:
            value = value.replace(/^(\d{2})(\d{5})(\d{1})$/, '($1) $2-$3');
            break;
        case 9:
            value = value.replace(/^(\d{2})(\d{5})(\d{2})$/, '($1) $2-$3');
            break;
        case 10:
            value = value.replace(/^(\d{2})(\d{5})(\d{3})$/, '($1) $2-$3');
            break;
        case 11:
            value = value.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
            break;
        default:
            break;
    }

    this.value = value;
}

document.addEventListener('DOMContentLoaded', () => {
    const inputPhone = document.getElementById('phone');
    inputPhone.addEventListener('input', applyMaskPhone);
})