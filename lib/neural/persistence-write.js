function configure(memory, network) {

  function write() {
    console.log('STUBBED: write neural network to file system');
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
    return Promise.reject('stubbed');
  }

  function createFileFor(subject, network) {
    var file = {
      predicates: []
    };

    return file;
  }

  return write;
}

module.exports = configure;
