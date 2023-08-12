const { authJwt } = require("../middleware");
const controller = require("../controller/user.controller");
const path = require("path");
const express = require("express");

const multer = require('multer');

const bodyParser = require('body-parser');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads_dates/')
    // cb(null, './date_uploads/')
    
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
const upload = multer({ storage: storage })
module.exports = function (app) {
  // app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.urlencoded({ extended: true }));


  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  const uploadsFolderPath = path.resolve(__dirname, "../../uploads");
  const uploadsFolderPath2 = path.resolve(__dirname, "../../uploads_dates");
  app.use("/uploads", express.static(uploadsFolderPath));
  app.use("/date_uploads",express.static(uploadsFolderPath2))

  app.get("/api/test/all", controller.allAccess);

  app.get("/api/test/user", [authJwt.verifyToken], controller.userBoard);

  app.get(
    "/api/test/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.moderatorBoard
  );

  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );

  app.post("/api/test/postdate", [authJwt.verifyToken], controller.postDate)

  app.get("/api/test/getdate", [authJwt.verifyToken], controller.getDate)

  app.get("/api/test/getdate/:id", [authJwt.verifyToken], controller.getADate)
  app.put("/api/test/getdate/:id", [authJwt.verifyToken], controller.updateDate)
  app.delete("/api/test/getdate/:id", [authJwt.verifyToken], controller.deleteDate)
  app.delete("/api/test/getdate", [authJwt.verifyToken], controller.deleteAllDate)
  // app.put("/api/test/register/:id", [authJwt.verifyToken], controller.registerDate)
  app.post("/api/test/postdate/pic", upload.single('photo'), [authJwt.verifyToken], controller.postPic)
  app.get("/api/test/postdate/pic/:id",[authJwt.verifyToken], controller.getADatePic)
};

//get("http://localhost:8080/api/test/postdate/pic/"+picOwner