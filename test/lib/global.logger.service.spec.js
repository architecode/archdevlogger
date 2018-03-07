'use strict';

const expect = require('chai').expect;
const sinon = require('sinon');
const LoggerService = require('../../dst/lib/services/logger.service').LoggerService;
const GlobalLoggerService = require('../../dst/lib/global.logger.service').GlobalLoggerService;

describe('global.logger.service.js tests', () => {
  describe('#constructor()', () => {
    it('expect to create an instance of TestLogger.', () => {
      // arranges

      // acts
      const instance01 = GlobalLoggerService;
      const instance02 = GlobalLoggerService;

      // asserts
      expect(GlobalLoggerService instanceof LoggerService).to.be.true;
    });
  });
});
