const executeQuery = require('./executeQuery')
const executeStatement = require('./executeStatement');

function DepartamentStatement() {
    
    this.findAll = function(req, cb) {
      executeQuery('SELECT * FROM DEPARTAMENTO', req, function (result) {
        var data = result.length > 0 ? result : []
        cb(data)
      })
    };
  
    this.findOne = function(req, cb) {
      executeQuery('SELECT * FROM DEPARTAMENTO WHERE id=:id', req, function (result) {
        var data = result.length > 0 ? result : []
        cb(data)
      })
    };

    this.saveDepartament = function(req, cb) {
      executeStatement('INSERT INTO DEPARTAMENTO(NOMBRE,ABREVIATURA) VALUES(:0, :1)', req, function (result) {
        var isSuccess = result;
        cb(isSuccess)
      })
    };

    this.updateDepartament = function(req, cb) {
      executeStatement('UPDATE DEPARTAMENTO SET NOMBRE =:0,ABREVIATURA =:1 WHERE ID=:id', req, function (result) {
        var isSuccess = result;
        cb(isSuccess)
      })
    };

    this.deleteDepartament = function(req, cb) {
      executeStatement('DELETE FROM DEPARTAMENTO WHERE ID=:id', req, function (result) {
        var isSuccess = result;
        cb(isSuccess)
      })
    };
}

module.exports = DepartamentStatement;