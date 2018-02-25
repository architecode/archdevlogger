import { LoggerModuleService } from "./logger.module.service";
import { DefaultLogger } from "./default.logger";

const INSTANCESMAP: Map<string, Map<string, any>> = new Map();

export const LoggerService = {
  initialize: (
    configs: {
      defineds?: { logger: string; module: string; description?: string; }[];
      setups?: { name: string; type: string; logger: string; properties?: any; }[];
      default?: { logger: string; config?: any; }
    } = {},
  ) => {
    LoggerService.define(configs.defineds);
    LoggerService.setup(configs.setups);
    LoggerService.default(configs.default);
  },

  define: (defineds: { logger: string; module: string; description?: string; }[] = []) => {
    LoggerModuleService.initialize(defineds);
  },

  setup: (setups: { name: string; type: string; logger: string; properties?: any; }[] = []) => {
    setups.forEach(each => LoggerService.setInstance(each.name, each.type, each.logger, each.properties));
  },

  default: (val: { logger: string; config?: any; }) => {
    DefaultLogger.set(val);
  },

  clear: () => INSTANCESMAP.clear(),

  hasInstance: (name: string, type: string) => INSTANCESMAP.has(type) && INSTANCESMAP.get(type).has(name),

  deleteInstance: (name: string, type: string) => {
    if (INSTANCESMAP.has(type)) {
      return INSTANCESMAP.get(type).delete(name);
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

    const typeMap = INSTANCESMAP.get(type);

    if (typeMap.has(name)) {
      return false;
    } else {
      const Logger = LoggerModuleService.getLogger(logger).module;
      const instance = new Logger(properties, name, type);
      typeMap.set(name, instance);

      return true;
    }
  }
};

Object.freeze(LoggerService);
