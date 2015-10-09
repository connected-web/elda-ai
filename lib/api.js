var _ = require('lodash');
var defaultConfig = require('./config/defaults');
var memory = require('elda-ai-memory');
var network = require('./neural/network')();

var matchers = [
  require('./matchers/predicate-matcher')('is'),
  require('./matchers/command-matcher')('identify'),
  require('./matchers/command-matcher')('forget'),
  require('./matchers/command-matcher')('list')
];

var analysers = [
  require('./commands/message')(console.log),
  require('./commands/triplet')(network),
  require('./commands/list')(network)
];

function respondTo(message) {
  return new Promise(function(resolve, reject) {
    if (message) {
      resolve('Received message: ' + message);
      match(message);
    } else {
      reject('No message provided');
    }
  });
}

function match(message) {
  matchers.forEach(function(matcher) {
    try {
      var match = matcher(message);
    } catch (ex) {
      console.error('Matcher error', ex);
    }
    if (match) {
      // console.log('Matched', match);
      analyse(match);
    }
  });
}

function analyse(match) {
  analysers.forEach(function(analyser) {
    try {
      var analysis = analyser(match);
      if (analysis) {
        // console.log('Analysed', match);
        setTimeout(analyse, 0, analysis);
      }
    } catch (ex) {
      console.error('Analyser error', ex);
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
