var Promise = require('promise');
var git = require('./git')

function checkConfiguration(config) {
  var memory = {};

  return new Promise(function(accept, reject) {
    git.status(config.memory.local).then(function(success) {
      // Repo seems ok
      accept('Repo seems ok');
    }, function(failiure) {
      initialiseRepo(config).then(accept, reject);
    });
  });
}

function initialiseRepo(config) {
  var local = config.memory.local;
  var user = config.memory.user;

  return git.clean(local)
    .then(function() {
      return git.clone(config.memory)
    })
    .then(function() {
      return git.configure(local, 'user.name', user.name)
    })
    .then(function() {
      git.configure(local, 'user.email', user.email)
    });
}

module.exports = checkConfiguration;
