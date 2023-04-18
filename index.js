const port = 3000;
const server = require("http")
  .createServer(require("./app/app"))
  .listen(port, function () {
    console.warn("HTTP SERVER STARTED ON PORT : " + port);
  });
module.exports = server;
