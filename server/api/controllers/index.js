const jsonfile = require('jsonfile');
const { writeFile, createFile } = require('libs/file');

const PATH_TO_TIMEZONES = 'db/timezones.json';
const PATH_TO_CLOCKS = 'db/clocks.json';

exports.getTimezones = (req, res, next) => {
  jsonfile.readFile(PATH_TO_TIMEZONES, (err, timezones) => {
    if (err) {
      return next({ status: 404, message: 'No such file.' });
    }

    res.status(200).json({ timezones });
  })
};

exports.getClocks = (req, res) => {
  jsonfile.readFile(PATH_TO_CLOCKS, (err, clocks) => {
    if (err) {
      return res.status(200).json({ clocks: [] });
    }

    res.status(200).json({ clocks });
  })
};

exports.saveClock = (req, res, next) => {
  const { description, timezone, offset } = req.body;

  // TODO: make better
  if (!description || !timezone || !offset ) {
    return next({ status: 400, message: 'description and timezone are required fields' });
  }

  const initialClock = [{ id: 1, description, timezone, offset }];

  jsonfile.readFile(PATH_TO_CLOCKS, err => {
    if (err) {
      createFile(PATH_TO_CLOCKS);
      writeFile(PATH_TO_CLOCKS, initialClock);

      return res.status(200).json({ clocks: initialClock });
    }

    const clocks = jsonfile.readFileSync(PATH_TO_CLOCKS);
    let highestId = Math.max(...clocks.map(({ id }) => id));

    clocks.push({ id: ++highestId, timezone, description, offset });
    writeFile(PATH_TO_CLOCKS, clocks);

    res.status(200).json({ clocks });
  });
};

exports.updateClock = (req, res, next) => {
  const { description, timezone, offset } = req.body;
  const { id } = req.params;

  // TODO: make better!
  if (!description || !timezone || !offset) {
    return next({ status: 400, message: 'description and timezone are required fields.' });
  }

  jsonfile.readFile(PATH_TO_CLOCKS, (err, clocks) => {
    if (err) {
      return next({ message: 'No such file.'});
    }

    for (let i = 0; i < clocks.length; i++) {
      if (clocks[i].id === Number(id)) {
        clocks[i].description = description;
        clocks[i].timezone = timezone;
        clocks[i].offset = offset;

        writeFile(PATH_TO_CLOCKS, clocks);

        return res.status(200).json({ clock: clocks[i] });
      }
    }

    next({ status: 400, message: 'No such object.' });
  })
};
