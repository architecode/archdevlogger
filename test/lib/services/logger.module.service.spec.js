'use strict';

const expect = require('chai').expect;
const sinon = require('sinon');
const path = require('path');
const AppEnv = require('archappenv').AppEnv;
const mock_require = require('mock-require');
const LoggerModuleService = require('../../../dst/lib/services/logger.module.service').LoggerModuleService;

describe('logger.service.js tests', () => {
  const definedMock = {};

  before(() => {
    definedMock.flogger = {
      path: AppEnv.Util.resolveFile('./f_logger'),
      logger: { value: 'f_logger' }
    };

    definedMock.mlogger = {
      path: 'm_logger',
      logger: { value: 'm_logger' }
    };

    mock_require(definedMock.flogger.path, definedMock.flogger.logger);
    mock_require(definedMock.mlogger.path, definedMock.mlogger.logger);
  });

  after(() => {
    mock_require.stopAll();
  });

  afterEach(() => {
    LoggerModuleService.clear();
  });

  describe('#initialize()', () => {
    it('expect to have the logger after initialized with relative path.', function () {
      // arranges
      const name = 'testLogger';
      const mpath = './f_logger';
      const defined = [{ logger: name, module: mpath }];

      // acts
      const preInit = LoggerModuleService.hasLogger(name);
      LoggerModuleService.initialize(defined);
      const postInit = LoggerModuleService.hasLogger(name);
      const logger = LoggerModuleService.getLogger(name);

      // asserts
      expect(path.isAbsolute(mpath)).to.be.false;
      expect(preInit).to.be.false;
      expect(postInit).to.be.true;
      expect(logger.module.value).to.equal('f_logger');
    });

    it('expect to have the logger after initialized with absolute path.', function () {
      // arranges
      const name = 'testLogger';
      const mpath = path.join(AppEnv.Util.packagePath(), 'f_logger');
      const defined = [{ logger: name, module: mpath }];

      // acts
      const preInit = LoggerModuleService.hasLogger(name);
      LoggerModuleService.initialize(defined);
      const postInit = LoggerModuleService.hasLogger(name);
      const logger = LoggerModuleService.getLogger(name);

      // asserts
      expect(path.isAbsolute(mpath)).to.be.true;
      expect(preInit).to.be.false;
      expect(postInit).to.be.true;
      expect(logger.module.value).to.equal('f_logger');
    });

    it('expect to have the logger after initialized with module.', function () {
      // arranges
      const name = 'testLogger';
      const base = AppEnv.Util.packagePath();
      const defined = [{ logger: name, module: 'm_logger' }];

      // acts
      const preInit = LoggerModuleService.hasLogger(name);
      LoggerModuleService.initialize(defined, base);
      const postInit = LoggerModuleService.hasLogger(name);
      const logger = LoggerModuleService.getLogger(name);

      // asserts
      expect(preInit).to.be.false;
      expect(postInit).to.be.true;
      expect(logger.module.value).to.equal('m_logger');
    });
  });

  describe('#deleteLogger()', () => {
    it('expect to have the logger after initialized with relative path.', function () {
      // arranges
      const name = 'testLogger';
      const mpath = './f_logger';
      const defined = [{ logger: name, module: mpath }];
      LoggerModuleService.initialize(defined);

      // acts
      const beforeDeleted = LoggerModuleService.hasLogger(name);
      LoggerModuleService.deleteLogger(name);
      const afterDeleted = LoggerModuleService.hasLogger(name);

      // asserts
      expect(beforeDeleted).to.be.true;
      expect(afterDeleted).to.be.false;
    });
  });
});
