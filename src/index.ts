import { LoggerDefined } from "./lib/common";
import { CommonLogLevels, SysLogLevels, LogHeaders } from "./lib/core";
import { DefaultLogger, LoggerModuleService, LoggerService } from "./lib/services";
import { ExtensibleEventLog, DefinedLoggerConfig, ExtensibleLogger } from "./lib";

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
  ExtensibleEventLog,
  DefinedLoggerConfig,
  ExtensibleLogger,
};

Object.freeze(ArchDevLogger.Core);
Object.freeze(ArchDevLogger.Services);