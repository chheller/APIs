const http = require("http");
const Router = require("./routes");
const MongoDb = require("./database");
const UserService = require("./user.service");

class App {
  constructor(port = process.env.PORT || 3000) {
    this.db = new MongoDb();
    this.router = new Router({ userSvc: new UserService(this.db) });
    let handle = this.router.handleRequest.bind(this.router);
    this.server = http.createServer();
    this.server.on("request", handle);
    this.server.listen(port, () => {
      console.log("listening on ", port);
    });
  }
}

new App();
