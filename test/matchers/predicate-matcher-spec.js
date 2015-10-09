var expect = require('chai').expect;
var match = require('../../lib/matchers/predicate-matcher');

describe('Predicate matcher', function() {
  it('should match statements in the form "x is y"', function() {
    var actual = match('is')('x is y');
    var expected = {
      triplet: {
        subject: 'x',
        predicate: 'is',
        object: 'y'
      }
    };

    expect(actual).to.deep.equal(expected);
  });

  it('should match statements in the form "a are b" using the predicate "are"', function() {
    var actual = match('are')('Apples are green');
    var expected = {
      triplet: {
        subject: 'Apples',
        predicate: 'are',
        object: 'green'
      }
    };

    expect(actual).to.deep.equal(expected);
  });

  it('should not match statements that are missing the predicate keyword', function() {
    var actual = match('not')('John likes people');
    var expected = false;

    expect(actual).to.deep.equal(expected);
  });

  it('should not match statements that begin with the predicate', function() {
    var actual = match('are')('are not ok');
    var expected = false;

    expect(actual).to.deep.equal(expected);
  });

});
