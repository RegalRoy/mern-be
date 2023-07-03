const express = require('express');
const cors = require('cors');
const db = require('./app/models')
const Role = db.role;
const dbConfig = require('./app/config/db.config.js');
const app = express();
// require('./app/routes/auth.routes')(app);
// require('./app/routes/user.routes')(app);
var corsOptions = {
    oprigin:"http://localhost:8080"
};

const bodyParser = require("body-parser");


db.mongoose
  .connect("mongodb+srv://cruzroyregal:Today.123@cluster0.giykk58.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB!");
    initial();
  })
  .catch(err => {
    console.error("Connection error -- ", err);
    process.exit();
  });




  function initial() {
    Role.estimatedDocumentCount()
      .then(count => {
        if (count === 0) {
          new Role({ name: "user" }).save()
            .then(() => {
              console.log("Added 'user' to roles collection");
            })
            .catch(err => {
              console.log("Error", err);
            });
  
          new Role({ name: "moderator" }).save()
            .then(() => {
              console.log("Added 'moderator' to roles collection");
            })
            .catch(err => {
              console.log("Error", err);
            });
  
          new Role({ name: "admin" }).save()
            .then(() => {
              console.log("Added 'admin' to roles collection");
            })
            .catch(err => {
              console.log("Error", err);
            });
        }
      })
      .catch(err => {
        console.error("Error", err);
      });
  }
  app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsOptions));

app.use(express.json());

// app.use(express.urlencoded({extended:true}));


app.get('/',(req,res)=>{
    res.json({message: "Welcome to test application"})
})
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
const PORT = process.env.PORT || 8080

app.listen(PORT, ()=>{console.log("Server is Running on port ...")})