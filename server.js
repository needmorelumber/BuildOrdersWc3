// Base
const feathers = require('@feathersjs/feathers');
const express = require('@feathersjs/express');
const service = require('feathers-mongoose');
const search = require('feathers-mongodb-fuzzy-search');

// Nodejs
const path = require('path');

// middleware
const session = require('express-session');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const compression = require('compression');

// Mongo
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);

// Our stuff
const config = require('./server/config/config');
// TODO: This slaps a bunch of things into global scope rather than
// explicit exports/imports. Let's change that.
require('./server/config/mongoose.js');
const api = require('./server/config/api.js');

const Build = require('./server/models/builds/build');

// TODO: get rid of the need for this
const PORT_NUM = '4200';

// Make Mongoose use the ES6 promise
// This is needed to make Feathers happy.
mongoose.Promise = global.Promise;

// This creates an app that is both, an Express and Feathers app
const app = express(feathers());

// Turn on JSON body parsing for REST services
app.use(express.json());
// Turn on URL-encoded body parsing for REST services
app.use(express.urlencoded({ extended: true }));
// Set up REST transport using Express
app.configure(express.rest());
app.use(cookieParser());
app.use(compression());
app.use(helmet());

// this is here to do fuzzy searching on LIST page
app.hooks({
  before: {
    all: [
      search(), // full text search on text indexes
      search({
        fields: [
          'name',
          'race',
          'opposingRace',
          'description',
          'ownerUsername',
        ],
      }),
    ],
  },
});


// Get our API routes -- This connects into back end Logic //

const db = mongoose.connection;
app.use(session({
  secret: config.sessionSecret,
  saveUninitialized: true,
  resave: true,
  store: new MongoStore({ mongooseConnection: db }),
}));

// Server Route definitions
app.use('/api/builds', service({ Model: Build }));
app.use('/api', api);

// Client route definitions
app.use(express.static(path.join(__dirname, 'dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/dist/index.html'));
});

const port = process.env.PORT || PORT_NUM;
app.set('port', port);

app.listen(port, () => console.log(` API running on localhost: ${port} `)); // eslint-disable-line no-console
