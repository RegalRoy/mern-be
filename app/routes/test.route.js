const { authJwt } = require("../middleware");
const controller = require("../controller/dog.controller");
const bodyParser = require('body-parser');


module.exports = function(app){
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
      });

      
    app.get("/api/test/dog", [authJwt.verifyToken], controller.dogBoard)

    app.post("/api/test/dog", [authJwt.verifyToken], controller.createDog)

    app.get("/api/test/dog/:id", [authJwt.verifyToken], controller.getDog)

    app.delete("/api/test/dog/:id", [authJwt.verifyToken], controller.deleteDog)

    app.put("/api/test/dog/:id", [authJwt.verifyToken], controller.updateDog)

    
}