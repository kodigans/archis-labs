var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var port = 3017;

var url = 'mongodb://localhost:27017';
var dbName = 'mydb';

var MongoClient = require('mongodb').MongoClient;
var client = new MongoClient(url, { useNewUrlParser: true });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-type');
  // res.setHeader('Content-type', 'application/json; charset=utf-8');
  next();
});

// импорт из другого файла
var idComparator = require('./utils').idComparator;

client.connect(function(err) {
  if (err) {
    console.log(err);
    res.status(500);
  } else {
    console.log('Connected successfully to server');

    var db = client.db(dbName);

    app.get('/api/clients', function(req, res) {
      var collection = db.collection('clients');

      collection.find({}).toArray(function(err, docs) {
        // сортируем результаты
        var sortedDocs = (docs || []).sort(idComparator);

        res.send(sortedDocs);
      });
    });

    app.get('/api/clients/:id', function(req, res) {
      var collection = db.collection('clients');

      collection.find({ id: +req.params.id }).toArray(function(err, docs) {
        res.send(docs[0]);
      });
    });

    app.delete('/api/clients/:id', function(req, res) {
      var collection = db.collection('clients');

      collection.deleteOne({ id: +req.params.id }).then(function(result) {
        console.log(
          'Doc with id=' +
            req.params.id +
            ' has been successfuly deleted from Сlients'
        );
        console.log('Result', result.result);
        res.send(result);
      });
    });

    app.post('/api/clients', function(req, res) {
      console.log('Request body', req.body);

      var db = client.db(dbName);
      var collection = db.collection('clients');

      // получаем список всех документов
      collection.find({}).toArray(function(err, docs) {
        // сортируем результаты
        var sortedDocs = (docs || []).sort(idComparator);

        // определяем новый ID
        var newId = (sortedDocs.pop() || { id: 1 }).id + 1;

        // добавляем его в body
        var extBody = Object.assign({}, req.body, { id: newId });

        collection.insertOne(extBody).then(function(result) {
          console.log('New doc has been successfuly inserted into Сlients');
          console.log('Result', result.result);
          res.send(result);
        });
      });
    });

    app.put('/api/clients/:id', function(req, res) {
      var collection = db.collection('clients');

      collection
        .updateOne({ id: +req.params.id }, { $set: req.body })
        .then(function(result) {
          console.log(
            'Doc with id=' +
              req.params.id +
              ' has been successfuly updated in Сlients'
          );
          console.log('Result', result.result);
          res.send(result);
        });
    });

    app.listen(port, function() {
      console.log('Express is running on port', port);
    });
  }
});
