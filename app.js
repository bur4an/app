const express = require('express')
const app = express()
const cors = require('cors');

const bodyParser = require('body-parser')
const session = require('express-session')
const path = require('path')
const passport = require('passport');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(express.json());
app.use(session({
  secret: 'gutu',
  resave: false,
  saveUninitialized: true
}))
app.use(cors({
  origin: '*'
}));
app.use(passport.initialize());
app.use(passport.session());

const ebay = require('./routes/ebay')
const csvdata = require('./routes/csvdata')
const msgraph = require('./routes/msgraph');
const webhook = require('./routes/webhook')
const cwapi = require('./routes/cwapi')

app.use('/ebay', ebay)
app.use('/csvdata', csvdata)
app.use('/msgraph', msgraph);
app.use('/webhook', webhook)
app.use('/cwapi', cwapi)

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', function(req, res) {
  res.sendFile(path.resolve(__dirname, 'public/index.html'));
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
