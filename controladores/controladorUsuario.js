var con = require('../connection');

// Alta de Usuario


//Actualizar Usuario
 function checkEmail(email){
     const sqlEmail = "SELECT email FROM usuario WHERE email=" + "\""+email+ "\"";
     con.query(sqlEmail,function (err, result, fields) {
        if (err){
          console.log("Hubo un error en obtener email");
          return res.status(400).send("Hubo un error en la obtencion del email");
        }
        return result.length == 0
        
    })

     
     
 }
function actualizarUsuario(req,res){
    var sql = " ";
    const email = req.body.email;
    const id = req.body.id;
    const name = req.body.name;
    const esvalidoEmail = checkEmail(email)
    if(name && email){
        if(esvalidoEmail){
            sql =  "UPDATE usuario SET email = '"+ email +"', name='" + name + "' WHERE id=" + id;
        }
    }
    if(name){
            sql =  "UPDATE usuario SET name = '"+ name + "' WHERE id=" + id;
    }
    if(email){
        if(esvalidoEmail){
            sql =  "UPDATE usuario SET email = '"+ email + "' WHERE id=" + id;
        }
    }
    con.query(sql,function (err, result, fields) {
        if (err){
          console.log("Hubo un error en actualizar usuario. Nombre "+ name + " email: " + email + err)
          return res.status(400).send("Hubo un error en la actualización del usuario");
        }
        let response = "Se ha actualizado el usuario"
        res.json({response})
        

    })
}
module.exports = {
    actualizarUsuario
}

