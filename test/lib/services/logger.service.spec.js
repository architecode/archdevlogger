'use strict';

const expect = require('chai').expect;
const sinon = require('sinon');
const LoggerService = require('../../../dst/lib/services/logger.service').LoggerService;

describe('logger.service.js tests', () => {
  describe('#constructor()', () => {
    it('expect to create an instance of LoggerService.', () => {
      // arranges

      // acts
      const instance = new LoggerService();

      // asserts
      expect(instance instanceof LoggerService).to.be.true;
    });
  });
});
