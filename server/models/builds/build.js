const mongoose = require('mongoose');

const buildStepSchema = new mongoose.Schema({
  food: { type: String, required: true, trim: true },
  totalFood: { type: String, required: true, trim: true },
  description: { type: String, required: true },
}, { timestamp: true });

const buildSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  race: { type: String, required: true, trim: true },
  opposing_race: String,
  description: String,
  patch: { type: String, required: true },
  ownerId: String,
  ownerUsername: String,
  buildSteps: [buildStepSchema],
}, { timestamps: true });

module.exports = mongoose.model('Build', buildSchema);
