var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors=require('cors')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var TeacherRouter = require('./routes/teachers.js');
var TestRouter = require('./routes/test');
var lessonRouter = require('./routes/lesson');
var studentRouter = require('./routes/student');
const mongoose = require('mongoose');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Credentials", true);
  next();
});
app.use(cors())
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/teacher', TeacherRouter);
app.use('/test', TestRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const url = 'mongodb://localhost:27017/mySchoolDB'
const mongoUrl='mongodb+srv://myDBPassword:myDBPassword@cluster0.49ipj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
mongoose.connect(mongoUrl)
.then(()=>console.log('DB connected'))
.catch(err=>console.log('error while connecting to Mongoose ',err))

module.exports = app;
