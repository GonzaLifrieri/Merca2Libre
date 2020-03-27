const con = require('../connection');

function crear(req, res){
    //Obtiene los datos del metodo POST dentro del objeto 'body'
    let idUsuario = req.body.idUsuario;
    let name = req.body.tiendaNombre;

    let stmt = `INSERT INTO tienda (owner_id, name) VALUES ("${idUsuario}", "${name}")`;
    con.query(stmt, function(error, result){
        if (error) {
            console.log('Error al crear nueva tienda. ' + error);
            res.status(400).send('Ocurrió un error al intentar crear la tienda. Por favor inténtelo más tarde');
        }
        con.query(`SELECT * FROM tienda WHERE name LIKE "${name}"`, function(error, result){
            if(error){
                console.log('Error al crear nueva tienda. ' + error);
                res.status(400).send('Ocurrió un error al intentar crear la tienda. Por favor inténtelo más tarde'); 
            };
            respuesta = {
                tienda : result[0]
            }
            res.json(respuesta);
        });
    });
}

function editar(req, res){
    let idTienda = req.params.id;
    let nuevoNombre = req.body.nuevoNombre;

    let stmt = `UPDATE tienda SET name = "${nuevoNombre}" WHERE id = ${idTienda}`;
    con.query(stmt, function(error, result){
        if(error){
            console.log('Error al querer editar una tienda. '+ error);
            res.status(400).send('Ocurrió un error al intentar editar la tienda. Inténtelo nuevamente.')
        }
        con.query(`SELECT * FROM tienda WHERE id = "${idTienda}"`, function(error, result){
            if(error){
                console.log('Error al querer devolver la tienda editada. '+ error);
                res.status(400).send('Ocurrió un error al intentar editar la tienda. Inténtelo nuevamente.')
            }
            let respuesta = {
                tienda : result[0],
            }
            res.json(respuesta);
        });
    });
}


module.exports = {
    crear: crear,
    editar: editar,
}