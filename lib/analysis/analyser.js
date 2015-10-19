function configure(network, learnings) {

  var message = require('../commands/message');
  var triplet = require('../commands/triplet')
  var list = require('../commands/list')
  var describe = require('../commands/describe');
  var learnt = require('../commands/learnt');

  var analysers = [
    message(console.log),
    triplet(network),
    list(network),
    describe(network),
    learnt(learnings)
  ];

  function analyse(match) {
    analysers.forEach(function(analyser) {
      try {
        var analysis = analyser(match);
        if (analysis) {
          setTimeout(analyse, 0, analysis);
        }
      } catch (ex) {
        console.error('Analyser error', ex);
      }
    });
  }

  return {
    analyse: analyse
  };
}

module.exports = configure;
