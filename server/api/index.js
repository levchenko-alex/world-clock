const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fs = require('fs');
const errorHandler = require('libs/server_errors_handler');
const history = require('connect-history-api-fallback');
const app = express();

const routerDir = path.join(__dirname, 'routes');
const PATH_TO_CLIENT = '../../client/dist';

app.use(history());

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, PATH_TO_CLIENT)));

/**
 * Send index.html
 */

app.get('/',(req, res) => {
  res.sendfile(path.join(__dirname, PATH_TO_CLIENT, 'index.html'));
});

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
