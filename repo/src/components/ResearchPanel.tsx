import { researchProjects } from '../data/researchProjects';
import {
  selectResearch,
  selectResources,
  selectUnlockedEraIds,
  useGameStore,
} from '../state/gameStore';
import { describeEffect } from '../utils/effectDescriptions';
import { formatNumber } from '../utils/format';
import { ResourceValue } from './ResourceValue';

export const ResearchPanel = () => {
  const resources = useGameStore(selectResources);
  const ownedResearch = useGameStore(selectResearch);
  const unlockedEras = useGameStore(selectUnlockedEraIds);
  const purchaseResearch = useGameStore((state) => state.purchaseResearch);
  const queue = useGameStore((state) => state.researchQueue);

  const projects = researchProjects.filter((project) => {
    if (!project.unlocksAtEra) {
      return true;
    }
    return unlockedEras.includes(project.unlocksAtEra);
  });

  return (
    <section className="panel">
      <header className="panel-header">
        <h2>Research Lab</h2>
        <p className="subdued">Invest research progress to unlock persistent global modifiers.</p>
      </header>
      <div className="list">
        {projects.map((project) => {
          const owned = ownedResearch[project.id] ?? false;
          const canAfford = resources.tech >= project.techCost;
          const queued = queue?.id === project.id;
          const inProgress = Boolean(queue);
          const disabled = owned || !canAfford || inProgress;

          return (
            <article key={project.id} className={`card ${owned ? 'card-owned' : ''}`}>
              <div className="card-header">
                <div>
                  <h3>{project.name}</h3>
                  <p className="subdued">{project.description}</p>
                </div>
                {owned && <div className="badge">Completed</div>}
              </div>
              <div className="card-body">
                <div className="card-row">
                  <span className="label">Research Cost</span>
                  <ResourceValue resource="tech" value={formatNumber(project.techCost)} />
                </div>
                <div className="card-row">
                  <span className="label">Duration</span>
                  <ResourceValue resource="time" value={`${formatNumber(project.researchTime)}s`} />
                </div>
                <ul className="effect-list">
                  {project.effects.map((effect, index) => (
                    <li key={`${project.id}-${effect.type}-${index}`}>{describeEffect(effect)}</li>
                  ))}
                </ul>
              </div>
              <footer className="card-footer">
                <button
                  type="button"
                  className="primary"
                  disabled={disabled}
                  onClick={() => purchaseResearch(project.id)}
                >
                  {owned ? 'Completed' : queued ? 'In Progress' : 'Research'}
                </button>
                {!owned && !canAfford && <span className="warning">Need more research</span>}
                {!owned && inProgress && !queued && (
                  <span className="warning">Research queue busy</span>
                )}
              </footer>
            </article>
          );
        })}
      </div>
    </section>
  );
};
