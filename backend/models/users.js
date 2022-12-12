const mongoose = require("mongoose");


const uniqueValidator = require("mongoose-unique-validator");


const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String }, 
  userName: { type: String },
  email: { required: true, type: String, unique: true,  },
  password: {  minlength: 6, type: String, required: true, },

});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);