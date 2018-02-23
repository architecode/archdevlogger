import { CommonLogLevels, SysLogLevels, LogHeaders } from "./core";
import { DefaultLogger, LoggerModuleService, LoggerService } from "./services";
import { ExtensibleEventLog } from "./extensible.eventlog";
import { DefinedLoggerConfig, ExtensibleLogger } from "./extensible.logger";

export const ArchDevLogger = {
  Core: {
    CommonLogLevels,
    SysLogLevels,
    LogHeaders
  },
  DefinedLoggerConfig,
  ExtensibleEventLog,
  ExtensibleLogger,
  Services: {
    DefaultLogger,
    LoggerModuleService,
    LoggerService
  }
};

Object.freeze(ArchDevLogger.Core);
Object.freeze(ArchDevLogger.Services);
