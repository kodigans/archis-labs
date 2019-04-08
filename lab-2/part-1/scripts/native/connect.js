var MongoClient = require('mongodb').MongoClient;

var client = new MongoClient('mongodb://localhost:27017');

client.connect(function(err) {
  if (err) {
    console.log('connection error:', err);
  } else {
    console.log('connected successfully to server');

    client
      .db('mydb')
      .stats()
      .then(console.log);
  }

  client.close();
});
