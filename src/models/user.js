const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  latitude: Number,
  longitude: Number,
});

module.exports = mongoose.model('User', userSchema);