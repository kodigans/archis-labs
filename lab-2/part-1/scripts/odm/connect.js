var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mydb', { useNewUrlParser: true });

var db = mongoose.connection;

db.on('error', console.log('connection error:'));
db.once('open', function() {
  console.log('connected successfully to server');
});
