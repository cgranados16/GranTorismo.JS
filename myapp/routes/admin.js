var express = require('express');
var router = express.Router();
var fetch = require('node-fetch');


router.get(/^(.*)$/, function(req, res, next){
    if (!req.cookies.user){
    res.redirect('/signUp')
    }
    var cookie = JSON.parse(req.cookies.user);
    if (cookie['Role'] != 'Admin'){
    res.redirect('/');
    }
    next();
});

router.get('/', function(req, res, next) {
  res.render('admin/index', { title: 'Admin'});
});

router.get('/Categorias', function(req, res, next) {
  fetch('http://localhost:51336/api/Shop/Categories')
    .then(function(res) {
      return res.json();
    }).then(function(json) {
      res.render('admin/Categorias', { title: 'Admin', categories:  json });
    }); 
});

router.get('/Administradores', function(req, res, next) {
  fetch('http://localhost:51336/api/Administradores/Get')
    .then(function(res) {
      return res.json();
    }).then(function(json) {
      console.log(json);
      res.render('admin/Administradores', { title: 'Admin', admins:  json, alert : res.locals.alert });
    }); 
});

router.all('/Administradores/badLogin', function(req, res) {
	req.session.alert = {
        type: 'danger',
        message: 'Datos invalidos.'
    }
 	
  	res.redirect('/admin/Administradores');
});

router.get('/Servicios', function(req, res, next) {
  fetch('http://localhost:51336/api/Shop/Servicios')
    .then(function(res) {
      return res.json();
    }).then(function(json) {
      res.render('admin/Categorias', { title: 'Admin', services:  json });
    }); 
});




module.exports = router;
