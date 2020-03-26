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



function actualizarProducto (req, res){
    const idProducto = req.params.id ? req.params.id : null;
    if(!idProducto){
        console.log('Error en el id del producto.')
        res.status(500).send('Ocurrió un error buscando el producto. Por favor inténtelo más tarde.')
    }
    const precio = req.body.precio ? req.body.precio : null;
    const descripcion = req.body.descripcion ? req.body.descripcion : null;
    const stock = req.body.stock ? req.body.stock : null;
    const categoria = req.body.categoria ? req.body.categoria : null;
    let stmt = `UPDATE producto SET ? WHERE id = ?`;
    let valores = [];
    (precio) ? (valores.push(`price = ${precio} `)): null;
    (descripcion) ? (valores.push(`description = ${descripcion} `)): null;
    (stock) ? (valores.push(`stock = ${stock} `)): null;
    (categoria) ? (valores.push(`category = ${categoria} `)): null;

    valores = valores.filter(function(valor){
        if(valor != null){
            return true
        }
    })
    con.query(stmt, [valores], function(error, result){
        if(error){
            console.log("Ocurrió un error al intentar actualizar el producto. Error: "+ error);
            res.status(500).send('Ocurrió un error al intentar actualizar el producto. Por favor inténtelo de nuevo más tarde.');
        }
        con.query(`SELECT * FROM producto WHERE id = ${idProducto}`, function(error, result){
            if(error){
                console.log("Ocurrió un error al intentar devolver el producto. Error: "+ error);
                res.status(500).send('Ocurrió un error al intentar finalizar la actualización del producto. Por favor inténtelo de nuevo más tarde.');
            }
            let respuesta = {
                producto : result,
            }
            res.json(respuesta);
        })
    });

}

module.exports = {
    crearProducto: crearProducto,
    actualizarProducto
}