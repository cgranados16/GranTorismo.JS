var express = require('express');
var router = express.Router();
var fetch = require('node-fetch');
var fs = require('fs');

/* GET home page. */
function getCategories() {
  return fetch('http://localhost:51336/api/Shop/Categories')
    .then(function(res) {
      return res.json();
    }).then(function(json) {
      return json;
    });
}

function getSuggestions(idServicio) {
  return fetch('http://localhost:51336/api/Product/Recomendations/View/' + idServicio)
    .then(function(res) {
      return res.json();
    }).then(function(json) {
      return json;
    });
}

function getService(idService){
  return fetch("http://localhost:51336/api/Product/" + idService)
  .then(function(res) {
    return res.json();
  }).then(function(json){
    return json;
  });
}


function IsLogged(req, res, next) {
  if (!req.cookies.user) {
    res.redirect('/signUp')
  }
  next();
}

router.get('/', function(req, res, next) {
  getCategories().then(function(result) {
    var respuesta = {
      title: 'Gran Torismo',
      categories: result,
      IdCard: null
    };
    if (req.cookies.user) {
      var cookie = JSON.parse(req.cookies.user);
      respuesta.IdCard = cookie["IdCard"];
    }
    res.render('store', respuesta);
  });
});

router.get('/history', IsLogged, function(req, res, next) {
  res.render('customer-orders', {
    title: 'Gran Torismo'
  });
});


router.get('/service/:id', function(req, res, next) {
  var idCard = 0;
  if (req.cookies.user) {
      idCard = JSON.parse(req.cookies.user)["IdCard"];
    }
  getService(req.params.id)
  .then(function(serviceData){
    getSuggestions(req.params.id)
    .then(function(suggestions){
      fetch("http://localhost:51336/api/Like/Get/" + idCard + "/" + req.params.id).then(function(res) {return res.json();}).then(function(likeResult){
          res.render('service', {
            title: 'Gran Torismo',
            serviceData: serviceData,
            suggestions: suggestions,
            liked: likeResult
        });
      });
    });
  });
});



module.exports = router;
;