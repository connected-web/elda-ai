function configure(network) {
  var message = require('../commands/message');
  var triplet = require('../commands/triplet')
  var list = require('../commands/list')
  var describe = require('../commands/describe');

  var analysers = [
    message(console.log),
    triplet(network),
    list(network),
    describe(network)
  ];

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

  return {
    analyse: analyse
  };
}

module.exports = configure;
