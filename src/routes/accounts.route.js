const express = require("express");
const router = express.Router();

const accountController = require("../app/controllers/AccountController");

router.get("/register", accountController.register);
router.post("/store", accountController.store); // post sign up
//Login
router.get("/challenge", accountController.challenge);
router.post("/", accountController.login); // post login
//Logout
router.get("/logout", accountController.logout);
router.get("/", accountController.index);

module.exports = router;
