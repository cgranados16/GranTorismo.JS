var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', login: res.locals.login});
});

router.get('/signOut', function (req, res) {
  res.clearCookie('userId');
  res.redirect('/');
})

router.get('/index', function(req, res, next) {
	res.render('signUp', { title: 'Register', alert : res.locals.alert});	
});

module.exports = router;
