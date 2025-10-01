import { useState } from 'react';

import { useGameStore } from '../state/gameStore';

export const SettingsPanel = () => {
  const [resetting, setResetting] = useState(false);

  const handleReset = async () => {
    if (resetting) {
      return;
    }

    const confirmed = window.confirm('Reset progress? This will erase all locally saved data.');
    if (!confirmed) {
      return;
    }

    try {
      setResetting(true);
      await useGameStore.persist.clearStorage();
      useGameStore.getState().resetGame();
    } finally {
      setResetting(false);
    }
  };

  return (
    <section className="panel">
      <header className="panel-header">
        <h2>Settings</h2>
      </header>
      <div className="list">
        <button type="button" className="secondary" onClick={handleReset} disabled={resetting}>
          {resetting ? 'Resetting…' : 'Reset Progress'}
        </button>
        <p className="subdued">Clears your save from this browser and restarts the Data Labeling Frontier.</p>
      </div>
    </section>
  );
};
