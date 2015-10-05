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

function describeNode(predicate) {
  if (typeof predicate === 'string') {
    predicate = get(predicate);
  }
  var result = [];
  for(subject in predicate.s) {
    predicate.s[subject].forEach(function(object) {
      result.push([subject, object.id].join(' '));
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
    s: []
  };

  node.store = storeAgainstNode;
  node.retrieve = retreiveFromNode;
  node.destroy = destroyNetwork;
  node.describe = describeNode;

  return node;
}

module.exports = get;
