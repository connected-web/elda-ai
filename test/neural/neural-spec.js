var expect = require('chai').expect;
var network = require('../../lib/neural/network');

describe('Neural Structure', function() {

  var testNetwork = network();

  beforeEach(function() {
    testNetwork.destroy();
    testNetwork = network();
  });

  it('should be able to store predicates', function() {
    var actual = testNetwork.store('x', 'is', 'y');

    expect(actual).to.have.property('id', 'y');
  });

  it('should be able to retreive a list of objects for a predicate', function() {
    testNetwork.store('x', 'is', 'a');
    testNetwork.store('x', 'is', 'b');
    testNetwork.store('x', 'is', 'c');

    var actual = testNetwork.retrieve('x', 'is');
    var expected = ['a', 'b', 'c'];

    expect(JSON.stringify(actual)).to.equal(JSON.stringify(expected));
  });

  it('should be able to retreive a list of objects for the inverse of a predicate', function() {
    testNetwork.store('a', 'is', 'x');
    testNetwork.store('b', 'is', 'x');
    testNetwork.store('c', 'is', 'x');

    var actual = testNetwork.retrieve('x', '~is');
    var expected = ['a', 'b', 'c'];

    expect(JSON.stringify(actual)).to.equal(JSON.stringify(expected));
  });

  it('should be able to retreive tell me things about John', function() {
    testNetwork.store('John', 'is', '30');
    testNetwork.store('John', 'was born on', '21st May 2015');
    testNetwork.store('John', 'likes', 'programming');
    testNetwork.store('John', 'lives in', 'Manchester');
    testNetwork.store('John', 'lives in', 'England');

    var actual = testNetwork.describe('John');
    var expected = ['is 30', 'was born on 21st May 2015', 'likes programming', 'lives in Manchester', 'lives in England'];

    expect(JSON.stringify(actual)).to.equal(JSON.stringify(expected));
  });
});
