import { useEffect, useState } from 'react';

import { researchProjects } from '../data/researchProjects';
import { selectResearch, useGameStore } from '../state/gameStore';
import { formatNumber } from '../utils/format';
import { ResourceValue } from './ResourceValue';

const getProjectById = (id: string | null) => researchProjects.find((project) => project.id === id) ?? null;

export const ResearchQueuePanel = () => {
  const queue = useGameStore((state) => state.researchQueue);
  const research = useGameStore(selectResearch);
  const cancelResearch = useGameStore((state) => state.cancelResearch);

  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(Date.now());
    }, 250);
    return () => clearInterval(timer);
  }, []);

  if (!queue) {
    return null;
  }

  const project = getProjectById(queue.id);
  if (!project) {
    return null;
  }

  const totalDuration = project.researchTime * 1000;
  const elapsed = Math.max(0, Math.min(totalDuration, now - queue.startedAt));
  const progress = Math.min(1, elapsed / totalDuration);
  const remainingMs = Math.max(0, queue.completesAt - now);
  const remainingSeconds = Math.ceil(remainingMs / 1000);
  const progressPercentage = Math.round(progress * 100);

  return (
    <section className="panel">
      <header className="panel-header">
        <h2>Ongoing Research</h2>
        <p className="subdued">{project.name}</p>
      </header>
      <div className="progress-item">
        <div className="progress-header">
          <span>Status</span>
          <span className="progress-meta">
            <span className="progress-percent">{progressPercentage}%</span>
            {research[project.id] ? (
              <span>Completed</span>
            ) : remainingSeconds <= 0 ? (
              <span>Finishing…</span>
            ) : (
              <ResourceValue resource="time" value={`${formatNumber(remainingSeconds)}s remaining`} />
            )}
          </span>
        </div>
        <div className="progress-bar">
          <div className="progress-bar-fill" style={{ width: `${progress * 100}%` }} />
        </div>
      </div>
      <footer className="card-footer">
        <button type="button" className="danger" onClick={() => cancelResearch()}>
          Cancel Research
        </button>
      </footer>
    </section>
  );
};
