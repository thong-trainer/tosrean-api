const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const logger = require('morgan');
const multer = require('multer');
const ejs = require('ejs');
const app = express();
// https://github.com/expressjs/cookie-parser
const cookieParser = require('cookie-parser');
// https://github.com/expressjs/session
const session = require('express-session');
// http://www.passportjs.org/
const passport = require('passport');
const flash = require('connect-flash');

// EJS
app.set('view engine', 'ejs');

// middleware
app.use(logger('dev'));

// public folder
app.use('/public', express.static('./public'));

// cookie bodyParser and session
app.use(cookieParser());
app.use(session({
  secret: 'AnyStringOfText',
  resave: true,
  saveUninitialized: true,
  cookie: { secure: true }
}));

// initialize passport (note: this block mush after seesion above)
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


// connect to mongodb
const db = require('./config/database');
mongoose.connect(db.url, function(error){
    if(error) console.log(error);
    console.log("connection successful");
});
mongoose.Promise = global.Promise;
require('./config/passport')(passport);

// accept body json format
app.use(bodyParser.json());


// initialize routes
app.use('/api/v1/demo', require('./routes/api/test'));

app.use('/api/v1/auth', require('./routes/api/auth'));
app.use('/api/v1/upload', require('./routes/api/upload'));
app.use('/api/v1/user', require('./routes/api/user'));
app.use('/api/v1/school', require('./routes/api/school'));
app.use('/api/v1/level', require('./routes/api/level'));
app.use('/api/v1/department', require('./routes/api/department'));
app.use('/api/v1/subject', require('./routes/api/subject'));
app.use('/api/v1/teacher', require('./routes/api/teacher'));
app.use('/api/v1/student', require('./routes/api/student'));
app.use('/api/v1/class', require('./routes/api/class'));
app.use('/api/v1/group', require('./routes/api/group'));
app.use('/api/v1/comment', require('./routes/api/comment'));
app.use('/api/v1/rating', require('./routes/api/rating'));


app.get('/', (req, res) => res.render('index'));

// catch 404 errors and forward them to error handling middleware
app.use(function(req, res, next){
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handling middleware
app.use(function(err, req, res, next){
  console.log(err);
  const error = app.get('env') === 'development' ? err : {};
  const status = err.status || 500;
  res.status(status).send({error: error.message});
});

// listen for requests
app.listen(process.env.port || 4000, function(){
  console.log('now listening on port: localhost:4000');
});
