export interface LogConfig {
  [field: string]: any;
  levels?: { [level: string]: number };
  logheaders?: object;
}
