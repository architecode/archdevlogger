'use strict';

const expect = require('chai').expect;
const sinon = require('sinon');
const os = require('os');
const LoggerMetadata = require('../../../dst/lib/core/logger.metadata').LoggerMetadata;

describe('logger.metadata.js tests', () => {
  describe('#constructor()', () => {
    it('expect to create an instance of LoggerMetadata.', () => {
      // arranges
      const expected = {
        Author: 'UNKNOWN',
        Logger: undefined
      };

      // acts
      const instance = new LoggerMetadata();

      // asserts
      expect(instance instanceof LoggerMetadata).to.be.true;
      expect(instance).to.deep.equal(expected);
    });

    it('expect to create an instance of LoggerMetadata with metadata, and name.', () => {
      // arranges
      const metadata = {
        data: 'sample'
      };
      const name = 'SampleLogger';
      const expected = {
        Author: name,
        Logger: undefined,
        data: 'sample',
      };

      // acts
      const instance = new LoggerMetadata(metadata, name);

      // asserts
      expect(instance).to.deep.equal(expected);
    });

    it('expect to create an instance of LoggerMetadata with headers, and type.', () => {
      // arranges
      const metadata = {
        data: 'sample',
        ext: { val: 'test' }
      };
      const type = 'Module';
      const expected = {
        Author: `::${type}`,
        Logger: undefined,
        data: 'sample',
        ext: { val: 'test' },
      };

      // acts
      const instance = new LoggerMetadata(metadata, undefined, type);

      // asserts
      expect(instance).to.deep.equal(expected);
    });

    it('expect to create an instance of LoggerMetadata with headers, name, and type.', () => {
      // arranges
      const metadata = {
        data: 'sample',
        ext: { val: 'test' }
      };
      const name = 'SampleLogger';
      const type = 'Module';
      const logger = 'TestLogger';
      const expected = {
        Author: `${name}::${type}`,
        Logger: logger,
        data: 'sample',
        ext: { val: 'test' },
      };

      // acts
      const instance = new LoggerMetadata(metadata, name, type, logger);

      // asserts
      expect(instance).to.deep.equal(expected);
    });
  });

  describe('#setAuthor()', () => {
    it('expect to set a default author.', () => {
      // arranges
      const instance = new LoggerMetadata({}, 'name', 'type');
      const arranged = instance.Author;
      const expected = 'UNKNOWN';

      // acts
      instance.setAuthor();

      // asserts
      expect(arranged).to.equal('name::type');
      expect(instance.Author).to.equal(expected);
    });

    it('expect to set an author with name.', () => {
      // arranges
      const instance = new LoggerMetadata();
      const expected = 'name';

      // acts
      instance.setAuthor('name');

      // asserts
      expect(instance.Author).to.equal(expected);
    });

    it('expect to set an author with type.', () => {
      // arranges
      const instance = new LoggerMetadata();
      const expected = '::type';

      // acts
      instance.setAuthor(undefined, 'type');

      // asserts
      expect(instance.Author).to.equal(expected);
    });

    it('expect to set an author with name and type.', () => {
      // arranges
      const instance = new LoggerMetadata();
      const expected = 'name::type';

      // acts
      instance.setAuthor('name', 'type');

      // asserts
      expect(instance.Author).to.equal(expected);
    });
  });

  describe('#pid()', () => {
    it('expect to get a process id.', () => {
      // arranges
      const instance = new LoggerMetadata();
      const expected = process.pid;

      // acts
      const result = instance.pid();

      // asserts
      expect(result).to.equal(expected);
    });
  });

  describe('#hostname()', () => {
    it('expect to get a hostname.', () => {
      // arranges
      const instance = new LoggerMetadata();
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
      const instance = new LoggerMetadata();

      // acts
      const result = instance.timestamp();
      const datetime = new Date(result);

      // asserts
      expect(result).not.to.be.undefined;
      expect(datetime).not.to.be.undefined;
    });
  });
});
