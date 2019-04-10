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

    collection.deleteOne({ id: 1 }).then(function(result) {
      console.log('Doc with id = 1 have been removed', result.result);
    });
  }

  client.close();
});
