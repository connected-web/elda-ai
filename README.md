# elda-ai
A natural language interface for storing and retrieving information.

##  Development

To run tests:
```
npm install
npm test
```

### Command Line Interface

To interact with a local copy of Elda:
```
npm install
node cli.js
```

To exit the interface, type one of `exit`, `quit`, `stop`, or `bye`:
```
I'm listening
: quit
Ok, bye!
```

### Use as a library

To use Elda as a library, run:
```
npm install elda-ai --save
```

Then create a script as follows:
```js
var elda = require('elda-ai');
var messages = [
  'hello',
  'what is this for?',
  'help!',
  'lets take this from the top'
];
messages.forEach(function(message) {
  elda().respondTo(message).then(console.log);
});
```

## Library Structure

This is the public interface to Elda.

### `api.js`
h4. fn(config)
This method configures and returns an API object, which can then be used to interact with Elda.

h5. Example
```js
var elda = require('elda-ai');
var config = {};
var api = elda(config);
```

h4. `api.respondTo(message)`
This method intereprets a message, and forms a response.

h5. Example
```js
var elda = require('elda-ai');
var message = 'Add event Kate\'s birthday party, at 5pm tomorrow';
elda().respondTo(message).then(console.log);
```
