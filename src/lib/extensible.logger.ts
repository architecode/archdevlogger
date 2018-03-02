import { EventEmitter } from "events";
import { LogHeaders, LogProperties } from "./core";
import { DefinedLoggerConfig } from "./services";

export abstract class ExtensibleLogger extends EventEmitter {
  Author: string;
  Headers: LogHeaders;

  constructor(name?: string, type?: string, logger?: string, properties: LogProperties = {}) {
    super();

    Object.defineProperties(this, {
      "Author": {
        configurable: false,
        enumerable: true,
        get: () => this.Headers.Author,
      }
    });

    this.configure(name, type, logger, properties);
  }

  setAuthor(name?: string, type?: string) {
    this.Headers.setAuthor(name, type);
  }

  configure(name: string, type: string, logger: string, properties: LogProperties) {
    const self: any = this;
    const levels = properties.levels || DefinedLoggerConfig.levels;
    Object.keys(levels).forEach(level =>
      self[level] = (message: string, data?: any) => self.log(level, message, data));

    this.Headers = new LogHeaders(properties.logheaders, name, type, logger);
  }

  abstract log(level: string, message: string, data?: any): void;
}

Object.freeze(DefinedLoggerConfig);
