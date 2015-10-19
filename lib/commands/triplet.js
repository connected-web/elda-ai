function configure(network) {
  return function(command) {
    if (!command.triplet) {
      return false;
    }

    var triplet = command.triplet;
    var result = network.store(triplet.subject, triplet.predicate, triplet.object);

    if (result) {
      return {
        message: `I learnt that "${triplet.subject}" ${triplet.predicate} ${triplet.object}`,
        learnt: `that '${triplet.subject}' ${triplet.predicate} ${triplet.object}`
      };
    }
    return false;
  }
}

module.exports = configure;
