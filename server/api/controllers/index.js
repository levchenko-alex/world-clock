const fs = require('fs');

exports.getTimezones = (req, res, next) => {
  fs.readFile('api/timezones.json', 'utf8', (err, file) => {
    if (err) {
      return next({ status: 404, message: 'No such file.' });
    }

    res.status(200).json({ timezones: JSON.parse(file) });
  })
};