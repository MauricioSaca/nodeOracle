 var express = require('express'),
  router = express.Router();

module.exports = function (app) {
  app.use('/project', router);
};

router.get('/', function (req, res, next) {
    var view = {};
    res.render('project/about_project', view)
});