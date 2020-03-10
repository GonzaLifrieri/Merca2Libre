var con = require('../connection');

// Alta de Usuario



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