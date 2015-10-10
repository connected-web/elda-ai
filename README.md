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

### Design

![Elda AI Design](https://goo.gl/rAS0gR)

### Use as a library

To use Elda as a library, run:
```
npm install elda-ai --save
```

Then create the script `example.js` as follows:
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

Run the example using the command:
```
node example.js
```

## Library Structure

### `api.js`
This is the public interface to Elda.

#### `elda(config)`
This method configures and returns an API object, which can then be used to interact with Elda.

```js
var elda = require('elda-ai');
var config = {};
var api = elda(config);
```

#### `api.respondTo(message)`
This method interprets a message, and forms a response.

```js
var elda = require('elda-ai');
var message = 'Add event Kate\'s birthday party, at 5pm tomorrow';
elda().respondTo(message).then(console.log);
```
