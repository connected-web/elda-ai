var defaultConfig = require('./config/defaults');
var memory = require('elda-ai-memory');
var _ = require('lodash');

var matchers = [
  require('./matchers/predicate-matcher')('is'),
  require('./matchers/command-matcher')('identify'),
  require('./matchers/command-matcher')('forget')
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
  var api = {};

  var config = _.merge({}, defaultConfig, customisations);

  function complete() {
    return {
      config: config,
      respondTo: respondTo
    };
  }

  return memory(config.memory).then(complete);
}
