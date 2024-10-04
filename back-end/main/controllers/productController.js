const ProductService = require('../services/productService');

const ProductController = {};

ProductController.findAll = (request, response) => {
    ProductService.findAll((err, data) => {
        if (err) {
            response.status(500).send({
                message: err.message || 'Não foram encontrados produtos cadastrados.'
            });
        } else {
            response.send(data);
        }
    });
};

ProductController.findById = (request, response) => {
    const id = request.params.id;
    
    ProductService.findById(id, (err, data) => {
        if (err) {
            response.status(500).send({ message: err.message || 'Não foi possível encontrar o produto informado.' });
        } 
        else if (!data) {
            response.status(404).send({ message: `Não foi encontrado produto para o ID ${id}.` });  
        } 
        else {
            response.send(data);
        }
    });
};

ProductController.findByCode = (request, response) => {
    const code = request.params.code;
    
    ProductService.findByCode(code, (err, data) => {
        if (err) {
            response.status(500).send({ message: err.message || 'Não foi possível encontrar o pedido informado.' });
        } 
        else if (!data) {
            response.status(404).send({ message: `Não foi encontrado pedido para o código ${code}.` });
        } 
        else {
            response.send(data);
        }
    });
};

ProductController.create = (request, response) => {
    _validatePrice(response, request.body.price);
    
    // if (isNaN(parseFloat(request.body.price))) {
    //     return response.status(400).send({ message: 'O campo preço deve ser um valor númerico.' });
    // }
    
    // if (parseFloat(request.body.price) < 1) {
    //     return response.status(400).send({ message: 'O campo preço deve ser maior que zero.' });
    // }

    const product = {
        code: request.body.code,
        name : request.body.name,
        price : request.body.price,
    }
    
    ProductService.create(product, (err, data) => {
        if (err) {
            response.status(500).send({ message: err.message || 'Não foi possível cadastrar um novo produto.' });
        } 
        else {
            response.send(data);
        }
    });
};

ProductController.update = (request, response) => {
    _validatePrice(response, request.body.price);

    const id = request.params.id;
    
    const product = {
        code : request.body.code,
        name : request.body.name,
        price : request.body.price,
    }
    
    ProductService.update(id, product, (err, data) => {
        if (err) {
            response.status(500).send({ message: err.message || 'Não foi possível atualizar o produto informado.' });
        }
        else if (!data) {
            response.status(404).send({ message: `Não foi encontrado produto para o ID ${id}.` });  
        } 
        else {
            response.send(data);
        }
    });
};

ProductController.delete = (request, response) => {
    const id = request.params.id;

    ProductService.delete(id, (err, data) => {
        if (err) {
            response.status(500).send({ message: err.message || 'Não foi possível apagar o produto informado.' });
        } 
        else if (!data) {
            response.status(404).send({ message: `Não foi encontrado produto para o ID ${id}.` });  
        } 
        else {
            response.send({ message: 'Produto apagado com sucesso.' });
        }
    });
};

function _validatePrice(response, price) {
    if (isNaN(parseFloat(price))) {
        return response.status(400).send({ message: 'O campo preço deve ser um valor númerico.' });
    }
    
    if (parseFloat(price) < 1) {
        return response.status(400).send({ message: 'O campo preço deve ser maior que zero.' });
    }
}

module.exports = ProductController;