/* jshint node: true, esversion: 6 */
'use strict';

var fs = require('fs');

module.exports = {
    pwd: function (args, done) {
        done(process.cwd());
    },
    date: function (args, done) {
        done(Date());
    },
    ls: function (args, done) {
        fs.readdir('.', function (err, files) {
            if (err) throw err;
            done(files.join('\n'));
        });
    },
    echo: function (args, done) {
        if (args[0] === '$') {
            done(process.env[args.slice(1)]);
        } else {
            done(args);
        }
    },
    cat: function (files, done) {
        files = files.split(' ');
        let texts = [];
        var count = 0;
        files.forEach((file, i) => {
            fs.readFile(file, 'utf8', (err, data) => {
                if (err) throw err;
                texts[i] = data;
                count++;
                if (count === files.length) {
                    done(texts.join(''));
                }
            });
        });
    },
    head: function (file, done) {
        fs.readFile(file, 'utf8', (err, data) => {
            if (err) throw err;
            done(data.split('\n').slice(0, 5).join('\n'));
        });
    },
    tail: function (file, done) {
        fs.readFile(file, 'utf8', (err, data) => {
            if (err) throw err;
            done(data.split('\n').slice(-5).join('\n'));
        });
    },
    sort: function (file, done) {
        fs.readFile(file, 'utf8', (err, data) => {
            if (err) throw err;
            done(data.split('\n').sort().join('\n'));
        });
    },
    wc: function (file, done) {
        fs.readFile(file, 'utf8', (err, data) => {
            if (err) throw err;
            done(data.split('\n').length);
        });
    },
    uniq: function (file, done) {
        fs.readFile(file, 'utf8', (err, data) => {
            if (err) throw err;
            const lines = data.split('\n');
            for (var i = 0; i < lines.length;i++) {
                if (lines[i] === lines[i + 1]) {
                    lines.splice(i, 1);
                    i--;
                }
            }
            done(lines.join('\n'));
        });
    },
};
