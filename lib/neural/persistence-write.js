function configure(memory, network) {

  function write() {
    console.log('STUBBED: write neural network to file system');
    return Promise.resolve(true);
  }

  return write;
}

module.exports = configure;
