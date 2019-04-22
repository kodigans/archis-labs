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
      .insertMany([
        {
          id: 21,
          first_name: 'John',
          last_name: 'Doe',
          gender: 'Male',
          date_of_birth: '1995-12-12',
          address: '937 Sycamore Crossing',
          phone: '134-484-3572',
          email: 'john_doe@mongo.com'
        },
        {
          id: 22,
          first_name: 'Jane',
          last_name: 'Doe',
          gender: 'Female',
          date_of_birth: '1995-12-12',
          address: '937 Sycamore Crossing',
          phone: '134-484-3572',
          email: 'jane_doe@mongo.com'
        }
      ])
      .then(function(result) {
        console.log('2 docs have been inserted into clients', result.result);
      });
  }

  client.close();
});
