var NL = '\n';
var elda = require('./lib/api');

var config = {};
var conciousness;

function ask(question) {
  var stdin = process.stdin,
    stdout = process.stdout;

  stdin.resume();
  stdout.write(question + ': ');

  stdin.once('data', function(input) {
    input = input.toString().trim();

    exitCheck(input, exitState);

    conciousness.respondTo(input).then(function(response) {
      ask(response);
    }, function(rejection) {
      ask(rejection);
    }).catch(function(ex) {
      stdout.write(`chii~ ${ex}`);
    });
  });
}

function exitCheck(input, fn) {
  var check = new RegExp('(exit|quit|stop|bye)');
  if (check.test(input)) {
    fn(input);
  }
}

function exitState(type) {
  var stdout = process.stdout;
  stdout.write('Ok...');
  conciousness.shutdown(`Console ${type}`).then(function() {
    kill(type);
  }).catch(function(ex) {
    console.error('oops~', ex);
    kill(type);
  });
}

function kill(type) {
  var stdout = process.stdout;
  stdout.write(`...${type}!`);
  process.exit(0);
}

function main() {
  elda(config).then(function(result) {
    conciousness = result;
    ask(`I'm listening${NL}`);
  }).catch(function(ex) {
    console.log('Rejected config', ex);
  });
}

main();
