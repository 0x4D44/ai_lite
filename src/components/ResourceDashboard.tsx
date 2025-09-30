import {
  selectProductionRates,
  selectResources,
  selectTotalWorkforce,
  selectUsedWorkforce,
  useGameStore,
} from '../state/gameStore';
import { ResourceValue } from './ResourceValue';
import { formatNumber } from '../utils/format';

export const ResourceDashboard = () => {
  const resources = useGameStore(selectResources);
  const production = useGameStore(selectProductionRates);
  const totalWorkforce = useGameStore(selectTotalWorkforce);
  const usedWorkforce = useGameStore(selectUsedWorkforce);
  const availableWorkforce = Math.max(0, totalWorkforce - usedWorkforce);
  const telegraphUnlocked = useGameStore((state) => state.unlockedEraIds.includes('telegraph'));
  const digitalUnlocked = useGameStore((state) => state.unlockedEraIds.includes('digital'));
  const bandwidth = resources.bandwidth ?? 0;
  const bandwidthRate = production.bandwidth ?? 0;
  const compute = resources.compute ?? 0;
  const computeRate = production.compute ?? 0;

  return (
    <section className="panel">
      <header className="panel-header">
        <h2>Resources</h2>
      </header>
      <div className="resource-grid">
        <div className="resource-card">
          <span className="label">Money</span>
          <span className="value">
            <ResourceValue resource="money" value={formatNumber(resources.money)} />
          </span>
          <span className="rate">
            <ResourceValue resource="money" value={`${formatNumber(production.money)}/s`} />
          </span>
        </div>
        <div className="resource-card">
          <span className="label">Tech Progress</span>
          <span className="value">
            <ResourceValue resource="tech" value={formatNumber(resources.tech)} />
          </span>
          <span className="rate">
            <ResourceValue resource="tech" value={`${formatNumber(production.tech)}/s`} />
          </span>
        </div>
        <div className="resource-card">
          <span className="label">Workforce</span>
          <span className="value">
            <ResourceValue resource="workforce" value={`${usedWorkforce} / ${totalWorkforce}`} />
          </span>
          <span className="rate">
            <ResourceValue resource="workforce" value={`${formatNumber(availableWorkforce)} idle`} />
          </span>
        </div>
        {telegraphUnlocked && (
          <div className="resource-card">
            <span className="label">Bandwidth</span>
            <span className="value">
              <ResourceValue resource="bandwidth" value={formatNumber(bandwidth)} />
            </span>
            <span className="rate">
              <ResourceValue resource="bandwidth" value={`${formatNumber(bandwidthRate)}/s`} />
            </span>
          </div>
        )}
        {digitalUnlocked && (
          <div className="resource-card">
            <span className="label">Compute Credits</span>
            <span className="value">
              <ResourceValue resource="compute" value={formatNumber(compute)} />
            </span>
            <span className="rate">
              <ResourceValue resource="compute" value={`${formatNumber(computeRate)}/s`} />
            </span>
          </div>
        )}
      </div>
    </section>
  );
};
