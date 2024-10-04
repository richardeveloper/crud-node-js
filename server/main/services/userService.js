const User = require('../models/userModel');

const UserService = {};

UserService.findAll = (callback) => {
    User.findAll((err, data) => {
        if (err) {
            callback(err, null);
        } 
        else {
            callback(null, data);
        }
    });
};

UserService.findById = (id, callback) => {
    User.findById(id, (err, data) => {
        if (err) {
            callback(err, null);
        } 
        else {
            callback(null, data);
        }
    });
};

UserService.create = (productData, callback) => {
    User.create(productData, (err, data) => {
        if (err) {
            callback(err, null);
        } 
        else {
            callback(null, data);
        }
    });
};

UserService.update = (id, productData, callback) => {
    User.update(id, productData, (err, data) => {
        if (err) {
            callback(err, null);
        } 
        else {
            callback(null, data);
        }
    });
};

UserService.delete = (id, callback) => {
    User.delete(id, (err, data) => {
        if (err) {
            callback(err, null);
        } 
        else {
            callback(null, data);
        }
    });
};

module.exports = UserService;