'use strict'

var bunyan = require('bunyan')

function createLogger () {
  return bunyan.createLogger({ name: 'queue', level: process.env.LOG_LEVEL || 'info' })
}

module.exports = createLogger()
