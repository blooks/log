'use strict';

var bunyan = require('bunyan');

function createLogger() {
  var log;

    var PrettyStream = require('bunyan-prettystream');

    var prettyStdOut = new PrettyStream();
    prettyStdOut.pipe(process.stdout);

    log = bunyan.createLogger({
      name: 'queue',
      streams: [{
        level: process.env.LOG_LEVEL || 'info',
        type: 'raw',
        stream: prettyStdOut
      }]
    });

  return log;
}

module.exports = createLogger();
