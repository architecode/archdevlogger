'use strict';

const expect = require('chai').expect;
const sinon = require('sinon');
const os = require('os');
const LogHeaders = require('../../../dst/lib/core/logheaders').LogHeaders;

describe('logheaders.js tests', () => {
  describe('#constructor()', () => {
    it('expect to create a default instance.', () => {
      // arranges
      const expected = {
        Author: 'UNKNOWN'
      };

      // acts
      const instance = new LogHeaders();

      // asserts
      expect(instance).to.deep.equal(expected);
    });

    it('expect to create an instance with headers, and name.', () => {
      // arranges
      const logHeaders = {
        Header: 'sample'
      };
      const name = 'SampleLogger';
      const expected = {
        Header: 'sample',
        Author: name
      };

      // acts
      const instance = new LogHeaders(logHeaders, name);

      // asserts
      expect(instance).to.deep.equal(expected);
    });

    it('expect to create an instance with headers, and type.', () => {
      // arranges
      const logHeaders = {
        Header: 'sample',
        Extra: 'test'
      };
      const type = 'Module';
      const expected = {
        Header: 'sample',
        Extra: 'test',
        Author: `::${type}`
      };

      // acts
      const instance = new LogHeaders(logHeaders, undefined, type);

      // asserts
      expect(instance).to.deep.equal(expected);
    });

    it('expect to create an instance with headers, name, and type.', () => {
      // arranges
      const logHeaders = {
        Header: 'sample'
      };
      const name = 'SampleLogger';
      const type = 'Module';
      const expected = {
        Header: 'sample',
        Author: `${name}::${type}`
      };

      // acts
      const instance = new LogHeaders(logHeaders, name, type);

      // asserts
      expect(instance).to.deep.equal(expected);
    });
  });

  describe('#pid()', () => {
    it('expect to get a process id.', () => {
      // arranges
      const instance = new LogHeaders();
      const expected = process.pid.toString();

      // acts
      const result = instance.pid();

      // asserts
      expect(result).to.equal(expected);
    });
  });

  describe('#hostname()', () => {
    it('expect to get a hostname.', () => {
      // arranges
      const instance = new LogHeaders();
      const expected = os.hostname();

      // acts
      const result = instance.hostname();

      // asserts
      expect(result).to.equal(expected);
    });
  });

  describe('#timestamp()', () => {
    it('expect to get a timestamp.', () => {
      // arranges
      const instance = new LogHeaders();

      // acts
      const result = instance.timestamp();
      const datetime = new Date(result);

      // asserts
      expect(result).not.to.be.undefined;
      expect(datetime).not.to.be.undefined;
    });
  });
});
