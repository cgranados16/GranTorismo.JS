var express = require('express');
var router = express.Router();
var fetch = require('node-fetch');

/* GET home page. */
function getCategories(){
  return fetch('http://localhost:51336/api/Shop/Categories')
      .then(function(res) {
          return res.json();
      }).then(function(json) {
          return json;
      });	
}

router.get('/', function(req, res, next) {	
    getCategories().then(function(result) {
        res.render('cart', { title: 'cart', categories: result});
    });
  });	  

module.exports = router;
