var jsonServer = require('json-server');

var server = jsonServer.create();
var middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

var router = jsonServer.router('./db.json');

server.use('/api', router);

var port = 3000;

server.listen(port, () => {
  console.log('JSON Server is running on port', port);
});
