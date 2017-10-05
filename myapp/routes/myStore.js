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
fetch('http://localhost:51336/api/get/Servicios/').then(function(res) {return res.json();}).then(function(json) {
		res.render('myStore/new-service', { title: 'Mi Tienda', servicios: json, idEstablecimiento: req.params.id});
	});
});


router.get('/:id/edit/service/:idService', function(req, res) {
	fetch('http://localhost:51336/api/get/Service/'+ req.params.idService).then(function(res) {return res.json();}).then(function(json) {
		fetch('http://localhost:51336/api/get/Package/'+ req.params.idService).then(function(res) {return res.json();}).then(function(packageJson) {
			fetch('http://localhost:51336/api/get/Servicios/').then(function(res) {return res.json();}).then(function(serviciosJson) {
		 		res.render('myStore/edit-service', { title: 'Mi Tienda', servicios: serviciosJson,servicio: json, idEstablecimiento: req.params.id, packageSer: packageJson});
			}); 		
		});
	});
});

router.get('/:id/edit', function(req, res) {
	fetch('http://localhost:51336/api/get/Establecimiento/'+ req.params.id).then(function(res) {return res.json();}).then(function(json) {
		fetch('http://localhost:51336/api/District').then(function(res) {return res.json();}).then(function(json2) {
			res.render('myStore/edit-establecimiento', { title: 'Mi Tienda', establecimiento: json, districts:  json2});
		});	
	});
});


module.exports = router;
