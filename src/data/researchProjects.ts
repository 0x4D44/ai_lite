import type { ResearchProjectDefinition } from './types';

export const researchProjects: ResearchProjectDefinition[] = [
  {
    id: 'logistics-analytics',
    name: 'Label Efficiency Analytics',
    description: 'Annotation dashboards improve labeling ROI, raising funding by 20%.',
    techCost: 120,
    researchTime: 45,
    effects: [
      {
        type: 'globalMoneyMultiplier',
        multiplier: 1.2,
      },
    ],
  },
  {
    id: 'signal-theory',
    name: 'Optimization Algorithms',
    description: 'Breakthrough optimization techniques increase research velocity by 30%.',
    techCost: 180,
    researchTime: 60,
    effects: [
      {
        type: 'globalTechMultiplier',
        multiplier: 1.3,
      },
    ],
    unlocksAtEra: 'telegraph',
  },
  {
    id: 'training-consortium',
    name: 'Talent Exchange Program',
    description: 'Exchange fellowships expand the shared talent pool by 12.',
    techCost: 260,
    researchTime: 75,
    effects: [
      {
        type: 'workforceBonus',
        amount: 12,
      },
    ],
    unlocksAtEra: 'telegraph',
  },
  {
    id: 'bandwidth-overlays',
    name: 'Synthetic Data Overlays',
    description: 'Synthetic overlay pipelines increase data flow output by 40%.',
    techCost: 420,
    researchTime: 90,
    effects: [
      {
        type: 'globalBandwidthMultiplier',
        multiplier: 1.4,
      },
    ],
    unlocksAtEra: 'telephone',
  },
  {
    id: 'software-defined-networks',
    name: 'Policy Gradient Infrastructure',
    description: 'Unified policy gradient tooling improves research and data flow by 25%.',
    techCost: 680,
    researchTime: 120,
    effects: [
      {
        type: 'globalTechMultiplier',
        multiplier: 1.25,
      },
      {
        type: 'globalBandwidthMultiplier',
        multiplier: 1.25,
      },
    ],
    unlocksAtEra: 'digital',
  },
];