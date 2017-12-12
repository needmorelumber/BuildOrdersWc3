const mongoose = require('mongoose');


var build_order_schema = new mongoose.Schema({
    name: {type: String, required: true},
    race: {type: String, required: true},
    opposing_race: String,
    build_type: String,
    title_unit: String,
    description: String,
    analysis: String, 
    vod_link: String,
    patch: String,
    author: String,
    build_list: [] // Of build_units
});
mongoose.model('build_order', build_order_schema);