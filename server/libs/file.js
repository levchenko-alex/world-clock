const fs = require('fs');
const jsonfile = require('jsonfile');

module.exports = {
  createFile: path => {
    fs.closeSync(fs.openSync(path, 'w'));
  },
  writeFile: (path, content) => {
    const options = { spaces: 2, EOP: '\r\n' };

    jsonfile.writeFileSync(path, content, options);
  },
};
