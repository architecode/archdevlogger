import { AppEnv } from "archappenv";

export class ArchDevLoggerError extends AppEnv.Common.ExtensibleError { }

export class UndefinedDefaultLoggerError extends ArchDevLoggerError {
  constructor() { super("UndefinedDefaultLoggerError: default logger is undefined"); }
}
