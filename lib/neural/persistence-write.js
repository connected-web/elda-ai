function configure(memory, network) {

  function write() {
    console.log('Write neural network to file system');
    return mapNetwork(network).then(writeFiles);
  }

  function mapNetwork(network) {
    var subjects = network.subjects();
    var index = {
      concepts: []
    };
    var fileList = {};

    subjects.map(function(subject) {
      var fc = subject.charAt(0).toLowerCase()
      var path = `${fc}/${subject}.json`;
      index.concepts.push(path);
      fileList[path] = createFileFor(subject, network);
    });

    fileList["index.json"] = index;

    return Promise.resolve(fileList);
  }

  function createFileFor(subject, network) {
    return {
      predicates: network.serialize(subject)
    };
  }

  function writeFiles(files) {
    var doWork = Promise.resolve(true);
    for (var file in files) {
      var contents = files[file];
      doWork.then(function() {
        return memory.write(file, JSON.stringify(contents, null, 2));
      });
    }
    return doWork;
  }

  return write;
}

module.exports = configure;
