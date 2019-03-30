const mongoose = require('mongoose');

const buildStep = new mongoose.Schema({
  food: { type: String, required: true, trim: true },
  totalFood: { type: String, required: true, trim: true },
  description: { type: String, required: true },
}, { timestamp: true });

mongoose.model('buildStep', buildStep);
