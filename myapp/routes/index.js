var express = require('express');
var router = express.Router();
var _ = require('lodash');
var fetch = require('node-fetch');

function getUserDetails(id){
  return fetch('http://localhost:51336/api/User/'+id)
    .then(function(res) {
        return res.json();
    }).then(function(json) {
        return json
    });	
}

router.get(/^(.*)$/, function(req, res, next){
  var cookieuser = req.cookies.user || '';
  var _parameters = {user : cookieuser};
  if (req.cookies.user){
  	getUserDetails(cookieuser).then(function(result) {
         _parameters = {user : result};
  		 parameters = _.extend(res.locals, _parameters);
  		 next();
    });
  }else{
  	parameters = _.extend(res.locals, _parameters);
	next();
  }
});

/* GET home page. */
router.get('/', function(req, res, next) {
  	res.render('index', { title: 'Express'});
});

router.get('/signOut', function (req, res) {
  res.clearCookie('user');
  res.redirect('/');
})


module.exports = router;
