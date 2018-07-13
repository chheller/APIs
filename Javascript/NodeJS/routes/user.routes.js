const { parseBody, handleError, sendResponse } = require("../utilities");

class UserRoutes {
  constructor(userSvc) {
    this.userSvc = userSvc;
  }

  post(request, response) {
    return parseBody(request)
      .then(body => {
        this.userSvc
          .addUser({ name: body.name, age: body.age })
          .then(result => {
            sendResponse(response, result.ops);
          })
          .catch(err => {
            console.error(err);
            handleError(response, 500, err);
          });
      })
      .catch(err => {
        console.error(err);
        handleError(response, 500, err);
      });
  }

  get(request, response) {
    const params = request.url.split("/")[2];
    if (params) {
      return this.userSvc.getUser(params).then(user => {
        if (!!user && user.length > 0) {
          sendResponse(response, { user });
        } else {
          handleError(response, 404, "Resource Not Found");
        }
      });
    }
    return this.userSvc.getAllUsers().then(users => {
      sendResponse(response, { users });
    });
  }
}

module.exports = UserRoutes;
