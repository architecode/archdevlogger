'use strict';

const expect = require('chai').expect;
const sinon = require('sinon');
const mockRequire = require('mock-require');
const TestLogger = require('../../../test/resources/test.logger');
const Loader = require('../../../dst/lib/core/loader').Loader;

describe('loader.js tests', () => {
  describe('#loadLoggerModule(), file type', () => {
    it('expect to load a logger module with type, and module.', () => {
      // arranges
      const val = {
        type: 'file',
        resource: './test/resources/test.logger',
      };

      // acts
      const loggerModule = Loader.loadLoggerModule(val);

      // asserts
      expect(loggerModule).to.equal(TestLogger);
    });

    it('expect to load a logger module with type, module, and options.', () => {
      // arranges
      const val = {
        type: 'file',
        resource: 'test.logger',
        options: './test/resources'
      };

      // acts
      const loggerModule = Loader.loadLoggerModule(val);

      // asserts
      expect(loggerModule).to.equal(TestLogger);
    });
  });

  describe('#loadLoggerModule(), module type', () => {
    const resource = 'loggermodule';
    const LoggerModule = function () { };

    before(() => {
      mockRequire(resource, LoggerModule);
    });

    after(() => {
      mockRequire.stopAll();
    });

    it('expect to load a logger module.', () => {
      // arranges
      const val = {
        type: 'module',
        resource,
      };

      // acts
      const loggerModule = Loader.loadLoggerModule(val);

      // asserts
      expect(loggerModule).to.equal(LoggerModule);
    });
  });
});
