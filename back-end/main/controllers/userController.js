const UserService = require('../services/userService');

const UserController = {};

UserController.findAll = (request, response) => {
    UserService.findAll((err, data) => {
        if (err) {
            response.status(500).send({ message: err.message || 'Não foram encontrados clientes cadastrados.' });
        } 
        else {
            response.send(data);
        }
    });
};

UserController.findById = (request, response) => {
    const id = request.params.id;
    
    UserService.findById(id, (err, data) => {
        if (err) {
            response.status(500).send({ message: err.message || 'Não foi encontrado cliente para o id informado.' });
        } 
        else if (!data) {
            response.status(404).send({ message: `Não foi encontrado cliente para o ID ${id}.` });  
        } 
        else {
            response.send(data);
        }
    });
};

UserController.create = (request, response) => {
    _validatePhone(response, request.body.phone);
    
    const user = {
        name: request.body.name,
        email : request.body.email,
        phone : request.body.phone,
    }
    
    UserService.create(user, (err, data) => {
        if (err) {
            response.status(500).send({ message: err.message || 'Não foi possível cadastrar um novo cliente.' });
        } 
        else {
            response.status(201).send(data);
        }
    });
};

UserController.update = (request, response) => {
    _validatePhone(response, request.body.phone);

    const id = request.params.id;
    
    const user = {
        name : request.body.name,
        email : request.body.email,
        phone : request.body.phone,
    }
    
    UserService.update(id, user, (err, data) => {
        if (err) {
            response.status(500).send({ message: err.message || 'Não foi possível atualizar o cliente informado.' });
        } 
        else if (!data) {
            response.status(404).send({ message: `Não foi encontrado cliente para o ID ${id}.` });
        }
        else {
            response.send(data);
        }
    });
};

UserController.delete = (request, response) => {
    const id = request.params.id;

    UserService.delete(id, (err, data) => {
        if (err) {
            response.status(500).send({ message: err.message || 'Não foi possível apagar o cliente informado.' });
        } 
        else if (!data) {
            response.status(404).send({ message: `Não foi encontrado cliente para o ID ${id}.` });
        } 
        else {
            response.send({ message: 'Cliente apagado com sucesso.' });
        }
    });
};

function _validatePhone(response, phone) {
    if (!phone.match(/^\d+$/)) {
        return response.status(400).send({ message: 'O campo telefone deve ser um valor númerico.' });
    }

    if (phone.length != 11) {
        return response.status(400).send({ message: 'O campo telefone deve ter 11 caracteres.' });
    }
}

module.exports = UserController;