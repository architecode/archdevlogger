import { DefinedLoggerModuleError, UndefinedDefaultLoggerError } from "../errors";

export class LoggerRegistry {
  UseInstanceCache: boolean;
  private DefaultLogger: { logger: string; properties?: any; };
  private ModulesMap: Map<string, any>;
  private SetupsMap: Map<string, Map<string, { logger?: string; properties?: any; instance?: any; }>>;

  constructor(options: { useInstanceCache?: boolean; } = {}) {
    Object.defineProperties(this, {
      "UseInstanceCache": {
        configurable: false,
        enumerable: false,
        writable: false,
        value: options.useInstanceCache != undefined ? options.useInstanceCache : true
      },
      "DefaultLogger": {
        configurable: false,
        enumerable: false,
        writable: false,
        value: {}
      },
      "ModulesMap": {
        configurable: false,
        enumerable: false,
        writable: false,
        value: new Map<string, any>()
      },
      "SetupsMap": {
        configurable: false,
        enumerable: false,
        writable: false,
        value: new Map<string, Map<string, { logger?: string; properties?: string; instance?: any; }>>()
      },
    });
  }

  getDefaultLogger() {
    return this.DefaultLogger;
  }

  setDefaultLogger(logger: string, properties?: any) {
    this.DefaultLogger.logger = logger;
    this.DefaultLogger.properties = properties;
  }

  getLoggerModule(logger: string) {
    return this.ModulesMap.get(logger);
  }

  setLoggerModule(logger: string, LoggerModule: any) {
    this.ModulesMap.set(logger, LoggerModule);
  }

  hasLoggerModule(logger: string) {
    return this.ModulesMap.has(logger);
  }

  getLoggerSetup(name: string, type: string) {
    if (this.hasLoggerSetup(name, type)) {
      const { logger, properties, instance } = this.SetupsMap.get(type).get(name);

      return { name, type, logger, properties, instance };
    } else {
      return {};
    }
  }

  setLoggerSetup(name: string, type: string, logger?: string, properties?: any) {
    if (!this.SetupsMap.has(type)) {
      this.SetupsMap.set(type, new Map());
    }

    this.SetupsMap.get(type).set(name, { logger, properties });
  }

  hasLoggerSetup(name: string, type: string) {
    return this.SetupsMap.has(type) && this.SetupsMap.get(type).has(name);
  }

  resolveLogger(name: string, type: string, properties?: any) {
    if (this.hasLoggerSetup(name, type)) {
      const setup = this.getLoggerSetup(name, type);
      const { instance, logger } = setup;

      if (this.UseInstanceCache && instance) {
        return instance;
      } else {
        const Logger = logger && this.hasLoggerModule(logger) ? this.getLoggerModule(logger) : undefined;

        if (!Logger) {
          throw new DefinedLoggerModuleError();
        }

        const instance = new Logger(name, type, logger, properties || setup.properties);

        if (this.UseInstanceCache) {
          const typeMap = this.SetupsMap.get(type);
          typeMap.set(name, { instance, logger, properties: setup.properties });
        }

        return instance;
      }
    } else {
      const Logger = this.getLoggerModule(this.DefaultLogger.logger);

      if (!Logger) {
        throw new UndefinedDefaultLoggerError();
      }

      const instance = new Logger(name, type, this.DefaultLogger.logger, properties || this.DefaultLogger.properties);

      if (this.UseInstanceCache) {
        if (!this.SetupsMap.has(type)) {
          this.SetupsMap.set(type, new Map());
        }

        const typeMap = this.SetupsMap.get(type);
        typeMap.set(name, { instance });
      }

      return instance;
    }
  }
}
