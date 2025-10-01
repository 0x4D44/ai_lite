import type { EraDefinition } from '../types';

export const telegraphEra: EraDefinition = {
  id: 'telegraph',
  name: 'Algorithmic Awakening',
  flavorText: 'Breakthrough algorithms and vast datasets ignite exponential AI progress.',
  units: [
    {
      id: 'telegraph-operator',
      name: 'Model Trainer',
      description: 'Specialists orchestrate gradient descent runs around the clock.',
      baseCost: 550,
      costMultiplier: 1.18,
      workforceCost: 3,
      production: {
        money: 9,
        tech: 0.35,
        bandwidth: 1,
      },
    },
    {
      id: 'relay-station',
      name: 'Data Pipeline Orchestrator',
      description: 'Automates feature flows and streaming validation across regions.',
      baseCost: 1800,
      costMultiplier: 1.22,
      workforceCost: 4,
      production: {
        money: 22,
        tech: 0.9,
        bandwidth: 3,
      },
    },
    {
      id: 'transatlantic-line',
      name: 'Global Dataset Deal',
      description: 'Secures exclusive data partnerships that supercharge research velocity.',
      baseCost: 6200,
      costMultiplier: 1.26,
      workforceCost: 6,
      production: {
        money: 65,
        tech: 2.2,
        bandwidth: 6,
      },
    },
  ],
  upgrades: [
    {
      id: 'automated-switchboards',
      name: 'AutoML Scheduling',
      description: 'Automated experiment schedulers double Model Trainer throughput.',
      cost: 4200,
      effects: [
        {
          type: 'unitMoneyMultiplier',
          unitId: 'telegraph-operator',
          multiplier: 2,
        },
      ],
    },
    {
      id: 'long-distance-tuning',
      name: 'Pipeline Optimization',
      description: 'Optimized data flows raise orchestrator revenue by 35%.',
      cost: 6800,
      effects: [
        {
          type: 'unitMoneyMultiplier',
          unitId: 'relay-station',
          multiplier: 1.35,
        },
      ],
    },
    {
      id: 'international-contracts',
      name: 'Marketplace Launch',
      description: 'Global AI marketplace partnerships increase all funding by 45%.',
      cost: 9500,
      effects: [
        {
          type: 'globalMoneyMultiplier',
          multiplier: 1.45,
        },
      ],
    },
    {
      id: 'engineering-guild',
      name: 'Research Consortium',
      description: 'Shared lab access adds 18 talent capacity.',
      cost: 5200,
      effects: [
        {
          type: 'workforceBonus',
          amount: 18,
        },
      ],
    },
  ],
  nextEraRequirement: {
    money: 42000,
    tech: 3200,
    bandwidth: 2400,
  },
  nextEraId: 'telephone',
};