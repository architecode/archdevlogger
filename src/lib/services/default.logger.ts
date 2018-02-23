import { LoggerModuleService } from "./logger.module.service";

let CONFIG: { logger: string; properties?: any; };

export const DefaultLogger = {
  setConfig: (config: { logger: string; properties?: any; }) => CONFIG = config,
  get: (name?: string, type?: string) => {
    const Logger = LoggerModuleService.getLogger(CONFIG.logger).module;
    const properties = CONFIG.properties;
    const loggerInstance = new Logger(properties, name, type);

    return loggerInstance;
  },
  clear: () => {
    CONFIG = undefined;
  },
};

Object.freeze(DefaultLogger);
