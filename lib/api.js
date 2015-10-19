var _ = require('lodash');
var defaultConfig = require('./config/defaults');

function configure(customisations) {
  var api = {};

  var config = _.merge({}, defaultConfig, customisations);
  var learnings = [];

  function inject(memory) {
    var network = require('./neural/network')(memory);
    var analyser = require('./analysis/analyser')(network, learnings);
    var matchers = require('./matcher/matchers')(network, analyser.analyse);

    function respondTo(message) {
      return new Promise(function(resolve, reject) {
        if (message) {
          resolve('Received message: ' + message);
          matchers.match(message);
        } else {
          reject('No message provided');
        }
      });
    }

    function shutdown(reason) {
      return network.persistence.write().then(function() {
        learnings.push(reason);
        var commitMessage = learnings.join(' \\n ');
        return memory.store(commitMessage);
      });
    }

    return {
      config: config,
      respondTo: respondTo,
      shutdown: shutdown
    };
  }

  return require('elda-ai-memory')(config.memory).then(inject);
}

module.exports = configure;
