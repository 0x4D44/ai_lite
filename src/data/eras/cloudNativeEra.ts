import type { EraDefinition } from '../types';

export const cloudNativeEra: EraDefinition = {
  id: 'cloud-native',
  name: 'Autonomous Intelligence',
  flavorText: 'Self-directed agents coordinate physical and digital ecosystems without human intervention.',
  units: [
    {
      id: 'multi-tenancy-grid',
      name: 'Generalist Agent Fleet',
      description: 'Composable agents handle end-to-end workflows for every client segment.',
      baseCost: 620000,
      costMultiplier: 1.24,
      workforceCost: 9,
      production: {
        money: 2400,
        tech: 68,
        bandwidth: 620,
        compute: 520,
      },
    },
    {
      id: 'edge-ai-fleet',
      name: 'Robotics Swarm',
      description: 'Sensor-rich robots deliver autonomous services with massive compute needs.',
      baseCost: 1250000,
      costMultiplier: 1.27,
      workforceCost: 12,
      production: {
        money: 5200,
        tech: 140,
        bandwidth: 1200,
        compute: 1100,
      },
    },
    {
      id: 'global-control-plane',
      name: 'Universal Orchestration Core',
      description: 'A global intent engine coordinates agents across every vertical.',
      baseCost: 2800000,
      costMultiplier: 1.3,
      workforceCost: 14,
      production: {
        money: 11200,
        tech: 260,
        bandwidth: 2200,
        compute: 2600,
      },
    },
  ],
  upgrades: [
    {
      id: 'gitops-automation',
      name: 'Continuous Deployment Mesh',
      description: 'Autonomous rollout mesh lifts funding by 35% and research by 30%.',
      cost: 1650000,
      effects: [
        {
          type: 'globalMoneyMultiplier',
          multiplier: 1.35,
        },
        {
          type: 'globalTechMultiplier',
          multiplier: 1.3,
        },
      ],
    },
    {
      id: 'platform-observability',
      name: 'Sentient Observability',
      description: 'Self-healing telemetry amplifies data flow by 25% and research by 15%.',
      cost: 2100000,
      effects: [
        {
          type: 'globalBandwidthMultiplier',
          multiplier: 1.25,
        },
        {
          type: 'globalTechMultiplier',
          multiplier: 1.15,
        },
      ],
    },
    {
      id: 'intent-based-networking',
      name: 'Intent Cascade Orchestrator',
      description: 'Cascading intent layers boost every metric dramatically.',
      cost: 3250000,
      effects: [
        {
          type: 'globalMoneyMultiplier',
          multiplier: 1.45,
        },
        {
          type: 'globalTechMultiplier',
          multiplier: 1.4,
        },
        {
          type: 'globalBandwidthMultiplier',
          multiplier: 1.4,
        },
      ],
    },
  ],
  nextEraRequirement: null,
};