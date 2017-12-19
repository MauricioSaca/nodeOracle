var express = require('express'),
  router = express.Router();


module.exports = function (app) {
  app.use('/', router);
};


router.get('/', function (req, res, next) {
  var view = {}; 
  res.render('index', view)
});

router.get('/project', function (req, res, next) {
  var view = {}; 
  res.render('project/about_project', view)
});

router.get('/departament', function (req, res, next) {
  var view = {}; 
  res.render('departament/departament_form', view)
});

router.get('/municipal', function (req, res, next) {
  var view = {}; 
  res.render('municipal/municipal_form', view)
});