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

function storeAgainstNode(subject, predicate, object) {
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

function retreiveFromNode(subject, predicate) {
  if (typeof subject === 'string') {
    subject = get(subject);
  }
  if (subject.p[predicate]) {
    return summarise(subject.p[predicate]);
  }
  return [];
}

function describeNode(subject) {
  if (typeof subject === 'string') {
    subject = get(subject);
  }
  var result = [];
  for(predicate in subject.p) {
    subject.p[predicate].forEach(function(object) {
      result.push([predicate, object.id].join(' '));
    });
  }
  return result;
}

function summarise(objects) {
  var result = [];
  objects.forEach(function(object) {
    result.push(object.id);
  });
  return result;
}

function destroyNetwork() {
  nodes = {};
}

function create(id) {
  var node = {
    id: id,
    p: []
  };

  node.store = storeAgainstNode;
  node.retrieve = retreiveFromNode;
  node.destroy = destroyNetwork;
  node.describe = describeNode;

  return node;
}

module.exports = get;
