var crypto = require('crypto');
var zlib = require('zlib');
var through = require('through');
var tar = require('tar');

var parser = tar.Parse();
parser.on('entry', function(e) {
    if (e.type !== 'File') return;

    var hash = crypto.createHash('md5', {encoding: 'hex'});
    e.pipe(hash).pipe(through(null, end)).pipe(process.stdout);

    function end() {this.queue(' ' + e.path + '\n');}
});

var chiperName = process.argv[2];
var chiperPass = process.argv[3];
process.stdin
    .pipe(crypto.createDecipher(chiperName, chiperPass))
    .pipe(zlib.createGunzip())
    .pipe(parser);
