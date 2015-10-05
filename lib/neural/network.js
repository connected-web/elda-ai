var nodes = {};

function get(id) {
  id = id || 'default';
  if (!nodes.hasOwnProperty(id)) {
    nodes[id] = create(id);
  }

  return nodes[id];
}

function inverse(predicate) {
  if (typeof id === 'string' && id.charAt(0) === '!') {
    return id.substr(1);
  }
  return '!' + id;
}

function storeAgainstNode(network, predicate, subject, object) {
  var result = get(object);

  if (!network.p[predicate]) {
    network.p[predicate] = {};
  }
  if (!network.p[predicate][subject]) {
    network.p[predicate][subject] = [];
  }
  if (!network.p[predicate][subject].indexOf(result) !== -1) {
    network.p[predicate][subject].push(result);
  }

  return result;
}

function retreiveFromNode(network, predicate, subject) {
  if (network.p[predicate] && network.p[predicate][subject]) {
    return summarise(network.p[predicate][subject]);
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

function destroyNode(node) {
  if (node.id === 'default') {
    nodes = {};
  } else {
    delete nodes[node.id];
  }
}

function create(id) {
  var node = {
    id: id,
    p: []
  };

  node.store = function(predicate, subject, object) {
    return storeAgainstNode(node, predicate, subject, object);
  }

  node.retrieve = function(predicate, subject) {
    return retreiveFromNode(node, predicate, subject);
  }

  node.destroy = function() {
    return destroyNode(node);
  }

  return node;
}

module.exports = get;
