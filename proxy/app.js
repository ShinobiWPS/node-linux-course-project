var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var proxy = require('express-http-proxy');
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

app.get(
  '/',
  proxy((req, res, next) => req.query.url, {
    filter: function (req, res) {
      if (req.query.url.includes('redir')) {
        return res.sendStatus(301);
      } else if (req.query.url.includes('ok')) {
        // set cookie header to test
        res.setHeader('Set-Cookie', 'test');
        res.setHeader('cookie', 'test');
        res.cookie('test', 'test');
        return res.status(200).json({ data: rng(5).toString('hex') });
      } else {
        return req.query.url;
      }
    },
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
