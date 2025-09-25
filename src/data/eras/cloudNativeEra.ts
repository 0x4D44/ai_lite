import type { EraDefinition } from '../types';

export const cloudNativeEra: EraDefinition = {
  id: 'cloud-native',
  name: 'Cloud Native Era',
  flavorText: 'Fully virtualized telecom stacks orchestrated across global cloud regions.',
  units: [
    {
      id: 'multi-tenancy-grid',
      name: 'Multi-Tenancy Grid',
      description: 'Composable workloads monetize telecom APIs and compute on demand.',
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
      name: 'Edge AI Fleet',
      description: 'Predictive services at the edge drive new revenue and massive compute needs.',
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
      name: 'Global Control Plane',
      description: 'Unified orchestration plane automates network slices worldwide.',
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
      name: 'GitOps Automation',
      description: 'Declarative pipelines accelerate deployment, raising revenue and tech alike.',
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
      name: 'Platform Observability',
      description: 'Unified telemetry supercharges pod efficiency and compute output.',
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
      name: 'Intent-Based Networking',
      description: 'AI-driven intent pipelines boost every metric dramatically.',
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
