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
    });
  });
}

function exitCheck(input, fn) {
  var check = new RegExp('(exit|quit|stop|bye)');
  if (check.test(input)) {
    fn();
  }
}

function exitState() {
  var stdout = process.stdout;
  stdout.write('Ok, bye!');
  process.exit(0);
}

function main() {
  elda(config).then(function() {
    ask('I\'m listening' + NL);
  });
}

main();
