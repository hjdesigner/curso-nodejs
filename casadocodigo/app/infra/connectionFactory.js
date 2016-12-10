var mysql = require('mysql');
function creatDBConnection(){
  return mysql.createConnection({
    host  : 'localhost',
    user  : 'root',
    password  : '',
    database  : 'casadocodigo_nodejs'
  });
}
//wrapper
module.exports = function(){
  return creatDBConnection;
}
