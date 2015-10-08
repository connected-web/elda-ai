var expect = require('chai').expect;
var matcher = require('../../lib/matchers/forget-matcher');

describe('Forget matcher', function() {
  it('should match statements in the form "forget me"', function() {
    var actual = matcher()('forget me');
    var expected = {
      forget: 'me'
    };

    expect(actual).to.deep.equal(expected);
  });
});
