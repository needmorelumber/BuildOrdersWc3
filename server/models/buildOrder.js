const mongoose = require('mongoose');


const buildOrderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  race: String,
  opposing_race: String,
  build_type: String,
  title_unit: String,
  description: String,
  analysis: String,
  vod_link: String,
  patch: String,
  ownerId: String,
  ownerUsername: String,
  build_list: [], // Of build_units,
  likes: { type: Number, default: 0 },
  created_at: { type: Date, default: Date.now() },
});
mongoose.model('build_order', buildOrderSchema);
