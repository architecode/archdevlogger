import { ArchDevLoggerError } from "../errors";

export interface LoggerRegistryOptions {
  useInstanceCache?: boolean;
}

export class LoggerRegistry {
  UseInstanceCache: boolean;
  private DefaultLogger: { logger: string; properties?: any; };
  private ModulesMap: Map<string, any>;
  private SetupsMap: Map<string, Map<string, { logger?: string; properties?: any; instance?: any; }>>;

  constructor(options: LoggerRegistryOptions = {}) {
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
    if (this.SetupsMap.has(type) && this.SetupsMap.get(type).has(name)) {
      const { logger, properties } = this.SetupsMap.get(type).get(name);

      return { name, type, logger, properties };
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

  resolveDefaultLogger(properties?: any) {
    const Logger = this.getLoggerModule(this.DefaultLogger.logger);

    if (Logger) {
      return new Logger(properties || this.DefaultLogger.properties);
    } else {
      throw new ArchDevLoggerError("Default Logger Undefined");
    }
  }

  resolveLogger(name: string, type: string) {
    if (this.hasLoggerSetup(name, type)) {
      const typeMap = this.SetupsMap.get(type);
      const setup = typeMap.get(name);

      if (this.UseInstanceCache && setup.instance) {
        return setup.instance;
      } else {
        const { logger, properties } = setup;
        let instance;

        if (logger && this.hasLoggerModule(logger)) {
          const Logger = this.getLoggerModule(logger);
          instance = new Logger(properties);
        } else {
          instance = this.resolveDefaultLogger(properties);
        }

        if (this.UseInstanceCache) {
          typeMap.set(name, { logger, properties, instance });
        }

        return instance;
      }
    } else {
      const instance = this.resolveDefaultLogger();

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
