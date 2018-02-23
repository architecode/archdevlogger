import { LoggerModuleService } from "./logger.module.service";
import { DefaultLogger } from "./default.logger";

const INSTANCESMAP: Map<string, Map<string, any>> = new Map();

export const LoggerService = {
  initialize: (configs: {
    defineds: { logger: string; module: string; description?: string; }[];
    setups?: { name: string; type: string; logger: string; properties?: any; }[];
    default?: { logger: string; properties?: any; }
  } = { defineds: [] }) => {
    LoggerModuleService.initialize(configs.defineds);

    if (Array.isArray(configs.setups)) {
      for (const setup of configs.setups) {
        LoggerService.setInstance(setup.name, setup.type, setup.logger, setup.properties);
      }
    }

    if (configs.default) {
      DefaultLogger.setConfig(configs.default);
    }
  },

  clear: () => INSTANCESMAP.clear(),

  deleteInstance: (name: string, type: string) => {
    if (INSTANCESMAP.has(type)) {
      return INSTANCESMAP.get(type).delete(name);
    } else {
      return false;
    }
  },

  hasInstance: (name: string, type: string) => {
    if (INSTANCESMAP.has(type)) {
      return INSTANCESMAP.get(type).has(name);
    } else {
      return false;
    }
  },

  getInstance: (name: string, type: string, useDefault: boolean = true) => {
    if (INSTANCESMAP.has(type) && INSTANCESMAP.get(type).has(name)) {
      return INSTANCESMAP.get(type).get(name);
    } else {
      if (useDefault) {
        return DefaultLogger.get(name, type);
      } else {
        return undefined;
      }
    }
  },

  setInstance: (name: string, type: string, logger: string, properties?: any) => {
    if (!INSTANCESMAP.has(type)) {
      INSTANCESMAP.set(type, new Map());
    }

    const typemap = INSTANCESMAP.get(type);

    if (typemap.has(name)) {
      return false;
    } else {
      const Logger = LoggerModuleService.getLogger(logger).module;
      const instance = new Logger(properties, name, type);
      typemap.set(name, instance);

      return true;
    }
  }
};

Object.freeze(LoggerService);
