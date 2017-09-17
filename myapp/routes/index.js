var express = require('express');
var _ = require('lodash');
var router = express.Router();

router.get(/^(.*)$/, function(req, res, next){
  var cookieuser = req.cookies.userId || '';
  var _parameters = {user : cookieuser};
  parameters = _.extend(res.locals, _parameters);
  next();
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express'});
});

router.get('/signOut', function (req, res) {
  res.clearCookie('userId');
  res.redirect('/');
})

module.exports = router;
