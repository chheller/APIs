module.exports = {
  /**
   *  Parses the body of a request
   * @param {Request} request
   * @returns {Promise<Object>} A promise containing the parsed body
   */
  parseBody(request) {
    const body = [];
    return new Promise(resolve => {
      request.on("data", chunk => body.push(chunk)).on("end", () => {
        resolve(JSON.parse(Buffer.concat(body).toString()));
      });
    });
  },

  handleError(response, status, msg) {
    response.writeHead(status || 500, { "Content-Type": "text/plain" });
    response.write(msg);
    response.end();
  },

  sendResponse(response, data, opts) {
    opts = opts || {
      "Content-type":
        typeof data === "object" ? "application/json" : "text/plain"
    };
    response.writeHead(opts.status || 200, opts);
    response.write(typeof data === "object" ? JSON.stringify(data) : data);
    response.end();
  }
};
