var con = require('../connection');

// localhost:8080/usuario/crear?nombre=Pedro&email=pedro@gmail.com

// Alta de Usuario
function nuevoUsuario(req, res){
    var nombre = req.body.nombre;
    var email = req.body.email;
    var sql = "insert usuario (name, email) values ('" + nombre + "','" + email + "')";

    con.query(sql, function(error, resultado, fields){
        if(error){
            console.log("Hubo un error en la consulta", error.message);
            return res.status(404).send("Hubo un error en la consulta");
        }

        var response = {
            'nombres': resultado
        };

        res.send(JSON.stringify(response));
    });
}

// Consulta de Usuarios
function buscarUsuarios(req, res) {
    var sql = "SELECT * FROM usuario";

    // la funcion de callback se ejecuta una vez que se termine de ejecutar la consulta
    con.query(sql, function(error, resultado, fields) {
        if (error) {
            console.log("Hubo un error en la consulta", error.message);
            return res.status(404).send("Hubo un error en la consulta");
        }
        var response = {
            'usuarios': resultado
        };

        res.send(JSON.stringify(response));
    });
}

// List usuarios
function usuariosList (req, res){
    let stmt = `SELECT id, name, email FROM usuario`;
    con.query(stmt, function(error, result){
        if(error){
            console.log("Ocurrió un error." + error);
            console.error();
            res.status(400).send('Ocurrió un error. Por favor inténtelo más tarde.');
        }
        let respuesta = {
            usuarios: result,
        }
        res.json(respuesta);
    }
    );
}

function tiendasList(req, res){
    let user_id = req.params.id ? req.params.id : null;
    if(!user_id) {
        console.log(error);
        res.status(500).send('Ocurrió un error al ejecutar la consulta. No se encontró el usuario. Por favor inténtelo más tarde.');
    }
    let stmt = `SELECT t.id, t.name FROM tienda as t LEFT JOIN usuario as u ON t.owner_id = u.id WHERE u.id = ?`;
    con.query(stmt, [user_id], function(error, result){
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
    nuevoUsuario: nuevoUsuario,
    buscarUsuarios: buscarUsuarios,
    usuariosList : usuariosList,
    tiendasList,
}