'use strict';

var fs = require('fs');

module.exports = {
    pwd: function () {
        process.stdout.write(process.execPath);
        process.stdout.write('\nprompt > ');
    },
    date: function () {
        let date = new Date();
        process.stdout.write(date.toString());
        process.stdout.write('\nprompt > ');
    },
    ls: function () {
        fs.readdir('.', function (err, files) {
            if (err) throw err;
            files.forEach(function (file) {
                process.stdout.write(file.toString() + "\n");
            })
            process.stdout.write("prompt > ");
        });
    },
    echo: function (args) {
        if (args[0] === '$') {
            process.stdout.write(process.env[args.slice(1)]);
        } else {
            process.stdout.write(args);
        }
        process.stdout.write('\nprompt > ');
    },
    cat: function (file) {
        fs.readFile('./' + file, (err, data) => {
            if (err) throw err;
            process.stdout.write(data);
        });
        process.stdout.write('\nprompt > ');
    },
    head: function (file) {
        fs.readFile(file, 'utf8', (err, data) => {
            if (err) throw err;
            process.stdout.write(data.split('\n').slice(0, 5).join('\n'));
            process.stdout.write('\nprompt > ');
        });
    },
    tail: function (file) {
        fs.readFile(file, 'utf8', (err, data) => {
            if (err) throw err;
            process.stdout.write(data.split('\n').slice(-5).join('\n'));
            process.stdout.write('\nprompt > ');
        });
    }
};
