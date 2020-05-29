const express = require('express');
const app = express();
const port = 8000;
const db = require('./config/mongoose');
const csvWrite = require('csv-writer');
const json2csv = require('json2csv');

app.use(express.urlencoded());
app.use(express.static('./assets'));
app.set('view-engine', 'ejs');
app.set('views', './views');

app.use('/', require('./routes'));

app.listen(port, (error) => {
  if (error) {
    console.log(error);
    return;
  }
  console.log(port);
});
