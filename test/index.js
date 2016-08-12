'use strict'

var log = require('../index')

describe('Logging test', () => {
  it('should log something', (done) => {
    log.info('Something')
    done()
  })
  it('should log something as a child', (done) => {
    log.child({component: 'someone'}).info('Something')
    done()
  })
})
