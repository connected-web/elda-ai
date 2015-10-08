var expect = require('chai').expect;
var matcher = require('../../lib/matchers/identify-matcher');

describe('Identify matcher', function() {
  it('should match statements in the form "identify noun"', function() {
    var actual = matcher()('identify noun');
    var expected = {
      identify: 'noun'
    };

    expect(actual).to.deep.equal(expected);
  });
});
