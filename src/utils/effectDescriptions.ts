import type { UpgradeEffect } from '../data/types';
import { courierEra, telegraphEra, telephoneEra, digitalEra, cloudNativeEra } from '../data/eras';

const UNIT_NAME_MAP: Record<string, string> = {};
for (const era of [courierEra, telegraphEra, telephoneEra, digitalEra, cloudNativeEra]) {
  for (const unit of era.units) {
    UNIT_NAME_MAP[unit.id] = unit.name;
  }
}

export const describeEffect = (effect: UpgradeEffect): string => {
  switch (effect.type) {
    case 'globalMoneyMultiplier':
      return `Funding output x${effect.multiplier.toFixed(2)}`;
    case 'unitMoneyMultiplier': {
      const unitName = UNIT_NAME_MAP[effect.unitId] ?? effect.unitId;
      return `${unitName} funding x${effect.multiplier.toFixed(2)}`;
    }
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
