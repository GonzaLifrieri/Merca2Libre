const mysql = require('mysql');
const node_env = require('./env.json');

var connection = mysql.createConnection({
    host: node_env.database.DATABASE_URL,
    port: node_env.database.DATABASE_PORT,
    user: node_env.database.DATABASE_USER,
    password: node_env.database.DATABASE_PASSWORD,
    database : 'que_veo_hoy'
});

module.exports = connection;