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

## Structure

### `api.js`
This is the public interface to elda, it has one key method, `respondTo(string)` which returns a promise.
