const Dog = require('../models/dog.model');
const PlayDate = require('../models/playdate.model');
const Picture = require('../models/picture.model');
const { findOneAndUpdate } = require('../models/user.model');
exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  // res.status(200).send("User Content.");
  //get dogs here
  Dog.find().then(dogs => res.json(dogs))
    .catch(err => res.status(404).json({ nobooksfound: "NO DOGS FOUND" }));

};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};

exports.postDate = (req, res) => {
  //playDate Service here
  PlayDate.create(req.body)
    .then(dog => res.json({ msg: "PlayDate added!" }))
    .catch(err => res.status(404).json({ error: "unable to add PlayDate" }))
}

exports.postPic = (req, res) => {
  const datePic = {
    ...req.body,
    photo: [req.file.path]
  };

  const datePic2 = {
    ownerId: req.body.ownerId,
    photo: [req.file.path]
  }

  Picture.findOne({ownerId:datePic.ownerId}).then(r=>{
    console.log(r)
    const picArr = r.photo;
    picArr.push(req.file.path);
    console.log(picArr)
    Picture.findOneAndUpdate({ownerId:datePic.ownerId}).then(r=>{
      r.photo=picArr;r.save();
    })
  }).catch(e=>{
    Picture.create(datePic)
    .then(dog => res.json({ msg: "Pic added!" }))
    .catch(err => res.status(404).json({ error: "unable to add Pic" }))
  })

  // Picture.create(datePic)
  //   .then(dog => res.json({ msg: "Pic added!" }))
  //   .catch(err => res.status(404).json({ error: "unable to add Pic" }))
}

exports.getADatePic = (req, res) => {
  Picture.findOne({ ownerId: req.params.id }).then(r => res.json(r))
}

exports.getDate = (req, res) => {
  PlayDate.find().then(r => res.json(r)).catch(err => res.status(404).json({ noDatesFound: "No DATES FOUND" }))
};

exports.getADate = (req, res) => {
  PlayDate.findById(req.params.id).then(date => res.json(date))
    .catch(err => res.status(404).json({ nobooksfound: "NO Date FOUND" }));
}

exports.updateDate = (req, res) => {
  PlayDate.findByIdAndUpdate(req.params.id, req.body)
    .then(dog => res.json({ msg: "Update Date Ok!" }))
    .catch(err => res.status(404).json({ error: "Unable to update the Date" }))
}

exports.deleteDate = (req, res) => {
  PlayDate.findByIdAndRemove(req.params.id, req.body)
    .then(dog => res.json({ msg: "Delete Date Ok!" }))
    .catch(err => res.status(404).json({ error: "Unable to Delete the Date" }))
}

exports.deleteAllDate = (req, res) => {
  // PlayDate.deleteAllDate().then(r=>res.json(r)).catch(err=>res.status(404).json({noDatesFound:"No DATES FOUND"}))
  PlayDate.deleteMany().then(r => res.json(r)).catch(err => res.status(404).json({ noDatesFound: "No DATES FOUND" }))
}