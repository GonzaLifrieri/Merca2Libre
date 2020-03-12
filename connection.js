const mysql = require('mysql');
const node_env = require('./env.json');

var connection = mysql.createConnection({
<<<<<<< HEAD
=======

>>>>>>> c3f4ea90839bebfd7ef0ce10b7e1d5db4ca2b73b
    host: node_env.database.DATABASE_URL,
    port: node_env.database.DATABASE_PORT,
    user: node_env.database.DATABASE_USER,
    password: node_env.database.DATABASE_PASSWORD,
    database : 'e_comerce'
});

module.exports = connection;