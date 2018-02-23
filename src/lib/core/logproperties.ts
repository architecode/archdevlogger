export interface LogProperties {
  [field: string]: any;
  levels?: { [level: string]: number };
  logheaders?: object;
}
