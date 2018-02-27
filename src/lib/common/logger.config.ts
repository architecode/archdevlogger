export interface LoggerConfig {
  defineds?: {
    logger: string;
    module: string;
    description?: string;
  }[],
  setups?: {
    name: string;
    type: string;
    logger: string;
    properties?: any;
  }[],
  default?: {
    logger: string;
    properties?: any;
  }
};
