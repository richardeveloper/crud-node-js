
const sqlite3 = require('sqlite3').verbose();

const database = new sqlite3.Database('./api.db', (err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err.message);
    } else {
        console.log('Conectado ao banco de dados com sucesso.');
    }
});

database.serialize(() => {
    database.run(`
        CREATE TABLE IF NOT EXISTS product (
            id INTEGER PRIMARY KEY AUTOINCREMENT,    
            code INTEGER NOT NULL,
            name TEXT NOT NULL,
            price REAL NOT NULL
        );
    `);

    database.run(`
        CREATE TABLE IF NOT EXISTS user (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            phone TEXT NOT NULL
        );
    `);

    database.run(`    
        CREATE TABLE IF NOT EXISTS orders (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            date TEXT NOT NULL,
            productCode INTEGER NOT NULL,
            userId INTEGER NOT NULL,
            quantity INTEGER NOT NULL
        );
    `);
});

module.exports = database;
