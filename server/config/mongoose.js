/* eslint-disable no-console */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
const mongoose = require('mongoose');
const config = require('./config');


mongoose.connect(config.dbURI);

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});

// Explicitly import models
// User stuff
require('../models/user/user.js');
require('../models/user/tempUser.js');

// Build Stuff
require('../models/builds/build.js');


// outdated models to be deprecated
require('../models/buildOrder.js');
require('../models/buildUnit.js');
require('../models/likes.js');
require('../models/raceUnit.js');
