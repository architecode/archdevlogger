import * as OS from "os";
import { LogProperties } from "./logproperties";

export class LogHeaders {
  Author: string;
  Logger: string;

  constructor(logHeaders: Object = {}, name?: string, type?: string, logger?: string) {
    this.Logger = logger;
    Object.assign(this, logHeaders);

    this.setAuthor(name, type);
  }

  setAuthor(name?: string, type?: string) {
    if (name != undefined && type != undefined) {
      this.Author = `${name}::${type}`;
    } else if (name != undefined) {
      this.Author = name;
    } else if (type != undefined) {
      this.Author = `::${type}`;
    } else {
      this.Author = "UNKNOWN";
    }
  }

  pid() {
    return process.pid;
  }

  hostname() {
    return OS.hostname();
  }

  timestamp() {
    return new Date().toISOString();
  }
}
