const database = require('../database/database');

const User = {};

User.findAll = (result) => {
    database.all(
        'SELECT * FROM user', 
        [], 
        (err, rows) => {
            if (err) {
                result(null, err);
                return;
            }
            result(null, rows);
    });
}

User.findById = (id, result) => {
    database.get(
        'SELECT * FROM user WHERE id = ?',
        [id], 
        (err, row) => {
            if (err) {
                result(null, err);
                return;
            }
            result(null, row);
    });
}

User.create = (user, result) => {
    database.run(
        'INSERT INTO user (name, email, phone) VALUES (?, ?, ?)', 
        [user.name, user.email, user.phone], 
        function (err) {
            if (err) {
                result(null, err);
                return;
            }
            result(null, { id: this.lastID, ...user });
    });
}

User.update = (id, user, result) => {
    database.run(
        'UPDATE user SET name = ?, email = ?, phone = ? WHERE id = ?', 
        [user.name, user.email, user.phone, id], 
        function (err) {
            if (err) {
                result(null, err);
                return;
            }
            if (this.changes === 0) {
                result({ message: 'Cliente não encontrado.' }, null);
                return;
            }
            result(null, { ...user });
    });
}

User.delete = (id, result) => {
    database.run(
        'DELETE FROM orders WHERE userId = ?',
        [id], 
        function(err) {
            if (err) {
                result(null, err);
                return;
            }

            database.run(
                'DELETE FROM user WHERE id = ?', 
                [id], 
                function(err) {
                    if (err) {
                        result(null, err);
                        return;
                    }
                    if (this.changes === 0) {
                        result({ message: 'Cliente não encontrado.' }, null);
                        return;
                    }
                    result(null, this.changes);
                }
            );
        }
    );
};

module.exports = User;