const con = require('../connection');

// localhost:8080//tienda/nuevoProducto?descripcion=mesa&precio=50&stock=30&categoria_id=1&tienda_id=1

function crearProducto(req, res){
    //Obtiene los datos del metodo POST dentro del objeto 'body'
    let descripcion = req.body.description;
    let price = req.body.price;
    let stock = req.body.stock;
    let categoria_id = req.body.categoria_id;
    let tienda_id = req.body.tienda_id;


    let stmt = `INSERT INTO producto (description, price, stock, categoria_id, tienda_id) VALUES ("${descripcion}", "${price}", "${stock}", "${categoria_id}", "${tienda_id}")`;
    con.query(stmt, function(error, result){
        if (error) {
            console.log('Error al crear nueva tienda. ' + error);
            res.status(400).send('Ocurrió un error al intentar crear el producto. Por favor inténtelo más tarde');
        }

        var respuesta = {
            'producto': result
        };

        res.json(respuesta);
    });
    
}


function actualizarProducto (req, res){
    const idProducto = req.params.id;
    if(!idProducto){
        console.log('Error en el id del producto.')
        res.status(500).send('Ocurrió un error buscando el producto. Por favor inténtelo más tarde.')
    }
    const precio = req.body.price
    const descripcion = req.body.description
    const stock = req.body.stock
    const categoria = req.body.categoria_id
    let stmt = `UPDATE producto SET price = ${precio},description = '${descripcion}', stock = ${stock},categoria_id = ${categoria} WHERE id = ${idProducto}`;
    con.query(stmt, function(error, result){
        if(error){
            console.log("Ocurrió un error al intentar actualizar el producto. Error: "+ error);
            res.status(500).send('Ocurrió un error al intentar actualizar el producto. Por favor inténtelo de nuevo más tarde.');
        }
            let respuesta = {
                producto : result,
            }
            res.json(respuesta);
        })

}


function consultarProductos(req, res){
    let tienda_id = req.params.id;
    
    if(!tienda_id) {
        console.log(error);
        res.status(500).send('Ocurrió un error al ejecutar la consulta. No se encontró el usuario. Por favor inténtelo más tarde.');
    }
    let stmt = `SELECT P.* FROM producto P INNER JOIN tienda T ON P.tienda_id = T.id WHERE t.id = ?`;
    con.query(stmt, [tienda_id], function(error, result){
        if(error){
            console.log(error);
            res.status(500).send('Ocurrió un error al intentar ejecutar la consulta. Por favor inténtelo más tarde.');
        }
        let respuesta = {
            tiendas : result,
        }
        res.json(respuesta);
    });
}


module.exports = {
    crearProducto: crearProducto,
    actualizarProducto: actualizarProducto,
    consultarProductos: consultarProductos
}