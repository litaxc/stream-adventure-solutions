var crypto = require('crypto');

var password = process.argv[2];
var algorithm = 'aes256';
var stream = crypto.createDecipher(algorithm, password);

process.stdin.pipe(stream).pipe(process.stdout);
