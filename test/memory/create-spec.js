var expect = require('chai').expect;
var create = require('../../lib/memory/create');
var consider = require('../helpers/consider');
var fs = require('fs');
var UTF8 = 'utf-8';

describe('Memory Create', function() {

  var testConfig = require('./memory-config');

  it('retreive files from a remote location', function(done) {
    function test() {
      var testFile = JSON.parse(fs.readFileSync('./temp/info.json', UTF8));
      expect(testFile).to.have.property('file', 'info.json');
      done();
    }

    create(testConfig).then(test, done);
  });
});
