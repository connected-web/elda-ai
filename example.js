var elda = require('../elda-ai');
var messages = [
  'hello',
  'what is this for?',
  'help!',
  'lets take this from the top',
  'describe what',
  'list this for?'
];

elda().then(function(instance) {
  messages.forEach(function(message) {
    instance.respondTo(message).then(console.log);
  });
});
