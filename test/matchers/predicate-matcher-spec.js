var expect = require('chai').expect;
var match = require('../../lib/matchers/predicate-matcher');

describe('Predicate matcher', function() {
  it('should match statements in the form "x is y"', function() {
    var actual = match('x is y', 'is');
    var expected = {
      subject: 'x',
      predicate: 'is',
      object: 'y'
    };

    expect(actual).to.deep.equal(expected);
  });

  it('should match statements in the form "a are b" using the predicate "are"', function() {
    var actual = match('Apples are green', 'are');
    var expected = {
      subject: 'Apples',
      predicate: 'are',
      object: 'green'
    };

    expect(actual).to.deep.equal(expected);
  });

  it('should not match statements that are missing the predicate keyword', function() {
    var actual = match('John likes people', 'are');
    var expected = false;

    expect(actual).to.deep.equal(expected);
  });

  it('should not match statements that begin with the predicate', function() {
    var actual = match('are not ok', 'are');
    var expected = false;

    expect(actual).to.deep.equal(expected);
  });

});
