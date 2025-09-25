import type { EraDefinition } from '../types';

export const telegraphEra: EraDefinition = {
  id: 'telegraph',
  name: 'Telegraph Era',
  flavorText: 'Electric signals span continents. Instant communication unlocks new profit frontiers.',
  units: [
    {
      id: 'telegraph-operator',
      name: 'Telegraph Operator',
      description: 'Skilled operators encode and decode messages around the clock.',
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
      name: 'Relay Station',
      description: 'Amplifies telegraph signals to cross vast distances reliably.',
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
      name: 'Transatlantic Line',
      description: 'A monumental undersea cable delivering instant international connections.',
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
      name: 'Automated Switchboards',
      description: 'Mechanical switchboards double operator throughput.',
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
      name: 'Long-distance Tuning',
      description: 'Fine-tune relay stations for 35% more revenue.',
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
      name: 'International Contracts',
      description: 'Global partnerships increase all revenue by 45%.',
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
      name: 'Engineering Guild',
      description: 'Shared expertise adds 18 workforce capacity.',
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
