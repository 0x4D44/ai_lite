import type { EraDefinition } from '../types';

export const telephoneEra: EraDefinition = {
  id: 'telephone',
  name: 'Cloud AI Services',
  flavorText: 'Managed AI platforms and APIs bring intelligent capabilities to every industry.',
  units: [
    {
      id: 'switchboard-operator',
      name: 'AI Support Ops',
      description: 'Specialists guide customers through AI adoption and troubleshoot deployments.',
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
      name: 'Managed ML Platform',
      description: 'Fully managed training and deployment pipelines monetise subscription demand.',
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
      name: 'Edge Deployment Network',
      description: 'Federated edge clusters push low-latency models worldwide.',
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
      name: 'Ops Playbooks',
      description: 'Codified playbooks let support ops close more deals, raising funding by 30%.',
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
      name: 'Feature Store Tuning',
      description: 'Optimised feature stores lift platform revenue, research, and data flow.',
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
      name: 'Federated Channels',
      description: 'Distributed partner channels expand global funding by 25% and add 20 talent.',
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