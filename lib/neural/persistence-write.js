function configure(memory, network) {

  function write() {
    console.log('STUBBED: write neural network to file system');
    return buildIndex(network).then(writeFiles);
  }

  function buildIndex(network) {
    var subjects = network.subjects();
    return Promise.reject('stubbed');
  }

  return write;
}

module.exports = configure;
