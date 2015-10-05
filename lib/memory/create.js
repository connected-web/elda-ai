var Promise = require('promise');
var git = require('./git')

function checkConfiguration(config) {
  var memory = {};
  return new Promise(function(accept, reject) {
    git.status(config.memory.local).then(function(success) {
      // Repo seems ok
      accept('Repo seems ok');
    }, function(failiure) {
      // Repo not ok
      git.clean(config.memory.local).then(function() {
        git.clone(config.memory).then(accept, reject);
      });
    })
  });
}

module.exports = checkConfiguration;
