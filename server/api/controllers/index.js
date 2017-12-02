const fs = require('fs');

exports.getTimezones = (req, res, next) => {
  fs.readFile('api/timezones.json', (err, file) => {
    if (err) {
      return next({ status: 404, message: 'No such file.' });
    }

    res.status(200).json({ timezones: JSON.parse(file) });
  })
};

exports.getClocks = (req, res) => {
  fs.readFile('api/clocks.json', (err, file) => {
    if (err) {
      return res.status(200).json({ clocks: [] });
    }

    res.status(200).json({ clocks: JSON.parse(file)});
  })
};
