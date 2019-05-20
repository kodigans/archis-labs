Run MongoDB Server

```
./bin/mongod --dbpath c:/mongodb/data --port 27017
```

Run MongoShell

```
./bin/mongo --host localhost --port 27017
```

Drop current collections

```
use mydb
db.clients.drop()
db.apps.drop()
db.sells.drop()
```

Import JSONs

```
./bin/mongoimport --db mydb --collection clients --jsonArray c:/mongodb/data-mocks/clients.json
./bin/mongoimport --db mydb --collection apps --jsonArray c:/mongodb/data-mocks/apps.json
./bin/mongoimport --db mydb --collection sells --jsonArray c:/mongodb/data-mocks/sells.json
```

Backup DB

```
./bin/mongodump --db mydb --out c:/mongodb/backup
```

Restore DB

```
./bin/mongorestore --db mydb --drop c:/mongodb/backup/mydb
```
