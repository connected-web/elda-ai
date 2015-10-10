function configure(network, callback) {
  function match(message) {
    var matchers = generate();

    matchers.forEach(function(matcher) {
      try {
        var match = matcher(message);
      } catch (ex) {
        console.error('Matcher error', ex);
      }
      if (match) {
        // console.log('Matched', match);
        callback(match);
      }
    });
  }

  function generate() {
    var command = require('./command-matcher');
    var predicate = require('./predicate-matcher');

    return [
      command('list'),
      command('describe'),
      predicate('is')
    ];
  }

  return {
    match: match
  }
}

module.exports = configure;
