const apiUrl = 'http://localhost:3000/api/product'

function findAllProducts() {
    fetch(apiUrl)
    .then(response => response.json())
    .then(products => {
        const table = document.getElementById('table');
        table.innerHTML = '';

        products.forEach(product => {
            const tr = document.createElement('tr');

            const price = _applyMaskMoney(product.price);
            
            tr.innerHTML = `
                <td class="text-center">${product.id}</td>
                <td class="text-center">${product.code}</td>
                <td class="text-center">${product.name}</td>
                <td class="text-center">${price}</td>
                <td>
                    <div class="d-flex justify-content-center">
                        <button class="btn btn-primary mx-1" onclick="editProduct(${product.id}, '${product.code}', '${product.name}', ${product.price})">
                            <i class="fa fa-pencil" aria-hidden="true"></i>
                        </button>
                        <button class="btn btn-danger mx-1" onclick="deleteProduct(${product.id})">
                            <i class="fa fa-trash" aria-hidden="true"></i>
                        </button>
                    </div>
                </td>
            `; 

            table.append(tr);
        });
    })
    .catch(error => {
        console.error('Ocorreu um erro ao buscar os produtos: ', error);
        ToastUtils.showErrorToast('Desculpe, ocorreu um erro ao buscar os produtos.');
    });
};

function createOrUpdateProduct(event) {
    event.preventDefault();
    
    const id = document.getElementById('id').value;
    const code = document.getElementById('code').value;
    const name = document.getElementById('name').value;
    const price = parseFloat(document.getElementById('price').value).toFixed(2);

    const product = {
        code: code,
        name: name,
        price: price
    }

    const method = id ? 'PUT' : 'POST';
    const url = id ? apiUrl + '/' + id : apiUrl;

    fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
    })
    .then(response => response.json())
    .then(() => {
        _clearForm();
        findAllProducts();

        message = method === 'POST' 
            ? 'Produto cadastrado com sucesso.' 
            : 'Produto atualizado com sucesso.';
            
        ToastUtils.showSuccessToast(message);
    })
    .catch(error => { 
        console.error('Ocorreu um erro ao criar um novo produto:', error);
        ToastUtils.showErrorToast('Desculpe, ocorreu um erro ao criar um novo produto.');
        
    });
}

function editProduct(id, code, name, price) {
    document.getElementById('id').value = id;

    document.getElementById('code').value = code;
    document.getElementById('code').setAttribute('disabled', true);

    document.getElementById('name').value = name;
    document.getElementById('price').value = price;
    document.getElementById('save-btn').textContent = 'Salvar';
    document.getElementById('cancel-btn').style.display = 'inline';
}

function deleteProduct(id) {
    if (confirm('Deseja mesmo excluir este produto ?')) {
        fetch(apiUrl + '/' + id, {
            method: 'DELETE'
        })
        .then(() => {
            findAllProducts();
            ToastUtils.showSuccessToast('Produto apagado com sucesso.');
        });
    }
}

function cancelEdit() {
    _clearForm();
}

function _clearForm() {
    document.getElementById('id').value = '';
    document.getElementById('name').value = '';
    document.getElementById('code').value = '';
    document.getElementById('code').removeAttribute('disabled');
    document.getElementById('price').value = '';
    document.getElementById('save-btn').textContent = 'Cadastrar';
    document.getElementById('cancel-btn').style.display = 'none';
}

function _applyMaskMoney(value) {
    value = value.toString().replace('.', ',');

    return `R$ ${value}`;
}

document.addEventListener('DOMContentLoaded', findAllProducts);