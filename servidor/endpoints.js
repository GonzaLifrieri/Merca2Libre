var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var controladorUsuario = require('../controladores/controladorUsuario');

//config de seguridad -- son todos middleware
var app = express();

app.use(cors());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.post('/usuario/crear', controladorUsuario.nuevoUsuario);


// app.get('/usuarios/list', function(req, res){
//     console.log('Ruta para crear usuarios');
// })


//seteamos el puerto en el cual va a escuchar los pedidos la aplicación
var puerto = '8080';

app.listen(puerto, function () {
  console.log( "Escuchando en el puerto " + puerto );
});