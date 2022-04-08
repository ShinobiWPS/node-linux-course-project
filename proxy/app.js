var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const {
  createProxyMiddleware,
  responseInterceptor,
} = require('http-proxy-middleware');
const { rng } = require('crypto');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// req has res inside
const customRouter = function name(req) {
  if (req.query.url.includes('redir')) {
    return req.res.sendStatus(301);
  } else if (req.query.url.includes('ok')) {
    // set cookie header to test
    req.res.setHeader('Set-Cookie', 'test');
    req.res.setHeader('cookie', 'test');
    req.res.cookie('test', 'test');
    return req.res.status(200).json({ data: rng(5).toString('hex') });
  } else {
    return req.query.url;
  }
};

app.get(
  '/',
  createProxyMiddleware({
    changeOrigin: true,
    router: customRouter,
  })
);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 400);
  res.render('error');
});

module.exports = app;

// it only complains about data not being exact,but the rest is correct
