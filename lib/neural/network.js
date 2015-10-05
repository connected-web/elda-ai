var networks = {};

function network(id) {
  id = id || 'default';
  return retreive(id);
}

function retreive(id) {
  if (!networks.hasOwnProperty(id)) {
    networks[id] = create();
  }

  return networks[id];
}

function storeAgainstNetwork(predicate, subject, object, network) {
  var object = retrieve(object);

  if(!network[predicate]) {
    network[predicate] = {};
  }
  if(!network[predicate][subject]) {
    network[predicate].subject = [];
  }
  if(!network[predicate][subject].indexOf(object) !== -1) {
    network[predicate].subject.push(object);
  }
}

function create() {
  var network = {};

  function store(predicate, subject, object) {
    storeAgainstNetwork(predicate, subject, object, network);
  }

  return {
    store: store,
    query: query
  }
}

module.exports = network;
