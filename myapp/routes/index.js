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
       caca = _.extend(_parameters, {role : cookie['Role']});
  		 parameters = _.extend(res.locals, _parameters);
  		 next();
    });
  }else{
  	parameters = _.extend(res.locals, {user : '', role :''});
	  next();
  }
});

function OwnerAuth(req,res,next){
  var cookie = JSON.parse(req.cookies.user);
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
    var cookie = JSON.parse(req.cookies.user) || '';
    if (cookie['Role'] == 'Admin'){
      return res.render('index-Admin', { title: 'Express'});
    }
  }
  return res.render('index', { title: 'Express'});
});

router.get('/signOut', function (req, res) {
  res.clearCookie('user');
  res.redirect('/');
});

module.exports = router;
