import * as Path from "path";
import { AppEnv } from "archappenv";

const MODULESMAP: Map<string, { module: any, description: string }> = new Map();

export const LoggerModuleService = {
  initialize: (defineds: { logger: string; module: string; description?: string; }[], resolvedBase?: string) => {
    resolvedBase = resolvedBase || AppEnv.Util.packagePath();

    for (const each of defineds) {
      const definedModule = (each.module.indexOf("/") === -1 && each.module.indexOf("\\") === -1) ? each.module :
        Path.isAbsolute(each.module) ? each.module :
          Path.resolve(resolvedBase, each.module);

      const Module = require(definedModule);
      LoggerModuleService.setLogger(each.logger, Module, each.description);
    }
  },

  clear: () => MODULESMAP.clear(),

  deleteLogger: (logger: string) => MODULESMAP.delete(logger),

  hasLogger: (logger: string) => MODULESMAP.has(logger),

  getLogger: (logger: string) => MODULESMAP.get(logger),

  setLogger: (logger: string, module: Function, description?: string) => MODULESMAP.set(logger, { module, description })
};

Object.freeze(LoggerModuleService);
