const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const controladorUsuario = require('../controladores/controladorUsuario');
const controladorTienda = require('../controladores/controladorTienda');

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
app.get('/usuarios/list', controladorUsuario.usuariosList);

app.get('/tienda/crear', controladorTienda.crear);


//seteamos el puerto en el cual va a escuchar los pedidos la aplicación
var puerto = '8080';

app.listen(puerto, function () {
  console.log( "Escuchando en el puerto " + puerto );
});