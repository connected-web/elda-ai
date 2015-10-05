var Promise = require('promise');
var command = require('./command')
var rimraf = require('rimraf');

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

function cloneFromRemote(config) {
  var cloneCommand = 'git clone {remote} {local}'
    .replace('{remote}', config.remote)
    .replace('{local}', config.local);

  console.log('Clone command', cloneCommand);

  return command(cloneCommand);
}

function configure(local, key, value) {
  var configureCommand = 'cd {local} && git config {key} "{value}"'
    .replace('{local}', local)
    .replace('{key}', key)
    .replace('{value}', value);

  return command(configureCommand);
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

module.exports = {
  status: checkStatus,
  clean: cleanUp,
  clone: cloneFromRemote,
  check: checkRemotes,
  configure: configure
};
