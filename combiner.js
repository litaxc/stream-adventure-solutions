var combine = require('stream-combiner');
var through = require('through');
var split = require('split');
var zlib = require('zlib');

module.exports = function() {
    var grouper = through(write, end);
    var current;

    function write(data) {
        if (data.length === 0) {return;}
        var d = JSON.parse(data);

        switch(d.type) {
	case 'genre':
	    if (current) {
                this.queue(JSON.stringify(current) + '\n');
            }
            current = {name: d.name, books: []};
	    break;
	case 'book':
	    current.books.push(d.name);	    
	    break;
	}
    }

    function end() {
        if (current) {
            this.queue(JSON.stringify(current) + '\n');
        }
        this.queue(null);
    }

    return combine(split(), grouper, zlib.createGzip());
};
