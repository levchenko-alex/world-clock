const controller = require('api/controllers');

module.exports = (app) => {
  app.get('/api/timezones', controller.getTimezones);
  app.get('/api/clocks', controller.getClocks);
  app.post('/api/clock', controller.saveClock);
  app.put('/api/clock/:id', controller.updateClock);
};
