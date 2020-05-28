const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/placement_cell');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error in connecting to db'));

db.once('open', () => {
  console.log('Connected to DB');
});

module.exports = db;
