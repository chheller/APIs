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
            response.writeHead(200, { "Content-type": "application/json" });
            response.write(JSON.stringify(result.ops));
            response.end();
          })
          .catch(err => console.error(err));
      })
      .catch(err => {
        console.error(err);
        response.writeHead(404, { "Content-type": "text/plain" });
        response.write(err);
        response.end();
      });
  }

  get(request, response) {
    const params = request.url.split("/")[2];
    if (params) {
      return this.userSvc.getUser(params).then(user => {
        if (!!user && user.length > 0) {
          response.writeHead(200, { "Content-Type": "application/json" });
          response.write(JSON.stringify({ user }));
        } else {
          response.writeHead(404, { "Content-Type": "text/plain" });
          response.write("User not found");
        }
        response.end();
      });
    }
    return this.userSvc.getAllUsers().then(users => {
      response.writeHead(200, { "Content-Type": "application/json" });
      response.write(JSON.stringify({ users }));
      response.end();
    });
  }
}

function parseBody(request) {
  const body = [];
  return new Promise(resolve => {
    request.on("data", chunk => body.push(chunk)).on("end", () => {
      resolve(JSON.parse(Buffer.concat(body).toString()));
    });
  });
}

module.exports = UserRoutes;
