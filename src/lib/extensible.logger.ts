import { EventEmitter } from "events";
import { CommonLogLevels, LogHeaders, LogProperties } from "./core";

export const DefinedLoggerConfig = {
  level: "info",
  levels: CommonLogLevels.levels
};

export abstract class ExtensibleLogger extends EventEmitter {
  Author: string;
  Headers: LogHeaders;

  constructor(properties: LogProperties = {}, name?: string, type?: string) {
    super();

    Object.defineProperties(this, {
      "Author": {
        configurable: false,
        enumerable: true,
        get: () => this.Headers.Author,
      }
    });

    this.configure(properties, name, type);
  }

  setAuthor(name?: string, type?: string) {
    this.Headers.setAuthor(name, type);
  }

  configure(properties: LogProperties, name: string, type: string) {
    const self: any = this;
    const levels = properties.levels || DefinedLoggerConfig.levels;
    Object.keys(levels).forEach(level =>
      self[level] = (message: string, data?: any) => self.log(level, message, data));

    this.Headers = new LogHeaders(properties.logheaders, name, type);
  }

  abstract log(level: string, message: string, data?: any): void;
}

Object.freeze(DefinedLoggerConfig);
