import { LoggerDefined } from "./lib/common";
import { LogHeaders, CommonLogLevels, SysLogLevels } from "./lib/core";
import { DefaultLogger, LoggerModuleService, LoggerService } from "./lib/services";
import { DefinedLoggerConfig, ExtensibleLogger } from "./lib";

export { LoggerConfig, LoggerDefined, LoggerSetup } from "./lib/common";
export { LogProperties } from "./lib/core";

export const ArchDevLogger = {
  Core: {
    LogHeaders,
    CommonLogLevels,
    SysLogLevels,
  },
  Services: {
    DefaultLogger,
    LoggerModuleService,
    LoggerService,
  },
  DefinedLoggerConfig,
  ExtensibleLogger,
};

Object.freeze(ArchDevLogger.Core);
Object.freeze(ArchDevLogger.Services);
