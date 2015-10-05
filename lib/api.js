var Promise = require('promise');
var config = require('./config/defaults');
var memory = require('./memory/create');
var _ = require('lodash');

var matchers = [
  require('./matchers/predicate-matcher')('is')
];

function respondTo(message) {
  return new Promise(function(resolve, reject) {
    if (message) {
      resolve('Received message: ' + message);
      matchers.forEach(function(matcher) {
        var match = matcher(message);
        if (match) {
          console.log('Matched', match);
        }
      });
    } else {
      reject('No message provided');
    }
  });
}

module.exports = function(customisations) {
  _.merge(config, customisations);

  return memory(config).then(function() {
    return {
      config: config,
      respondTo: respondTo
    };
  });
}
