const UserRoutes = require("./user.routes.js");

class Router {
  constructor(svcs) {
    this.svcs = svcs;
    this.routes = {
      user: new UserRoutes(svcs.userSvc),
      default: new DefaultRoutes()
    };
  }

  handleRequest(request, response) {
    const url = request.url.split("/")[1];
    const method = request.method.toLowerCase();
    switch (url) {
      case "users":
        this.routes.user[method](request, response) ||
          this.handleError(403, "Method Not Allowed", response);
        break;
      case "":
        this.routes.default[method](request, response) ||
          this.handleError(403, "Method Not Allowed", response);
        break;
      default:
        response.writeHead(404, { "Content-Type": "text/plain" });
        response.write("Route not Found");
        response.end();
        break;
    }
  }
  handleError(status, msg, response) {
    response.writeHead(status, { "Content-Type": "text/plain" });
    response.write(msg);
    response.end();
  }
}

class DefaultRoutes {
  constructor() {}
  get(request, response) {
    response.writeHead(200, { "Content-Type": "plain/text" });
    response.write("Hello from Vanilla NodeJS!");
    response.end();
  }
}

module.exports = Router;
