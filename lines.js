var through = require('through');
var split = require('split');

var count = 1;
var tr = through(function(buf) {
    var line = buf.toString() + '\n';

    this.queue(count % 2 === 0 ? line.toUpperCase() : line.toLowerCase());

    count++;
});

process.stdin.pipe(split()).pipe(tr).pipe(process.stdout);
