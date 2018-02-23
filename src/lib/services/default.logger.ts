import { LoggerModuleService } from "./logger.module.service";

let CONFIG: { logger: string; properties?: any; };

export const DefaultLogger = {
  get: (name?: string, type?: string) => {
    if (CONFIG) {
      const Logger = LoggerModuleService.getLogger(CONFIG.logger).module;
      const properties = CONFIG.properties;
      const loggerInstance = new Logger(properties, name, type);

      return loggerInstance;
    } else {
      return undefined;
    }
  },
  setConfig: (config: { logger: string; properties?: any; }) => {
    CONFIG = config;
  },
  clear: () => {
    CONFIG = undefined;
  },
};

Object.freeze(DefaultLogger);
