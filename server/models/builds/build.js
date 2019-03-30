const mongoose = require('mongoose');


const buildSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  race: { type: String, required: true, trim: true },
  opposing_race: String,
  description: String,
  patch: { type: String, required: true },
  ownerId: String,
  ownerUsername: String,
  buildSteps: [],
}, { timestamps: true });

module.exports = mongoose.model('Build', buildSchema);
