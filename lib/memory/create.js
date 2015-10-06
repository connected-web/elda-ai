function configure(config) {
  var git = require('./git')(config.memory);
  var memory = {};

  function initialise(memory) {
    function complete() {
      return memory;
    }

    return git.initialise().then(complete);
  }

  memory.store = function(message) {
    return git.commit(message).then(git.push);
  };

  memory.clean = function() {
    return git.clean();
  };

  return initialise(memory);
}

module.exports = configure;
