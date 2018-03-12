import { AppEnv } from "archappenv";
import { LoggerRegistry } from "../core/logger.registry";
import { Loader } from "../core";
import { LoggerServiceConfig } from "./logger.service.config";

export class LoggerService {
  private Registry: LoggerRegistry;

  constructor(options: { useInstanceCache?: boolean; } = {}) {
    Object.defineProperties(this, {
      "Registry": {
        configurable: false,
        enumerable: false,
        writable: false,
        value: new LoggerRegistry(options)
      },
    });
  }

  static fromFile(configFile: string) {
    const filepath = AppEnv.Util.resolveFile(configFile);
    const config: LoggerServiceConfig = require(filepath);
    const service = new LoggerService(config.loggerServiceOptions);
    service.configure(config.loggerServiceConfigs);

    return service;
  }

  configure(config: {
    defaultLogger?: { logger: string; properties?: any; };
    loggerModules?: { logger: string; module: { type: string; resource: string; options?: any; }; }[];
    loggerSetups?: { name: string; type: string; logger?: string; properties?: any; }[];
  } = {}) {
    if (config.defaultLogger) {
      this.setDefaultLogger(config.defaultLogger.logger, config.defaultLogger.properties);
    }

    if (Array.isArray(config.loggerModules)) {
      config.loggerModules.forEach(each => this.setLoggerModule(each.logger, Loader.loadLoggerModule(each.module)));
    }

    if (Array.isArray(config.loggerSetups)) {
      config.loggerSetups.forEach(each => this.setLoggerSetup(each.name, each.type, each.logger, each.properties));
    }
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

  resolveDefaultLogger(name: string, type: string, properties?: any) {
    return this.Registry.resolveDefaultLogger(name, type, properties);
  }

  resolveLogger(name: string, type: string) {
    return this.Registry.resolveLogger(name, type);
  }
}
