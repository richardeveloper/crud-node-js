const apiUrl = 'http://localhost:3000/api/user'

function findAllProducts() {
    fetch(apiUrl)
    .then(response => response.json())
    .then(users => {
        const table = document.getElementById('table');
        table.innerHTML = '';

        users.forEach(user => {
            const tr = document.createElement('tr');
            
            const phone = _applyMaskPhone(user.phone);

            tr.innerHTML = `
                <td class="text-center">${user.id}</td>
                <td class="text-center">${user.name}</td>
                <td class="text-center">${user.email}</td>
                <td class="text-center">${phone}</td>
                <td>
                    <div class="d-flex justify-content-center">
                        <button class="btn btn-primary mx-1" onclick="editUser(${user.id}, '${user.name}', '${user.email}', '${phone}')">
                            <i class="fa fa-pencil" aria-hidden="true"></i>
                        </button>
                        <button class="btn btn-danger mx-1" onclick="deleteUser(${user.id})">
                            <i class="fa fa-trash" aria-hidden="true"></i>
                        </button>
                    </div>
                </td>
            `; 

            table.append(tr);
        });
    })
    .catch(error => {
        console.error('Ocorreu um erro ao buscar clientes: ', error)
        ToastUtils.showErrorToast('Desculpe, ocorreu um erro ao buscar clientes.');
    });
};

function createOrUpdateUser(event) {
    event.preventDefault();

    const id = document.getElementById('id').value;
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = _removeMaskPhone(document.getElementById('phone').value);

    if (!phone.match(/^\d+$/)) {
        ToastUtils.showWarningToast('O número do celular conter apenas números.')
        return;
    }

    if (phone.length != 11) {
        ToastUtils.showWarningToast('O número do celular deve conter 11 digítos.')
        return;
    }

    const user = {
        name: name,
        email: email,
        phone: phone
    }

    const method = id ? 'PUT' : 'POST';
    const url = id ? apiUrl + '/' + id : apiUrl;

    fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    .then(response => {
        console.log(response);
    })
    .then(() => {
        findAllProducts();
        _clearForm();
        
        message = method === 'POST' 
            ? 'Cliente cadastrado com sucesso.' 
            : 'Cliente atualizado com sucesso.';

        ToastUtils.showSuccessToast(message);
    })
    .catch(error => {
        console.error('Ocorreu um erro ao salvar cliente:', error);
        ToastUtils.showErrorToast('Desculpe, ocorreu um erro ao salvar cliente.');
    });
}

function editUser(id, name, email, phone) {
    document.getElementById('id').value = id;
    document.getElementById('name').value = name;
    document.getElementById('email').value = email;
    document.getElementById('phone').value = phone;
    document.getElementById('save-btn').textContent = 'Salvar';
    document.getElementById('cancel-btn').style.display = 'inline';
}

function deleteUser(id) {
    if (confirm('Deseja mesmo excluir este cliente ?')) {
        fetch(apiUrl + '/' + id, {
            method: 'DELETE'
        })
        .then(() => {
            findAllProducts();
            ToastUtils.showSuccessToast('Cliente apagado com sucesso.');
        });
    }
}

function cancelEdit() {
    _clearForm();
}

function _clearForm() {
    document.getElementById('id').value = '';
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('save-btn').textContent = 'Cadastrar';
    document.getElementById('cancel-btn').style.display = 'none';
}

function _applyMaskPhone(phone) {
    const ddd = phone.substring(0, 2);
    const first = phone.substring(2, 7);
    const second = phone.substring(7, phone.length);

    return `(${ddd}) ${first}-${second}`;
}

function _removeMaskPhone(phone) {
    const ddd = phone.substring(1, 3);
    const first = phone.substring(5, 10);
    const second = phone.substring(11, phone.length);

    return ddd + first + second;
}

document.addEventListener('DOMContentLoaded', findAllProducts);