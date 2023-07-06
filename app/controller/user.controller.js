const Dog = require('../models/dog.model');


exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
  };
  
  exports.userBoard = (req, res) => {
    // res.status(200).send("User Content.");
    //get dogs here
    Dog.find().then(dogs=>res.json(dogs))
    .catch(err=>res.status(404).json({nobooksfound:"NO DOGS FOUND"}));

  };
  
  exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
  };
  
  exports.moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content.");
  };