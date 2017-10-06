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
function getImg(path, id){
  fetch("http://localhost:51336/api/Show/Image/"+ path +"/" + id)
  .then(function(res) {
     console.log(path);
     var dest = fs.createWriteStream('./public/tmp/'+path);
     return res.body.pipe(dest);
     console.log("caca")
  });
}


router.get('/service/:id', function(req, res, next) {
  //var suggestions = getSuggestions(req.params.id);
  getService(req.params.id)
  .then(function(serviceData){
    
    for (var i = 0; i < serviceData.fotos.length; i++) {
      getImg(serviceData.fotos[i],req.params.id);
    }
    getSuggestions(req.params.id)
    .then(function(suggestions){
      
      res.render('service', {
        title: 'Gran Torismo',
        serviceData: serviceData,
        suggestions: suggestions
      });
    });
  });
});



module.exports = router;
;