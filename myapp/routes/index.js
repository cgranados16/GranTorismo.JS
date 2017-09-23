var express = require('express');
var router = express.Router();
var _ = require('lodash');
var fetch = require('node-fetch');

function getUserDetails(id){
  return fetch('http://localhost:51336/api/User/'+id)
    .then(function(res) {
        return res.json();
    }).then(function(json) {
        return json;
    });	
}

router.get(/^(.*)$/, function(req, res, next){
  if (req.cookies.user){
    var cookie = JSON.parse(req.cookies.user);
	getUserDetails(cookie['IdCard']).then(function(result) {
         _parameters = {user : result};
  		 parameters = _.extend(res.locals, _parameters);
  		 next();
    });
  }else{
  	parameters = _.extend(res.locals, {user : '' });
	next();
  }
});

function OwnerAuth(req,res,next){
  var cookie = JSON.parse(req.cookies.user);
  console.log(cookie['Role']);
  if (cookie['Role'] != 'Owner'){
    res.redirect('/');
  }
  next();
}

function IsLogged(req,res,next){
   if (!req.cookies.user){
    res.redirect('/signUp')
  }
  next();
}

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.cookies.user){
    var cookie = JSON.parse(req.cookies.user);
    if (cookie['Role'] != 'Owner'){
      res.render('index-Owner', { title: 'Express'});
    }else if (cookie['Role'] != 'Admin'){
      res.render('index-Admin', { title: 'Express'});
    }
  }
  res.render('index', { title: 'Express'});
});

router.get('/caca',IsLogged, OwnerAuth, function(req, res, next) {
      res.send("Caca");
});

router.get('/signOut', function (req, res) {
  res.clearCookie('user');
  res.redirect('/');
})


module.exports = router;
