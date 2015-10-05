var command = require('./command')
var rimraf = require('rimraf');

function checkConfiguration(config) {
  var memory = {};
  return checkStatus(config.memory.local).then(function(success) {
    // Repo seems ok
    return 'Repo seems ok';
  }, function(failiure) {
    // Repo not ok
    return cleanUp(config.memory.local).then(createMemory(config));
  });
}

function checkStatus(local) {
  return new Promise(function(accept, reject) {
    var statusCommand = 'cd {local} && git status'
      .replace('{local}', local);

    command(statusCommand).then(accept, reject);
  });
}

function cleanUp(local) {
  return new Promise(function(accept, reject) {
    rimraf(local, accept);
  });
}

function createMemory(config) {
  return new Promise(function(accept, reject) {
    var cloneCommand = 'git clone {remote} {local}'
      .replace('{remote}', config.memory.remote)
      .replace('{local}', config.memory.local);

    return command(cloneCommand).then(function(result) {
      accept(memory);
    }, function(result) {
      reject(result);
    });
  });
}

function checkRemotes(local, remote) {
  return new Promise(function(accept, reject) {
    var remotesCommand = 'cd {local} && git remote -v'
      .replace('{local}', local);

    return command(remotesCommand).then(function(result) {
      if (result.stdout && result.stdout.indexOf(remote) !== -1) {
        accept();
      } else {
        reject('Local repo did not contain expected remote');
      }
    });
  });
}

module.exports = checkConfiguration;
