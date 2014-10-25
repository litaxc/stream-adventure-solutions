var spawn = require('child_process').spawn;
var duplexer = require('duplexer');

module.exports = function(cmd, args) {
    var cp = spawn(cmd, args);
    return duplexer(cp.stdin, cp.stdout);
};
