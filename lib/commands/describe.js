function configure(network) {
  return function(command) {
    if (!command.describe) {
      return false;
    }

    var list = network.describe(command.describe, 'is');

    if (list) {
      return {
        message: list
      }
    }

    return false;
  }
}

module.exports = configure;
