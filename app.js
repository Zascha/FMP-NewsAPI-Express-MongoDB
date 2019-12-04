const logger = require('./modules/logger').logger;
const constants = require('./modules/constants');

const session = require('express-session');
const passport = require('passport');
const express = require('express');
const mongoose = require('mongoose');
const flash = require('connect-flash');

const app = express();
const router = express.Router();

mongoose.connect(constants.dbConnectionString, {useUnifiedTopology: true, useNewUrlParser: true});

app.use(session({ secret : 'secret', saveUninitialized: true, resave: true}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(express.json());
app.use('/', router);

require('./modules/passport')(passport);
require('./routes/authRoutes')(router, passport);
require('./routes/facebookAuthRoutes')(router, passport);
require('./routes/newsRoutes')(router);

app.use((err, req, res, next) => {
  logger.error(err);
  res.status(500).send(err.message);
});

app.listen(3000, function () {
  logger.info('The App is running on port 3000.');
});