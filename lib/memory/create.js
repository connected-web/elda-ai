var Promise = require('promise');
var git = require('./git')

function checkConfiguration(config) {
  var memory = {
    store: defineStore(config)
  };

  return new Promise(function(accept, reject) {
    git.status(config.memory.local).then(function(success) {
      // Repo seems ok
      git.pull(config.memory).then(function() {
        accept(memory);
      }, reject);
    }, function(failiure) {
      initialiseRepo(config).then(function() {
        accept(memory);
      }, reject);
    });
  });
}

function initialiseRepo(config) {
  var local = config.memory.local;
  var user = config.memory.user;

  return git.clean(local)
    .then(function() {
      return git.clone(config.memory);
    })
    .then(function() {
      return git.configure(local, 'user.name', user.name);
    })
    .then(function() {
      return git.configure(local, 'user.email', user.email);
    });
}

function defineStore(config) {
  return function(message) {
    if (!message) {
      return Promise.reject('No store message provided');
    }

    return new Promise(function(accept, reject) {
      git.commit(config.memory, message)
        .then(function() {
          git.push(config.memory).then(accept, reject);
        }, reject)
    });
  };
}

module.exports = checkConfiguration;
