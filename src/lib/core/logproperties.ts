export interface LogProperties {
  [field: string]: any;
  levels?: { [level: string]: number };
  logHeaders?: object;
}
