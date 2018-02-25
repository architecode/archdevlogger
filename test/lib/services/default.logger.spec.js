'use strict';

const expect = require('chai').expect;
const sinon = require('sinon');
const LoggerModuleService = require('../../../dst/lib/services/logger.module.service').LoggerModuleService;
const DefaultLogger = require('../../../dst/lib/services/default.logger').DefaultLogger;

describe('default.logger.js tests', () => {
  describe('#get()', () => {
    it('expect to get a default logger.', () => {
      // arranges

      // acts
      const instance = DefaultLogger.get('test', 'Module');

      // asserts
      expect(instance).to.be.undefined;
    });
  });

  describe('#setConfig()', () => {
    afterEach(() => {
      DefaultLogger.clear();
    });

    it('expect to set a default logger.', () => {
      // arranges
      const defineds = [
        { logger: 'Logger', module: './test/resources/logger' }
      ];
      LoggerModuleService.initialize(defineds);
      const config = { logger: 'Logger', properties: {} };

      // acts
      DefaultLogger.set(config);
      const instance = DefaultLogger.get('name');

      // asserts
      expect(instance).not.to.be.undefined;
    });
  });
});
