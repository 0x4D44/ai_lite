import { POD_DEFINITIONS } from '../data/pods';
import { formatNumber } from '../utils/format';
import { ResourceValue } from './ResourceValue';
import { useGameStore } from '../state/gameStore';

const describeEffect = (value: number) => `+${(value * 100).toFixed(0)}%`;

export const PodPanel = () => {
  const pods = useGameStore((state) => state.pods ?? {});
  const podBonuses = useGameStore((state) => state.podBonuses);
  const addPod = useGameStore((state) => state.addPod);
  const removePod = useGameStore((state) => state.removePod);
  const unlocked = useGameStore((state) => state.unlockedEraIds.includes('cloud-native'));

  if (!unlocked) {
    return null;
  }

  return (
    <section className="panel">
      <header className="panel-header">
        <h2>Cloud Pod Orchestrator</h2>
        <p className="subdued">
          Compose Kubernetes pods to shape global multipliers. Pods consume compute credits every second.
        </p>
      </header>
      <div className="card-body">
        <div className="card-row">
          <span className="label">Active Compute Upkeep</span>
          <ResourceValue resource="compute" value={`${formatNumber(podBonuses.computeUpkeep)}/s`} />
        </div>
        <div className="card-row">
          <span className="label">Status</span>
          <span>{podBonuses.suspended ? 'Suspended (insufficient compute)' : 'Operational'}</span>
        </div>
      </div>
      <div className="list">
        {POD_DEFINITIONS.map((pod) => {
          const current = pods[pod.id] ?? 0;
          const atMax = current >= pod.max;

          return (
            <article key={pod.id} className="card">
              <div className="card-header">
                <div>
                  <h3>{pod.name}</h3>
                  <p className="subdued">{pod.description}</p>
                </div>
                <div className="badge badge-fixed">
                  {current} / {pod.max}
                </div>
              </div>
              <div className="card-body">
                <div className="card-row">
                  <span className="label">Compute Upkeep</span>
                  <ResourceValue resource="compute" value={`${formatNumber(pod.computeUpkeep)}/s`} />
                </div>
                <ul className="effect-list">
                  {pod.effects.money && <li>Money {describeEffect(pod.effects.money)}</li>}
                  {pod.effects.tech && <li>Tech {describeEffect(pod.effects.tech)}</li>}
                  {pod.effects.bandwidth && <li>Bandwidth {describeEffect(pod.effects.bandwidth)}</li>}
                  {pod.effects.compute && <li>Compute Output {describeEffect(pod.effects.compute)}</li>}
                </ul>
              </div>
              <footer className="card-footer">
                <button type="button" className="primary" onClick={() => addPod(pod.id)} disabled={atMax}>
                  Deploy Pod
                </button>
                <button
                  type="button"
                  className="danger"
                  onClick={() => removePod(pod.id)}
                  disabled={current === 0}
                >
                  Decommission
                </button>
              </footer>
            </article>
          );
        })}
      </div>
    </section>
  );
};
