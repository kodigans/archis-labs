var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var url = 'mongodb://localhost:27017';
var dbName = 'mydb';

var MongoClient = require('mongodb').MongoClient;
var client = new MongoClient(url, { useNewUrlParser: true });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/clients', function(req, res) {
  client.connect(function(err) {
    if (err) {
      console.log(err);
      res.status(500);
    } else {
      console.log('Connected successfully to server');

      var db = client.db(dbName);
      var collection = db.collection('clients');

      collection.find({}).toArray(function(err, docs) {
        // сортируем по id
        var sortedDocs = docs.sort(function(a, b) {
          if (a.id > b.id) {
            return 1;
          } else if (a.id < b.id) {
            return -1;
          } else {
            return 0;
          }
        });

        res.send(sortedDocs);
      });
    }

    client.close();
  });
});

app.get('/api/clients/:id', function(req, res) {
  client.connect(function(err) {
    if (err) {
      console.log(err);
      res.status(500);
    } else {
      console.log('Connected successfully to server');

      var db = client.db(dbName);
      var collection = db.collection('clients');

      collection.find({ id: +req.params.id }).toArray(function(err, docs) {
        res.send(docs);
      });
    }

    client.close();
  });
});

app.post('/api/clients', function(req, res) {
  client.connect(function(err) {
    if (err) {
      console.log(err);
      res.status(500);
    } else {
      console.log('Connected successfully to server');
      console.log(req.body);

      var db = client.db(dbName);
      var collection = db.collection('clients');

      collection.insertOne(req.body).then(function(result) {
        console.log(
          'New doc has been successfuly inserted into clients',
          result.result
        );
        res.send(result);
      });
    }

    client.close();
  });
});

var port = 3000;

app.listen(port, function() {
  console.log('Express is running on port', port);
});
