const controladorUsuario = require('../controladores/controladorUsuario');
const controladorTienda = require('../controladores/controladorTienda');
const controladorProducto = require('../controladores/controladorProducto');

function agregarEndpoints(app){

  app.get('/login', controladorUsuario.login);

  app.post('/usuario/crear', controladorUsuario.nuevoUsuario);

  app.get('/usuario/:id/tiendas', controladorUsuario.tiendasList);

  app.put('/usuario/:id/actualizar', controladorUsuario.actualizarUsuario);

  app.get('/usuario/:id/compras', controladorUsuario.comprasUsuario);

  app.get('/usuarios/list', controladorUsuario.usuariosList);

  app.post('/tienda/crear', controladorTienda.crearTienda);

  app.put('/tienda/:id/editar', controladorTienda.editarTienda);

  app.post('/compra/crear', controladorUsuario.crearCompras);

  app.post('/tienda/nuevoProducto', controladorProducto.crearProducto);

  app.put('/producto/:id/actualizar', controladorProducto.actualizarProducto);

  app.get('/tienda/:id/productos', controladorProducto.consultarProductos);
}

module.exports = {
  agregarEndpoints,
}