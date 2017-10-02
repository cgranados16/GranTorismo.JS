var express = require('express');
var router = express.Router();
var fetch = require('node-fetch');

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

function IsLogged(req, res, next) {
  if (!req.cookies.user) {
    res.redirect('/signUp')
  }
  next();
}

router.get('/', function(req, res, next) {
  getCategories().then(function(result) {
    res.render('store', {
      title: 'Gran Torismo',
      categories: result
    });
  });
});

router.get('/history', IsLogged, function(req, res, next) {
  res.render('customer-orders', {
    title: 'Gran Torismo'
  });
});

router.get('/service', function(req, res, next) {
  getSuggestions(req.param.idService).then(function(result){
    res.render('service', {title: 'Gran Torismo', serviceData: result});
  });
});

module.exports = router;
