var types = {
  'git': useGit,
  'none': useNone
};

function useGit(config) {
  var git;
  var memory = {};

  function initialise(memory) {
    function complete() {
      return memory;
    }

    git = require('./git')(config);

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

function useNone(config) {
  var memory = {};

  memory.store = function() {};
  memory.clean = function() {};

  return Promise.resolve(memory);
}

function configure(config) {
  if (config.type && types[config.type]) {
    return types[config.type](config);
  }
  return Promise.reject(`Unrecognised memory type ${config.type}`);
}

module.exports = configure;
