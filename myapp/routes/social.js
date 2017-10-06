var express = require('express');
var router = express.Router();
var fetch = require('node-fetch');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('social/index', { title: 'Social' });
});

router.get('/profile', function(req, res, next) {
	if (req.query.id){
		fetch('http://localhost:51336/api/User/Client/'+req.query.id).then(function(res) {return res.json();}).then(function(json) {
			fetch('http://localhost:51336/api/Reviews/Get/'+req.query.id).then(function(res) {return res.json();}).then(function(reviewsJson) {
				var name = json.FirstName +' '+ json.LastName;
			       return res.render('social/profile', { title: name, profile : json, reviews: reviewsJson});
			});	      
		}).catch(function() {
      			 next();
   		});
	}else{
		return res.redirect('/social');
	}
});

router.get('/followers', function(req, res, next) {
	fetch('http://localhost:51336/api/User/'+res.locals.user.IdCard+'/Followers')
		    .then(function(res) {
	    		return res.json();		        
		    }).then(function(json) {
		    	console.log(json);
		        return res.render('social/followers', { title: 'Followers', followers : json});
		    }).catch(function() {
      			 next();
   			 });
});

router.get('/following', function(req, res, next) {
	fetch('http://localhost:51336/api/User/'+res.locals.user.IdCard+'/Following')
		    .then(function(res) {
	    		return res.json();		        
		    }).then(function(json) {
		    	 console.log(json);
		        return res.render('social/following', { title: 'Following', following : json});
		    }).catch(function() {
      			 next();
   			 });
});

module.exports = router;

//http://localhost:3000/social/profile?id=12498413