const { response } = require("express");
const Player = require("../models/Player");

class ManagerController {
  //[GET] player-create
  player_create(req, res, next) {
    res.render("manager/player_create");
  }

  //[POST] player-create
  player_post(req, res, next) {
    var name = req.body.name;
    var avatar = "img/player/" + req.files["avatar"][0].originalname;
    var backgroundImage =
      "img/player/" + req.files["backgroundImage"][0].originalname;
    var jersey_number = req.body.jersey_number;
    var position = req.body.position;
    var dob = req.body.dob;
    var quote = req.body.quote;
    var biography = req.body.biography;
    var country = req.body.country;
    var joined = req.body.joined;
    Player.create(
      {
        name,
        avatar,
        backgroundImage,
        jersey_number,
        position,
        dob,
        quote,
        biography,
        country,
        joined,
      },
      function (err) {
        if (err) return handleError(err);
        else res.redirect("./player");
      }
    );
  }

  //[GET] player edit
  player_edit(req, res, next) {
    Player.findById(req.params.id)
      .lean()
      .then((player) => {
        var dates = [new Date(player.dob), new Date(player.joined)];
        for (var i = 0; i < dates.length; i++) {
          var year = dates[i].getFullYear();
          var month = String(dates[i].getMonth() + 1).padStart(2, "0");
          var day = dates[i].getDate().toString().padStart(2, "0");
          dates[i] = `${year}-${month}-${day}`;
        }
        player.dob = dates[0];
        player.joined = dates[1];
        res.render("manager/player_edit", {
          player,
        });
      });
  }

  //[PUT] player
  player_update(req, res, next) {
    var name = req.body.name;
    var avatar;
    req.files["avatar"] != undefined
      ? (avatar = "img/player/" + req.files["avatar"][0].originalname)
      : (avatar = req.body.avatar);

    var backgroundImage;
    req.files["backgroundImage"] != undefined
      ? (backgroundImage =
          "img/player/" + req.files["backgroundImage"][0].originalname)
      : (backgroundImage = req.body.backgroundImage);

    var jersey_number = req.body.jersey_number;
    var position = req.body.position;
    var dob = req.body.dob;
    var quote = req.body.quote;
    var biography = req.body.biography;
    var country = req.body.country;
    var joined = req.body.joined;
    Player.updateOne(
      { _id: req.params.id },
      {
        name,
        avatar,
        backgroundImage,
        jersey_number,
        position,
        dob,
        quote,
        biography,
        country,
        joined,
      },
      function (err) {
        if (err) return handleError(err);
        else res.redirect("./player");
      }
    );
  }

  //[DELETE] player
  player_delete(req, res, next) {
    Player.deleteOne({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch(next);
  }

  //[GET] Admin UI
  index(req, res, next) {
    res.send("Admin");
  }

  //[GET] player
  player(req, res, next) {
    Player.find({})
      .lean()
      .then((players) => {
        res.render("manager/player", {
          players,
        });
      })
      .catch(next);
  }
}

module.exports = new ManagerController();
