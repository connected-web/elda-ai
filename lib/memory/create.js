function configure(config) {

  var git = require('./git')(config.memory);

  var memory = {};

  function initialiseRepo() {
    var user = config.memory.user;

    return git.clean()
      .then(function() {
        return git.clone();
      })
      .then(function() {
        return git.configure('user.name', user.name);
      })
      .then(function() {
        return git.configure('user.email', user.email);
      });
  }

  memory.store = function(message) {
    if (!message) {
      return Promise.reject('No store message provided');
    }

    return new Promise(function(accept, reject) {
      git.commit(config.memory, message)
        .then(function() {
          git.push().then(accept, reject);
        }, reject)
    });
  };

  memory.clean = git.clean;

  return new Promise(function(accept, reject) {
    git.status().then(function(success) {
      // Repo seems ok
      git.pull().then(function() {
        accept(memory);
      }, reject);
    }, function(failiure) {
      initialiseRepo().then(function() {
        accept(memory);
      }, reject);
    });
  });
}

module.exports = configure;
