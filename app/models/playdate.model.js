const mongoose = require('mongoose');

const PlayDateSchema = new mongoose.Schema({
  
  dateAndTime: {
    type: Date,
  },
  participants: {
    type: Array,
  },
  dogRestrictions: {
    type: Array
  },
  location: {
    type: String
  },
  ownerId:{
    type:String
  },
  comments:{
    type:Array
  }
});

module.exports = PlayDate = mongoose.model('playdate', PlayDateSchema);

/**
 * In the context of MongoDB and Mongoose, the terms "mongoose model" and "document model/schema" refer to different concepts.

A Mongoose model is a higher-level abstraction that represents a collection in MongoDB and provides an interface for interacting with the documents within that collection. It is created using a Mongoose schema, which defines the structure, data types, and validation rules for the documents.

On the other hand, a document model or schema in MongoDB refers to the structure and organization of the individual documents within a collection. It defines the fields, data types, and relationships between fields.

In Mongoose, you define a schema using mongoose.Schema and then create a model using mongoose.model, which binds the schema to a specific collection in the MongoDB database. The model acts as an interface to perform CRUD operations and other interactions with the documents in that collection.

So, the mongoose model encapsulates the schema and provides additional functionalities and methods to work with the documents, while the document model/schema in MongoDB describes the structure and properties of individual documents within the collection.
 */

