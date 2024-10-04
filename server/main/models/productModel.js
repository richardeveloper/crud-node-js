const database = require('../database/database');

const Product = {};

Product.findAll = (result) => {
    database.all(
        'SELECT * FROM product', 
        [], 
        (err, rows) => {
            if (err) {
                result(null, err);
                return;
            }
            result(null, rows);
    });
}

Product.findById = (id, result) => {
    database.get(
        'SELECT * FROM product WHERE id = ?',
        [id], 
        (err, row) => {
            if (err) {
                result(null, err);
                return;
            }
            result(null, row);
    });
}

Product.findByCode = (code, result) => {
    database.get(
        'SELECT * FROM product WHERE code = ?',
        [code], 
        (err, row) => {
            if (err) {
                result(null, err);
                return;
            }
            result(null, row);
    });
}

Product.create = (product, result) => {
    database.run(
        'INSERT INTO product (code, name, price) VALUES (?, ?, ?)', 
        [product.code, product.name, product.price], 
        function (err) {
            if (err) {
                result(null, err);
                return;
            }
            result(null, { id: this.lastID, ...product });
    });
}

Product.update = (id, product, result) => {
    database.run(
        'UPDATE product SET code = ?, name = ?, price = ? WHERE id = ?', 
        [product.code, product.name, product.price, id], 
        function (err) {
            if (err) {
                result(null, err);
                return;
            }
            if (this.changes === 0) {
                result({ message: 'Produto não encontrado.' }, null);
                return;
            }
            result(null, { id: id, ...product });
    });
}

Product.delete = (id, result) => {
    database.run(
        'DELETE FROM product WHERE id = ?', 
        [id], 
        function(err) {
            if (err) {
                result(null, err);
                return;
            }
            if (this.changes === 0) {
                result({ message: 'Produto não encontrado.' }, null);
                return;
            }
            result(null, this.changes);
    });
};

module.exports = Product;