'use strict';

const expect = require('chai').expect;
const sinon = require('sinon');
const Logger = require('../../resources/logger');
const DefaultLogger = require('../../../dst/lib/services/default.logger').DefaultLogger;
const LoggerModuleService = require('../../../dst/lib/services/logger.module.service').LoggerModuleService;
const LoggerService = require('../../../dst/lib/services/logger.service').LoggerService;

describe('logger.service.js tests', () => {
  before(() => {
    DefaultLogger.clear();
    LoggerModuleService.clear();
    LoggerService.clear();
  });

  afterEach(() => {
    DefaultLogger.clear();
    LoggerModuleService.clear();
    LoggerService.clear();
  });

  describe('#initialize()', () => {
    it('expect to initialize loggers with no configs.', () => {
      // arranges

      // acts
      LoggerService.initialize();
      const instance = LoggerService.getInstance('TestLogger', 'Module');

      // asserts
      expect(instance).to.be.undefined;
    });

    it('expect to initialize loggers.', () => {
      // arranges
      const type = 'Module';
      const name = 'TestLogger';
      const defaultProperties = {};
      const config = {
        defineds: [
          { logger: 'Logger', module: './test/resources/logger' }
        ],
        setups: [
          { logger: 'Logger', name, type }
        ],
        default: {
          logger: 'Logger',
          properties: defaultProperties
        }
      };

      // acts
      LoggerService.initialize(config);
      const testLogger = LoggerService.getInstance(name, type);
      const sameTypeLogger = LoggerService.getInstance('AnotherLogger', type);
      const anotherLogger = LoggerService.getInstance('AnotherLogger', 'AnotherType');
      const nonExistLogger = LoggerService.getInstance('AnotherLogger', 'AnotherType', false);

      // asserts
      expect(testLogger).not.to.be.undefined;
      expect(testLogger instanceof Logger).to.be.true;
      expect(sameTypeLogger).not.to.be.undefined;
      expect(sameTypeLogger instanceof Logger).to.be.true;
      expect(anotherLogger).not.to.be.undefined;
      expect(anotherLogger instanceof Logger).to.be.true;
      expect(nonExistLogger).to.be.undefined;
    });
  });

  describe('#deleteInstance()', () => {
    it('expect to delete a logger.', () => {
      // arranges
      const type = 'Module';
      const name = 'TestLogger';
      const config = {
        defineds: [
          { logger: 'Logger', module: './test/resources/logger' }
        ],
        setups: [
          { logger: 'Logger', name, type }
        ],
        default: {
          logger: 'Logger',
          properties: {}
        }
      };
      LoggerService.initialize(config);

      // acts
      const beforeAct = LoggerService.hasInstance(name, type);
      const result = LoggerService.deleteInstance(name, type);
      const afterAct = LoggerService.hasInstance(name, type);

      // asserts
      expect(beforeAct).to.be.true;
      expect(result).to.be.true;
      expect(afterAct).to.be.false;
    });

    it('expect to delete a non-exist logger.', () => {
      // arranges
      const name = 'TestLogger';
      const type = 'Module';
      LoggerService.clear();
      DefaultLogger.clear();

      // acts
      const result = LoggerService.deleteInstance(name, type);

      // asserts
      expect(result).to.be.false;
    });
  });

  describe('#hasInstance()', () => {
    it('expect to determine if there is a logger.', () => {
      // arranges
      const type = 'Module';
      const name = 'TestLogger';
      const nonExist = 'nonExist';
      const config = {
        defineds: [
          { logger: 'Logger', module: './test/resources/logger' }
        ],
        setups: [
          { logger: 'Logger', name, type }
        ],
        default: {
          logger: 'Logger',
          properties: {}
        }
      };
      LoggerService.initialize(config);

      // acts
      const positive = LoggerService.hasInstance(name, type);
      const negative = LoggerService.hasInstance(nonExist, nonExist);

      // asserts
      expect(positive).to.be.true;
      expect(negative).to.be.false;
    });
  });

  describe('#setInstance()', () => {
    it('expect to determine if there is a logger.', () => {
      // arranges
      const type = 'Module';
      const name = 'TestLogger';
      const config = {
        defineds: [
          { logger: 'Logger', module: './test/resources/logger' }
        ],
        setups: [
          { logger: 'Logger', name, type }
        ],
        default: {
          logger: 'Logger',
          properties: {}
        }
      };
      LoggerService.initialize(config);

      // acts
      const positive = LoggerService.setInstance('Positive', type, 'Logger');
      const negative = LoggerService.setInstance(name, type, 'Logger');

      // asserts
      expect(positive).to.be.true;
      expect(negative).to.be.false;
    });
  });
});
