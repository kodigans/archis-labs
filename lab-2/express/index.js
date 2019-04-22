var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var MongoClient = require('mongodb').MongoClient;

var url = 'mongodb://localhost:27017';
var dbName = 'mydb';

var client = new MongoClient(url, { useNewUrlParser: true });
var db = client.db(dbName);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res) {
  res.send('Hello World!');
});

app.get('/clients', function(req, res) {
  client.connect(function(err) {
    if (err) {
      console.log(err);
      res.status(500);
    } else {
      console.log('Connected successfully to server');

      var collection = db.collection('clients');

      collection.find({}).toArray(function(err, docs) {
        res.send(docs);
      });
    }

    client.close();
  });
});

app.get('/clients/:id', function(req, res) {
  client.connect(function(err) {
    if (err) {
      console.log(err);
      res.status(500);
    } else {
      console.log('Connected successfully to server');

      var collection = db.collection('clients');

      collection.find({ id: +req.params.id }).toArray(function(err, docs) {
        res.send(docs);
      });
    }

    client.close();
  });
});

app.post('/clients', function(req, res) {
  client.connect(function(err) {
    if (err) {
      console.log(err);
      res.status(500);
    } else {
      console.log('Connected successfully to server');
      console.log(req.body);

      var collection = db.collection('clients');

      collection.insertOne(req.body).then(function(result) {
        console.log('new doc have been inserted into clients', result.result);
        res.send(result);
      });
    }

    client.close();
  });
});

app.listen(3000, function() {
  console.log('Example app listening on port 3000!');
});
