const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create Schema
const UserSchema = new Schema({
   name: {
      type: String,
      requiredL true
   },
   email: {
      type: String,
      requiredL true
   },
   password: {
      type: String,
      requiredL true
   },
   avatar: {
      type: String,
      requiredL true
   },
   date: {
      type: Date,
      default: Date.now,
   },
});

module.exports = User = mongoose.model('users', User);
