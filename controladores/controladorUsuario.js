var con = require('../connection');

// localhost:8080/usuario/crear?nombre=Pedro&email=pedro@gmail.com

// Alta de Usuario
function nuevoUsuario(req, res){
    var sql = '';
    var nombre = req.body.nombre;
    var email = req.body.email;

    checkEmail(email, null, (esvalidoEmail) => {

        if(esvalidoEmail){
            sql = "insert usuario (name, email) values ('" + nombre + "','" + email + "')";
        
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
        else{
            res.send('El email ya existe');
        }
    });
    
    // checkEmail(Email, Callback)
    // checkEmail(‘email@mail.com’, ()=>{})
}


//Actualizar Usuario - Validar si ya existe el email
function checkEmail(email, id, callback){
    const sqlEmail = "SELECT email FROM usuario WHERE email=" + "\""+email+ "\" AND id <> \""+ id+ "\"";

    con.query(sqlEmail, function (err, result, fields) {
       if (err){
         console.log("Hubo un error en obtener email");
         return res.status(400).send("Hubo un error en la obtencion del email");
       }

       return callback(result.length == 0)
   })
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



function actualizarUsuario(req,res){
    var sql = " ";
    const email = req.body.email;
    const id = req.params.id;
    const name = req.body.name;
    if (email) {        
        checkEmail(email, id, (esvalidoEmail) => {

            if(esvalidoEmail){
                sql =  "UPDATE usuario SET email = \""+ email +"\", name=\"" + name + "\" WHERE id = " + id;
                console.log(sql);
            
                con.query(sql, function(error, resultado, fields){
                    if(error){
                        console.log("Hubo un error en la consulta", error.message);
                        return res.status(404).send("Hubo un error en la consulta");
                    }
            
                    res.send("EL usuario fue actualizado con éxito.");
                }); 
            }
            else{
                res.send('El email ya existe.');
            }
        });
    }
}

function crearCompras(req,res){
    const productId = req.body.productId;
    const discountType = req.body.discountType;
    const quantity = req.body.quantity;
    const total_price = req.body.total_price;
    const user_id = req.body.user_id;
    var sql = "INSERT INTO compra (total_price, user_id) VALUES (" + total_price +"," + user_id + ");SELECT @purchase_id := MAX(id) FROM compra;INSERT INTO producto_x_compra (product_id, purchase_id, discount_type, quantity) VALUES ("+ productId +",@purchase_id," + discountType +", " + quantity +")";
    
        con.query(sql,function(err,result,fields){
                if(err){
                    console.log(sql ,err);
                    console.log("Hubo un error en crearCompra");
                    return res.status(404).send("Hubo un error al intentar crear Compra");
                }
            
                let response = "Se ha creado la compra";
                res.json({response});
        })
        
}



function comprasUsuario(req, res){
    const id = req.params.id;
    let stmt = `SELECT p.description, p.price FROM compra AS c LEFT JOIN usuario AS u ON c.user_id = u.id LEFT JOIN producto_x_compra AS pxc ON c.id = pxc.purchase_id LEFT JOIN producto AS p ON pxc.product_id = p.id WHERE u.id = ?`
    con.query(stmt, [id], function(error, result){
        if(error){
            console.log('Ocurrió un error al buscar las compras del usuario'+id+'. Error: '+ error);
            res.status(400).send('Ocurrió un error al mostrar las compras. Por favor inténtelo nuevamente más tarde');
        }
        let respuesta = {
            compras : result,
        }
        res.json(respuesta);
    });
}

module.exports = {
    nuevoUsuario: nuevoUsuario,
    usuariosList : usuariosList,
    actualizarUsuario,
    crearCompras,
    tiendasList,
    comprasUsuario
}
