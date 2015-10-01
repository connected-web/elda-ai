var expect = require('chai').expect;
var consider = require('./helpers/consider');
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

    it('should return a promise', function() {
      var actual = instance.respondTo();
      expect(typeof actual.then).to.equal('function');
    });

    it('should reject empty or null messages with an exception', function(done) {
      instance.respondTo(null).then(function() {
        done('Unexpected success');
      }, function(ex) {
        consider(function() {
          expect(ex).to.equal('No message provided');
        }, done);
      });
    });

    it('should analyse and respond to a message', function(done) {
      var expected = 'instruction';
      instance.respondTo(expected).then(function(actual) {
        consider(function() {
          expect(actual).to.equal('Received message: ' + expected);
        }, done);
      }, function(ex) {
        done(ex);
      });
    });
  });
});
