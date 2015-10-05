var expect = require('chai').expect;
var create = require('../../lib/memory/create');
var consider = require('../helpers/consider');
var fs = require('fs');

describe('Create Memory', function() {

  var tempDir = process.cwd() + '/temp';
  var testConfig = {
    memory: {
      local: tempDir,
      remote: 'git@github.com:connected-web/remote-test.git',
      user: {
        name: 'Mocha Test',
        email: 'mocha-test@mkv25.net'
      }
    }
  };

  it('retreive files from a remote location', function(done) {
    create(testConfig).then(function(actual) {
      consider(function() {
        var testFile = JSON.parse(fs.readFileSync('./temp/info.json', 'utf-8'));
        expect(testFile).to.have.property('file', 'info.json');
      }, done);
    }, function(ex) {
      done(ex);
    });
  });
});
