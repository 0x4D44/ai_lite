export type PodType = 'ingress-gateway' | 'service-mesh' | 'observability-stack' | 'ai-optimizer';

export interface PodDefinition {
  id: PodType;
  name: string;
  description: string;
  computeUpkeep: number;
  effects: {
    money?: number;
    tech?: number;
    bandwidth?: number;
    compute?: number;
  };
  max: number;
}

export const POD_DEFINITIONS: PodDefinition[] = [
  {
    id: 'ingress-gateway',
    name: 'Ingress Gateway Pods',
    description: 'Balance traffic and monetize low-latency entry points. Boosts revenue and bandwidth.',
    computeUpkeep: 150,
    effects: {
      money: 0.20,
      bandwidth: 0.10,
    },
    max: 6,
  },
  {
    id: 'service-mesh',
    name: 'Service Mesh Pods',
    description: 'Advanced routing and resilience increase tech innovation and bandwidth capacity.',
    computeUpkeep: 220,
    effects: {
      tech: 0.25,
      bandwidth: 0.15,
    },
    max: 5,
  },
  {
    id: 'observability-stack',
    name: 'Observability Stack Pods',
    description: 'Telemetry and auto-healing improve efficiency, increasing money and compute output.',
    computeUpkeep: 180,
    effects: {
      money: 0.15,
      compute: 0.2,
    },
    max: 5,
  },
  {
    id: 'ai-optimizer',
    name: 'AI Optimizer Pods',
    description: 'Predictive scaling and call optimization explode revenue and tech growth.',
    computeUpkeep: 350,
    effects: {
      money: 0.35,
      tech: 0.30,
      bandwidth: 0.25,
    },
    max: 4,
  },
];
