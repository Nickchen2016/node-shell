var commands = require('./commands');
// Output a prompt
process.stdout.write('prompt > ');

// The stdin 'data' event fires after a user types in a line
process.stdin.on('data', function (data) {
  var args = data.toString().trim().split(' ');
  var cmd = args.shift(); // remove the newline
  args = args.join(' ');
  if (commands[cmd]) commands[cmd](args, done);
  else done('command not found: ' + cmd);
});

function done(output) {
  process.stdout.write(output + '\nprompt > ');
}
