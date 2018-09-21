const { parseBody, handleError, sendResponse } = require('../utilities');

class UserRoutes {
  constructor(userSvc) {
    this.userSvc = userSvc;
  }

  post(request, response) {
    return parseBody(request)
      .then(body => {
        this.userSvc.addUser({ name: body.name, age: body.age }).then(result => {
          sendResponse(response, result.ops);
        });
      })
      .catch(err => {
        console.error(err);
        handleError(response, 500, err.message);
      });
  }
  /**
   * Responds to a route matching 'users' with an optional id paramter to search
   * @param {Request} request
   * @param {Response} response
   *
   */
  get(request, response) {
    const params = request.url.split('/')[2];

    if (params) {
      const ids = params.split(',').filter(id => typeof id === 'string' && id.length > 0);
      return this.userSvc
        .getUsers(ids)
        .then(user => {
          if (!!user && user.length > 0) {
            sendResponse(response, { user });
          } else {
            handleError(response, 404, 'Resource Not Found');
          }
        })
        .catch(err => {
          console.error(err);
          handleError(response, 500);
        });
    }
    return this.userSvc
      .getAllUsers()
      .then(users => {
        sendResponse(response, { users });
      })
      .catch(err => handleError(response, 500));
  }
}

module.exports = UserRoutes;
