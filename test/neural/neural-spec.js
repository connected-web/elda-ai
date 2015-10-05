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
});
