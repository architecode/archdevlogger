import * as OS from "os";

const SEPARATOR = ":|:";
const UNKNOWN = "UNKNOWN";

export class LoggerMetadata {
  Author: string;
  Logger: string;

  constructor(metadata: object = {}, name?: string, type?: string, logger?: string) {
    Object.defineProperties(this, {
      "Logger": {
        configurable: false,
        enumerable: true,
        writable: false,
        value: logger
      }
    });

    Object.assign(this, metadata);
    this.setAuthor(name, type);
  }

  setAuthor(name?: string, type?: string) {
    if (name && type) {
      this.Author = `${name}${SEPARATOR}${type}`;
    } else if (name) {
      this.Author = name;
    } else if (type) {
      this.Author = `${SEPARATOR}${type}`;
    } else {
      this.Author = UNKNOWN;
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

  static ofAuthor(author: string) {
    if (author == UNKNOWN) {
      return {};
    } else {
      const vals = author.split(SEPARATOR);
      const name = vals[0].length > 0 ? vals[0] : undefined;
      const type = vals[1];

      return { name, type };
    }
  }
}
