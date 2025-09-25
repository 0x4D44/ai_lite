import './App.css';

import { useState } from 'react';

import { EraProgress } from './components/EraProgress';
import { ManualBoostButton } from './components/ManualBoostButton';
import { ResourceDashboard } from './components/ResourceDashboard';
import { UnitPanel } from './components/UnitPanel';
import { UpgradePanel } from './components/UpgradePanel';
import { SettingsPanel } from './components/SettingsPanel';
import { ResearchPanel } from './components/ResearchPanel';
import { ResearchQueuePanel } from './components/ResearchQueuePanel';
import { BandwidthBoostPanel } from './components/BandwidthBoostPanel';
import { PodPanel } from './components/PodPanel';
import { selectCurrentEra, useGameStore } from './state/gameStore';
import { useGameLoop } from './state/useGameLoop';

type MainTab = 'production' | 'research' | 'settings';

function App() {
  useGameLoop();
  const era = useGameStore(selectCurrentEra);
  const [activeTab, setActiveTab] = useState<MainTab>('production');

  return (
    <div className="app">
      <header className="app-header">
        <h1>Telecom Idle</h1>
        <p className="subdued">{era.flavorText}</p>
      </header>
      <main className="app-content">
        <ResourceDashboard />
        <ManualBoostButton />
        <section className="tabbed-content">
          <nav className="tab-bar">
            <button
              type="button"
              className={`tab-button ${activeTab === 'production' ? 'tab-active' : ''}`}
              onClick={() => setActiveTab('production')}
            >
              Production
            </button>
            <button
              type="button"
              className={`tab-button ${activeTab === 'research' ? 'tab-active' : ''}`}
              onClick={() => setActiveTab('research')}
            >
              Research
            </button>
            <button
              type="button"
              className={`tab-button ${activeTab === 'settings' ? 'tab-active' : ''}`}
              onClick={() => setActiveTab('settings')}
            >
              Settings
            </button>
          </nav>
          {activeTab === 'production' ? (
            <div className="tab-panels">
              <div className="column-main">
                <UnitPanel />
              </div>
              <div className="column-side">
                <UpgradePanel />
                <EraProgress />
              </div>
            </div>
          ) : activeTab === 'research' ? (
            <div className="tab-panels">
              <div className="column-main">
                <ResearchQueuePanel />
                <BandwidthBoostPanel />
                <PodPanel />
                <ResearchPanel />
              </div>
              <div className="column-side" />
            </div>
          ) : (
            <div className="tab-panels">
              <div className="column-main">
                <SettingsPanel />
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
