const express = require('express');
const app = express();
const port = 8000;
const db = require('./config/mongoose');
const csvWrite = require('csv-writer');
const json2csv = require('json2csv');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const cookieParser = require('cookie-parser');

app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.static('./assets'));
app.set('view-engine', 'ejs');
app.set('views', './views');

app.use(
  session({
    name: 'placement',
    secret: 'campdbplacement',
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use('/', require('./routes'));

app.listen(port, (error) => {
  if (error) {
    console.log(error);
    return;
  }
  console.log(port);
});
