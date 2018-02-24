import * as OS from "os";
import { LogConfig } from "./logconfig";

export class LogHeaders {
  Author: string;

  constructor(logHeaders: Object = {}, name?: string, type?: string) {
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
    return process.pid.toString();
  }

  hostname() {
    return OS.hostname();
  }

  timestamp() {
    return new Date().toISOString();
  }
}
