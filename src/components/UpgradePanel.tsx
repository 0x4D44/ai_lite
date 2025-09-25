import { getEraDefinition, selectResources, selectUpgrades, useGameStore } from '../state/gameStore';
import { formatNumber } from '../utils/format';
import { ResourceValue } from './ResourceValue';
import { describeEffect } from '../utils/effectDescriptions';

export const UpgradePanel = () => {
  const era = useGameStore((state) => getEraDefinition(state.currentEraId));
  const ownedUpgrades = useGameStore(selectUpgrades);
  const resources = useGameStore(selectResources);
  const purchaseUpgrade = useGameStore((state) => state.purchaseUpgrade);

  return (
    <section className="panel">
      <header className="panel-header">
        <h2>Upgrades</h2>
        <p className="subdued">Permanent boosts to production and capacity.</p>
      </header>
      <div className="list">
        {era.upgrades.map((upgrade) => {
          const owned = ownedUpgrades[upgrade.id] ?? false;
          const canAfford = resources.money >= upgrade.cost;
          const disabled = owned || !canAfford;

          return (
            <article key={upgrade.id} className={`card ${owned ? 'card-owned' : ''}`}>
              <div className="card-header">
                <div>
                  <h3>{upgrade.name}</h3>
                  <p className="subdued">{upgrade.description}</p>
                </div>
                {owned && <div className="badge">Owned</div>}
              </div>
              <div className="card-body">
                <div className="card-row">
                  <span className="label">Cost</span>
                  <ResourceValue resource="money" value={formatNumber(upgrade.cost)} />
                </div>
                <ul className="effect-list">
                  {upgrade.effects.map((effect, index) => (
                    <li key={`${upgrade.id}-${effect.type}-${index}`}>{describeEffect(effect)}</li>
                  ))}
                </ul>
              </div>
              <footer className="card-footer">
                <button
                  type="button"
                  className="primary"
                  disabled={disabled}
                  onClick={() => purchaseUpgrade(upgrade.id)}
                >
                  {owned ? 'Purchased' : 'Purchase'}
                </button>
                {!owned && !canAfford && <span className="warning">Insufficient funds</span>}
              </footer>
            </article>
          );
        })}
      </div>
    </section>
  );
};
