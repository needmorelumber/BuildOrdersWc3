
const mongoose = require('mongoose');

const tempUserSchema = new mongoose.Schema({
  username: { required: true, type: String },
  eMail: { required: true, type: String },
  password: { required: true, type: String },

});
mongoose.model('temp_user', tempUserSchema);
