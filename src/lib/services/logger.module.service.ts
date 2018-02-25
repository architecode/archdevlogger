import * as Path from "path";
import { AppEnv } from "archappenv";
import { LoggerDefined } from "../common/logger.defined";

const MODULESMAP: Map<string, { module: any, description: string }> = new Map();

export const LoggerModuleService = {
  initialize: (defineds: LoggerDefined[], based?: string) => {
    const resolved = based || AppEnv.Util.packagePath();

    defineds.forEach(each => {
      const definedModule = (each.module.indexOf("/") === -1 && each.module.indexOf("\\") === -1) ? each.module :
        Path.isAbsolute(each.module) ? each.module :
          Path.resolve(resolved, each.module);

      const _module = require(definedModule);
      LoggerModuleService.setLogger(each.logger, _module, each.description);
    });
  },

  clear: () => MODULESMAP.clear(),

  deleteLogger: (logger: string) => MODULESMAP.delete(logger),

  hasLogger: (logger: string) => MODULESMAP.has(logger),

  getLogger: (logger: string) => MODULESMAP.get(logger),

  setLogger: (logger: string, module: Function, description?: string) => MODULESMAP.set(logger, { module, description })
};

Object.freeze(LoggerModuleService);
