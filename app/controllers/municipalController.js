 var express = require('express'),
  router = express.Router();

var Municipal = require('../models/municipal');
var municipalStatement = new Municipal();

var Departament = require('../models/departament');
var departamentStatement = new Departament();

 module.exports = function (app) {
  app.use('/municipal', router);
};

router.get('/list', function (req, res, next) {  
    var view = {};
    
    departamentStatement.findAll({},function(data){
        view.cmdData = data
    });

    municipalStatement.findAll({}, function(data) {
        view.data = data;
        res.render('municipal/municipal_form', view)
    });
});


router.post('/save', function(req, res, next) {

  req.checkBody('nombre', 'nombre invalido').notEmpty();
  req.checkBody('abreviatura', 'abreviatura invalida').notEmpty();
  req.checkBody('id_departamento', 'id departamento invalido').notEmpty();
  req.sanitizeBody('nombre').escape();
  req.sanitizeBody('abreviatura').escape();
  req.sanitizeBody('id_departamento').escape();

  req.getValidationResult().then(function(result) {
      var view = {
          errors: '',
          name : req.body.name
      };
      console.log(result);
      if (!result.isEmpty()) {
          res.render('municipal/municipal_form', view)
          return;
      } else {
          var municipio = {
              0 : req.body.nombre,
              1 : req.body.abreviatura,
              2 : parseInt(req.body.id_departamento)
          };

          municipalStatement.saveMunicipal(municipio, function(isSuccess){
              if(isSuccess){
                  console.log('insertado');
                  res.redirect('/municipal/list');
              }
          });
      }
  });
});

router.get('/edit/(:id)', function (req, res, next) {
    var id = req.params.id;
    var view = {};

    departamentStatement.findAll({},function(data){
        view.cmdData = data
    });

    municipalStatement.findOne({id : id},function(data){
        view.data = data[0];
        res.render('municipal/municipal_form_edit', view)
    });
});


router.put('/edit/(:id)', function(req, res, next) {
  
  req.checkBody('nombre', 'nombre invalido').notEmpty();
  req.checkBody('abreviatura', 'abreviatura invalida').notEmpty();
  req.checkBody('id_departamento', 'id departamento invalido').notEmpty();
  req.sanitizeBody('nombre').escape();
  req.sanitizeBody('abreviatura').escape();
  req.sanitizeBody('id_departaento').escape();
  
  req.getValidationResult().then(function(result) {
      var view = {
          errors: '',
          name : req.body.name
      };
      console.log(result);
      if (!result.isEmpty()) {
          res.render('municipal/municipal', view)
          return;
      } else {
          var id = req.params.id;
          var municipio = {
              0 : req.body.nombre,
              1 : req.body.abreviatura,
              2 : parseInt(req.body.id_departamento),  
              id: id
          };

          municipalStatement.updateMunicipal(municipio, function(isSuccess){
              if(isSuccess){
                  console.log('modificado');
                  res.redirect('/municipal/list');
              }
          });
      }
  });
});

router.delete('/delete/(:id)', function (req, res, next) {
    var id = req.params.id;
    municipalStatement.deleteMunicipal({id : id}, function(isSuccess){
    if(isSuccess){
      console.log('eliminado');
      res.redirect('/municipal/list');
    }
  });
});