const { authJwt } = require("../middleware");
const controller = require("../controller/user.controller");


const bodyParser = require('body-parser');

module.exports = function(app) {
  // app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.urlencoded({ extended: true }));


  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

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

};