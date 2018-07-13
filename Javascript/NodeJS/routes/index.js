const UserRoutes = require("./user.routes.js");
const { handleError, sendResponse } = require("../utilities");

class DefaultRoutes {
  constructor() {}
  get(request, response) {
    sendResponse(response, "Hello from Vanilla NodeJS!");
  }
}
/**
 * @class Router
 * @property {Object} svcs The services to inject into the router's routes
 * @property {Object} routes The defined routes for the app to use
 */
class Router {
  constructor(svcs) {
    this.svcs = svcs;
    this.routes = {
      user: new UserRoutes(svcs.userSvc),
      default: new DefaultRoutes()
    };
  }

  /**
   * Handles all incoming requests, routing them to the appropriate router function
   * @param {Request} request
   * @param {Response} response
   */
  handleRequest(request, response) {
    const url = request.url.split("/")[1];
    const method = request.method.toLowerCase();

    switch (url) {
      case "users":
        try {
          this.routes.user[method](request, response);
        } catch (err) {
          console.error(err);
          handleError(response, 405, "Method Not Allowed");
        }
        break;
      case "":
        try {
          this.routes.default[method](request, response);
        } catch (err) {
          handleError(response, 405, "Method Not Allowed");
        }
        break;
      default:
        handleError(response, 404, "Route Not Found");
        break;
    }
  }
}

module.exports = Router;
