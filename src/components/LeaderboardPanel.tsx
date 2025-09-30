import { useEffect, useState } from 'react';

import type { LeaderboardEntry, LeaderboardView } from '../services/leaderboardService';
import { leaderboardService } from '../services/leaderboardService';
import { formatNumber } from '../utils/format';
import { useGameStore } from '../state/gameStore';
import { selectProfile, selectStatistics } from '../state/gameStore';

const VIEW_OPTIONS: { id: LeaderboardView; label: string }[] = [
  { id: 'money', label: 'Total Money' },
  { id: 'cloud_time', label: 'Fastest Cloud Native Unlock' },
];

const formatScore = (view: LeaderboardView, score: number) => {
  if (view === 'money') {
    return `$${formatNumber(score)}`;
  }
  const minutes = Math.floor(score / 60);
  const seconds = Math.round(score % 60);
  return `${minutes}m ${seconds}s`;
};

export const LeaderboardPanel = () => {
  const nickname = useGameStore(selectProfile).nickname;
  const statistics = useGameStore(selectStatistics);
  const [view, setView] = useState<LeaderboardView>('money');
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const configured = leaderboardService.isConfigured();

  const reload = async (selectedView: LeaderboardView) => {
    if (!configured) {
      return;
    }
    setLoading(true);
    setError(null);
    const data = await leaderboardService.fetch(selectedView);
    setEntries(data);
    setLoading(false);
  };

  useEffect(() => {
    if (configured) {
      reload(view).catch((err) => setError(String(err)));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [view, configured]);

  const handleSubmit = async () => {
    if (!configured) {
      setMessage('Leaderboard endpoint not configured.');
      return;
    }
    if (!nickname.trim()) {
      setMessage('Set a nickname first.');
      return;
    }

    const payload = {
      nickname: nickname.trim(),
      totalMoney: statistics.totalMoneyEarned,
      cloudTimeSeconds: statistics.cloudNativeUnlockedAt
        ? Math.round((statistics.cloudNativeUnlockedAt - statistics.gameStartedAt) / 1000)
        : null,
    };

    const ok = await leaderboardService.submit(payload);
    if (ok) {
      setMessage('Score submitted!');
      reload(view);
    } else {
      setMessage('Submission failed. Try again later.');
    }
  };

  return (
    <section className="panel">
      <header className="panel-header">
        <h2>Leaderboard</h2>
        <p className="subdued">
          Compare total earnings or speedrun the Cloud Native unlock. Submit a score once you’re ready.
        </p>
      </header>
      {!configured && (
        <div className="warning">
          Leaderboard endpoint not configured. Set `VITE_LEADERBOARD_ENDPOINT` to enable online scores.
        </div>
      )}
      <div className="card-body" style={{ gap: '0.75rem' }}>
        <div className="tab-bar" style={{ flexWrap: 'wrap' }}>
          {VIEW_OPTIONS.map((option) => (
            <button
              key={option.id}
              type="button"
              className={`tab-button ${view === option.id ? 'tab-active' : ''}`}
              onClick={() => setView(option.id)}
            >
              {option.label}
            </button>
          ))}
        </div>
        <div className="card-row">
          <span className="label">Your Nickname</span>
          <span>{nickname || 'Set a nickname below'}</span>
        </div>
        <div className="card-row">
          <span className="label">Total Money Earned</span>
          <span>{`$${formatNumber(statistics.totalMoneyEarned)}`}</span>
        </div>
        <div className="card-row">
          <span className="label">Cloud Native Unlock</span>
          <span>
            {statistics.cloudNativeUnlockedAt
              ? formatScore(
                  'cloud_time',
                  (statistics.cloudNativeUnlockedAt - statistics.gameStartedAt) / 1000,
                )
              : 'Not reached yet'}
          </span>
        </div>
      </div>
      <footer className="card-footer">
        <button type="button" className="primary" onClick={handleSubmit}>
          Submit Score
        </button>
        {message && <span className="subdued">{message}</span>}
      </footer>
      <div className="list" style={{ marginTop: '1rem' }}>
        {loading && <span className="subdued">Loading leaderboard…</span>}
        {error && <span className="warning">{error}</span>}
        {!loading && entries.length === 0 && configured && <span className="subdued">No scores yet.</span>}
        {!loading &&
          entries.map((entry, index) => (
            <article key={`${entry.nickname}-${entry.recordedAt}-${index}`} className="card">
              <div className="card-header">
                <div>
                  <h3>{entry.nickname || 'Anonymous'}</h3>
                  <p className="subdued">{new Date(entry.recordedAt).toLocaleString()}</p>
                </div>
                <div className="badge badge-fixed">#{index + 1}</div>
              </div>
              <div className="card-body">
                <div className="card-row">
                  <span className="label">Score</span>
                  <span>{formatScore(view, entry.score)}</span>
                </div>
              </div>
            </article>
          ))}
      </div>
    </section>
  );
};
