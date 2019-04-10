/*
 * for mongodb@2.2.12
 *
var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/mydb', function(err, db) {
  if (err) {
    console.log('Err: ', err);
  } else {
    console.log('Connected successfully to server');

    db.stats(function(err, stats) {
      console.log(stats);
    });
  }

  db.close();
});
*/

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

    db.stats().then(function(stats) {
      return console.log(stats);
    });

    var collection = db.collection('clients');

    collection.count().then(function(count) {
      console.log('Clients count: ', count);
    });
  }

  client.close();
});
