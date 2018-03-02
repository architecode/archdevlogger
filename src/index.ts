import { LoggerDefined } from "./lib/common";
import { LogHeaders, CommonLogLevels, SysLogLevels } from "./lib/core";
import { DefinedLoggerConfig, DefaultLogger, LoggerModuleService, LoggerService } from "./lib/services";
import { ExtensibleLogger } from "./lib";

export { LoggerConfig, LoggerDefined, LoggerSetup } from "./lib/common";
export { LogProperties } from "./lib/core";

export const ArchDevLogger = {
  Core: {
    LogHeaders,
    CommonLogLevels,
    SysLogLevels,
  },
  Services: {
    DefinedLoggerConfig,
    DefaultLogger,
    LoggerModuleService,
    LoggerService,
  },
  ExtensibleLogger,
};

Object.freeze(ArchDevLogger.Core);
Object.freeze(ArchDevLogger.Services);
