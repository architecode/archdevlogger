import { EventEmitter } from "events";
import { CommonLogLevels, LogHeaders, LogProperties } from "./core";

export const DefinedLoggerConfig = {
  level: "info",
  levels: CommonLogLevels.levels
};

export class ExtensibleLogger extends EventEmitter {
  Headers: LogHeaders;

  constructor(properties: LogProperties = {}, name?: string, type?: string) {
    super();

    const self: any = this;
    const levels = properties.levels || DefinedLoggerConfig.levels;
    Object.keys(levels).forEach(level =>
      self[level] = (message: string, data?: any) => self.log(level, message, data));

    this.Headers = new LogHeaders(properties, name, type);
    this.configure(properties, name, type);
  }

  setAuthor(name?: string, type?: string) {
    this.Headers.setAuthor(name, type);
  }

  configure(properties: LogProperties, name: string, type: string) {
    this.emit("configured", { properties, name, type });
  }

  log(level: string, message: string, data?: any) {
    this.emit("logged", { level, message, data });
  }
}

Object.freeze(DefinedLoggerConfig);
