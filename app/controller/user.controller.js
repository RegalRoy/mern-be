const Dog = require('../models/dog.model');
const PlayDate = require('../models/playdate.model');

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

  exports.postDate = (req, res)=>{
    //playDate Service here
    PlayDate.create(req.body)
    .then(dog=>res.json({msg:"PlayDate added!"}))
    .catch(err=>res.status(404).json({error:"unable to add PlayDate"}))
  }

  exports.getDate = (req, res) =>{
    PlayDate.find().then(r=>res.json(r)).catch(err=>res.status(404).json({noDatesFound:"No DATES FOUND"}))
  };

  exports.getADate = (req, res) =>{
    PlayDate.findById(req.params.id).then(date=>res.json(date))
    .catch(err=>res.status(404).json({nobooksfound:"NO Date FOUND"}));
  }

  exports.updateDate = (req, res)=>{
    PlayDate.findByIdAndUpdate(req.params.id, req.body)
    .then(dog=>res.json({msg:"Update Date Ok!"}))
    .catch(err=>res.status(404).json({error:"Unable to update the Date"}))
  }

  exports.deleteDate = (req, res)=>{
    PlayDate.findByIdAndRemove(req.params.id, req.body)
    .then(dog=>res.json({msg:"Delete Date Ok!"}))
    .catch(err=>res.status(404).json({error:"Unable to Delete the Date"}))
  }

  exports.deleteAllDate = (req, res) =>{
    // PlayDate.deleteAllDate().then(r=>res.json(r)).catch(err=>res.status(404).json({noDatesFound:"No DATES FOUND"}))
    PlayDate.deleteMany().then(r=>res.json(r)).catch(err=>res.status(404).json({noDatesFound:"No DATES FOUND"}))
  }