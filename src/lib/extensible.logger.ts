import { EventEmitter } from "events";
import { DefinedLoggerProperties } from "./core";
import { ILoggerProperties, LoggerMetadata } from "./core";

export abstract class ExtensibleLogger<PropertiesType = any> extends EventEmitter {
  Author: string;
  Metadata: LoggerMetadata;
  Properties: PropertiesType;

  constructor(name?: string, type?: string, logger?: string, properties: ILoggerProperties = {}) {
    super();

    Object.defineProperties(this, {
      "Metadata": {
        configurable: false,
        enumerable: true,
        writable: false,
        value: new LoggerMetadata(properties.metadata, name, type, logger),
      },
      "Properties": {
        configurable: false,
        enumerable: true,
        writable: false,
        value: properties,
      },
    });

    Object.defineProperties(this, {
      "Author": {
        configurable: false,
        enumerable: true,
        get: () => this.Metadata.Author,
      }
    });

    this.setAuthor(name, type);
    this.configure(name, type, logger, properties);
  }

  setAuthor(name?: string, type?: string) {
    this.Metadata.setAuthor(name, type);
  }

  configure(name: string, type: string, logger: string, properties: ILoggerProperties) {
    const self: any = this;
    const levels = properties.levels || DefinedLoggerProperties.levels;
    Object.keys(levels).forEach(level =>
      self[level] = (message: string, data?: any) => self.logFormat(level, message, data));
  }

  abstract log(logObj: object): void;
  abstract logFormat(level: string, message: string, data?: object): void;
}
