var log = require('../index.js');

describe('Logging tests', function() {
  describe('Simple tests', function () {
    it('should log all levels', function (done) {
      log.error('Error');
      log.info('Info');
      log.debug('Debug');
      log.warn('Warn');
      log.trace('Trace');
      done();
    });
  });
});
