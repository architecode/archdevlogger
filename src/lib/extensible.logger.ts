import { EventEmitter } from "events";
import { DefinedLoggerProperties } from "./core";
import { ILoggerProperties, LoggerMetadata } from "./core";

export abstract class ExtensibleLogger extends EventEmitter {
  Author: string;
  Metadata: LoggerMetadata;

  constructor(name?: string, type?: string, logger?: string, properties: ILoggerProperties = {}) {
    super();

    Object.defineProperties(this, {
      "Author": {
        configurable: false,
        enumerable: true,
        get: () => this.Metadata.Author,
      }
    });

    this.configure(name, type, logger, properties);
  }

  setAuthor(name?: string, type?: string) {
    this.Metadata.setAuthor(name, type);
  }

  configure(name: string, type: string, logger: string, properties: ILoggerProperties) {
    const self: any = this;
    const levels = properties.levels || DefinedLoggerProperties.levels;
    Object.keys(levels).forEach(level =>
      self[level] = (message: string, data?: any) => self.log(level, message, data));

    this.Metadata = new LoggerMetadata(properties.metadata, name, type, logger);
  }

  abstract log(level: string, message: string, data?: any): void;
}
