const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fs = require('fs');
const errorHandler = require('libs/server_errors_handler');
const app = express();

const routerDir = path.join(__dirname, 'routes');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

/**
 * Initialize routes
 */

fs.readdirSync(routerDir)
  .forEach(file => require(path.join(routerDir, file))(app));

/**
 * Catch 404
 */

app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/**
 * Error handler
 */

app.use(errorHandler);

module.exports = app;
