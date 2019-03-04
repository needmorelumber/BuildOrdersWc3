const mongoose = require('mongoose');

const build_unit_schema = new mongoose.Schema({
  second: Number,
  order:
        {
          count: Number,
          race_unit: String,
          notes: String,
          supply_cost: Number,

        },

});

mongoose.model('build_unit', build_unit_schema);
