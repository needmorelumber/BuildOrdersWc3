const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
const helmet = require('helmet');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const nev = require('email-verification')(mongoose);
const cookieParser = require('cookie-parser');
const compression = require('compression');
const config = require('./server/config/config');

const PORT_NUM = '4200';
const app = express();

// Get our API routes -- This connects into back end Logic //
app.use(cookieParser());
require('./server/config/mongoose.js');

const db = mongoose.connection;
app.use(session({
  secret: config.sessionSecret,
  saveUninitialized: true,
  resave: true,
  store: new MongoStore({ mongooseConnection: db }),
}));
const User = mongoose.model('user');

const api = require('./server/config/api.js');

app.use(compression());

app.use(helmet());
app.use(bodyParser.json());
app.use('/api', api);

app.use(express.static(path.join(__dirname, 'dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/dist/index.html'));
});
const port = process.env.PORT || PORT_NUM;
app.set('port', port);

app.listen(port, () => console.log(` API running on localhost: ${port} `));
