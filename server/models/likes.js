const mongoose = require('mongoose');

const likesSchema = new mongoose.Schema({
  userId: String,
  buildId: String,

});
mongoose.model('likes', likesSchema);
