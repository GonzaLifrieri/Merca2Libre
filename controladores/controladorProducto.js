var con = require('../connection');

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
    actualizarProducto,
}