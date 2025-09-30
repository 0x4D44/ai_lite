import { useState } from 'react';
import type { FormEvent } from 'react';

import { useGameStore } from '../state/gameStore';

export const NicknameForm = () => {
  const nickname = useGameStore((state) => state.profile.nickname);
  const setNickname = useGameStore((state) => state.setNickname);
  const [value, setValue] = useState(nickname);
  const [saved, setSaved] = useState(false);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setNickname(value.trim());
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  };

  return (
    <form className="panel" onSubmit={handleSubmit}>
      <header className="panel-header">
        <h2>Player Profile</h2>
        <p className="subdued">Choose a nickname displayed on the leaderboard.</p>
      </header>
      <div className="card-body" style={{ gap: '0.75rem' }}>
        <label className="label" htmlFor="nickname-input">
          Nickname
        </label>
        <input
          id="nickname-input"
          value={value}
          onChange={(event) => setValue(event.target.value.slice(0, 24))}
          placeholder="Enter nickname"
          className="text-input"
        />
      </div>
      <footer className="card-footer">
        <button type="submit" className="primary">
          Save Nickname
        </button>
        {saved && <span className="subdued">Saved!</span>}
      </footer>
    </form>
  );
};
