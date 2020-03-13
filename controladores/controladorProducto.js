const con = require('../connection');

// localhost:8080//tienda/nuevoProducto?tienda_id=Pedro&email=pedro@gmail.com

function crearProducto(req, res){
    //Obtiene los datos del metodo POST dentro del objeto 'body'
    let tienda_id = req.body.tienda_id;
    let descripcion = req.body.descripcion;
    let precio = req.body.precio;
    let stock = req.body.stock;
    let categoria = req.body.categoria;


    let stmt = `INSERT INTO producto (tienda_id, description, price, stock, categoria) VALUES ("${tienda_id}", "${descripcion}", "${precio}", "${stock}", "${categoria}")`;
    con.query(stmt, function(error, result){
        if (error) {
            console.log('Error al crear nueva tienda. ' + error);
            res.status(400).send('Ocurrió un error al intentar crear el producto. Por favor inténtelo más tarde');
        }
        con.query(stmt, function(error, result){
            if(error){
                console.log('Error al crear nueva tienda. ' + error);
                res.status(400).send('Ocurrió un error al intentar crear la tienda. Por favor inténtelo más tarde'); 
            };
            respuesta = {
                producto : result[0]
            }
            res.json(respuesta);
        });
    });
}


module.exports = {
    crearProducto: crearProducto
}