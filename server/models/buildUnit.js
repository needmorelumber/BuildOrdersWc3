const mongoose = require('mongoose');

const buildUnitSchema = new mongoose.Schema({
  second: Number,
  order:
        {
          count: Number,
          race_unit: String,
          notes: String,
          supply_cost: Number,

        },

});

mongoose.model('build_unit', buildUnitSchema);
