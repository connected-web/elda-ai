function configure(network) {
  return function(command) {
    if (!command.list) {
      return false;
    }

    var list = network.retrieve(command.list, '~is a');

    if (list) {
      return {
        message: list
      }
    }

    return false;
  }
}

module.exports = configure;
