import { getEraDefinition, selectResources, selectUnlockedEraIds, useGameStore } from '../state/gameStore';
import { formatNumber } from '../utils/format';
import { ResourceValue } from './ResourceValue';

const clamp = (value: number) => Math.min(1, Math.max(0, value));

export const EraProgress = () => {
  const resources = useGameStore(selectResources);
  const era = useGameStore((state) => getEraDefinition(state.currentEraId));
  const unlockedEraIds = useGameStore(selectUnlockedEraIds);
  const advanceEra = useGameStore((state) => state.advanceEra);

  const requirement = era.nextEraRequirement;
  const nextEraId = era.nextEraId;
  const nextEra = nextEraId ? getEraDefinition(nextEraId) : null;
  const nextUnlocked = nextEraId ? unlockedEraIds.includes(nextEraId) : false;

  if (!requirement || !nextEra) {
    return (
      <section className="panel">
        <header className="panel-header">
          <h2>Research Next Era</h2>
          <p className="subdued">Further eras are under construction. Stay tuned!</p>
        </header>
      </section>
    );
  }

  const moneyProgress = clamp(resources.money / requirement.money);
  const techProgress = clamp(resources.tech / requirement.tech);
  const bandwidthRequirement = requirement.bandwidth ?? 0;
  const bandwidthProgress = bandwidthRequirement
    ? clamp(resources.bandwidth / bandwidthRequirement)
    : 1;
  const computeRequirement = requirement.compute ?? 0;
  const computeProgress = computeRequirement ? clamp((resources.compute ?? 0) / computeRequirement) : 1;
  const meetsMoney = moneyProgress >= 1;
  const meetsTech = techProgress >= 1;
  const meetsBandwidth = bandwidthProgress >= 1;
  const meetsCompute = computeProgress >= 1;
  const canAdvance = meetsMoney && meetsTech && meetsBandwidth && meetsCompute && !nextUnlocked;

  const handleAdvance = () => {
    if (canAdvance) {
      advanceEra();
    }
  };

  return (
    <section className="panel">
      <header className="panel-header">
        <h2>Research Next Era</h2>
        <p className="subdued">Invest funding to unlock {nextEra.name} advancements.</p>
      </header>
      <div className="progress-list">
        <div className="progress-item">
          <div className="progress-header">
            <span>Funding Goal</span>
            <ResourceValue
              resource="money"
              value={`${formatNumber(resources.money)} / ${formatNumber(requirement.money)}`}
            />
          </div>
          <div className="progress-bar">
            <div className="progress-bar-fill" style={{ width: `${moneyProgress * 100}%` }} />
          </div>
        </div>
        <div className="progress-item">
          <div className="progress-header">
            <span>Research Goal</span>
            <ResourceValue
              resource="tech"
              value={`${formatNumber(resources.tech)} / ${formatNumber(requirement.tech)}`}
            />
          </div>
          <div className="progress-bar">
            <div className="progress-bar-fill" style={{ width: `${techProgress * 100}%` }} />
          </div>
        </div>
        {bandwidthRequirement > 0 && (
          <div className="progress-item">
            <div className="progress-header">
              <span>Data Flow Goal</span>
              <ResourceValue
                resource="bandwidth"
                value={`${formatNumber(resources.bandwidth)} / ${formatNumber(bandwidthRequirement)}`}
              />
            </div>
            <div className="progress-bar">
              <div className="progress-bar-fill" style={{ width: `${bandwidthProgress * 100}%` }} />
            </div>
          </div>
        )}
        {computeRequirement > 0 && (
          <div className="progress-item">
            <div className="progress-header">
              <span>Compute Goal</span>
              <ResourceValue
                resource="compute"
                value={`${formatNumber(resources.compute ?? 0)} / ${formatNumber(computeRequirement)}`}
              />
            </div>
            <div className="progress-bar">
              <div className="progress-bar-fill" style={{ width: `${computeProgress * 100}%` }} />
            </div>
          </div>
        )}
      </div>
      <footer className="card-footer">
        <button type="button" className="secondary" disabled={!canAdvance} onClick={handleAdvance}>
          {nextUnlocked ? `${nextEra.name} Unlocked` : `Unlock ${nextEra.name}`}
        </button>
      </footer>
    </section>
  );
};
