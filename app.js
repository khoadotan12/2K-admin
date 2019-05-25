const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const session = require('express-session');
const passport = require('./config/passport');
const flash = require('connect-flash');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const productsRouter = require('./routes/products');
const orderRouter = require('./routes/order');
const revenueRouter = require('./routes/revenue');
const topRouter = require('./routes/top');
const brandsRouter = require('./routes/brands');
const bodyParser = require('body-parser');

const { isLoggedIn } = require('./global');

const app = express();
const exphbs = require('express-handlebars');
const hbsHelpers = exphbs.create({
  helpers: require("./helpers/handlebars.js").helpers,
  defaultLayout: '../layout',
  extname: '.hbs'
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', hbsHelpers.engine);
app.set('view engine', '.hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(flash({ unsafe: true }));
app.use(session({
  secret: 'S6K445z(z#x1z/19gap,K',
  saveUninitialized: false,
  resave: false,
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/product', productsRouter);
app.use('/order', orderRouter);
app.use('/revenue', revenueRouter);
app.use('/top', topRouter);
app.use('/brands', brandsRouter);

// catch 404 and forward to error handler
app.use(isLoggedIn, function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(isLoggedIn, function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
