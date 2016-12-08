import * as express from 'express';
import * as path from 'path';
import * as favicon from 'serve-favicon';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import * as ejs from 'ejs';
import * as mongoose from 'mongoose';
import * as acl from 'acl';
import * as session from 'express-session';
import * as colors from 'colors';
import Permission from './config/permission';
import routes from './routes/index';
import * as passport from 'passport';
require("./config/passport")
import Map from './models/ddapp'
import maps from './api/maps';
// import users from './api/users';
let env = require("dotenv");
let app = express();

const MongoStore = require('connect-mongo')(session);
if (app.get('env') === 'development') env.load();
let dbc = mongoose.connect(process.env.MONGO_URI);

let sess  = {
  maxAge: 172800000,
  secure: false,
  httpOnly: true
}
colors.setTheme({

  warn:"red"
});

if(app.get('env') === 'production') {
  sess.secure = true
}




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(session({
  cookie: sess,
  secret: process.env.SESSION_SECRET,
  store: new MongoStore({
    url: process.env.MONGO_URI
  }),
  unset: 'destroy',
  resave: false,
  saveUninitialized: false
}));


mongoose.connection.on('connected', () => {
  Permission.setPermission(dbc);
});

mongoose.connection.on('error', (err) => {
  console.log('mongoose error');
  console.log(err);
});

app.set('trust proxy', 1);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use('/api/maps', maps);
app.use(express.static(path.join(__dirname, 'public')));
app.use('/bower_components', express.static(path.join(__dirname, 'bower_components')));
app.use('/ngApp', express.static(path.join(__dirname, 'ngApp')));
app.use('/api', express.static(path.join(__dirname, 'api')));
console.log(__dirname);
app.use('/', routes);
app.use('/api', require('./api/users'));


// redirect 404 to home for the sake of AngularJS client-side routes
app.get('/*', function(req, res, next) {
  if (/.js|.html|.css|templates|js|scripts/.test(req.path) || req.xhr) {
    return next({ status: 404, message: 'Not Found' });
  } else {
    return res.render('index');
  }
});


// catch 404 and forward to error handler
app.use((req, res, next) => {
  let err = new Error('Not Found');
  err['status'] = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err:Error, req, res, next) => {
    res.status(err['status'] || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err:Error, req, res, next) => {
  res.status(err['status'] || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

export = app;
