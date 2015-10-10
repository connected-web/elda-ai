var cache = {};

function check(string, command) {
  var matcher = command + '\\s(.+)';
  var regex = new RegExp(matcher);

  var results = string.match(regex);
  var result = false;
  if (results) {
    result = {};
    result[command] = results[1].trim();
  }
  return result;
}

module.exports = function(command) {
  return function(string) {
    return check(string, command);
  }
};

function configure(command) {
  if (!cache[command]) {
    cache[command] = function(string) {
      return check(string, command);
    }
  }

  return cache[command];
}

module.exports = configure;
