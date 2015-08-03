'use strict';

var log = require('winston');

//
// Requiring `winston-papertrail` will expose
// `winston.transports.Papertrail`
//
var Papertrail = require('winston-papertrail').Papertrail;

if (process.env.PAPERTRAIL_HOST && process.env.PAPERTRAIL_PORT) {
  log.add( Papertrail, {
    levels: {
      debug: 0,
      info: 1,
      warn: 2,
      error: 3,
      auth: 4
    },
    colors: {
      debug: 'blue',
      info: 'green',
      warn: 'red',
      error: 'red',
      auth: 'red'
    },

    host: process.env.PAPERTRAIL_HOST,
    port: process.env.PAPERTRAIL_PORT,
    handleExceptions: true,
    json: true,
    colorize: true,
    logFormat: function(level, message) {
      return level + ': ' + message;
    }
  });
}

module.exports = log;
