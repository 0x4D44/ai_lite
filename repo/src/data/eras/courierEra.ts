import type { EraDefinition } from '../types';

export const courierEra: EraDefinition = {
  id: 'courier',
  name: 'Data Labeling Frontier',
  flavorText:
    'Bootstrapping AI datasets with distributed human annotation networks.',
  units: [
    {
      id: 'hand-courier',
      name: 'Crowd Annotator',
      description: 'Gig-based annotators label raw data to fund early research.',
      baseCost: 15,
      costMultiplier: 1.16,
      workforceCost: 1,
      production: {
        money: 0.6,
        tech: 0.03,
      },
    },
    {
      id: 'horse-relay',
      name: 'Specialist Labeling Studio',
      description: 'Trained teams tackle complex edge cases for higher-quality datasets.',
      baseCost: 200,
      costMultiplier: 1.2,
      workforceCost: 2,
      production: {
        money: 4,
        tech: 0.12,
      },
    },
  ],
  upgrades: [
    {
      id: 'organized-routes',
      name: 'Workflow Orchestration',
      description: 'Task routing pipelines boost all funding by 25%.',
      cost: 320,
      effects: [
        {
          type: 'globalMoneyMultiplier',
          multiplier: 1.25,
        },
      ],
    },
    {
      id: 'apprentice-program',
      name: 'Bootcamp Scholarships',
      description: 'Scholarships grow the early talent pool by 6.',
      cost: 260,
      effects: [
        {
          type: 'workforceBonus',
          amount: 6,
        },
      ],
    },
    {
      id: 'regional-hiring',
      name: 'Partner Incubators',
      description: 'University incubators add 10 talent capacity.',
      cost: 620,
      effects: [
        {
          type: 'workforceBonus',
          amount: 10,
        },
      ],
    },
    {
      id: 'relay-barracks',
      name: 'Remote Talent Hubs',
      description: 'Global remote hubs unlock 15 additional talent slots.',
      cost: 1400,
      effects: [
        {
          type: 'workforceBonus',
          amount: 15,
        },
      ],
    },
  ],
  nextEraRequirement: {
    money: 2600,
    tech: 180,
  },
  nextEraId: 'telegraph',
};