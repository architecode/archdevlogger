'use strict';

const expect = require('chai').expect;
const sinon = require('sinon');
const ArchDevLogger = require('../../../dst').ArchDevLogger;
const ExtensibleLogger = require('../../../dst/lib/extensible.logger').ExtensibleLogger;
const UndefinedDefaultLoggerError = require('../../../dst/lib/errors').UndefinedDefaultLoggerError;
const LoggerService = require('../../../dst/lib/services/logger.service').LoggerService;

describe('logger.service.js tests', () => {
  describe('#constructor()', () => {
    it('expect to create an instance of LoggerService.', () => {
      // arranges

      // acts
      const instance = new ArchDevLogger.Services.LoggerService();

      // asserts
      expect(instance instanceof LoggerService).to.be.true;
    });
  });

  describe('#configure()', () => {
    class TestLogger extends ExtensibleLogger {
      log() { }
    }

    it('expect to configure with empty configs.', () => {
      // arranges
      const instance = new LoggerService();

      // acts
      const act = () => instance.configure();

      // asserts
      expect(act).not.to.throw();
    });

    it('expect to configure with valued configs.', () => {
      // arranges
      const instance = new LoggerService();
      const configs = {
        loggerDefault: { logger: 'Logger', properties: {} },
        loggerModules: [
          {
            logger: 'Logger',
            module: {
              type: 'file',
              resource: './test/resources/test.logger',
            }
          },
        ],
        loggerSetups: [
          { name: 'TestLogger', type: 'Module', logger: 'Logger', properties: {} },
        ]
      };

      // acts
      const act = () => instance.configure(configs);

      // asserts
      expect(act).not.to.throw();
    });

    it('expect to configure and get a default logger.', () => {
      // arranges
      const service = new LoggerService();
      const configs = {
        defaultLogger: { logger: 'Logger', properties: {} }
      };
      service.configure(configs);

      // acts
      const defaultLogger = service.getDefaultLogger();

      // asserts
      expect(defaultLogger.logger).to.equal(configs.defaultLogger.logger);
      expect(defaultLogger.properties).to.equal(configs.defaultLogger.properties);
    });

    it('expect to configure and get a logger.', () => {
      // arranges
      const service = new LoggerService();
      const name = 'TestLogger';
      const type = 'Module';
      const logger = 'Logger';
      const configs = {
        loggerDefault: { logger, properties: {} },
        loggerModules: [
          {
            logger: 'Logger',
            module: {
              type: 'file',
              resource: './test/resources/test.logger',
            }
          },
        ],
        loggerSetups: [
          { name, type, logger, properties: {} },
        ]
      };
      service.configure(configs);

      // acts
      const setup = service.getLoggerSetup(name, type);

      // asserts
      expect(setup.name).to.equal(name);
      expect(setup.type).to.equal(type);
      expect(setup.logger).to.equal(logger);
    });
  });

  describe('#getDefaultLogger() and #setDefaultLogger()', () => {
    it('expect to get and set a default logger.', () => {
      // arranges
      const registry = new LoggerService();
      const logger = 'TestLogger';
      const properties = {};

      // acts
      registry.setDefaultLogger(logger, properties);
      const result = registry.getDefaultLogger(logger);

      // asserts
      expect(result.logger).to.equal(logger);
      expect(result.properties).to.equal(properties);
    });
  });

  describe('#getLoggerModule() and #setLoggerModule()', () => {
    it('expect to get and set a logger module.', () => {
      // arranges
      const registry = new LoggerService();
      const logger = 'TestLogger';
      const loggerModule = function () { };

      // acts
      registry.setLoggerModule(logger, loggerModule);
      const result = registry.getLoggerModule(logger);

      // asserts
      expect(result).to.equal(loggerModule);
    });
  });

  describe('#hasLoggerModule()', () => {
    it('expect to has a logger module.', () => {
      // arranges
      const registry = new LoggerService();
      const logger = 'TestLogger';
      const loggerModule = function () { };
      registry.setLoggerModule(logger, loggerModule);

      // acts
      const positive = registry.hasLoggerModule(logger);
      const negative = registry.hasLoggerModule('Unknown');

      // asserts
      expect(positive).to.be.true;
      expect(negative).to.be.false;
    });
  });

  describe('#getLoggerSetup() and #setLoggerSetup()', () => {
    it('expect to get and set a logger setup.', () => {
      // arranges
      const registry = new LoggerService();
      const name = 'Test';
      const type = 'Module';
      const logger = 'TestLogger';
      const properties = {};

      // acts
      registry.setLoggerSetup(name, type, logger, properties);
      const result = registry.getLoggerSetup(name, type);

      // asserts
      expect(result.name).to.equal(name);
      expect(result.type).to.equal(type);
      expect(result.logger).to.equal(logger);
      expect(result.properties).to.equal(properties);
    });

    it('expect to get and set a logger setup.', () => {
      // arranges
      const registry = new LoggerService();
      const name = 'Test';
      const type = 'Module';

      // acts
      registry.setLoggerSetup(name, type);
      const result = registry.getLoggerSetup(name, type);

      // asserts
      expect(result.name).to.equal(name);
      expect(result.type).to.equal(type);
      expect(result.logger).to.be.undefined;
      expect(result.properties).to.be.undefined;
    });

    it('expect to get undefined when name or type has not been set.', () => {
      // arranges
      const registry = new LoggerService();
      const name = 'Test';
      const type = 'Module';
      const logger = 'TestLogger';
      const properties = {};

      // acts
      registry.setLoggerSetup(name, type, logger, properties);
      const result = registry.getLoggerSetup('unknown', type);

      // asserts
      expect(result.name).to.be.undefined;
      expect(result.type).to.be.undefined;
      expect(result.logger).to.be.undefined;
      expect(result.properties).to.be.undefined;
    });

    it('expect to get and set a logger setup.', () => {
      // arranges
      const registry = new LoggerService();
      const name01 = 'Test01';
      const name02 = 'Test02';
      const type = 'Module';
      const logger = 'TestLogger';
      const properties = {};
      registry.setLoggerSetup(name01, type, logger, properties);

      // acts
      registry.setLoggerSetup(name02, type, logger, properties);
      const result = registry.getLoggerSetup(name02, type);

      // asserts
      expect(result.name).not.to.equal(name01);
      expect(result.name).to.equal(name02);
      expect(result.type).to.equal(type);
      expect(result.logger).to.equal(logger);
      expect(result.properties).to.equal(properties);
    });
  });

  describe('#hasLoggerSetup()', () => {
    it('expect to has a logger setup.', () => {
      // arranges
      const registry = new LoggerService();
      const name = 'Test';
      const type = 'Module';
      const logger = 'TestLogger';
      const properties = {};
      registry.setLoggerSetup(name, type, logger, properties);

      // acts
      const positive = registry.hasLoggerSetup(name, type);
      const negative = registry.hasLoggerSetup('Unknown', type);

      // asserts
      expect(positive).to.be.true;
      expect(negative).to.be.false;
    });
  });

  describe('#resolveDefaultLogger()', () => {
    it('expect to resolve the default logger.', () => {
      // arranges
      const registry = new LoggerService();
      const defaultLogger = 'DefaultLogger';
      const defaultLoggerModule = function () {
        this.value = defaultLogger;
      };
      registry.setLoggerModule(defaultLogger, defaultLoggerModule);
      registry.setDefaultLogger(defaultLogger);

      // acts
      const logger = registry.resolveDefaultLogger();

      // asserts
      expect(logger.value).to.equal(defaultLogger);
    });

    it('expect to throw an error.', () => {
      // arranges
      const registry = new LoggerService();

      // acts
      const act = () => registry.resolveDefaultLogger();

      // asserts
      expect(act).to.throw(UndefinedDefaultLoggerError);
    });
  });

  describe('#resolveLogger(), useInstanceCache set as true', () => {
    it('expect to resolve the same instance when it uses instance cache.', () => {
      // arranges
      const registry = new LoggerService();
      const logger = 'TestLogger';
      const loggerModule = function () {
        this.value = 'TestValue';
      };
      registry.setLoggerModule(logger, loggerModule);
      const name = 'Test';
      const type = 'Module';
      const properties = {};
      registry.setLoggerSetup(name, type, logger, properties);

      // acts
      const logger01 = registry.resolveLogger(name, type);
      const logger02 = registry.resolveLogger(name, type);

      // asserts
      expect(logger01.value).to.equal('TestValue');
      expect(logger01).to.equal(logger02);
    });

    it('expect to resolve an instance of the default logger when setup.name is not set.', () => {
      // arranges
      const registry = new LoggerService();
      const defaultLogger = 'DefaultLogger';
      const defaultLoggerModule = function () {
        this.value = defaultLogger;
      };
      registry.setDefaultLogger(defaultLogger, {});
      registry.setLoggerModule(defaultLogger, defaultLoggerModule);
      const testLogger = 'TestLogger';
      const testLoggerModule = function () {
        this.value = testLogger;
      };
      const name = 'Test';
      const type = 'Module';
      const properties = {};
      registry.setLoggerModule(testLogger, testLoggerModule);
      registry.setLoggerSetup(name, type, testLogger, properties);

      // acts
      const logger01 = registry.resolveLogger('Unknown', type);
      const logger02 = registry.resolveLogger(name, type);

      // asserts
      expect(logger01.value).to.equal(defaultLogger);
      expect(logger02.value).to.equal(testLogger);
    });

    it('expect to resolve an instance of the default logger when setup.type is not set.', () => {
      // arranges
      const registry = new LoggerService();
      const defaultLogger = 'DefaultLogger';
      const defaultLoggerModule = function () {
        this.value = defaultLogger;
      };
      registry.setDefaultLogger(defaultLogger, {});
      registry.setLoggerModule(defaultLogger, defaultLoggerModule);
      const testLogger = 'TestLogger';
      const testLoggerModule = function () {
        this.value = testLogger;
      };
      const name = 'Test';
      const type = 'Module';
      const properties = {};
      registry.setLoggerModule(testLogger, testLoggerModule);
      registry.setLoggerSetup(name, type, testLogger, properties);

      // acts
      const logger01 = registry.resolveLogger(name, 'Unknown');
      const logger02 = registry.resolveLogger(name, type);

      // asserts
      expect(logger01.value).to.equal(defaultLogger);
      expect(logger02.value).to.equal(testLogger);
    });

    it('expect to resolve an instance of the default logger when setup.logger is not set.', () => {
      // arranges
      const registry = new LoggerService();
      const defaultLogger = 'DefaultLogger';
      const defaultLoggerModule = function (name, type, logger, properties) {
        this.value = defaultLogger;
        Object.assign(this, properties);
      };
      registry.setDefaultLogger(defaultLogger, {});
      registry.setLoggerModule(defaultLogger, defaultLoggerModule);
      const name = 'Test';
      const type = 'Module';
      const properties = { props: 'PropsValue' };
      registry.setLoggerSetup(name, type, undefined, properties);

      // acts
      const logger = registry.resolveLogger(name, type);

      // asserts
      expect(logger.value).to.equal(defaultLogger);
      expect(logger.props).to.equal(properties.props);
    });

    it('expect to resolve an instance of the default logger when setup is not set.', () => {
      // arranges
      const registry = new LoggerService();
      const defaultLogger = 'DefaultLogger';
      const defaultLoggerModule = function (name, type, logger, properties) {
        this.value = defaultLogger;
        Object.assign(this, properties);
      };
      registry.setDefaultLogger(defaultLogger, { props: 'default properties' });
      registry.setLoggerModule(defaultLogger, defaultLoggerModule);
      const name = 'Test';
      const type = 'Module';

      // acts
      const logger = registry.resolveLogger(name, type);

      // asserts
      expect(logger.value).to.equal(defaultLogger);
      expect(logger.props).to.equal('default properties');
    });
  });

  describe('#resolveLogger(), useInstanceCache set as false', () => {
    it('expect to resolve the different instance when it uses instance cache.', () => {
      // arranges
      const registry = new LoggerService({ useInstanceCache: false });
      const logger = 'TestLogger';
      const loggerModule = function () {
        this.value = 'TestValue';
      };
      registry.setLoggerModule(logger, loggerModule);
      const name = 'Test';
      const type = 'Module';
      const properties = {};
      registry.setLoggerSetup(name, type, logger, properties);

      // acts
      const logger01 = registry.resolveLogger(name, type);
      const logger02 = registry.resolveLogger(name, type);

      // asserts
      expect(logger01.value).to.equal('TestValue');
      expect(logger01).not.to.equal(logger02);
    });

    it('expect to resolve an instance of the default logger when setup.name is not set.', () => {
      // arranges
      const registry = new LoggerService({ useInstanceCache: false });
      const defaultLogger = 'DefaultLogger';
      const defaultLoggerModule = function () {
        this.value = defaultLogger;
      };
      registry.setDefaultLogger(defaultLogger, {});
      registry.setLoggerModule(defaultLogger, defaultLoggerModule);
      const testLogger = 'TestLogger';
      const testLoggerModule = function () {
        this.value = testLogger;
      };
      const name = 'Test';
      const type = 'Module';
      const properties = {};
      registry.setLoggerModule(testLogger, testLoggerModule);
      registry.setLoggerSetup(name, type, testLogger, properties);

      // acts
      const logger01 = registry.resolveLogger('Unknown', type);
      const logger02 = registry.resolveLogger(name, type);

      // asserts
      expect(logger01.value).to.equal(defaultLogger);
      expect(logger02.value).to.equal(testLogger);
    });

    it('expect to resolve an instance of the default logger when setup.type is not set.', () => {
      // arranges
      const registry = new LoggerService({ useInstanceCache: false });
      const defaultLogger = 'DefaultLogger';
      const defaultLoggerModule = function () {
        this.value = defaultLogger;
      };
      registry.setDefaultLogger(defaultLogger, {});
      registry.setLoggerModule(defaultLogger, defaultLoggerModule);
      const testLogger = 'TestLogger';
      const testLoggerModule = function () {
        this.value = testLogger;
      };
      const name = 'Test';
      const type = 'Module';
      const properties = {};
      registry.setLoggerModule(testLogger, testLoggerModule);
      registry.setLoggerSetup(name, type, testLogger, properties);

      // acts
      const logger01 = registry.resolveLogger(name, 'Unknown');
      const logger02 = registry.resolveLogger(name, type);

      // asserts
      expect(logger01.value).to.equal(defaultLogger);
      expect(logger02.value).to.equal(testLogger);
    });

    it('expect to resolve an instance of the default logger when setup.logger is not set.', () => {
      // arranges
      const registry = new LoggerService({ useInstanceCache: false });
      const defaultLogger = 'DefaultLogger';
      const defaultLoggerModule = function (name, type, logger, properties) {
        this.value = defaultLogger;
        Object.assign(this, properties);
      };
      registry.setDefaultLogger(defaultLogger, {});
      registry.setLoggerModule(defaultLogger, defaultLoggerModule);
      const name = 'Test';
      const type = 'Module';
      const properties = { props: 'PropsValue' };
      registry.setLoggerSetup(name, type, undefined, properties);

      // acts
      const logger = registry.resolveLogger(name, type);

      // asserts
      expect(logger.value).to.equal(defaultLogger);
      expect(logger.props).to.equal(properties.props);
    });

    it('expect to resolve an instance of the default logger when setup is not set.', () => {
      // arranges
      const registry = new LoggerService({ useInstanceCache: false });
      const defaultLogger = 'DefaultLogger';
      const defaultLoggerModule = function (name, type, logger, properties) {
        this.value = defaultLogger;
        Object.assign(this, properties);
      };
      registry.setDefaultLogger(defaultLogger, { props: 'default properties' });
      registry.setLoggerModule(defaultLogger, defaultLoggerModule);
      const name = 'Test';
      const type = 'Module';

      // acts
      const logger = registry.resolveLogger(name, type);

      // asserts
      expect(logger.value).to.equal(defaultLogger);
      expect(logger.props).to.equal('default properties');
    });
  });
});
