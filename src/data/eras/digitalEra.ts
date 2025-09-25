import type { EraDefinition } from '../types';

export const digitalEra: EraDefinition = {
  id: 'digital',
  name: 'Digital Switching Era',
  flavorText: 'Fiber links and packet switching drive explosive global communication growth.',
  units: [
    {
      id: 'digital-switch',
      name: 'Digital Switch',
      description: 'Software-driven switches route calls with minimal latency.',
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
      name: 'Fiber Backbone Segment',
      description: 'High-capacity fiber links deliver massive bandwidth across continents.',
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
      name: 'Data Center Node',
      description: 'Regional data centers provide compute for digital switching and services.',
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
      name: 'Software Automation',
      description: 'Automated orchestration increases digital switch revenue by 35%.',
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
      name: 'Dense Wave Multiplexing',
      description: 'Fiber backbone bandwidth output jumps 60%.',
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
      name: 'Edge Compute Fleet',
      description: 'Distributed compute adds 30 workforce capacity and increases overall revenue.',
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
