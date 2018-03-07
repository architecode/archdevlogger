const ExtensibleLogger = require('../../dst/lib/extensible.logger').ExtensibleLogger;

class TestLogger extends ExtensibleLogger {
  log() { }
}

module.exports = TestLogger;
