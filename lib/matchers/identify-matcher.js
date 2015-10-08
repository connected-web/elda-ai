function check(string) {
  var matcher = 'identify\\s(.+)';
  var regex = new RegExp(matcher);

  var results = string.match(regex);
  var result = false;
  if (results) {
    result = {
      identify: results[1].trim()
    };
  }
  return result;
}

module.exports = function(predicate) {
  return function(string) {
    return check(string, predicate);
  }
};
