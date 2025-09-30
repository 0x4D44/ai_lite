export type LeaderboardView = 'money' | 'cloud_time';

export interface LeaderboardEntry {
  nickname: string;
  score: number;
  recordedAt: string;
}

export interface SubmitPayload {
  nickname: string;
  totalMoney: number;
  cloudTimeSeconds: number | null;
}

const API_BASE = import.meta.env.VITE_LEADERBOARD_ENDPOINT ?? '';

const isConfigured = () => API_BASE.trim().length > 0;

export const leaderboardService = {
  isConfigured,
  async fetch(view: LeaderboardView): Promise<LeaderboardEntry[]> {
    if (!isConfigured()) {
      return [];
    }

    const url = `${API_BASE.replace(/\/$/, '')}/leaderboard?view=${view}`;
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error(`Failed to load leaderboard: ${response.status}`);
      }
      const data = (await response.json()) as LeaderboardEntry[];
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error('Leaderboard fetch error', error);
      return [];
    }
  },
  async submit(payload: SubmitPayload): Promise<boolean> {
    if (!isConfigured()) {
      return false;
    }
    try {
      const response = await fetch(`${API_BASE.replace(/\/$/, '')}/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      return response.ok;
    } catch (error) {
      console.error('Leaderboard submit error', error);
      return false;
    }
  },
};
