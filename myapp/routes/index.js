var express = require('express');
var router = express.Router();
var _ = require('lodash');

router.get(/^(.*)$/, function(req, res, next){
  var cookieuser = req.cookies.user || '';
  var _parameters = {user : cookieuser};
  parameters = _.extend(res.locals, _parameters);
  next();
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/signOut', function (req, res) {
  res.clearCookie('user');
  res.redirect('/');
})


module.exports = router;
