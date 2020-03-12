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
    var sql = "select * from usuario";

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

module.exports = {
    nuevoUsuario: nuevoUsuario,
    buscarUsuarios: buscarUsuarios
};




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

module.exports = {
usuariosList : usuariosList
}