'use strict';

var bunyan = require('bunyan');
var config = require('coyno-config');

function createLogger() {
  var log;

  if (!!config.log.pretty) {
    var PrettyStream = require('bunyan-prettystream');

    var prettyStdOut = new PrettyStream();
    prettyStdOut.pipe(process.stdout);

    log = bunyan.createLogger({
      name: 'queue',
      streams: [{
        level: config.log.level,
        type: 'raw',
        stream: prettyStdOut
      }]
    });
  }
  else {
    log = bunyan.createLogger({name: 'queue'});
  }

  return log;
}

module.exports = createLogger();
