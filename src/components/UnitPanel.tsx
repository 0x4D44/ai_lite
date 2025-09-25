import { useMemo } from 'react';

import {
  UNIT_REFUND_RATIO,
  getEraDefinition,
  getUnitCost,
  selectResources,
  selectTotalWorkforce,
  selectUnlockedEraIds,
  selectUsedWorkforce,
  useGameStore,
} from '../state/gameStore';
import { formatNumber } from '../utils/format';
import { ResourceValue } from './ResourceValue';

interface UnitViewModel {
  id: string;
  name: string;
  description: string;
  workforceCost: number;
  powerCost?: number;
  cost: number;
  owned: number;
  moneyPerSecond: number;
  techPerSecond: number;
  bandwidthPerSecond: number;
  totalMoneyRate: number;
  totalTechRate: number;
  totalBandwidthRate: number;
  computePerSecond: number;
  totalComputeRate: number;
  sellValue: number;
}

export const UnitPanel = () => {
  const currentEraId = useGameStore((state) => state.currentEraId);
  const unitsOwned = useGameStore((state) => state.units);
  const bonuses = useGameStore((state) => state.bonuses);
  const unlockedEraIds = useGameStore(selectUnlockedEraIds);
  const resources = useGameStore(selectResources);
  const totalWorkforce = useGameStore(selectTotalWorkforce);
  const usedWorkforce = useGameStore(selectUsedWorkforce);
  const availableWorkforce = Math.max(0, totalWorkforce - usedWorkforce);
  const purchaseUnit = useGameStore((state) => state.purchaseUnit);
  const selectEra = useGameStore((state) => state.selectEra);
  const sellUnit = useGameStore((state) => state.sellUnit);
  const currentEra = useMemo(() => getEraDefinition(currentEraId), [currentEraId]);

  const units: UnitViewModel[] = useMemo(() => {
    return currentEra.units.map((unit) => {
      const owned = unitsOwned[unit.id] ?? 0;
      const cost = getUnitCost(unit, owned);
      const unitMultiplier =
        (bonuses.unitMoneyMultipliers[unit.id] ?? 1) * bonuses.globalMoneyMultiplier;

      const moneyPerSecond = (unit.production.money ?? 0) * unitMultiplier;
      const techPerSecond = unit.production.tech ?? 0;
      const bandwidthPerSecond = unit.production.bandwidth ?? 0;
      const computePerSecond = unit.production.compute ?? 0;

      return {
        id: unit.id,
        name: unit.name,
        description: unit.description,
        workforceCost: unit.workforceCost,
        powerCost: unit.powerCost,
        cost,
        owned,
        moneyPerSecond,
        techPerSecond,
        bandwidthPerSecond,
        totalMoneyRate: moneyPerSecond * Math.max(0, owned),
        totalTechRate: techPerSecond * Math.max(0, owned),
        totalBandwidthRate: bandwidthPerSecond * Math.max(0, owned),
        computePerSecond,
        totalComputeRate: computePerSecond * Math.max(0, owned),
        sellValue: owned > 0 ? getUnitCost(unit, owned - 1) * UNIT_REFUND_RATIO : 0,
      };
    });
  }, [bonuses, currentEra, unitsOwned]);

  const handlePurchase = (unitId: string) => {
    purchaseUnit(unitId);
  };

  const handleSell = (unitId: string) => {
    sellUnit(unitId);
  };

  return (
    <section className="panel">
      <header className="panel-header">
        <h2>{currentEra.name} Production</h2>
        <p className="subdued">Hire units to grow income and tech.</p>
        {unlockedEraIds.length > 1 && (
          <div className="era-switcher">
            {unlockedEraIds.map((eraId) => {
              const era = getEraDefinition(eraId);
              const active = eraId === currentEraId;
              return (
                <button
                  key={eraId}
                  type="button"
                  className={`chip ${active ? 'chip-active' : ''}`}
                  onClick={() => selectEra(eraId)}
                >
                  {era.name}
                </button>
              );
            })}
          </div>
        )}
      </header>
      <div className="list">
        {units.map((unit) => {
          const canAfford = resources.money >= unit.cost;
          const hasWorkforce = availableWorkforce >= unit.workforceCost;

          return (
            <article key={unit.id} className="card">
              <div className="card-header">
                <div>
                  <h3>{unit.name}</h3>
                  <p className="subdued">{unit.description}</p>
                </div>
        <div className="badge">Owned: {unit.owned}</div>
              </div>
              <div className="card-body">
                <div className="card-row">
                  <span className="label">Cost</span>
                  <ResourceValue resource="money" value={formatNumber(unit.cost)} />
                </div>
                <div className="card-row">
                  <span className="label">Workforce</span>
                  <ResourceValue resource="workforce" value={formatNumber(unit.workforceCost)} />
                </div>
                {unit.powerCost && (
                  <div className="card-row">
                    <span className="label">Power</span>
                    <ResourceValue resource="power" value={formatNumber(unit.powerCost)} />
                  </div>
                )}
                <div className="card-row">
                  <span className="label">Money</span>
                  <ResourceValue
                    resource="money"
                    value={
                      <>
                        {`${formatNumber(unit.moneyPerSecond)}/s`}
                        {unit.owned > 0 && (
                          <span className="subdued"> · Total {`${formatNumber(unit.totalMoneyRate)}/s`}</span>
                        )}
                      </>
                    }
                  />
                </div>
                {unit.techPerSecond > 0 && (
                  <div className="card-row">
                    <span className="label">Tech</span>
                    <ResourceValue
                      resource="tech"
                      value={
                        <>
                          {`${formatNumber(unit.techPerSecond)}/s`}
                          {unit.owned > 0 && (
                            <span className="subdued"> · Total {`${formatNumber(unit.totalTechRate)}/s`}</span>
                          )}
                        </>
                      }
                    />
                  </div>
                )}
                {unit.bandwidthPerSecond > 0 && (
                  <div className="card-row">
                    <span className="label">Bandwidth</span>
                    <ResourceValue
                      resource="bandwidth"
                      value={
                        <>
                          {`${formatNumber(unit.bandwidthPerSecond)}/s`}
                          {unit.owned > 0 && (
                            <span className="subdued"> · Total {`${formatNumber(unit.totalBandwidthRate)}/s`}</span>
                          )}
                        </>
                      }
                    />
                  </div>
                )}
                {unit.computePerSecond > 0 && (
                  <div className="card-row">
                    <span className="label">Compute</span>
                    <ResourceValue
                      resource="compute"
                      value={
                        <>
                          {`${formatNumber(unit.computePerSecond)}/s`}
                          {unit.owned > 0 && (
                            <span className="subdued"> · Total {`${formatNumber(unit.totalComputeRate)}/s`}</span>
                          )}
                        </>
                      }
                    />
                  </div>
                )}
              </div>
              <footer className="card-footer">
                <button
                  type="button"
                  className="primary"
                  onClick={() => handlePurchase(unit.id)}
                  disabled={!canAfford || !hasWorkforce}
                >
                  Hire
                </button>
                <button
                  type="button"
                  className="danger"
                  onClick={() => handleSell(unit.id)}
                  disabled={unit.owned === 0}
                >
                  Retire
                </button>
                {unit.owned > 0 && (
                  <span className="subdued">
                    Refund <ResourceValue resource="money" value={formatNumber(unit.sellValue)} />
                  </span>
                )}
                {!hasWorkforce && <span className="warning">Need more workforce</span>}
                {!canAfford && hasWorkforce && <span className="warning">Insufficient funds</span>}
              </footer>
            </article>
          );
        })}
      </div>
    </section>
  );
};
