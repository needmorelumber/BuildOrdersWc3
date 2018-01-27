const mongoose = require('mongoose');

var likes_schema = new mongoose.Schema({
    userId: String,
    buildId: String

})
mongoose.model('likes', likes_schema);