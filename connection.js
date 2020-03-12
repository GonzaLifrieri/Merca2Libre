const mysql = require('mysql');
const node_env = require('./env.json');

var connection = mysql.createConnection({
<<<<<<< HEAD
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'root',
=======
    host: node_env.database.DATABASE_URL,
    port: node_env.database.DATABASE_PORT,
    user: node_env.database.DATABASE_USER,
    password: node_env.database.DATABASE_PASSWORD,
>>>>>>> 29a229611caa80789319899216bee7be20eb3fb4
    database : 'e_comerce'
});

module.exports = connection;