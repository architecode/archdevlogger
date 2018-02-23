import { EventEmitter } from "events";
import { ExtensibleEventLog } from "./extensible.eventlog";
import { CommonLogLevels, LogHeaders } from "./core";

export const DefinedLoggerConfig = {
  level: "info",
  levels: CommonLogLevels.levels
};

export class ExtensibleLogger extends EventEmitter {
  Headers: LogHeaders;

  constructor(properties: any = {}, name?: string, type?: string) {
    super();

    const levels = properties.levels || DefinedLoggerConfig.levels;
    const self: any = this;
    Object.keys(levels).forEach(level =>
      self[level] = (message: string, data?: any) =>
        self.log(level, message, data));

    this.Headers = new LogHeaders(properties, name, type);
    this.configure(properties, name, type);
  }

  setAuthor(name?: string, type?: string) {
    this.Headers.setAuthor(name, type);
  }

  configure(properties: any, name: string, type: string) {
    this.emit("configured", properties, name, type);
  }

  log(level: string, message: string, ext?: any) {
    this.emit("logged", { level, message, ext });
  }

  logEvent(eventlog: ExtensibleEventLog) {
    const ext = Object.assign({}, eventlog);
    const level = ext.level;
    const message = ext.message;
    delete ext.level;
    delete ext.message;
    this.log(level, message, ext);
    this.emit("eventlogged", eventlog);
  }
}

Object.freeze(DefinedLoggerConfig);
