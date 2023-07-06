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

    // app.get("/api/testroute",(req,res)=>{
    //     res.send("DOG TEST")
    // })
}