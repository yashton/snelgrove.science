const glob = require('glob');
const fs = require('fs');

module.exports = function() {
  const files = glob.sync('public/entries/**/*.blog');
  const output = files.map((file) => JSON.parse(fs.readFileSync(file, 'utf8')));
  return {
    code: JSON.stringify(output),
    dependencies: files,
    contextDependencies: ['public/entries'],
    cacheable: true,
  };
}
