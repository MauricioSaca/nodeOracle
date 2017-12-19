 var express = require('express'),
  router = express.Router(),
  util = require('util');
  
var Departament = require('../models/departament');
var departamentStatement = new Departament();

 module.exports = function (app) {
  app.use('/departament', router);
};

router.get('/list', function (req, res, next) {
  var view = {};
  departamentStatement.findAll({},function(data){
    view.data = data
    res.render('departament/departament_form', view)
  });
});


router.post('/save', function(req, res, next) {
    req.checkBody('nombre', 'nombre invalido').notEmpty();
    req.checkBody('abreviatura', 'abreviatura invalida').notEmpty();
    req.sanitizeBody('nombre').escape();
    req.sanitizeBody('abreviatura').escape();

    var errors = req.validationErrors();  
    if(!errors) {
        var departamento = {
            0 : req.body.nombre,
            1 : req.body.abreviatura
        };

        departamentStatement.saveDepartament(departamento, function(isSuccess){
            if(isSuccess){
                res.redirect('/departament/list');
            }
        });
    }
    else {
        var view = {};
        departamentStatement.findAll({},function(data){
            view.data = data
            view.errors = errors
            res.render('departament/departament_form', view)
        });
    }
});

router.get('/edit/(:id)', function (req, res, next) {
  var id = req.params.id;
  var view = {};
  departamentStatement.findOne({id : id},function(data){
    view.data = data[0];
    res.render('departament/departament_form_edit', view)
  });
});


router.put('/edit/(:id)', function(req, res, next) {
    req.checkBody('nombre', 'nombre invalido').notEmpty();
    req.checkBody('abreviatura', 'abreviatura invalida').notEmpty();
    req.sanitizeBody('nombre').escape();
    req.sanitizeBody('abreviatura').escape();


    var errors = req.validationErrors();  
    if(!errors) {
        var id = req.params.id;
        var departamento = {
            0 : req.body.nombre,
            1 : req.body.abreviatura,
            id: id
        };

        departamentStatement.updateDepartament(departamento, function(isSuccess){
            if(isSuccess){
                  console.log('modificado');
                  res.redirect('/departament/list');
            }
        });
    } else {
        var id = req.params.id;
        var view = {};
        departamentStatement.findOne({id : id},function(data){
            view.data = data[0];
            view.errors = errors
            res.render('departament/departament_form_edit', view)
        });
        
    }
});

router.delete('/delete/(:id)', function (req, res, next) {
   var id = req.params.id;
  departamentStatement.deleteDepartament({id : id}, function(isSuccess){
    if(isSuccess){
      console.log('eliminado');
      res.redirect('/departament/list');
    } else {
        console.log('fallo');
    }
  });
});