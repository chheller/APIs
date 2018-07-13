class UserRoutes {
  constructor(userSvc) {
    this.userSvc = userSvc;
  }
  post(request, response) {}
  get(request, response) {
    const params = request.url.split("/")[2];
    if (params) {
      this.userSvc.getUser(params).then(user => {
        if (!!user && user.length > 0) {
          response.writeHead(200, { "Content-Type": "application/json" });
          response.write(JSON.stringify({ user }));
        } else {
          response.writeHead(404, { "Content-Type": "application/json" });
        }
        response.end();
      });
    } else {
      this.userSvc.getAllUsers().then(users => {
        response.writeHead(200, { "Content-Type": "application/json" });
        response.write(JSON.stringify({ users }));
        response.end();
      });
    }
  }
}

module.exports = UserRoutes;
