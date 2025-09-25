import type { ResearchProjectDefinition } from './types';

export const researchProjects: ResearchProjectDefinition[] = [
  {
    id: 'logistics-analytics',
    name: 'Logistics Analytics',
    description: 'Data-driven routing insights boost all revenue by 20%.',
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
    name: 'Advanced Signal Theory',
    description: 'Higher quality transmission techniques increase tech gain by 30%.',
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
    name: 'Training Consortium',
    description: 'Shared hiring pipelines expand workforce capacity by 12.',
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
    name: 'Bandwidth Overlays',
    description: 'Dynamic signal overlays increase bandwidth output across the network by 40%.',
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
    name: 'Software-Defined Networks',
    description: 'Programmable routing increases tech and bandwidth efficiency by 25%.',
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
