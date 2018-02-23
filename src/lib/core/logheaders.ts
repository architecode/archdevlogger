import * as OS from "os";
import { LogProperties } from "./logproperties";

export class LogHeaders {
  Author: string;

  constructor(properties: LogProperties = {}, name?: string, type?: string) {
    const headers = properties.logheaders || {};
    Object.assign(this, headers);

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
