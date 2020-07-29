const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    ["/currentUser", "/users/login"],
    createProxyMiddleware({
      target: "http://localhost:3000",
    })
  );
};