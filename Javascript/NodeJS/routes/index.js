const UserRoutes = require("./user.routes.js");
const { handleError, sendResponse } = require("../utilities");

class DefaultRoutes {
  constructor() {}
  get(request, response) {
    sendResponse(response, "Hello from Vanilla NodeJS!");
  }
}

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
        try {
          this.routes.user[method](request, response);
        } catch (err) {
          handleError(405, "Method Not Allowed", response);
        }
        break;
      case "":
        try {
          this.routes.default[method](request, response);
        } catch (err) {
          handleError(405, "Method Not Allowed", response);
        }
        break;
      default:
        handleError(404, "Route Not Found", response);
        break;
    }
  }
}

module.exports = Router;
