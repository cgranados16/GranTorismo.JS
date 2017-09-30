var express = require('express');
var router = express.Router();
var fetch = require('node-fetch');

function IsLogged(req,res,next){
   if (!req.cookies.user){
    res.redirect('/signUp')
  }
  next();
}

router.get('/store-history', function(req, res, next){
  res.render('customer-orders', {title: 'Gran Torismo'});
});

module.exports = router;
