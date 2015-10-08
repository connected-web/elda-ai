var expect = require('chai').expect;
var matcher = require('../../lib/matchers/command-matcher');

describe('Command matcher', function() {
  it('should match statements in the form "command instruction"', function() {
    var actual = matcher('command')('command instruction');
    var expected = {
      command: 'instruction'
    };

    expect(actual).to.deep.equal(expected);
  });

  it('should match statements in the form "forget me"', function() {
    var actual = matcher('forget')('forget me');
    var expected = {
      forget: 'me'
    };

    expect(actual).to.deep.equal(expected);
  });

  it('should match statements in the form "identify John"', function() {
    var actual = matcher('identify')('identify John');
    var expected = {
      identify: 'John'
    };

    expect(actual).to.deep.equal(expected);
  });
});
