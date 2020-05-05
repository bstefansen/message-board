//All the requirements
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

//Create schema
let replySchema = new Schema ({
  thread_id: String,
  text: String,
  created_on: Date,
  bumped_on: Date,
  reported: Boolean, default: false,
  delete_password: String,
})


//Create model
let reply = mongoose.model("reply", replySchema)

//Export model
exports.reply = reply;