import { AppEnv } from "archappenv";

export class ArchDevLoggerError extends AppEnv.Common.ExtensibleError { }

export class UndefinedDefaultLoggerError extends ArchDevLoggerError {
  constructor() { super("UndefinedDefaultLoggerError: default logger is undefined"); }
}

export class DefinedLoggerModuleError extends ArchDevLoggerError {
  constructor() { super("DefinedLoggerModuleError: logger module is incorrectly defined"); }
}
