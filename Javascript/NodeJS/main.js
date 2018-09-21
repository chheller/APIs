const http = require('http');
const Router = require('./routes');
const MongoDb = require('./database');
const UserService = require('./services/user.service');

function parseArgv() {
  const argv = {};
  process.argv.slice(2).forEach(arg => {
    if (arg.includes('=')) {
      const parseArg = arg.split('=');
      argv[parseArg[0]] = parseArg[1];
    } else argv[arg] = true;
  });
  return argv;
}

/**
 * The entry point to the application
 * @class App
 */
class App {
  constructor(port = process.env.PORT || 3000) {
    this.init();
    this.server.listen(port, () => {
      console.log('listening on ', port);
    });
  }

  init() {
    const { db_port } = parseArgv();

    this.db = new MongoDb(db_port);
    this.router = new Router({ userSvc: new UserService(this.db) });
    let handle = this.router.handleRequest.bind(this.router);
    this.server = http.createServer();
    this.server.on('request', handle);
  }
}

new App();
