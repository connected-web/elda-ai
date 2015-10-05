var command = require('./command')
var rimraf = require('rimraf');

function checkConfiguration(config) {
  var memory = {};
  return new Promise(function(accept, reject) {
    checkStatus(config.memory.local).then(function(success) {
      // Repo seems ok
      accept('Repo seems ok');
    }, function(failiure) {
      // Repo not ok
      console.log('Repo not ok');
      cleanUp(config.memory.local).then(function() {
        createMemory(config).then(accept, reject);
      });
    })
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
  var cloneCommand = 'git clone {remote} {local}'
    .replace('{remote}', config.memory.remote)
    .replace('{local}', config.memory.local);

  return command(cloneCommand);
}

function checkRemotes(local, remote) {
  return new Promise(function(accept, reject) {
    var remotesCommand = 'cd {local} && git remote -v'
      .replace('{local}', local);

    command(remotesCommand).then(function(result) {
      if (result.stdout && result.stdout.indexOf(remote) !== -1) {
        accept();
      } else {
        reject('Local repo did not contain expected remote');
      }
    });
  });
}

module.exports = checkConfiguration;
