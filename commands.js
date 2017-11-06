module.exports = {
    pwd: function() {
        process.stdout.write(process.execPath);
        process.stdout.write('\nprompt > ');
    },
    date: function() {
        let date = new Date;
        process.stdout.write(date.toString());
        process.stdout.write('\nprompt > ');
    },
    ls: function() {
        var fs = require('fs');
        fs.readdir('.', function(err, files) {
            if (err) throw err;
            files.forEach(function(file) {
                process.stdout.write(file.toString() + "\n");
            })
            process.stdout.write("prompt > ");
        });
    },
    echo: function(args) {
        if(args[0] === '$') {
            process.stdout.write(process.env[args.slice(1)]);
        } else {
            process.stdout.write(args);
        }
        process.stdout.write('\nprompt > ');
    },
    cat: function(file) {
        var fs = require('fs');
        fs.readFile('./' + file, (err,data) => {
            if(err) throw err;
            process.stdout.write(data);
        });
        process.stdout.write('\nprompt > ');
    },
    head: function(file) {
        var fs = require('fs');
        var lines = 0;
        fs.open('./' + file, 'r', (err, data) => {
            if(err || lines === 5) {
                fs.close(data);
            }
            process.stdout.write(data);
            lines++;
        });
        process.stdout.write('\nprompt > ');
    }
};