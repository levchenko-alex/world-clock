const jsonfile = require('jsonfile');
const { writeFile, createFile } = require('libs/file');

const PATH_TO_TIMEZONES = 'db/timezones.json';
const PATH_TO_CLOCKS = 'db/clocks.json';

exports.getTimezones = (req, res, next) => {
  jsonfile.readFile(PATH_TO_TIMEZONES, (err, file) => {
    if (err) {
      return next({ status: 404, message: 'No such file.' });
    }

    res.status(200).json({ timezones: JSON.parse(file) });
  })
};

exports.getClocks = (req, res) => {
  jsonfile.readFile(PATH_TO_CLOCKS, (err, file) => {
    if (err) {
      return res.status(200).json({ clocks: [] });
    }

    res.status(200).json({ clocks: JSON.parse(file)});
  })
};

exports.saveClock = (req, res, next) => {
  const { description, timezone } = req.body;

  if (!description || !timezone) {
    return next({ status: 400, message: 'description and timezone are required fields' });
  }

  const initialClock = [{ id: 1, description, timezone }];

  jsonfile.readFile(PATH_TO_CLOCKS, err => {
    if (err) {
      createFile(PATH_TO_CLOCKS);
      writeFile(PATH_TO_CLOCKS, initialClock);

      return res.status(200).json({ clocks: initialClock });
    }

    const clocks = jsonfile.readFileSync(PATH_TO_CLOCKS);
    let highestId = Math.max(...clocks.map(({ id }) => id));

    clocks.push({ id: ++highestId, timezone, description });
    writeFile(PATH_TO_CLOCKS, clocks);

    res.status(200).json({ clocks });
  });
};
