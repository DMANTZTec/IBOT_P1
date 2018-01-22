var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs=require('fs');
var cors=require('cors');
var index = require('./routes/index');
var users = require('./routes/users');
var loadTestcases=require('./routes/loadTestcases');
var barcode=require('./routes/barcode');
var testing=require('./routes/testing');
var barcodeScanner_v2=require('./routes/barcodeScanner_v2');
var jigType_v2=require('./routes/jigType_v2');
var startTesting_v2=require('./routes/startTesting_v2');
var nextTestcase_v2=require('./routes/nextTestcase_v2');
var LoadTestJigData_BE=require('./routes/LoadTestJigData_BE');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'config')));

app.use('/', index);
app.use('/users', users);
app.use('/loadTestcases', loadTestcases);
app.use('/testing', testing);
app.use('/barcode', barcode);
app.use('/barcodeScanner_v2', barcodeScanner_v2);
app.use('/jigType_v2',jigType_v2);
app.use('/startTesting_v2',startTesting_v2);
app.use('/nextTestcase_v2',nextTestcase_v2);
app.use('/LoadTestJigData_BE',LoadTestJigData_BE);

/*var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
};
app.set(function() {
    app.use(allowCrossDomain);
    //some other code
});*/
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
app.use(cors());
app.options('*', cors());
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
