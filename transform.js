var through = require('through');

var tr = through(write, end);

tr.end();

function write(buf) {
    this.queue(buf.toString().toUpperCase());
}

function end() {
    process.stdin.pipe(tr).pipe(process.stdout);
}
