var Promise = require('promise');
var config = require('./config/defaults');
var memory = require('./memory/create');
var _ = require('lodash');

function respondTo(message) {
  return new Promise(function(resolve, reject) {
    if (message) {
      resolve('Received message: ' + message);
    } else {
      reject('No message provided');
    }
  });
}

module.exports = function(customisations) {
  _.merge(config, customisations);

  memory(config);

  return {
    config: config,
    respondTo: respondTo
  };
}
