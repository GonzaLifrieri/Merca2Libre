const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const endpoints = require('./endpoints');


function crearServidor(){
    const app = express();
    
    app.use(cors());
    
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    
    app.use(bodyParser.json());

    endpoints.agregarEndpoints(app);

    return app;
}



module.exports = {
    crearServidor: crearServidor
}