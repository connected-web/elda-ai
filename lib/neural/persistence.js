function configure(memory, network) {

  function populate() {
    console.log('Populating');
    return loadIndex().then(readFromIndex);
  }

  function loadIndex() {
    console.log('Loading', 'index.json');
    return memory.read('index.json').
    then(JSON.parse);
  }

  function readFromIndex(index) {
    console.log('Reading from index', index);
    if (index.concepts) {
      return Promise.all(index.concepts.map(loadConcept));
    }
    return Promise.reject('Expected index to contain a list of concepts');
  }

  function loadConcept(concept) {
    console.log('Loading', concept);
    return memory.read(concept).then(JSON.parse).
    then(readFromConcept);
  }

  function readFromConcept(concept) {
    console.log('Reading from concept', concept);
    if (concept.predicates) {
      return Promise.all(concept.predicates.map(readFromPredicate));
    }
    return Promise.resolve();
  }

  function readFromPredicate(predicate) {
    console.log('Reading from predicate', predicate);
    if (predicate && predicate.length == 3) {
      console.log(predicate);
      network.store(predicate[0], predicate[1], predicate[2])
    } else {
      console.error('Predicate in unexpected format', predicate);
    }
  }

  return {
    populate: populate
  }
}

module.exports = configure;
