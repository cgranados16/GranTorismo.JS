var express = require('express');
var router = express.Router();
var fetch = require('node-fetch');


router.get(/^(.*)$/, function(req, res, next){
	  if (!req.cookies.user){
	    res.redirect('/signUp')
	  }
	  var cookie = JSON.parse(req.cookies.user);
	  if (cookie['Role'] != 'Owner'){
	    res.redirect('/');
	  }
	  next();
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('myStore/index', { title: 'Mi Tienda'});
});

router.get('/new/place', function(req, res) {
  res.render('myStore/new-place', { title: 'Mi Tienda'});
});



module.exports = router;
