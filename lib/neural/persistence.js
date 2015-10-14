function configure(memory, network) {

  var read = require('./persistence-read')(memory, network);
  var write = require('./persistence-write')(memory, network);

  return {
    read: read,
    write: write
  }
}

module.exports = configure;
