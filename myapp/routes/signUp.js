var express = require('express');
var router = express.Router();
var fetch = require('node-fetch');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('signUp', { title: 'Register', alert : res.locals.alert });
});

router.all('/badLogin', function(req, res) {
	req.session.alert = {
        type: 'danger',
        message: 'Invalid username or password.'
    }
 	
  	res.redirect('/signUp');
});


module.exports = router;
