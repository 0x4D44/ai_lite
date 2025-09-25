import type { UpgradeEffect } from '../data/types';

export const describeEffect = (effect: UpgradeEffect): string => {
  switch (effect.type) {
    case 'globalMoneyMultiplier':
      return `Money output x${effect.multiplier.toFixed(2)}`;
    case 'unitMoneyMultiplier':
      return `${effect.unitId} money x${effect.multiplier.toFixed(2)}`;
    case 'workforceBonus':
      return `+${effect.amount} workforce capacity`;
    case 'globalTechMultiplier':
      return `Tech generation x${effect.multiplier.toFixed(2)}`;
    case 'globalBandwidthMultiplier':
      return `Bandwidth generation x${effect.multiplier.toFixed(2)}`;
    default: {
      const exhaustive: never = effect;
      throw new Error(`Unhandled effect ${exhaustive}`);
    }
  }
};
