const controller = require('api/controllers');

module.exports = (app) => {
  app.get('/api/timezones', controller.getTimezones);
};