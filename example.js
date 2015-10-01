var elda = require('../elda-ai');
var messages = [
  'hello',
  'what is this for?',
  'help!',
  'lets take this from the top'
];

messages.forEach(function(message) {
  elda().respondTo(message).then(console.log);
});
