import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { courierEra, telegraphEra, telephoneEra, digitalEra, cloudNativeEra } from '../data/eras';
import { POD_DEFINITIONS } from '../data/pods';
import type { PodType } from '../data/pods';
import { researchProjects } from '../data/researchProjects';
import type { EraDefinition, UnitDefinition, UpgradeEffect } from '../data/types';

const eraMap: Record<string, EraDefinition> = {
  [courierEra.id]: courierEra,
  [telegraphEra.id]: telegraphEra,
  [telephoneEra.id]: telephoneEra,
  [digitalEra.id]: digitalEra,
  [cloudNativeEra.id]: cloudNativeEra,
};

const defaultEraOrder = [
  courierEra.id,
  telegraphEra.id,
  telephoneEra.id,
  digitalEra.id,
  cloudNativeEra.id,
] as const;
export const UNIT_REFUND_RATIO = 0.6;

export const getEraDefinition = (eraId: string): EraDefinition => {
  const era = eraMap[eraId];
  if (!era) {
    throw new Error(`Unknown era id: ${eraId}`);
  }
  return era;
};

export const getUnitCost = (unit: UnitDefinition, ownedCount: number): number => {
  return unit.baseCost * Math.pow(unit.costMultiplier, ownedCount);
};

export const computeWorkforceUsed = (units: Record<string, number>, eraIds: string[]): number => {
  let total = 0;
  for (const eraId of eraIds) {
    const era = getEraDefinition(eraId);
    for (const unit of era.units) {
      const count = units[unit.id] ?? 0;
      if (!count) continue;
      total += count * unit.workforceCost;
    }
  }
  return total;
};

interface ProductionRatesState {
  money: number;
  tech: number;
  power: number;
  bandwidth: number;
  compute: number;
}

interface ResourcesState {
  money: number;
  tech: number;
  power: number;
  workforceBase: number;
  bandwidth: number;
  compute: number;
}

interface BonusesState {
  globalMoneyMultiplier: number;
  globalTechMultiplier: number;
  globalBandwidthMultiplier: number;
  unitMoneyMultipliers: Record<string, number>;
  workforceBonus: number;
}

interface ManualBoostState {
  multiplier: number;
  duration: number;
  cooldown: number;
  activeUntil: number;
  cooldownUntil: number;
}

interface GameDataState {
  currentEraId: string;
  resources: ResourcesState;
  bonuses: BonusesState;
  units: Record<string, number>;
  upgrades: Record<string, boolean>;
  researchProjects: Record<string, boolean>;
  manualBoost: ManualBoostState;
  lastTickAt: number;
  productionRates: ProductionRatesState;
  unlockedEraIds: string[];
  researchQueue: ResearchQueueItem | null;
  bandwidthBoost: BandwidthBoostState;
  pods: Record<PodType, number>;
  podBonuses: PodBonusesState;
  statistics: GameStatistics;
  profile: PlayerProfile;
}

interface GameActions {
  tick: (deltaSeconds: number, currentTime?: number) => void;
  purchaseUnit: (unitId: string) => boolean;
  purchaseUpgrade: (upgradeId: string) => boolean;
  purchaseResearch: (projectId: string) => boolean;
  cancelResearch: () => void;
  activateManualBoost: () => boolean;
  applyOfflineProgress: () => void;
  resetGame: () => void;
  advanceEra: () => boolean;
  selectEra: (eraId: string) => boolean;
  sellUnit: (unitId: string) => boolean;
  setBandwidthBoostTier: (tier: BandwidthBoostTier) => void;
  addPod: (podType: PodType) => boolean;
  removePod: (podType: PodType) => boolean;
  setNickname: (nickname: string) => void;
}

interface ResearchQueueItem {
  id: string;
  startedAt: number;
  completesAt: number;
}

type BandwidthBoostTier = 'off' | 'low' | 'medium' | 'high';

interface BandwidthBoostState {
  tier: BandwidthBoostTier;
}

const BANDWIDTH_BOOST_TIERS: Record<Exclude<BandwidthBoostTier, 'off'>, { cost: number; bonus: number }> = {
  low: { cost: 5, bonus: 0.15 },
  medium: { cost: 25, bonus: 0.35 },
  high: { cost: 100, bonus: 0.75 },
};

const POD_DEFINITION_MAP = POD_DEFINITIONS.reduce<Record<PodType, (typeof POD_DEFINITIONS)[number]>>((acc, pod) => {
  acc[pod.id] = pod;
  return acc;
}, {} as Record<PodType, (typeof POD_DEFINITIONS)[number]>);

const createDefaultPodBonuses = (): PodBonusesState => ({
  moneyMultiplier: 1,
  techMultiplier: 1,
  bandwidthMultiplier: 1,
  computeMultiplier: 1,
  computeUpkeep: 0,
  suspended: false,
});

const recalculatePodBonuses = (pods: Record<PodType, number>): PodBonusesState => {
  let moneyBonus = 1;
  let techBonus = 1;
  let bandwidthBonus = 1;
  let computeBonus = 1;
  let computeUpkeep = 0;

  for (const definition of POD_DEFINITIONS) {
    const count = Math.min(pods[definition.id] ?? 0, definition.max);
    if (count <= 0) continue;

    computeUpkeep += definition.computeUpkeep * count;

    if (definition.effects.money) {
      moneyBonus *= 1 + definition.effects.money * count;
    }
    if (definition.effects.tech) {
      techBonus *= 1 + definition.effects.tech * count;
    }
    if (definition.effects.bandwidth) {
      bandwidthBonus *= 1 + definition.effects.bandwidth * count;
    }
    if (definition.effects.compute) {
      computeBonus *= 1 + definition.effects.compute * count;
    }
  }

  return {
    moneyMultiplier: moneyBonus,
    techMultiplier: techBonus,
    bandwidthMultiplier: bandwidthBonus,
    computeMultiplier: computeBonus,
    computeUpkeep,
    suspended: false,
  };
};

interface PodBonusesState {
  moneyMultiplier: number;
  techMultiplier: number;
  bandwidthMultiplier: number;
  computeMultiplier: number;
  computeUpkeep: number;
  suspended: boolean;
}

interface GameStatistics {
  totalMoneyEarned: number;
  gameStartedAt: number;
  cloudNativeUnlockedAt: number | null;
}

interface PlayerProfile {
  nickname: string;
}

export type GameState = GameDataState & GameActions;

const createInitialState = (): GameDataState => ({
  currentEraId: courierEra.id,
  resources: {
    money: 100,
    tech: 0,
    power: 0,
    workforceBase: 14,
    bandwidth: 0,
    compute: 0,
  },
  bonuses: {
    globalMoneyMultiplier: 1,
    globalTechMultiplier: 1,
    globalBandwidthMultiplier: 1,
    unitMoneyMultipliers: {},
    workforceBonus: 0,
  },
  units: {},
  upgrades: {},
  researchProjects: {},
  manualBoost: {
    multiplier: 2,
    duration: 10,
    cooldown: 25,
    activeUntil: 0,
    cooldownUntil: 0,
  },
  lastTickAt: Date.now(),
  productionRates: {
    money: 0,
    tech: 0,
    power: 0,
    bandwidth: 0,
    compute: 0,
  },
  unlockedEraIds: [defaultEraOrder[0]],
  researchQueue: null,
  bandwidthBoost: {
    tier: 'off',
  },
  pods: sanitizePods(),
  podBonuses: createDefaultPodBonuses(),
  statistics: {
    totalMoneyEarned: 0,
    gameStartedAt: Date.now(),
    cloudNativeUnlockedAt: null,
  },
  profile: {
    nickname: '',
  },
});

const getTotalWorkforce = (state: GameDataState): number => {
  return state.resources.workforceBase + state.bonuses.workforceBonus;
};

const normalizeBonuses = (bonuses: Partial<BonusesState> = {}): BonusesState => ({
  globalMoneyMultiplier: bonuses.globalMoneyMultiplier ?? 1,
  globalTechMultiplier: bonuses.globalTechMultiplier ?? 1,
  globalBandwidthMultiplier: bonuses.globalBandwidthMultiplier ?? 1,
  unitMoneyMultipliers: bonuses.unitMoneyMultipliers ?? {},
  workforceBonus: bonuses.workforceBonus ?? 0,
});

const normalizeBandwidthBoost = (
  boost: Partial<BandwidthBoostState> | null | undefined,
): BandwidthBoostState => ({
  tier: boost?.tier ?? 'off',
});

const sanitizePods = (pods?: Partial<Record<PodType, number>> | null): Record<PodType, number> => {
  return POD_DEFINITIONS.reduce((acc, definition) => {
    const count = Math.max(0, Math.floor(pods?.[definition.id] ?? 0));
    acc[definition.id] = Math.min(count, definition.max);
    return acc;
  }, {} as Record<PodType, number>);
};

const applyEffects = (bonuses: BonusesState, effects: UpgradeEffect[]): BonusesState => {
  const base = normalizeBonuses(bonuses);
  const updated: BonusesState = {
    globalMoneyMultiplier: base.globalMoneyMultiplier,
    globalTechMultiplier: base.globalTechMultiplier,
    globalBandwidthMultiplier: base.globalBandwidthMultiplier,
    unitMoneyMultipliers: { ...base.unitMoneyMultipliers },
    workforceBonus: base.workforceBonus,
  };

  for (const effect of effects) {
    switch (effect.type) {
      case 'globalMoneyMultiplier': {
        updated.globalMoneyMultiplier *= effect.multiplier;
        break;
      }
      case 'unitMoneyMultiplier': {
        const current = updated.unitMoneyMultipliers[effect.unitId] ?? 1;
        updated.unitMoneyMultipliers[effect.unitId] = current * effect.multiplier;
        break;
      }
      case 'workforceBonus': {
        updated.workforceBonus += effect.amount;
        break;
      }
      case 'globalTechMultiplier': {
        updated.globalTechMultiplier *= effect.multiplier;
        break;
      }
      case 'globalBandwidthMultiplier': {
        updated.globalBandwidthMultiplier *= effect.multiplier;
        break;
      }
      default: {
        const exhaustiveCheck: never = effect;
        throw new Error(`Unhandled upgrade effect: ${exhaustiveCheck}`);
      }
    }
  }

  return updated;
};

const clamp = (value: number, min = 0): number => (value < min ? min : value);

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      ...createInitialState(),
      tick: (deltaSeconds, currentTime) => {
        if (deltaSeconds <= 0) {
          return;
        }

        const now = currentTime ?? Date.now();

        set((state) => {
          const normalizedBonuses = normalizeBonuses(state.bonuses);
          const bandwidthBoostState = normalizeBandwidthBoost(state.bandwidthBoost);
          const tierConfig =
            bandwidthBoostState.tier !== 'off' ? BANDWIDTH_BOOST_TIERS[bandwidthBoostState.tier] : null;
          const podBonuses = state.podBonuses ?? createDefaultPodBonuses();
          const podComputeCostPerSecond = podBonuses.computeUpkeep;
          const computeCostThisTick = podComputeCostPerSecond * deltaSeconds;
          const hasComputeForPods = podComputeCostPerSecond === 0 || (state.resources.compute ?? 0) >= computeCostThisTick;
          const podSuspendedThisTick = podBonuses.computeUpkeep > 0 && !hasComputeForPods;

          const podMoneyMultiplier = podSuspendedThisTick ? 1 : podBonuses.moneyMultiplier;
          const podTechMultiplier = podSuspendedThisTick ? 1 : podBonuses.techMultiplier;
          const podBandwidthMultiplier = podSuspendedThisTick ? 1 : podBonuses.bandwidthMultiplier;
          const podComputeMultiplier = podSuspendedThisTick ? 1 : podBonuses.computeMultiplier;

          const globalMoneyMultiplier = normalizedBonuses.globalMoneyMultiplier * podMoneyMultiplier;
          const boostMultiplier = tierConfig ? 1 + tierConfig.bonus : 1;
          const globalTechMultiplier = normalizedBonuses.globalTechMultiplier * boostMultiplier * podTechMultiplier;
          const globalBandwidthMultiplier = normalizedBonuses.globalBandwidthMultiplier * podBandwidthMultiplier;
          const computeProductionMultiplier = podComputeMultiplier;
          const unitMoneyMultipliers = normalizedBonuses.unitMoneyMultipliers;
          const currentMoney = state.resources.money ?? 0;
          const currentTech = state.resources.tech ?? 0;
          const currentBandwidth = state.resources.bandwidth ?? 0;
          const currentMoneyRate = state.productionRates.money ?? 0;
          const currentTechRate = state.productionRates.tech ?? 0;
          const currentBandwidthRate = state.productionRates.bandwidth ?? 0;

          let moneyPerSecond = 0;
          let techPerSecond = 0;
          let bandwidthPerSecond = 0;
          let computePerSecond = 0;

          const manualIsActive = state.manualBoost.activeUntil > now;
          const manualMultiplier = manualIsActive ? state.manualBoost.multiplier : 1;

          for (const eraId of state.unlockedEraIds) {
            const era = getEraDefinition(eraId);
            for (const unit of era.units) {
              const count = state.units[unit.id] ?? 0;
              if (!count) continue;

              const unitMoneyMultiplier =
                (unitMoneyMultipliers[unit.id] ?? 1) *
                globalMoneyMultiplier *
                manualMultiplier;
              const unitProductionMoney = (unit.production.money ?? 0) * unitMoneyMultiplier;
              const unitProductionTech =
                (unit.production.tech ?? 0) * globalTechMultiplier;
              const unitProductionBandwidth =
                (unit.production.bandwidth ?? 0) * globalBandwidthMultiplier;
              const unitProductionCompute = (unit.production.compute ?? 0) * computeProductionMultiplier;

              moneyPerSecond += unitProductionMoney * count;
              techPerSecond += unitProductionTech * count;
              bandwidthPerSecond += unitProductionBandwidth * count;
              computePerSecond += unitProductionCompute * count;
            }
          }

          const moneyGain = moneyPerSecond * deltaSeconds;
          const techGain = techPerSecond * deltaSeconds;
          let bandwidthGain = bandwidthPerSecond * deltaSeconds;
          let computeGain = computePerSecond * deltaSeconds;

          const updates: Partial<GameDataState> = {
            lastTickAt: now,
          };

          if (tierConfig) {
            const bandwidthCost = tierConfig.cost * deltaSeconds;
            if ((state.resources.bandwidth ?? 0) >= bandwidthCost) {
              bandwidthGain -= bandwidthCost;
            } else {
              updates.bandwidthBoost = {
                tier: 'off',
              };
              bandwidthGain -= Math.min(state.resources.bandwidth ?? 0, bandwidthCost);
            }
          }

          if (podBonuses.computeUpkeep > 0) {
            const computeCost = podBonuses.computeUpkeep * deltaSeconds;
            if ((state.resources.compute ?? 0) >= computeCost) {
              computeGain -= computeCost;
              if (podBonuses.suspended) {
                updates.podBonuses = {
                  ...podBonuses,
                  suspended: false,
                };
              }
            } else {
              computeGain -= Math.min(state.resources.compute ?? 0, computeCost);
              if (!podBonuses.suspended || !podSuspendedThisTick) {
                updates.podBonuses = {
                  ...podBonuses,
                  suspended: true,
                };
              }
            }
          }

          const newMoney = clamp(currentMoney + moneyGain);
          const newTech = clamp(currentTech + techGain);
          const newBandwidth = clamp(currentBandwidth + bandwidthGain);
          const newCompute = clamp((state.resources.compute ?? 0) + computeGain);

          if (
            newMoney !== state.resources.money ||
            newTech !== state.resources.tech ||
            newBandwidth !== state.resources.bandwidth ||
            newCompute !== (state.resources.compute ?? 0)
          ) {
            updates.resources = {
              ...state.resources,
              money: newMoney,
              tech: newTech,
              bandwidth: newBandwidth,
              compute: newCompute,
            };
          }

          if (moneyGain > 0) {
            updates.statistics = {
              ...state.statistics,
              totalMoneyEarned: state.statistics.totalMoneyEarned + moneyGain,
            };
          }

          if (
            currentMoneyRate !== moneyPerSecond ||
            currentTechRate !== techPerSecond ||
            currentBandwidthRate !== bandwidthPerSecond ||
            (state.productionRates.compute ?? 0) !== computePerSecond
          ) {
            updates.productionRates = {
              money: moneyPerSecond,
              tech: techPerSecond,
              power: 0,
              bandwidth: bandwidthPerSecond,
              compute: computePerSecond,
            };
          }

          const cooldownExpired =
            state.manualBoost.cooldownUntil !== 0 && state.manualBoost.cooldownUntil <= now;
          const newActiveUntil = manualIsActive ? state.manualBoost.activeUntil : 0;
          const newCooldownUntil = cooldownExpired ? 0 : state.manualBoost.cooldownUntil;

          if (
            newActiveUntil !== state.manualBoost.activeUntil ||
            newCooldownUntil !== state.manualBoost.cooldownUntil
          ) {
            updates.manualBoost = {
              ...state.manualBoost,
              activeUntil: newActiveUntil,
              cooldownUntil: newCooldownUntil,
            };
          }

          if (state.researchQueue && state.researchProjects[state.researchQueue.id]) {
            updates.researchQueue = null;
          } else if (state.researchQueue && state.researchQueue.completesAt <= now) {
            const project = researchProjects.find((entry) => entry.id === state.researchQueue?.id);
            if (project && !state.researchProjects[project.id]) {
              updates.bonuses = applyEffects(state.bonuses, project.effects);
              updates.researchProjects = {
                ...state.researchProjects,
                [project.id]: true,
              };
            }
            updates.researchQueue = null;
          }

          if (Object.keys(updates).length === 1 && 'lastTickAt' in updates) {
            return { lastTickAt: now };
          }

          return updates;
        });
      },
      purchaseUnit: (unitId) => {
        const state = get();
        const era = getEraDefinition(state.currentEraId);
        const unit = era.units.find((entry) => entry.id === unitId);
        if (!unit) {
          return false;
        }

        const owned = state.units[unitId] ?? 0;
        const cost = getUnitCost(unit, owned);

        const totalWorkforce = getTotalWorkforce(state);
        const usedWorkforce = computeWorkforceUsed(state.units, state.unlockedEraIds);
        const availableWorkforce = totalWorkforce - usedWorkforce;

        if ((state.resources.money ?? 0) < cost) {
          return false;
        }

        if (availableWorkforce < unit.workforceCost) {
          return false;
        }

        set((prev) => ({
          ...prev,
          resources: {
            ...prev.resources,
            money: (prev.resources.money ?? 0) - cost,
          },
          units: {
            ...prev.units,
            [unitId]: owned + 1,
          },
        }));

        return true;
      },
      sellUnit: (unitId) => {
        const state = get();
        const owned = state.units[unitId] ?? 0;
        if (owned <= 0) {
          return false;
        }

        const eraContainingUnit = state.unlockedEraIds
          .map((eraId) => getEraDefinition(eraId))
          .find((era) => era.units.some((unit) => unit.id === unitId));

        if (!eraContainingUnit) {
          return false;
        }

        const unitDef = eraContainingUnit.units.find((unit) => unit.id === unitId)!;
        const sellValue = getUnitCost(unitDef, owned - 1) * UNIT_REFUND_RATIO;

        set((prev) => {
          const nextUnits = { ...prev.units, [unitId]: owned - 1 };
          if (nextUnits[unitId] <= 0) {
            delete nextUnits[unitId];
          }

          return {
            ...prev,
            resources: {
              ...prev.resources,
              money: (prev.resources.money ?? 0) + sellValue,
            },
            units: nextUnits,
          };
        });

        return true;
      },
      setBandwidthBoostTier: (tier) => {
        set((prev) => ({
          ...prev,
          bandwidthBoost: {
            tier,
          },
        }));
      },
      addPod: (podType) => {
        const state = get();
        if (!state.unlockedEraIds.includes(cloudNativeEra.id)) {
          return false;
        }

        const definition = POD_DEFINITION_MAP[podType];
        if (!definition) {
          return false;
        }

        const currentPods = sanitizePods(state.pods);
        const currentCount = currentPods[podType] ?? 0;
        if (currentCount >= definition.max) {
          return false;
        }

        const nextPods = { ...currentPods, [podType]: currentCount + 1 } as Record<PodType, number>;
        const sanitizedPods = sanitizePods(nextPods);
        const recalculated = recalculatePodBonuses(sanitizedPods);

        set({
          pods: sanitizedPods,
          podBonuses: recalculated,
        });

        return true;
      },
      removePod: (podType) => {
        const state = get();
        const definition = POD_DEFINITION_MAP[podType];
        if (!definition) {
          return false;
        }

        const currentPods = sanitizePods(state.pods);
        const currentCount = currentPods[podType] ?? 0;
        if (currentCount <= 0) {
          return false;
        }

        const nextPods = { ...currentPods, [podType]: currentCount - 1 } as Record<PodType, number>;
        const sanitizedPods = sanitizePods(nextPods);
        const recalculated = recalculatePodBonuses(sanitizedPods);

        set({
          pods: sanitizedPods,
          podBonuses: recalculated,
        });

        return true;
      },
      setNickname: (nickname) => {
        set((prev) => ({
          ...prev,
          profile: {
            ...prev.profile,
            nickname: nickname.slice(0, 24),
          },
        }));
      },
      purchaseUpgrade: (upgradeId) => {
        const state = get();
        const era = getEraDefinition(state.currentEraId);
        const upgrade = era.upgrades.find((entry) => entry.id === upgradeId);
        if (!upgrade) {
          return false;
        }

        if (state.upgrades[upgradeId]) {
          return false;
        }

        if ((state.resources.money ?? 0) < upgrade.cost) {
          return false;
        }

        set((prev) => ({
          ...prev,
          resources: {
            ...prev.resources,
            money: (prev.resources.money ?? 0) - upgrade.cost,
          },
          bonuses: applyEffects(prev.bonuses, upgrade.effects),
          upgrades: {
            ...prev.upgrades,
            [upgradeId]: true,
          },
        }));

        return true;
      },
      purchaseResearch: (projectId) => {
        const state = get();
        const project = researchProjects.find((entry) => entry.id === projectId);
        if (!project) {
          return false;
        }

        if (state.researchProjects[projectId]) {
          return false;
        }

        if (project.unlocksAtEra && !state.unlockedEraIds.includes(project.unlocksAtEra)) {
          return false;
        }

        if ((state.resources.tech ?? 0) < project.techCost) {
          return false;
        }

        if (state.researchQueue) {
          return false;
        }

        set((prev) => ({
          ...prev,
          resources: {
            ...prev.resources,
            tech: clamp((prev.resources.tech ?? 0) - project.techCost),
          },
          researchQueue: {
            id: projectId,
            startedAt: Date.now(),
            completesAt: Date.now() + project.researchTime * 1000,
          },
        }));

        return true;
      },
      cancelResearch: () => {
        const state = get();
        if (!state.researchQueue) {
          return;
        }

        set({
          researchQueue: null,
        });
      },
      activateManualBoost: () => {
        const now = Date.now();
        const state = get();
        const boost = state.manualBoost;

        const boostAvailable = boost.activeUntil < now && boost.cooldownUntil <= now;
        if (!boostAvailable) {
          return false;
        }

        set((prev) => ({
          ...prev,
          manualBoost: {
            ...prev.manualBoost,
            activeUntil: now + prev.manualBoost.duration * 1000,
            cooldownUntil: now + prev.manualBoost.cooldown * 1000,
          },
        }));

        return true;
      },
      applyOfflineProgress: () => {
        const state = get();
        const now = Date.now();
        const lastTick = state.lastTickAt ?? now;
        const elapsedMs = Math.max(0, now - lastTick);

        if (elapsedMs === 0) {
          return;
        }

        const stepMs = 1000;
        let simulatedTime = lastTick;
        let remaining = elapsedMs;

        while (remaining > 0) {
          const currentStep = Math.min(remaining, stepMs);
          const targetTime = simulatedTime + currentStep;
          get().tick(currentStep / 1000, targetTime);
          simulatedTime = targetTime;
          remaining -= currentStep;
        }
      },
      resetGame: () => {
        set({
          ...createInitialState(),
        });
      },
      advanceEra: () => {
        const state = get();
        const currentEra = getEraDefinition(state.currentEraId);
        const nextEraId = currentEra.nextEraId;
        const requirement = currentEra.nextEraRequirement;

        if (!nextEraId || !requirement) {
          return false;
        }

        const currentMoney = state.resources.money ?? 0;
        const currentTech = state.resources.tech ?? 0;
        const currentBandwidth = state.resources.bandwidth ?? 0;
        const currentCompute = state.resources.compute ?? 0;

        if (
          currentMoney < requirement.money ||
          currentTech < requirement.tech ||
          (requirement.bandwidth ?? 0) > currentBandwidth ||
          (requirement.compute ?? 0) > currentCompute
        ) {
          return false;
        }

        set((prev) => {
          const updatedUnlocked = prev.unlockedEraIds.includes(nextEraId)
            ? prev.unlockedEraIds
            : [...prev.unlockedEraIds, nextEraId];

          const updatedStatistics: GameStatistics = {
            ...prev.statistics,
            cloudNativeUnlockedAt:
              nextEraId === cloudNativeEra.id && prev.statistics.cloudNativeUnlockedAt == null
                ? Date.now()
                : prev.statistics.cloudNativeUnlockedAt,
          };

          return {
            ...prev,
            currentEraId: nextEraId,
            unlockedEraIds: updatedUnlocked,
            resources: {
              ...prev.resources,
              money: clamp((prev.resources.money ?? 0) - requirement.money),
              tech: clamp((prev.resources.tech ?? 0) - requirement.tech),
              bandwidth: requirement.bandwidth
                ? clamp((prev.resources.bandwidth ?? 0) - requirement.bandwidth)
                : prev.resources.bandwidth ?? 0,
              compute: requirement.compute
                ? clamp((prev.resources.compute ?? 0) - requirement.compute)
                : prev.resources.compute ?? 0,
            },
            lastTickAt: Date.now(),
            statistics: updatedStatistics,
          };
        });

        return true;
      },
      selectEra: (eraId) => {
        const state = get();
        if (!state.unlockedEraIds.includes(eraId)) {
          return false;
        }

        if (state.currentEraId === eraId) {
          return true;
        }

        set({
          currentEraId: eraId,
        });

        return true;
      },
    }),
    {
      name: 'ai-idle-v1',
      version: 1,
      partialize: (state) => ({
        currentEraId: state.currentEraId,
        resources: state.resources,
        bonuses: state.bonuses,
        units: state.units,
        upgrades: state.upgrades,
        researchProjects: state.researchProjects,
        manualBoost: state.manualBoost,
        lastTickAt: state.lastTickAt,
        unlockedEraIds: state.unlockedEraIds,
        researchQueue: state.researchQueue,
        bandwidthBoost: state.bandwidthBoost,
        pods: state.pods,
        podBonuses: state.podBonuses,
        statistics: state.statistics,
        profile: state.profile,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.pods = sanitizePods(state.pods ?? {});
          state.podBonuses = recalculatePodBonuses(state.pods);
          state.statistics = {
            totalMoneyEarned: state.statistics?.totalMoneyEarned ?? 0,
            gameStartedAt: state.statistics?.gameStartedAt ?? Date.now(),
            cloudNativeUnlockedAt: state.statistics?.cloudNativeUnlockedAt ?? null,
          };
          state.profile = {
            nickname: state.profile?.nickname ?? '',
          };
        }
      },
    },
  ),
);

export const selectResources = (state: GameState) => state.resources;
export const selectProductionRates = (state: GameState) => state.productionRates;
export const selectUnits = (state: GameState) => state.units;
export const selectUpgrades = (state: GameState) => state.upgrades;
export const selectResearch = (state: GameState) => state.researchProjects;
export const selectBonuses = (state: GameState) => state.bonuses;
export const selectManualBoost = (state: GameState) => state.manualBoost;
export const selectCurrentEra = (state: GameState) => getEraDefinition(state.currentEraId);
export const selectUnlockedEraIds = (state: GameState) => state.unlockedEraIds;
export const selectStatistics = (state: GameState) => state.statistics;
export const selectProfile = (state: GameState) => state.profile;

export const selectTotalWorkforce = (state: GameState) => getTotalWorkforce(state);

export const selectUsedWorkforce = (state: GameState) => {
  return computeWorkforceUsed(state.units, state.unlockedEraIds);
};

export const selectWorkforceInfo = (state: GameState) => {
  const total = getTotalWorkforce(state);
  const used = computeWorkforceUsed(state.units, state.unlockedEraIds);
  const available = Math.max(0, total - used);

  return { total, used, available };
};
