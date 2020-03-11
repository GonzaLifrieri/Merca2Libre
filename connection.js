const mysql = require('mysql');
const node_env = require('./env.json');

var connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'root',
    database : 'e_comerce'
});

module.exports = connection;