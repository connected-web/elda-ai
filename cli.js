var NL = '\n';
var elda = require('./lib/api');

var config = {};
var conciousness = elda(config);

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
    });
  });
}

function exitCheck(input, fn) {
  if(new RegExp('([exit|quit|stop])').test(input)) {
    fn();
  }
}

function exitState() {
  var stdout = process.stdout;
  stdout.write('Ok, bye!');
  process.exit(0);
}

function main() {
  ask('I\'m listening' + NL);
}

main();
