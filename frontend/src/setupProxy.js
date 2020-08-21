const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    [
      "/currentUser",
      "/users/*",
      "/newuser",
      "/project/*",
      "/project",
      "/user",
      "/backlog/*",
      "/story",
    ],
    createProxyMiddleware({
      target: "http://localhost:5000",
    })
  );
};
