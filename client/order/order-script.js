const apiUrl = 'http://localhost:3000/api/order'

function findAllOrders() {
    fetch(apiUrl)
    .then(response => response.json())
    .then(orders => {
        const table = document.getElementById('table');
        table.innerHTML = '';

        orders.forEach(order => {
            const tr = document.createElement('tr');
            
            tr.innerHTML = `
                <td class="text-center">${order.id}</td>
                <td class="text-center">${order.date}</td>
                <td class="text-center">
                    <a href="../product/product.html">
                        ${order.productCode}
                    </a>
                </td>
                <td class="text-center">
                    <a href="../user/user.html">
                        ${order.userId}
                    </a>
                </td>
                <td class="text-center">${order.quantity}</td>
                <td>
                    <div class="d-flex justify-content-center">
                        <button class="btn btn-primary mx-1" onclick="editOrder(${order.id}, '${order.date}', '${order.productCode}', ${order.userId}, ${order.quantity})">
                            <i class="fa fa-pencil" aria-hidden="true"></i>
                        </button>
                        <button class="btn btn-danger mx-1" onclick="deleteOrder(${order.id})">
                            <i class="fa fa-trash" aria-hidden="true"></i>
                        </button>
                    </div>
                </td>
            `; 

            table.append(tr);
        });
    })
    .catch(error => {
        console.error('Ocorreu um erro ao buscar pedidos: ', error);
        ToastUtils.showErrorToast('Desculpe, ocorreu um erro ao buscar pedidos.');
    });
};

async function createOrUpdateOrder(event) {
    event.preventDefault(); 

    const id = document.getElementById('id').value;
    const date = document.getElementById('date').value;
    const productCode = document.getElementById('productCode').value;
    const userId = document.getElementById('userId').value;
    const quantity = document.getElementById('quantity').value;

    if (!date.match(/^\d{2}\/\d{2}\/\d{4}$/)) {
        ToastUtils.showWarningToast('A data deve ser inserida no formato dd/mm/yyyy.');
        return;
    }

    const product = await _validateProductByCode(productCode);
    const user = await _validateUserById(userId);

    if (!product) {
        ToastUtils.showWarningToast('Não foi encontrado produto para o código informado.');
        return;
    }

    if (!user) {
        ToastUtils.showWarningToast('Não foi encontrado cliente para o código informado.');
        return;
    }

    const order = {
        date: date,
        productId: product.id,
        userId: user.id,
        quantity: quantity
    }

    const method = id ? 'PUT' : 'POST';
    const url = id ? apiUrl + '/' + id : apiUrl;

    fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(order)
    })
    .then(response => response.json())
    .then(() => {
        _clearForm();
        findAllOrders();

        message = method === 'POST' 
            ? 'Pedido cadastrado com sucesso.' 
            : 'Pedido atualizado com sucesso.';
        
        ToastUtils.showSuccessToast(message);
    })
    .catch(error => {
        console.error('Ocorreu um erro ao criar um novo pedido: ', error);
        ToastUtils.showErrorToast('Desculpe, ocorreu um erro ao criar um novo pedido.');
    });
}

function editOrder(id, date, productCode, userId, quantity) {
    document.getElementById('id').value = id;
    document.getElementById('date').value = date;

    document.getElementById('productCode').value = productCode;
    document.getElementById('productCode').setAttribute('disabled', true);

    document.getElementById('userId').value = userId;
    document.getElementById('userId').setAttribute('disabled', true);
    
    document.getElementById('quantity').value = quantity;
    document.getElementById('save-btn').textContent = 'Salvar';
    document.getElementById('cancel-btn').style.display = 'inline';
}

function deleteOrder(id) {
    if (confirm('Deseja mesmo excluir este pedido ?')) {
        fetch(apiUrl + '/' + id, {
            method: 'DELETE'
        })
        .then(() => {
            findAllOrders();
            ToastUtils.showSuccessToast('Pedido apagado com sucesso.')
        });
    }
}

function cancelEdit() {
    _clearForm();
}

function _clearForm() {
    document.getElementById('id').value = '';
    document.getElementById('date').value = '';
    document.getElementById('productCode').value = '';
    document.getElementById('productCode').removeAttribute('disabled');
    document.getElementById('userId').value = '';
    document.getElementById('userId').removeAttribute('disabled');
    document.getElementById('quantity').value = '';
    document.getElementById('save-btn').textContent = 'Cadastrar';
    document.getElementById('cancel-btn').style.display = 'none';
}

async function _validateUserById(id) {
    const url = 'http://localhost:3000/api/user'

    try {
        const response = await fetch(url + '/' + id);
        if (!response.ok) {
            return null;
        }
        const user = await response.json();
        return user; 
    } 
    catch (error) {
        return null;
    }
}

async function _validateProductByCode(code) {
    const url = 'http://localhost:3000/api/product/code'

    try {
        const response = await fetch(url + '/' + code);
        if (!response.ok) {
            return null;
        }
        const product = await response.json();
        return product;
    } 
    catch (error) {
        return null;
    }
}

document.addEventListener('DOMContentLoaded', findAllOrders);