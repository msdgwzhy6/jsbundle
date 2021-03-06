var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var login = require('./render/login');
var index = require('./render/index');
var upload = require('./render/upload');
var about = require('./render/about');

var bundleServer = require('./service/bundle');
var loginServer = require('./service/login');
var uploadServer = require('./service/upload');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'ssssGGTSRWS#233',
  name: 'NSNXJSS7SSGWGWGR5V',
  cookie: {maxAge: 1000*60*60 },
  resave: false,
  saveUninitialized: true,
}));


/*路由*/
app.use('/', login);
app.use('/service/login', loginServer);

app.use('/upload', upload);
app.use('/service/upload', uploadServer);

app.use('/index', index);
app.use('/about', about);

app.use('/bundle', bundleServer);




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
