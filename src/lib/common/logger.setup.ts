import { LogProperties } from "../core";

export interface LoggerSetup {
  name: string;
  type: string;
  logger: string;
  properties?: LogProperties;
}
