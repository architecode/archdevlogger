export interface LoggerServiceConfig {
  loggerServiceOptions?: { useInstanceCache?: boolean; };
  loggerServiceConfigs?: {
    defaultLogger?: { logger: string; properties?: any; };
    loggerModules?: { logger: string; module: { type: string; resource: string; options?: any; }; }[];
    loggerSetups?: { name: string; type: string; logger?: string; properties?: any; }[];
  };
}
