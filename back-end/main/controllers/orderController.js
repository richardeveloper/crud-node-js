const OrderService = require('../services/orderService');

const OrderController = {};

OrderController.findAll = (request, response) => {
    OrderService.findAll((err, data) => {
        if (err) {
            response.status(500).send({ message: err.message || 'Não foram encontrados pedidos cadastrados.' });
        } else {
            response.send(data);
        }
    });
};

OrderController.findById = (request, response) => {
    const id = request.params.id;
    
    OrderService.findById(id, (err, data) => {
        if (err) {
            response.status(500).send({ message: err.message || 'Não foi possível encontrar o pedido informado.' });
        } 
        else if (!data) {
            response.status(404).send({ message: `Não foi encontrado pedido para o ID ${id}.` });
        } 
        else {
            response.send(data);
        }
    });
};

OrderController.create = (request, response) => {
    _validateDate(response, request.body.date);    
    _validateQuantity(response, request.body.quantity);    

    _validateProduct(request.body.productId, (err, product) => {
        if (err) {
            return response.status(err.status).send(err.error);
        }

        _validateUser(request.body.userId, (err, user) => {
            if (err) {
                return response.status(err.status).send(err.error);
            }
            
            const order = {
                date: request.body.date,
                productCode : product.code,
                userId : user.id,
                quantity : request.body.quantity,
            }
        
            OrderService.create(order, (err, data) => {
                if (err) {
                    response.status(500).send({ message: err.message || 'Não foi possível cadastrar um novo pedido.' });
                } 
                else {
                    response.send(data);
                }
            });
        });
    });
};

OrderController.update = (request, response) => {
    _validateDate(response, request.body.date);    
    _validateQuantity(response, request.body.quantity);    

    const id = request.params.id;
    
    const order = {
        quantity : request.body.quantity,
    }
    
    OrderService.update(id, order, (err, data) => {
        if (err) {
            response.status(500).send({ message: err.message || 'Não foi possível atualizar o pedido informado.' });
        } 
        else {
            response.send(data);
        }
    });
};

OrderController.delete = (request, response) => {
    const id = request.params.id;

    OrderService.delete(id, (err, data) => {
        if (err) {
            response.status(500).send({message: err.message || 'Não foi possível apagar o pedido informado.'});
        } 
        else if (!data) {
            response.status(404).send({ message: `Não foi encontrado pedido para o ID ${id}.` });
        } 
        else {
            response.send({ message: 'Pedido apagado com sucesso.' });
        }
    });
};

function _validateProduct(productId, callback) {
    const ProductService = require('../services/productService');
    ProductService.findById(productId, (err, data) => {
        if (err) {
            return callback({ status: 500, error: { message: 'Não foi possível encontrar o produto informado.' } });
        } 
        else if (!data) {
            return callback({ status: 404, error: { message: `Não foi encontrado produto para o ID ${productId}.` } });
        }
        else {
            callback(null, data);
        }
    });
}

async function _validateUser(userId, callback) {
    const UserService = require('../services/userService');
    UserService.findById(userId, (err, data) => {
        if (err) {
            return callback({ status: 500, error: { message: 'Não foi possível encontrar o cliente informado.' } });
        } 
        else if (!data) {
            return callback({ status: 404, error: { message: `Não foi encontrado cliente para o ID ${userId}.` } });
        }
        else {
            callback(null, data);
        }
    });
}

function _validateDate(response, date) {
    if (!date.match(/^\d{2}\/\d{2}\/\d{4}$/)) {
        return response.status(400).send({ message: 'O campo data deve ser inserido no formato dd/MM/yyyy.' });
    } 
}

function _validateQuantity(response, quantity) {
    if (quantity < 1) {
        return response.status(400).send({ message: 'O campo quantidade deve ser maior que zero.' });
    }
}

module.exports = OrderController;