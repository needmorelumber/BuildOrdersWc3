const mongoose = require('mongoose');

var user_schema = new mongoose.Schema({
    userName: {required: true, type: String},
    eMail: {required: true, type: String},
    passWord: {required: true, type: String},
    ownedTimelineIds: []

})
mongoose.model('user', user_schema);