var commands = require('./commands');
var cmdGroups = [];
// Output a prompt
process.stdout.write('prompt > ');

// The stdin 'data' event fires after a user types in a line
process.stdin.on('data', function (data) {
  data.toString().trim().split(/\s*|\s*/g);
  execute(cmdGroups.shift());
  // else done('command not found: ' + cmd);
});

function execute (cmdString, lastOutput) {
  var args = cmdString.toString().trim().split(' ');
  var cmd = args.shift(); // remove the newline
  args = args.join(' ');
  if (commands[cmd]) commands[cmd](lastOutput, args, done);
}

function done(output) {
  if (cmdGroups.length) {
    execute(cmdGroups.shfit(), output);
  } else {
    process.stdout.write(output + '\nprompt > ');
  }
}
