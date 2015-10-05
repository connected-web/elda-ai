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

function storeAgainstNode(predicate, subject, object) {
  if (typeof predicate === 'string') {
    predicate = get(predicate);
  }
  if (typeof object === 'string') {
    object = get(object);
  }

  addPredicateToNode(predicate, subject, object);
  addPredicateToNode(object, inverse(subject), predicate)

  return object;
}

function addPredicateToNode(predicate, subject, object) {
  if (!predicate.s[subject]) {
    predicate.s[subject] = [];
  }
  if (!predicate.s[subject].indexOf(object) !== -1) {
    predicate.s[subject].push(object);
  }
}

function retreiveFromNode(predicate, subject) {
  if (typeof predicate === 'string') {
    predicate = get(predicate);
  }
  if (predicate.s[subject]) {
    return summarise(predicate.s[subject]);
  }
  return [];
}

function summarise(subjects) {
  var result = [];
  subjects.forEach(function(subject) {
    result.push(subject.id);
  });
  return result;
}

function destroyNetwork() {
  nodes = {};
}

function create(id) {
  var node = {
    id: id,
    s: []
  };

  node.store = storeAgainstNode;
  node.retrieve = retreiveFromNode;
  node.destroy = destroyNetwork;

  return node;
}

module.exports = get;
