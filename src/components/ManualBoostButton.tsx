import { useEffect, useState } from 'react';

import { selectManualBoost, useGameStore } from '../state/gameStore';

const formatCountdown = (seconds: number): string => `${seconds}s`;

export const ManualBoostButton = () => {
  const manualBoost = useGameStore(selectManualBoost);
  const activate = useGameStore((state) => state.activateManualBoost);
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(Date.now());
    }, 500);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const isActive = manualBoost.activeUntil > now;
  const inCooldown = manualBoost.cooldownUntil > now && !isActive;
  const activeRemaining = isActive ? Math.max(0, Math.ceil((manualBoost.activeUntil - now) / 1000)) : 0;
  const cooldownRemaining = inCooldown ? Math.max(0, Math.ceil((manualBoost.cooldownUntil - now) / 1000)) : 0;

  let statusText = 'Ready';
  if (isActive) {
    statusText = `Sprint active: ${formatCountdown(activeRemaining)}`;
  } else if (inCooldown) {
    statusText = `Cooldown: ${formatCountdown(cooldownRemaining)}`;
  }

  return (
    <section className="panel">
      <header className="panel-header">
        <h2>Hackathon Sprint</h2>
      </header>
      <div className="boost-card">
        <p className="subdued">Mobilize the org for a short burst of production momentum.</p>
        <button
          type="button"
          className={`primary large ${isActive ? 'active' : ''}`}
          onClick={() => activate()}
          disabled={isActive || inCooldown}
        >
          Launch Sprint (x{manualBoost.multiplier} for {manualBoost.duration}s)
        </button>
        <p className="boost-status">{statusText}</p>
      </div>
    </section>
  );
};