const configuracion = require('./servidor/configuracion');

const app = configuracion.crearServidor();

var puerto = '8080';

app.listen(puerto, function () {
  console.log( "Escuchando en el puerto " + puerto );
});
