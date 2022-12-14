var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const itemsRouter = require('./routes/items')
const cors = require("cors")
var app = express();
const port = process.env.PORT || 3000
const dotenv = require('dotenv')

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
dotenv.config()
mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.6hhs6oc.mongodb.net/?retryWrites=true&w=majority`)
mongoose.connection.on('connected', () => {
  console.log("database connected");
})
app.use(logger('dev'));
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/items', itemsRouter);

app.listen(port, () => {
  console.log(`running on port: ${port}`);
})
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

module.exports = app;
