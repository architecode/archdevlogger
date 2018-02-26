import { LoggerModuleService } from "./logger.module.service";

let SETUP: { logger: string; properties?: any; };

export const DefaultLogger = {
  get: (name?: string, type?: string) => {
    if (SETUP) {
      const Logger = LoggerModuleService.getLogger(SETUP.logger).module;
      const loggerInstance = new Logger(name, type, SETUP.logger, SETUP.properties);

      return loggerInstance;
    } else {
      return undefined;
    }
  },
  set: (setup: { logger: string; properties?: any; }) => {
    SETUP = setup;
  },
  clear: () => {
    SETUP = undefined;
  }
};

Object.freeze(DefaultLogger);
