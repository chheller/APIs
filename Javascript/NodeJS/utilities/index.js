module.exports = function(request) {
  const body = [];
  return new Promise(resolve => {
    request.on("data", chunk => body.push(chunk)).on("end", () => {
      resolve(JSON.parse(Buffer.concat(body).toString()));
    });
  });
};
