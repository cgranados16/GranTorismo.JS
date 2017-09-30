var express = require('express');
var router = express.Router();
var fetch = require('node-fetch');


router.get('/', function(req, res, next){
  res.send("caca");
});


module.exports = router;
