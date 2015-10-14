function configure(memory, network) {

  function write() {
    console.log('Write neural network to file system');
    return buildIndex(network).then(writeFiles);
  }

  function buildIndex(network) {
    var subjects = network.subjects();
    var index = {
      concepts: [],
      files: {}
    };

    subjects.map(function(subject) {
      var fc = subject.charAt(0).toLowerCase()
      var path = `${fc}-${subject}.json`;
      index.concepts.push(path);
      index.files[path] = createFileFor(subject, network);
    });

    return Promise.resolve(index);
  }

  function createFileFor(subject, network) {
    return {
      predicates: network.serialize(subject)
    };
  }

  function writeFiles(index) {
    console.log('I got this far:', index);
    return memory.write('sample.json', JSON.stringify(index, null, 2));
  }

  return write;
}

module.exports = configure;
