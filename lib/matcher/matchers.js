function configure(network, callback) {

  var predicates = {
    'is': true,
    'is a': true,
  };

  var commands = {
    'list': true,
    'describe': true,
  };

  function add(object, matcher, index, matchers) {
    // reduce array to set
    network.retrieve(object, '~is a').map((o) => index[o] = true);
    for (var o in index) {
      matchers.push(matcher(o));
    }
  }

  function generate() {
    var command = require('./command-matcher');
    var predicate = require('./predicate-matcher');

    var matchers = [];

    add('command', command, commands, matchers);
    add('predicate', predicate, predicates, matchers);

    return matchers;
  }

  function match(message) {
    var matchers = generate();

    matchers.forEach(function(matcher) {
      var result = null;
      try {
        result = matcher(message);
      } catch (ex) {
        console.error('Matcher error', ex);
      }
      if (result) {
        // console.log('Matched', match);
        callback(result);
      }
    });
  }

  return {
    match: match
  }
}

module.exports = configure;
