const mongoose = require('mongoose');

const race_unit_schema = new mongoose.Schema({
  name: String,
  gold_cost: Number,
  lumber_cost: Number,
  supply_cost: Number,
  build_time: Number,
  race: String,
});
mongoose.model('race_unit', race_unit_schema);
