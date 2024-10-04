const Order = require('../models/orderModel');

const OrderService = {};

OrderService.findAll = (callback) => {
    Order.findAll((err, data) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, data);
        }
    });
};

OrderService.findById = (id, callback) => {
    Order.findById(id, (err, data) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, data);
        }
    });
};

OrderService.create = (orderData, callback) => {
    Order.create(orderData, (err, data) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, data);
        }
    });
};

OrderService.update = (id, orderData, callback) => {
    Order.update(id, orderData, (err, data) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, data);
        }
    });
};

OrderService.delete = (id, callback) => {
    Order.delete(id, (err, data) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, data);
        }
    });
};

module.exports = OrderService;