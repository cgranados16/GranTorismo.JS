var express = require('express');
var router = express.Router();
var fetch = require('node-fetch');

/* GET home page. */
function getCart(id){
  return fetch('http://localhost:51336/api/Cart/'+id)
      .then(function(res) {
          return res.json();
      }).then(function(json) {
          return json;
      });
}

function getUserDetails(id){
  return fetch('http://localhost:51336/api/User/'+id)
    .then(function(res) {
        return res.json();
    }).then(function(json) {
        return json;
    });
}


function IsLogged(req,res,next){
   if (!req.cookies.user){
    res.redirect('/signUp')
  }
  next();
}

function sumPrice(cartContent){
  var sum = 0;
  for (var i = 0; i < cartContent.length; i++){
    sum += cartContent[i].precio
  }
  return sum;
}

router.get('/', IsLogged, function(req, res, next) {
    var cookie = JSON.parse(req.cookies.user);
    getCart(cookie['IdCard']).then(function(result){
      var total = sumPrice(result);
      res.render('cart', {
        title: 'cart',
        IdCard: cookie["IdCard"],
        cartContent: result,
        subtotal: total
      });
    });
  });

module.exports = router;
