export class ExtensibleEventLog {
  name: string;
  level: string;
  message: string;

  constructor(name: string, level: string, message: string) {
    Object.defineProperties(this, {
      "name": {
        configurable: false,
        enumerable: true,
        writable: false,
        value: name,
      },
      "level": {
        configurable: false,
        enumerable: false,
        writable: false,
        value: level,
      },
      "message": {
        configurable: false,
        enumerable: false,
        writable: false,
        value: message,
      },
    });
  }
}
