
const mongoose = require('mongoose');

const tuser_schema = new mongoose.Schema({
  username: { required: true, type: String },
  eMail: { required: true, type: String },
  password: { required: true, type: String },

});
mongoose.model('temp_user', tuser_schema);
