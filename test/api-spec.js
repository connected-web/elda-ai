var expect = require('chai').expect;
var elda = require('../lib/api.js');

describe('API', function() {

  var instance;

  beforeEach(function() {
    instance = elda();
  });

  describe('respondTo', function() {

    it('should be exposed as a function', function(done) {
      expect(typeof instance.respondTo).to.equal('function');
      done();
    });

    it('should return a promise', function(done) {
      var actual = instance.respondTo();
      expect(typeof actual.then).to.equal('function');
      done();
    });

    it('should reject empty or null messages with an exception', function(done) {
      instance.respondTo(null).then(function() {
        done('Unexpected success');
      }, function(ex) {
        expect(ex).to.equal('No message provided');
        done();
      });
    });
  });
});
