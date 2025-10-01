export type ResourceId = 'money' | 'workforce' | 'power' | 'tech' | 'bandwidth' | 'compute';

export interface ProductionRate {
  money?: number;
  tech?: number;
  power?: number;
  bandwidth?: number;
  compute?: number;
}

export interface UnitDefinition {
  id: string;
  name: string;
  description: string;
  baseCost: number;
  costMultiplier: number;
  workforceCost: number;
  powerCost?: number;
  production: ProductionRate;
}

export type UpgradeEffect =
  | { type: 'globalMoneyMultiplier'; multiplier: number }
  | { type: 'unitMoneyMultiplier'; unitId: string; multiplier: number }
  | { type: 'workforceBonus'; amount: number }
  | { type: 'globalTechMultiplier'; multiplier: number }
  | { type: 'globalBandwidthMultiplier'; multiplier: number };

export interface UpgradeDefinition {
  id: string;
  name: string;
  description: string;
  cost: number;
  effects: UpgradeEffect[];
}

export interface EraDefinition {
  id: string;
  name: string;
  flavorText: string;
  units: UnitDefinition[];
  upgrades: UpgradeDefinition[];
  nextEraRequirement: {
    money: number;
    tech: number;
    bandwidth?: number;
    compute?: number;
  } | null;
  nextEraId?: string;
}

export interface ResearchProjectDefinition {
  id: string;
  name: string;
  description: string;
  techCost: number;
  researchTime: number; // seconds
  effects: UpgradeEffect[];
  unlocksAtEra?: string;
}
