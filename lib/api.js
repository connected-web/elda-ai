var _ = require('lodash');
var defaultConfig = require('./config/defaults');

function configure(customisations) {
  var api = {};

  var config = _.merge({}, defaultConfig, customisations);

  function inject(memory) {
    var network = require('./neural/network')(memory);
    var analyser = require('./analysis/analyser')(network);
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

    return {
      config: config,
      respondTo: respondTo
    };
  }

  return require('elda-ai-memory')(config.memory).then(inject);
}

module.exports = configure;
