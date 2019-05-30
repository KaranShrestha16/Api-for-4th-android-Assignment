
const path = require('path');
module.exports = {
    client: 'pg',
    connection: {
        host: 'localhost',
        database: 'dbitems',
        user: 'admin',
        password: 'admin'
    },

    migrations: {
        tableName: 'migrations',
        directory: path.resolve(__dirname, './migrations'),
    },
    userNullAsDefault: true

};/*  */