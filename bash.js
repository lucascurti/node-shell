var commands = require("./command.js")
    process.stdout.write('prompt > ');
    // The stdin 'data' event fires after a user types in a line
    process.stdin.on('data', function (data) {
    var input = data.toString().trim(); // remove the newline
    
    var cmd = input.split(" ")[0]
    var argumento = input.split(" ").slice(1).join(" ")
    
       
    commands[cmd](argumento);

    process.stdout.write('\nprompt > ');
});
