const Account = require("../models/Account");
const jwt = require("jsonwebtoken");

class AccountController {
  //middleware checks for login

  checkLogin(req, res, next) {
    try {
      var token = req.cookies.account;
      var id_req = jwt.verify(token, "bayga");
      var id = id_req._id;
      Account.findOne({ _id: id })
        .then((account) => {
          if (account.admin) {
            next();
          } else {
            res.json({ message: "Bạn không có quyền truy cập" }); // Render ra trang 404
          }
        })
        .catch((err) => {
          res.json({
            success: false,
            message: "Lỗi server" + err.message,
          });
        });
    } catch (err) {
      res.redirect("../account");
    }
  }

  // [GET] /login
  index(req, res, next) {
    res.render("account/login");
  }

  // [POST] account/login
  login(req, res, next) {
    const user = req.body;
    const email = user.email;
    const password = user.password;
    Account.findOne({ email: email, password: password })
      .then((account) => {
        if (account) {
          var token = jwt.sign({ _id: account._id }, "bayga");
          return res.json({
            success: true,
            token: token,
            name: account.name,
            message: "Đăng nhập thành công",
          });
        } else {
          res.json({
            success: false,
            message: "Tài khoản hoặc mật khẩu không đúng.",
          });
        }
      })
      .catch(function (err) {
        res.json({
          success: false,
          message: "Lỗi server",
        });
      });
  }

  // [GET] /account/register
  register(req, res, next) {
    res.render("account/register");
  }

  //[POST] /account/register
  store(req, res, next) {
    const email = req.body.email;
    const user = req.body;
    Account.findOne({ email: email })
      .then((account) => {
        if (account) {
          res.render("account/register", { message: "Email đã tồn tại." });
        } else {
          return Account.create(user);
        }
      })
      .then((data) => {
        res.redirect("./");
      })
      .catch(next);
  }

  // [GET] /account/challenge
  challenge(req, res, next) {
    res.render("account/challenge");
  }

  logout(req, res, next) {
    res.clearCookie("account");
    res.redirect("/account");
  }
}

module.exports = new AccountController();
