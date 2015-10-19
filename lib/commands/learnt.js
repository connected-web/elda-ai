function configure(learnings) {
  learnings.push('Today I learnt:');

  return function(command) {
    return false;
    if (!command.learnt) {
      return false;
    }

    learnings.push(command.learnt);

    return {};
  }
}

module.exports = configure;
