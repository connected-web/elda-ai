var cache = {};

function check(string, predicate) {
  var matcher = '(.+)\\s(' + predicate + ')\\s(.+)';
  var regex = new RegExp(matcher);

  var results = string.match(regex);
  var result = false;
  if (results) {
    result = {
      triplet: {
        subject: results[1].trim(),
        predicate: results[2].trim(),
        object: results[3].trim()
      }
    };
  }
  return result;
}

function configure(predicate) {
  if (!cache[predicate]) {
    cache[predicate] = function(string) {
      return check(string, predicate);
    }
  }

  return cache[predicate];
}

module.exports = configure;
