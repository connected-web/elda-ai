var expect = require('chai').expect;
var create = require('../../lib/memory/create');
var consider = require('../helpers/consider');
var fs = require('fs');
var UTF8 = 'utf-8';

describe('Memory Store', function() {

  var testConfig = require('./memory-config');

  it('store files to a remote location', function(done) {
    var updateCount = 0;
    var timestamp = Date.now();
    var state;
    create(testConfig)
      .then(function(memory) {
        state = memory;
        var testFile = JSON.parse(fs.readFileSync('./temp/counter.json', UTF8));
        updateCount = testFile.updates + 1;
        timestamp = timestamp;

        testFile.updates = updateCount;
        testFile.timestamp = timestamp;
        fs.writeFileSync('./temp/counter.json', JSON.stringify(testFile, null, 4), UTF8);

        console.log('What is memory at this point', memory);
        return memory.store('Updating counter');
      })
      .then(function() {
        console.log('Cleaning up', testConfig.memory.local);
        return state.clean();
      })
      .then(function() {
        console.log('Recreating repo');
        return create(testConfig);
      })
      .then(function() {
        consider(function() {
          console.log('Considering');
          var testFile = JSON.parse(fs.readFileSync('./temp/counter.json', UTF8));
          expect(testFile).to.have.property('updates', updateCount);
          expect(testFile).to.have.property('timestamp', timestamp);
        }, done);
      }, function(ex) {
        done(ex);
      });
  });
});
