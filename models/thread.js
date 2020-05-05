//All the requirements
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

//Create schema
let threadSchema = new Schema ({
  board: String,
  text: String,
  created_on: Date,
  bumped_on: Date,
  reported: Boolean, default: false,
  delete_password: String,
  replies: Array
})


//Create model
let thread = mongoose.model("thread", threadSchema)

//Export model
exports.thread = thread;