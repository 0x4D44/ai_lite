import type { EraDefinition } from '../types';

export const digitalEra: EraDefinition = {
  id: 'digital',
  name: 'Foundation Model Era',
  flavorText: 'Massive transformer runs and synthetic data loops reshape every product surface.',
  units: [
    {
      id: 'digital-switch',
      name: 'Transformer Training Run',
      description: 'Orchestrates frontier-scale training cycles on dedicated clusters.',
      baseCost: 52000,
      costMultiplier: 1.22,
      workforceCost: 6,
      production: {
        money: 420,
        tech: 12,
        bandwidth: 90,
        compute: 45,
      },
    },
    {
      id: 'fiber-backbone',
      name: 'Synthetic Data Factory',
      description: 'Generates tailored synthetic corpora to feed model refinement.',
      baseCost: 125000,
      costMultiplier: 1.25,
      workforceCost: 8,
      production: {
        money: 860,
        tech: 24,
        bandwidth: 220,
        compute: 110,
      },
    },
    {
      id: 'data-center-node',
      name: 'Inference Megacenter',
      description: 'Regional megacenters serve billions of requests with adaptive caching.',
      baseCost: 260000,
      costMultiplier: 1.28,
      workforceCost: 10,
      production: {
        money: 1650,
        tech: 48,
        bandwidth: 460,
        compute: 280,
      },
    },
  ],
  upgrades: [
    {
      id: 'software-automation',
      name: 'Self-Tuning Pipelines',
      description: 'Adaptive training pipelines raise Transformer Training funding by 35% and amplify research.',
      cost: 145000,
      effects: [
        {
          type: 'unitMoneyMultiplier',
          unitId: 'digital-switch',
          multiplier: 1.35,
        },
        {
          type: 'globalTechMultiplier',
          multiplier: 1.1,
        },
      ],
    },
    {
      id: 'dense-wave-multiplexing',
      name: 'Multimodal Compression',
      description: 'Compression breakthroughs boost synthetic data revenue and data flow.',
      cost: 210000,
      effects: [
        {
          type: 'unitMoneyMultiplier',
          unitId: 'fiber-backbone',
          multiplier: 1.25,
        },
        {
          type: 'globalBandwidthMultiplier',
          multiplier: 1.6,
        },
      ],
    },
    {
      id: 'edge-compute',
      name: 'Edge Accelerator Network',
      description: 'Edge accelerators add 30 talent capacity and increase all funding by 20%.',
      cost: 295000,
      effects: [
        {
          type: 'workforceBonus',
          amount: 30,
        },
        {
          type: 'globalMoneyMultiplier',
          multiplier: 1.2,
        },
      ],
    },
  ],
  nextEraRequirement: {
    money: 2200000,
    tech: 160000,
    bandwidth: 52000,
    compute: 32000,
  },
  nextEraId: 'cloud-native',
};