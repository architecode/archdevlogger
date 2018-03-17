export interface LoggerServiceConfigs {
  useInstanceCache?: boolean;
  default?: { logger: string; properties?: any; };
  modules?: { logger: string; module: { type: string; resource: string; options?: any; }; }[];
  setups?: { name: string; type: string; logger?: string; properties?: any; }[];
}
