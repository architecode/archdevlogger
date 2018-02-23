import { CommonLogLevels, SysLogLevels, LogHeaders } from "./core";
import { ExtensibleEventLog } from "./extensible.eventlog";
import { DefinedLoggerConfig, ExtensibleLogger } from "./extensible.logger";
import { DefaultLogger, LoggerModuleService, LoggerService } from "./services";

export const ArchDevLogger = {
  Core: {
    CommonLogLevels,
    SysLogLevels,
    LogHeaders
  },
  ExtensibleEventLog,
  DefinedLoggerConfig,
  ExtensibleLogger,
  Services: {
    DefaultLogger,
    LoggerModuleService,
    LoggerService
  }
};

Object.freeze(ArchDevLogger.Core);
Object.freeze(ArchDevLogger.Services);
