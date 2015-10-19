function configure(memory, network) {

  function write() {
    console.log('Write neural network to file system');
    return mapNetwork(network).then(writeFiles);
  }

  function mapNetwork(network) {
    var subjects = network.subjects();
    console.log(subjects);
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

    fileList['index.json'] = index;

    return Promise.resolve(fileList);
  }

  function createFileFor(subject, network) {
    var predicates = network.serialize(subject);
    console.log(subject, predicates);
    return {
      predicates: predicates
    };
  }

  function writeFiles(files) {
    console.log('Writing files', files);
    var fileList = [];
    for (var path in files) {
      var contents = files[path];
      fileList.push({
        path: path,
        contents: contents
      });
    }
    return writeNextFile(fileList);
  }

  function writeNextFile(list) {
    var nextFile = list.pop();

    if (nextFile) {
      console.log('Preparing to write', nextFile.path);
      return memory.write(nextFile.path, JSON.stringify(nextFile.contents, null, 2))
        .then(function() {
          console.log('Wrote', nextFile.path);
          return writeNextFile(list);
        });
    } else {
      console.log('Finished writing files');
      return Promise.resolve(true);
    }
  }

  return write;
}

module.exports = configure;
