const Product = require('../models/productModel');

const ProductService = {};

ProductService.findAll = (callback) => {
    Product.findAll((err, data) => {
        if (err) {
            callback(err, null);
        } 
        else {
            callback(null, data);
        }
    });
};

ProductService.findById = (id, callback) => {
    Product.findById(id, (err, data) => {
        if (err) {
            callback(err, null);
        } 
        else {
            callback(null, data);
        }
    });
};

ProductService.findByCode = (code, callback) => {
    Product.findByCode(code, (err, data) => {
        if (err) {
            callback(err, null);
        } 
        else {
            callback(null, data);
        }
    });
};

ProductService.create = (productData, callback) => {
    Product.create(productData, (err, data) => {
        if (err) {
            callback(err, null);
        } 
        else {
            callback(null, data);
        }
    });
};

ProductService.update = (id, productData, callback) => {
    Product.update(id, productData, (err, data) => {
        if (err) {
            callback(err, null);
        } 
        else {
            callback(null, data);
        }
    });
};

ProductService.delete = (id, callback) => {
    Product.delete(id, (err, data) => {
        if (err) {
            callback(err, null);
        } 
        else {
            callback(null, data);
        }
    });
};

module.exports = ProductService;