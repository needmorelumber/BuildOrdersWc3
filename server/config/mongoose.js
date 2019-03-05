/* eslint-disable no-console */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
const mongoose = require('mongoose');
const path = require('path');
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

// Explicitly import models
const modelsPath = path.join(__dirname, '../models');
const modelPaths = [
  'buildOrder.js',
  'buildUnit.js',
  'likes.js',
  'raceUnit.js',
  'tempUser.js',
  'user.js',
].map(model => path.join(modelsPath, model));

modelPaths.forEach(modelPath => require(modelPath));
