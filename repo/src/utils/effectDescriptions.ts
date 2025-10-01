import type { UpgradeEffect } from '../data/types';

export const describeEffect = (effect: UpgradeEffect): string => {
  switch (effect.type) {
    case 'globalMoneyMultiplier':
      return `Funding output x${effect.multiplier.toFixed(2)}`;
    case 'unitMoneyMultiplier':
      return `${effect.unitId} funding x${effect.multiplier.toFixed(2)}`;
    case 'workforceBonus':
      return `+${effect.amount} talent capacity`;
    case 'globalTechMultiplier':
      return `Research generation x${effect.multiplier.toFixed(2)}`;
    case 'globalBandwidthMultiplier':
      return `Data flow generation x${effect.multiplier.toFixed(2)}`;
    default: {
      const exhaustive: never = effect;
      throw new Error(`Unhandled effect ${exhaustive}`);
    }
  }
};
