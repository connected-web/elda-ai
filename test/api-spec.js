var expect = require('chai').expect;
var elda = require('../lib/api.js');

describe('API', function() {

  var instance;

  beforeEach(function(done) {
    elda().then(function(result) {
      instance = result;
      done();
    });
  });

  describe('respondTo', function() {

    it('should be exposed as a function', function() {
      expect(typeof instance.respondTo).to.equal('function');
    });

    it('should return a promise', function() {
      var actual = instance.respondTo();
      expect(typeof actual.then).to.equal('function');
    });

    it('should reject empty or null messages with an exception', function(done) {

      var expected = 'No message provided'

      function testException(actual) {
        expect(actual).to.equal(expected);
        done();
      }

      function fail() {
        done('Unexpected success');
      }

      instance.respondTo(null).then(fail, testException);
    });

    it('should analyse and respond to a message', function(done) {
      var expected = 'instruction';

      function test(actual) {
        expect(actual).to.equal('Received message: ' + expected);
        done();
      }

      instance.respondTo(expected).then(test, done);
    });
  });
});
