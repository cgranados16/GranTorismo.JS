var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('signUp', { title: 'Register', alert : null });
});

router.get('/badLogin', function(req, res, next) {
  res.render('partial/alert', {  alert : {type: 'danger', message: 'error'} });
});


module.exports = router;
