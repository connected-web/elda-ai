var persistence = require('./persistence');

function configure(memory) {
  var nodes = {};

  function get(id) {
    id = id || 'default';

    if (!nodes.hasOwnProperty(id)) {
      nodes[id] = create(id);
    }

    return nodes[id];
  }

  function inverse(id) {
    if (typeof id === 'string' && id.charAt(0) === '~') {
      return id.substr(1);
    }
    return '~' + id;
  }

  function store(subject, predicate, object) {
    if (typeof subject === 'string') {
      subject = get(subject);
    }
    if (typeof object === 'string') {
      object = get(object);
    }

    addPredicateToNode(subject, predicate, object);
    addPredicateToNode(object, inverse(predicate), subject)

    return object;
  }

  function addPredicateToNode(subject, predicate, object) {
    if (!subject.p[predicate]) {
      subject.p[predicate] = [];
    }
    if (!subject.p[predicate].indexOf(object) !== -1) {
      subject.p[predicate].push(object);
    }
  }

  function retrieve(subject, predicate) {
    if (typeof subject === 'string') {
      subject = get(subject);
    }
    if (subject.p[predicate]) {
      return summarise(subject.p[predicate]);
    }
    return [];
  }

  function describe(subject) {
    if (typeof subject === 'string') {
      subject = get(subject);
    }
    var result = [];
    for (predicate in subject.p) {
      subject.p[predicate].forEach(function(object) {
        result.push([predicate, object.id].join(' '));
      });
    }
    return result;
  }

  function summarise(objects) {
    return objects.map((object) => object.id);
  }

  function subjects() {
    var map = [];
    for (var n in nodes) {
      if (nodes.hasOwnProperty(n)) {
        map.push(n);
      };
    }
    return map;
  }

  function destroy() {
    nodes = {};
  }

  function create(id) {
    var node = {
      id: id,
      p: []
    };

    node.describe = describe;

    return node;
  }

  var network = {
    store: store,
    retrieve: retrieve,
    describe: describe,
    subjects: subjects,
    destroy: destroy
  }

  if (memory) {
    persistence(memory, network).read();
  }

  return network;
}

module.exports = configure;
