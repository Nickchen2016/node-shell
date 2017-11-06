/* jshint node: true, esversion: 6 */
'use strict';

const fs = require('fs');
const request = require('request');

module.exports = {
    pwd: function (stdin, args, done) {
        done(process.cwd());
    },
    date: function (stdin, args, done) {
        done(Date());
    },
    ls: function (stdin, args, done) {
        fs.readdir('.', function (err, files) {
            if (err) throw err;
            done(files.join('\n'));
        });
    },
    echo: function (stdin, args, done) {
        if (args[0] === '$') {
            done(process.env[args.slice(1)]);
        } else {
            done(args);
        }
    },
    cat: function (stdin, files, done) {
        if (stdin && !files) done(stdin);
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
    head: function (stdin, file, done) {
        if (stdin && !file) produceOutput(null, stdin);
        else fs.readFile(file, 'utf8', produceOutput);
        function produceOutput(err, data) {
            if (err) throw err;
            done(data.split('\n').slice(0, 5).join('\n'));
        }
    },
    tail: function (stdin, file, done) {
        if (stdin && !file) produceOutput(null, stdin);
        else fs.readFile(file, 'utf8', produceOutput);
        function produceOutput(err, data) {
            if (err) throw err;
            done(data.split('\n').slice(-5).join('\n'));
        }
    },
    sort: function (stdin, file, done) {
        if (stdin && !file) produceOutput(null, stdin);
        else fs.readFile(file, 'utf8', produceOutput);
        function produceOutput(err, data) {
            if (err) throw err;
            done(data.split('\n').sort().join('\n'));
        }
    },
    wc: function (stdin, file, done) {
        if (stdin && !file) produceOutput(null, stdin);
        else fs.readFile(file, 'utf8', produceOutput);
        function produceOutput(err, data) {
            if (err) throw err;
            done(data.split('\n').length);
        }
    },
    uniq: function (stdin, file, done) {
        if (stdin && !file) produceOutput(null, stdin);
        else fs.readFile(file, 'utf8', produceOutput);
        function produceOutput(err, data) {
            if (err) throw err;
            const lines = data.split('\n');
            for (var i = 0; i < lines.length;i++) {
                if (lines[i] === lines[i + 1]) {
                    lines.splice(i, 1);
                    i--;
                }
            }
            done(lines.join('\n'));
        }
    },
    curl: function(stdin, url, done) {
        if (url.slice(0, 7) !== 'http://') url = 'http://' + url;
        if (stdin && !url) produceOutput(null, stdin);
        else fs.readFile(url, 'utf8', produceOutput);
        function produceOutput(err, response, body) {
            if (err) throw err;
            else if (response && (response.statusCode > 399)) throw new Error(response.statusCode);
            if (body) done(body.trim());
            else done('');
        }
    }
};
