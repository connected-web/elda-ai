function configure(log) {
  return function(command) {
    if (!command.message) {
      return false;
    }

    log(command.message);

    return {};
  }
}

module.exports = configure;
