const Dog = require('../models/dog.model');
exports.dogBoard = (req, res) => {
    res.status(200).send("Dog Content.");
  };

  exports.createDog =(req,res) =>{
        console.log("thid isogof")
        console.log(req.body)
        Dog.create(req.body)
        .then(dog=>res.json({msg:"Dog added!"}))
        .catch(err=>res.status(404).json({error:"unable to add dog"}))
  }