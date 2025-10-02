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
import { LeaderboardPanel } from './components/LeaderboardPanel';
import { NicknameForm } from './components/NicknameForm';
import { selectCurrentEra, useGameStore } from './state/gameStore';
import { useGameLoop } from './state/useGameLoop';

type MainTab = 'production' | 'research' | 'accelerator' | 'pods' | 'leaderboard' | 'settings';

function App() {
  useGameLoop();
  const era = useGameStore(selectCurrentEra);
  const [activeTab, setActiveTab] = useState<MainTab>('production');

  const hasAccelerator = useGameStore((state) => state.unlockedEraIds.includes('digital'));
  const hasPods = useGameStore((state) => state.unlockedEraIds.includes('cloud-native'));

  return (
    <div className="app">
      <header className="app-header">
        <h1>AI Idle</h1>
        <p className="subdued">{era.flavorText}</p>
      </header>
      <main className="app-content">
        <section className="app-column app-column--sidebar">
          <ResourceDashboard />
          <div className="utility-grid">
            <ManualBoostButton />
            <EraProgress />
          </div>
        </section>
        <section className="app-column app-column--main">
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
            {hasAccelerator && (
              <button
                type="button"
                className={`tab-button ${activeTab === 'accelerator' ? 'tab-active' : ''}`}
                onClick={() => setActiveTab('accelerator')}
              >
                Accelerator
              </button>
            )}
            {hasPods && (
              <button
                type="button"
                className={`tab-button ${activeTab === 'pods' ? 'tab-active' : ''}`}
                onClick={() => setActiveTab('pods')}
              >
                Agent Pods
              </button>
            )}
            <button
              type="button"
              className={`tab-button ${activeTab === 'leaderboard' ? 'tab-active' : ''}`}
              onClick={() => setActiveTab('leaderboard')}
            >
              Leaderboard
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
              </div>
            </div>
          ) : activeTab === 'research' ? (
            <div className="tab-panels">
              <div className="column-main">
                <ResearchQueuePanel />
                <ResearchPanel />
              </div>
              <div className="column-side" />
            </div>
          ) : activeTab === 'accelerator' ? (
            <div className="tab-panels">
              <div className="column-main">
                <BandwidthBoostPanel />
              </div>
              <div className="column-side" />
            </div>
          ) : activeTab === 'pods' ? (
            <div className="tab-panels">
              <div className="column-main">
                <PodPanel />
              </div>
              <div className="column-side" />
            </div>
          ) : activeTab === 'leaderboard' ? (
            <div className="tab-panels">
              <div className="column-main">
                <NicknameForm />
                <LeaderboardPanel />
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
        </section>
      </main>
    </div>
  );
}

export default App;