import { DefinedLoggerProperties, Loader, LoggerMetadata, LoggerRegistry, CommonLogLevels, SysLogLevels } from "./lib/core";
import { ArchDevLoggerError, UndefinedDefaultLoggerError } from "./lib/errors";
import { LoggerService } from "./lib/services";
import { ExtensibleLogger, GlobalLoggerService } from "./lib";

export { ILoggerProperties } from "./lib/core";
export { LoggerServiceConfigs } from "./lib/services";

export const ArchDevLogger = {
  Core: {
    DefinedLoggerProperties,
    Loader,
    LoggerMetadata,
    LoggerRegistry,
    CommonLogLevels,
    SysLogLevels,
  },
  Errors: {
    ArchDevLoggerError,
    UndefinedDefaultLoggerError,
  },
  Services: {
    LoggerService,
  },
  ExtensibleLogger,
  GlobalLoggerService,
};

Object.freeze(ArchDevLogger);
