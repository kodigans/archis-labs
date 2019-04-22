var MongoClient = require('mongodb').MongoClient;

var url = 'mongodb://localhost:27017';
var dbName = 'mydb';

var client = new MongoClient(url, { useNewUrlParser: true });

client.connect(function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log('Connected successfully to server');

    var db = client.db(dbName);

    var collection = db.collection('clients');

    collection
      .updateOne({ id: 10 }, { $set: { email: 'google@gmail.com' } })
      .then(function(result) {
        console.log('Doc with id = 10 have been updated', result.result);
      });
  }

  client.close();
});
