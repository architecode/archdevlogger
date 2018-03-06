'use strict';

const expect = require('chai').expect;
const sinon = require('sinon');
const ExtensibleLogger = require('../../dst/lib/extensible.logger').ExtensibleLogger;

class TestLogger extends ExtensibleLogger {
  log() { }
}

describe('extensible.logger.js tests', () => {
  describe('#constructor()', () => {
    it('expect to create an instance of TestLogger.', () => {
      // arranges

      // acts
      const instance = new TestLogger();

      // asserts
      expect(instance instanceof TestLogger).to.be.true;
    });

    it('expect to create an instance of TestLogger with arguments.', () => {
      // arranges

      // acts
      const instance = new TestLogger('Test', 'Module', 'TestLogger', { props: 'properties' })

      // asserts
      expect(instance.Author).to.equal('Test::Module');
    });
  });

  describe('#info()', () => {
    let loggerSpy;
    const logger = new TestLogger();

    before(() => {
      loggerSpy = sinon.spy(logger, 'log');
    });

    after(() => {
      loggerSpy.restore();
    });

    afterEach(() => {
      loggerSpy.resetHistory();
    });

    it('expect to call log() with message only.', () => {
      // arranges
      const message = 'TestMessage';

      // acts
      logger.info(message);

      // asserts
      expect(loggerSpy.calledWithExactly('info', message, undefined)).to.be.true;
    });

    it('expect to call log() with message and data.', () => {
      // arranges
      const message = 'TestMessage';
      const data = { val: 'data' };

      // acts
      logger.info(message, data);

      // asserts
      expect(loggerSpy.calledWithExactly('info', message, data)).to.be.true;
    });
  });
});
