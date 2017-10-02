var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var flash = require('connect-flash');
const fetch = require('node-fetch');

var index = require('./routes/index');
var users = require('./routes/users');
var signUp = require('./routes/signUp');
var store = require('./routes/store');
var myStore = require('./routes/myStore');
var cart = require('./routes/cart');
var store_history = require('./routes/cart');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'keyboard cat',
    resave: true,
  	saveUninitialized: true,
}));
app.use(flash());

app.use(function(req, res, next){
    // if there's a flash message in the session request, make it available in the response, then delete it
    res.locals.alert = req.session.alert;
    delete req.session.alert;
    next();
});


app.use('/', index);
app.use('/users', users);
app.use('/SignUp', signUp);
app.use('/store', store);
app.use('/myStore', myStore);
app.use('/cart', cart);
app.use('/store-history', store_history);

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
