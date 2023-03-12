const loginRouter = require("./accounts.route");
const playerRouter = require("./players.route");
const managerRouter = require("./managers.route");

function route(app) {
  // route dang nhap
  app.use("/account", loginRouter);
  // route player
  app.use("/player", playerRouter);

  // route manager
  app.use("/manager", managerRouter);

  app.get("/", (req, res) => {
    res.render("home");
  });
}

module.exports = route;
