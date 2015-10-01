var Promise = require('promise');

function respondTo(message) {
  return new Promise(function(resolve, reject) {
    if (message) {
      resolve('Received message: ' + message);
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
