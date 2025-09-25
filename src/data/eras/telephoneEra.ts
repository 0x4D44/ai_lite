import type { EraDefinition } from '../types';

export const telephoneEra: EraDefinition = {
  id: 'telephone',
  name: 'Telephone Switchboard Era',
  flavorText: 'Automated exchanges and long-distance lines unlock mass-market telephony.',
  units: [
    {
      id: 'switchboard-operator',
      name: 'Switchboard Operator',
      description: 'Connects calls manually while monitoring line usage.',
      baseCost: 4200,
      costMultiplier: 1.2,
      workforceCost: 4,
      production: {
        money: 38,
        tech: 1.5,
        bandwidth: 4,
        compute: 1.5,
      },
    },
    {
      id: 'automatic-exchange',
      name: 'Automatic Exchange',
      description: 'Mechanical switching reduces manual labor and increases throughput.',
      baseCost: 8800,
      costMultiplier: 1.24,
      workforceCost: 5,
      production: {
        money: 96,
        tech: 3.4,
        bandwidth: 12,
        compute: 4,
      },
    },
    {
      id: 'microwave-relay',
      name: 'Microwave Relay Tower',
      description: 'Line-of-sight towers push high-capacity signals across regions.',
      baseCost: 22500,
      costMultiplier: 1.28,
      workforceCost: 6,
      production: {
        money: 240,
        tech: 6.8,
        bandwidth: 30,
        compute: 10,
      },
    },
  ],
  upgrades: [
    {
      id: 'operator-training',
      name: 'Operator Training Protocols',
      description: 'Skilled operators handle more connections, increasing income by 30%.',
      cost: 14000,
      effects: [
        {
          type: 'unitMoneyMultiplier',
          unitId: 'switchboard-operator',
          multiplier: 1.3,
        },
      ],
    },
    {
      id: 'relay-optimization',
      name: 'Relay Optimization',
      description: 'Optimized relays lift exchange revenue and boost bandwidth generation.',
      cost: 19500,
      effects: [
        {
          type: 'unitMoneyMultiplier',
          unitId: 'automatic-exchange',
          multiplier: 1.2,
        },
        {
          type: 'globalTechMultiplier',
          multiplier: 1.1,
        },
        {
          type: 'globalBandwidthMultiplier',
          multiplier: 1.2,
        },
      ],
    },
    {
      id: 'carrier-multiplexing',
      name: 'Carrier Multiplexing',
      description: 'New modulation multiplies bandwidth capacity by 35%.',
      cost: 32000,
      effects: [
        {
          type: 'globalMoneyMultiplier',
          multiplier: 1.25,
        },
        {
          type: 'workforceBonus',
          amount: 20,
        },
      ],
    },
  ],
  nextEraRequirement: {
    money: 480000,
    tech: 42000,
    bandwidth: 18000,
  },
  nextEraId: 'digital',
};
