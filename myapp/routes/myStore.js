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
	fetch('http://localhost:51336/api/Establecimiento/Index/'+res.locals.user.IdCard)
	  .then(function(res) {
		  return res.json();
	  }).then(function(json) {
		  res.render('myStore/index', { title: 'Mi Tienda', establecimientos: json});
	  });
});


router.get('/', function(req, res, next) {	
	getCategories().then(function(result) {
		res.render('store', { title: 'Gran Torismo', categories: result});
	});
  });	  

router.get('/new/place', function(req, res) {
fetch('http://localhost:51336/api/District')
	  .then(function(res) {
		  return res.json();
	  }).then(function(json) {
		  res.render('myStore/new-place', { title: 'Mi Tienda', districts:  json });
	  });	
});

router.get('/:id/services/', function(req, res) {
	fetch('http://localhost:51336/api/Servicios/'+ req.params.id)
	  .then(function(res) {
		  return res.json();
	  }).then(function(json) {
		  res.render('myStore/index-service', { title: 'Mi Tienda', servicios: json, idEstablecimiento: req.params.id});
	  });			
});

router.get('/:id/new/service/', function(req, res) {
	res.render('myStore/new-service', { title: 'Mi Tienda', idEstablecimiento: req.params.id});
});


module.exports = router;
