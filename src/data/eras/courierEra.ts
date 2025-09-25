import type { EraDefinition } from '../types';

export const courierEra: EraDefinition = {
  id: 'courier',
  name: 'Courier Era',
  flavorText:
    'Hand-delivered messages and horse relays keep the world connected. Smart logistics keep profits climbing.',
  units: [
    {
      id: 'hand-courier',
      name: 'Hand Courier',
      description: 'Individual runners delivering letters door-to-door.',
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
      name: 'Horse Relay',
      description: 'Coordinated horse routes relay messages faster across distance.',
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
      name: 'Organized Routes',
      description: 'Route optimization boosts all delivery revenue by 25%.',
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
      name: 'Apprentice Program',
      description: 'Train new couriers to expand your workforce by 6.',
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
      name: 'Regional Hiring Offices',
      description: 'Permanent hiring fairs add 10 workforce capacity.',
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
      name: 'Relay Barracks',
      description: 'Housing for couriers opens 15 additional workforce slots.',
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
