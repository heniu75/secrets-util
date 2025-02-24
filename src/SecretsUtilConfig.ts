export interface SecretsUtilConfig {
  include: string[];
  recurse: boolean;
  replace: Record<string, string>;
  period: number; // New property for period
}
