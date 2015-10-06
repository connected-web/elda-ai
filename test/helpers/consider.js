function consider(fn, done) {
  return function() {
    try {
      fn();
      done();
    } catch (ex) {
      done(ex);
    }
  }
}

module.exports = consider;
