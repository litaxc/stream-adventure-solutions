var http = require('http');
var fs = require('fs');
var through = require('through');

var server = http.createServer(function(req, res) {
               if (req.method === 'POST') {
                 req.pipe(through(function(buf) {
                            this.queue(buf.toString().toUpperCase());
                          })).pipe(res);
               }
             });

var port = process.argv[2];
server.listen(port);
