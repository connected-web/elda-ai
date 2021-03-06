var expect = require('chai').expect;
var network = require('../../lib/neural/network');

describe('Neural Structure', function() {

  var testNetwork;

  beforeEach(function() {
    testNetwork = network();
  });

  afterEach(function() {
    testNetwork.destroy();
  });

  describe('store', function() {
    it('should be able to store predicates', function() {
      var actual = testNetwork.store('x', 'is', 'y');

      expect(actual).to.have.property('id', 'y');
    });
  });

  describe('retreive', function() {
    it('should be able to retreive a list of objects for a predicate', function() {
      testNetwork.store('x', 'is', 'a');
      testNetwork.store('x', 'is', 'b');
      testNetwork.store('x', 'is', 'c');

      var actual = testNetwork.retrieve('x', 'is');
      var expected = ['a', 'b', 'c'];

      expect(actual).to.deep.equal(expected);
    });

    it('should be able to retreive a list of objects for the inverse of a predicate', function() {
      testNetwork.store('a', 'is', 'x');
      testNetwork.store('b', 'is', 'x');
      testNetwork.store('c', 'is', 'x');

      var actual = testNetwork.retrieve('x', '~is');
      var expected = ['a', 'b', 'c'];

      expect(actual).to.deep.equal(expected);
    });
  });

  describe('describe', function() {
    it('should be able to tell me things about John', function() {
      testNetwork.store('John', 'is', '30');
      testNetwork.store('John', 'was born on', '21st May 2015');
      testNetwork.store('John', 'likes', 'programming');
      testNetwork.store('John', 'lives in', 'Manchester');
      testNetwork.store('John', 'lives in', 'England');

      var actual = testNetwork.describe('John');
      var expected = ['is 30', 'was born on 21st May 2015', 'likes programming', 'lives in Manchester', 'lives in England'];

      expect(actual).to.deep.equal(expected);
    });
  });

  describe('subjects', function() {
    it('should be able to list all subjects that it has knowledge of', function() {
      testNetwork.store('1', 'is a', 'number');
      testNetwork.store('a', 'is a', 'letter');
      testNetwork.store('b', 'is a', 'letter');
      testNetwork.store('c', 'is a', 'letter');

      var actual = testNetwork.subjects();
      var expected = ['1', 'number', 'a', 'letter', 'b', 'c'];

      expect(actual).to.deep.equal(expected);
    });

    it('should not list duplicate information', function() {
      testNetwork.store('1', 'is a', 'number');
      testNetwork.store('1', 'is a', 'number');
      testNetwork.store('1', 'is a', 'number');

      var actual = testNetwork.subjects();
      var expected = ['1', 'number'];

      expect(actual).to.deep.equal(expected);
    });
  });

  describe('serialize', function() {
    it('should be able to serialize all knowledge about a subject', function() {
      testNetwork.store('1', 'is a', 'number');
      testNetwork.store('a', 'is a', 'letter');
      testNetwork.store('b', 'is a', 'letter');
      testNetwork.store('c', 'is a', 'letter');

      var actual = testNetwork.serialize('letter');
      var expected = [
        ['letter', '~is a', 'a'],
        ['letter', '~is a', 'b'],
        ['letter', '~is a', 'c']
      ];

      expect(actual).to.deep.equal(expected);
    });

    it('should not serialize duplicate information', function() {
      testNetwork.store('1', 'is a', 'number');
      testNetwork.store('1', 'is a', 'number');
      testNetwork.store('1', 'is a', 'number');

      var actual = testNetwork.serialize('number');
      var expected = [
        ['number', '~is a', '1']
      ];

      expect(actual).to.deep.equal(expected);
    });
  });

  describe('destroy', function() {
    it('should forget about predicates after being destroyed', function() {
      testNetwork.store('x', 'is', 'y');
      testNetwork.destroy();

      var actual = testNetwork.retrieve('x', 'is');
      expect(actual).to.deep.equal([]);
    });
  });
});
