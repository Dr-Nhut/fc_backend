const express = require("express");
const router = express.Router();
const multer = require("multer");

const accountController = require("../app/controllers/AccountController");
const managerController = require("../app/controllers/ManagerController");

//Định nghĩa nơi lưu trữ file
const storage = multer.diskStorage({
  destination: function (req, file, res) {
    res(null, "src/public/img/player/");
  },
  filename: function (req, file, res) {
    res(null, file.originalname);
  },
});
//Khai báo đối tượng multer
const upload = multer({ storage: storage });

router.get(
  "/player-create",
  accountController.checkLogin,
  managerController.player_create
);

router.post(
  "/player-create",
  accountController.checkLogin,
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "backgroundImage", maxCount: 1 },
  ]),
  managerController.player_post
);

router.get(
  "/player/:id/edit",
  accountController.checkLogin,
  managerController.player_edit
);

router.put(
  "/:id",
  accountController.checkLogin,
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "backgroundImage", maxCount: 1 },
  ]),
  managerController.player_update
);

router.delete(
  "/:id",
  accountController.checkLogin,
  managerController.player_delete
);

router.get("/player", accountController.checkLogin, managerController.player);
router.get("/", accountController.checkLogin, managerController.index);

module.exports = router;
