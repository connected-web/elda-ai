function configure(learnings) {

  return function(command) {
    if (!command.learnt) {
      return false;
    }

    learnings.push(command.learnt);

    return {};
  }
}

module.exports = configure;
