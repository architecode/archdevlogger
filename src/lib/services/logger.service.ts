import { ArchDevLoggerError } from "../errors";
import { LoggerRegistry } from "../core";

export class LoggerService {
  private Registry: LoggerRegistry;

  constructor(options: { useInstanceCache: boolean; }) {
    Object.defineProperties(this, {
      "Registry": {
        configurable: false,
        enumerable: false,
        writable: false,
        value: new LoggerRegistry()
      },
    });
  }

  getDefaultLogger() {
    return this.Registry.getDefaultLogger();
  }

  setDefaultLogger(logger: string, properties?: any) {
    this.Registry.setDefaultLogger(logger, properties);
  }

  getLoggerModule(logger: string) {
    return this.Registry.getLoggerModule(logger);
  }

  setLoggerModule(logger: string, LoggerModule: any) {
    this.Registry.setLoggerModule(logger, LoggerModule);
  }

  hasLoggerModule(logger: string) {
    return this.Registry.hasLoggerModule(logger);
  }

  getLoggerSetup(name: string, type: string) {
    return this.Registry.getLoggerSetup(name, type);
  }

  setLoggerSetup(name: string, type: string, logger?: string, properties?: any) {
    this.Registry.setLoggerSetup(name, type, logger, properties);
  }

  hasLoggerSetup(name: string, type: string) {
    return this.Registry.hasLoggerSetup(name, type);
  }

  resolveLogger(name: string, type: string) {
  }
}
