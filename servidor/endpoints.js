const express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');

//config de seguridad -- son todos middleware
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.get('/usuario/crear', function(req, res){
    console.log('Ruta para crear usuarios');
});
app.get('/usuario/:id/actualizar', function(req, res){
    console.log('Ruta para actualizar usuarios');
});
app.get('/usuarios/list', function(req, res){
    console.log('Ruta para crear usuarios');
})
