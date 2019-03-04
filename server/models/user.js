const mongoose = require('mongoose');

const user_schema = new mongoose.Schema({
  username: { required: true, type: String },
  eMail: { required: true, type: String },
  password: { required: true, type: String },
  ownedTimelineIds: [],

});
mongoose.model('user', user_schema);
