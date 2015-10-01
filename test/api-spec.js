var expect = require("chai").expect;
var elda = require("../lib/api.js");

describe("API", function() {

  var instance;

  beforeEach(function() {
    instance = elda();
  });

  it("should expose a natural language input", function(done) {
    expect(typeof instance.respondTo).to.equal('function');
    done();
  });
});
