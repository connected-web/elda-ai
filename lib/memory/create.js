function configure(config) {

  var git = require('./git')(config.memory);

  var memory = {};

  function initialiseRepo() {
    var user = config.memory.user;

    return git.clean()
      .then(git.clone)
      .then(function() {
        return git.configure('user.name', user.name);
      })
      .then(function() {
        return git.configure('user.email', user.email);
      })
      .then(memory);
  }

  memory.store = function(message) {
    if (!message) {
      return Promise.reject('No store message provided');
    }

    return git.commit(message).then(git.push);
  };

  memory.clean = git.clean;

  return git.status().then(git.pull, initialiseRepo).then(function() {
    return memory;
  });
}

module.exports = configure;
