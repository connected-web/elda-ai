var Promise = require('promise');
var fs = require('fs');

function createMemory(config) {
  var makeDirectory = Promise.denodeify(fs.mkdir);
  return makeDirectory(config.memory).then(initialiseMemory);
}

module.exports = createMemory;
