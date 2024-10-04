const database = require('../database/database');

const Order = {};

Order.findAll = (result) => {
    database.all(
        'SELECT * FROM orders', 
        [], 
        (err, rows) => {
            if (err) {
                result(null, err);
                return;
            }
            result(null, rows);
    });
}

Order.findById = (id, result) => {
    database.get(
        'SELECT * FROM orders WHERE id = ?',
        [id], 
        (err, row) => {
            if (err) {
                result(null, err);
                return;
            }
            result(null, row);
    });
}

Order.create = (order, result) => {
    database.run(
        'INSERT INTO orders (date, productCode, userId, quantity) VALUES (?, ?, ?, ?)', 
        [order.date, order.productCode, order.userId, order.quantity], 
        function (err) {
            if (err) {
                result(null, err);
                return;
            }
            result(null, { id: this.lastID, ...order });
    });
}

Order.update = (id, order, result) => {
    database.run(
        'UPDATE orders SET quantity = ? WHERE id = ?', 
        [order.quantity, id], 
        function (err) {
            if (err) {
                result(null, err);
                return;
            }
            if (this.changes === 0) {
                result({ message: 'Pedido não encontrado.' }, null);
                return;
            }

            Order.findById(id, (err, newOrder) => {
                result(null, { ...newOrder });
            });
            
    });
}

Order.delete = (id, result) => {
    database.run(
        'DELETE FROM orders WHERE id = ?', 
        [id], 
        function(err) {
            if (err) {
                result(null, err);
                return;
            }
            if (this.changes === 0) {
                result({ message: 'Pedido não encontrado.' }, null);
                return;
            }
            result(null, this.changes);
    });
};

module.exports = Order;