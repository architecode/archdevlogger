export interface ILoggerProperties {
  level?: string;
  levels?: { [level: string]: number };
  metadata?: object;
}
