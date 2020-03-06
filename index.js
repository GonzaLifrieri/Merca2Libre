const conn = require('./connection');

conn.query("SELECT SUM(2+5)", function(error, result){
    console.log(result);
    console.log(error);
});
