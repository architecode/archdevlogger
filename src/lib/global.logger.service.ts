import { LoggerService } from "./services/logger.service";

export const GlobalLoggerService = (function () { return new LoggerService(); })();
