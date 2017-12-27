const http       = require('http'),
      express    = require('express'),
      bodyParser = require('body-parser'),
      session    = require('express-session'),
	path       = require('path'),
      helmet     = require('helmet'),
      bcrypt     = require('bcrypt'),
      mongoose   = require('mongoose'),
      MongoStore = require('connect-mongo')(session),
      cookieParser = require('cookie-parser'),
	PORT_NUM   = '4200',
      app        = express();

// Get our API routes -- This connects into back end Logic // 
app.use(cookieParser());
require('./server/config/mongoose.js');
const db = mongoose.connection;
app.use(session({
  secret: '921994BZMN',
  saveUninitialized: true,
  resave: true,
  store: new MongoStore({ mongooseConnection: db })
}))


const api = require('./server/config/api.js');



app.use(helmet());
app.use(bodyParser.json());
app.use('/api', api);

app.use(express.static(path.join(__dirname)));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});
const port = process.env.PORT || PORT_NUM;
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => console.log(` API running on localhost: ${ port } `));

