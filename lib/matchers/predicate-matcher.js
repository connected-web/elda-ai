function check(string, predicate) {
  var matcher = '(.+)\\s(' + predicate + ')\\s(.+)';
  var regex = new RegExp(matcher);

  var results = string.match(regex);
  var result = false;
  if (results) {
    result = {
      subject: results[1].trim(),
      predicate: results[2].trim(),
      object: results[3].trim()
    };
  }
  return result;
}

module.exports = check;
