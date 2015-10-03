var Promise = require('promise');

var matchers = [
  require('./matchers/predicate-matcher')('is')
];

function respondTo(message) {
  return new Promise(function(resolve, reject) {
    if (message) {
      resolve('Received message: ' + message);
      matchers.forEach(function(matcher) {
        var match = matcher(message);
        if(match) {
          console.log('Matched', match);
        }
      });
    } else {
      reject('No message provided');
    }
  });
}

module.exports = function(config) {
  return {
    respondTo: respondTo
  };
}
