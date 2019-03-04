const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const models_path = path.join(__dirname, '../models');
const reg = new RegExp('.js$', 'i');
const config = require('./config');

mongoose.connect(config.dbURI);
mongoose.connection.on('connected', () => {
  console.log(`Mongoose default connection open to ${config.dbURI}`);
});
mongoose.connection.on('error', err => {
  console.error(`Mongoose default connection error: ${err}`);
});
mongoose.connection.on('disconnected', () => {
  console.log('Mongoose default connection disconnected');
});
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});
fs.readdirSync(models_path).forEach(file => {
  if (reg.test(file)) {
    require(path.join(models_path, file));
  }
});
