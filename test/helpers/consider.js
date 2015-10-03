function consider(fn, done) {
  try {
    fn();
    done();
  } catch (ex) {
    done(ex);
  }
}

module.exports = consider;
