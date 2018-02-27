import { LoggerDefined } from "./lib/common";
import { CommonLogLevels, SysLogLevels, LogHeaders } from "./lib/core";
import { DefaultLogger, LoggerModuleService, LoggerService } from "./lib/services";
import { DefinedLoggerConfig, ExtensibleLogger } from "./lib";

export { LoggerDefined, LoggerSetup } from "./lib/common";
export { LogProperties } from "./lib/core";

export const ArchDevLogger = {
  Core: {
    CommonLogLevels,
    SysLogLevels,
    LogHeaders
  },
  Services: {
    DefaultLogger,
    LoggerModuleService,
    LoggerService
  },
  DefinedLoggerConfig,
  ExtensibleLogger,
};

Object.freeze(ArchDevLogger.Core);
Object.freeze(ArchDevLogger.Services);
