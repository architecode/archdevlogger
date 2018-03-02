export interface LoggerConfig {
  defineds?: { logger: string; module: string; description?: string; }[];
  default?: { logger: string; properties?: any; };
  setups?: { name: string; type: string; logger: string; properties?: any; }[];
}
