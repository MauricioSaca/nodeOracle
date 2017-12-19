const executeQuery = require('./executeQuery')
const executeStatement = require('./executeStatement');

function MunicipalStatement() {
    
    this.findAll = function(req, cb) {
      executeQuery('SELECT * FROM MUNICIPIO', req, function (result) {
        var data = result.length > 0 ? result : []
        cb(data)
      })
    };
  
    this.findOne = function(req, cb) {
      executeQuery('SELECT * FROM MUNICIPIO WHERE id=:id', req, function (result) {
        var data = result.length > 0 ? result : []
        cb(data)
      })
    };

    this.saveMunicipal = function(req, cb) {
      executeStatement('INSERT INTO MUNICIPIO(NOMBRE,ABREVIATURA,ID_DEPARTAMENTO) VALUES(:0, :1, :2)', req, function (result) {
        var isSuccess = result;
        cb(isSuccess)
      })
    };

     this.updateMunicipal = function(req, cb) {
      executeStatement('UPDATE MUNICIPIO SET NOMBRE =:0,ABREVIATURA =:1, ID_DEPARTAMENTO =:2 WHERE ID=:id', req, function (result) {
        var isSuccess = result;
        cb(isSuccess)
      })
    };
     this.deleteMunicipal = function(req, cb) {
      executeStatement('DELETE FROM MUNICIPIO WHERE ID=:id', req, function (result) {
        var isSuccess = result;
        cb(isSuccess)
      })
    };
}
module.exports = MunicipalStatement;