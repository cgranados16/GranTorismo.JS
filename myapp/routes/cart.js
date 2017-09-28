var express = require('express');
var router = express.Router();
var fetch = require('node-fetch');

/* GET home page. */
function getCart(id){
  return fetch('http://localhost:51336/api/Cart/'+id)
      .then(function(res) {
          return res.json();
      }).then(function(json) {
        console.log(json);
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

router.get('/', function(req, res, next) {
    if (req.cookies.user){
      var cookie = JSON.parse(req.cookies.user);
      getCart(cookie['IdCard']).then(function(result){
        res.render('cart', { title: 'cart', cartContent : result});
      });
    }
  });

module.exports = router;
