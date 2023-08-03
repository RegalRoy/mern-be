const mongoose = require('mongoose');

const PictureSchema = new mongoose.Schema({
    ownerId:{
        type:String
    },
    photo:{
        type:Array
    }
})

module.exports = Picture = mongoose.model('picture', PictureSchema);