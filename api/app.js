const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const db = require('./models');
const app = express();
const expressSession = require('express-session'); //manages the session cookie
const passport= require('./middlewares/authentication');
const PORT = process.env.PORT || 8000;


//start of google addin
// const Token = require('./token')
// const google = require('googleapis')
// const clientId = process.env.CLIENT_ID
// const clientSecret = process.env.CLIENT_SECRET
// const redirectUrl = process.env.DOMAIN_URL + '/create'
// const oauth2Client = new google.auth.OAuth2(clientId, clientSecret, redirectUrl)
// const authConfig = {
//   access_type: 'offline',
//   scope: [
//     'https://www.googleapis.com/auth/plus.me',
//     'https://www.googleapis.com/auth/calendar',
//     'https://www.googleapis.com/auth/gmail.modify'
//   ],
//   approval_prompt : 'force'
// }
//end of google add ins

// this lets us parse 'application/json' content in http requests
app.use(bodyParser.json())

// setup passport and session cookies
app.use(expressSession({ 
  secret: process.env.SESSION_SECRET, 
  resave: false,
  saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// add http request logging to help us debug and audit app use
const logFormat = process.env.NODE_ENV==='production' ? 'combined' : 'dev';
app.use(morgan(logFormat));

// this mounts controllers/index.js at the route `/api`
app.use('/api', require('./controllers'));

// for production use, we serve the static react build folder
if(process.env.NODE_ENV==='production') {
  app.use(express.static(path.join(__dirname, '../client/build')));

  // all unknown routes should be handed to our react app
  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
}

// update DB tables based on model updates. Does not handle renaming tables/columns
// NOTE: toggling this to true drops all tables (including data)
db.sequelize.sync({ force: false });





// start up the server
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
