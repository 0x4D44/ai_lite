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
    name: 'Data Ingestion Nodes',
    description: 'Adaptive intake services grow funding and data flow efficiency.',
    computeUpkeep: 150,
    effects: {
      money: 0.2,
      bandwidth: 0.1,
    },
    max: 6,
  },
  {
    id: 'service-mesh',
    name: 'Feature Engineering Pods',
    description: 'Collaborative feature teams accelerate research and expand data flow.',
    computeUpkeep: 220,
    effects: {
      tech: 0.25,
      bandwidth: 0.15,
    },
    max: 5,
  },
  {
    id: 'observability-stack',
    name: 'Model Monitoring Stack',
    description: 'Monitoring suites surface insights, increasing funding and compute output.',
    computeUpkeep: 180,
    effects: {
      money: 0.15,
      compute: 0.2,
    },
    max: 5,
  },
  {
    id: 'ai-optimizer',
    name: 'Autonomous Optimizer Pods',
    description: 'Self-improving optimizers amplify funding, research, and data flow growth.',
    computeUpkeep: 350,
    effects: {
      money: 0.35,
      tech: 0.3,
      bandwidth: 0.25,
    },
    max: 4,
  },
];