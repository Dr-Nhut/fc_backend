const path = require("path");
const express = require("express");
const morgan = require("morgan");
const methodOverride = require("method-override");
const engine = require("express-handlebars").engine;
const jwt = require("jsonwebtoken");

const cookieParser = require("cookie-parser");
const app = express();
const port = 3000;

const route = require("./routes/index.route");
const db = require("./config/db/index");

//Connect to database
db.connect();

//express file static
app.use("/", express.static(path.join(__dirname, "/public")));
app.use("/account", express.static(path.join(__dirname, "public")));
app.use("/player", express.static(path.join(__dirname, "public")));
app.use("/player/:id", express.static(path.join(__dirname, "public")));
app.use("/manager", express.static(path.join(__dirname, "public")));
app.use("/manager/player", express.static(path.join(__dirname, "public")));
app.use("/manager/player/:id/", express.static(path.join(__dirname, "public")));

//Middleware body parser
app.use(express.urlencoded({ extended: true })); // Xử lý dữ liệu gửi lên từ form
app.use(express.json()); // Xử lý dữ liệu gửi lên từ JS

app.use(cookieParser()); // Thao tac voi cookie

//HTTP logger
app.use(morgan("combined"));

// override with POST having ?_method=DELETE
app.use(methodOverride("_method"));

app.engine(".hbs", engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, "resources\\views"));

route(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
