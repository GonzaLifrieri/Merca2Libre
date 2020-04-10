const configuracion = require('./servidor/configuracion');

const app = configuracion.crearServidor();

var puerto = '8080';

console.log( "Escuchando en el puerto " + puerto );
app.listen(puerto, "0.0.0.0");
