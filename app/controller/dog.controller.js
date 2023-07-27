const Dog = require('../models/dog.model');
const multer = require('multer');

const storage = multer.diskStorage({
      destination: function (req, file, cb) {
            cb(null, 'uploads/')
      },
      filename: function (req, file, cb) {
            cb(null, file.originalname)
      }
})

const upload = multer({ storage: storage })
exports.dogBoard = (req, res) => {
      res.status(200).send("Dog Content.");
};

exports.createDog = (req, res) => {
      //   console.log("thid isogof")
      //   console.log(req.body)
      // const {base64} = req.body.photo
      const dogData = {
            ...req.body,
            photo: req.file.path
      };
      console.log("user  is..")
      
      Dog.create(dogData)
            .then(dog => res.json({ msg: "Dog added!" }))
            .catch(err => res.status(404).json({ error: "unable to add dog" }))
}

exports.getDog = (req, res) => {

      Dog.findById(req.params.id).then(dog => res.json(dog))
            .catch(err => res.status(404).json({ nobooksfound: "NO DOGS FOUND" }));

};

exports.deleteDog = (req, res) => {
      Dog.findByIdAndRemove(req.params.id, req.body).then(dog => res.json(dog))
            .catch(err => res.status(404).json({ nobooksfound: "NO DOGS FOUND" }));
}

exports.updateDog = (req, res) => {
      Dog.findByIdAndUpdate(req.params.id, req.body)
            .then(dog => res.json({ msg: "Update Ok!" }))
            .catch(err => res.status(404).json({ error: "Unable to update the book" }))
}

function generateRandomHex() {
      return '#' + Math.floor(Math.random() * 16777215).toString(16);
    }