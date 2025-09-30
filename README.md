# Telecom Idle

Telecom Idle is an incremental idle game about riding the evolution of communications technology. Each era introduces new production methods that outperform the previous, letting the money total climb faster when you make smart choices about upgrades and staffing.

## Current Status

- ✅ Foundational design decisions captured in `FOUNDATION_DECISIONS.md`
- ✅ High-level MVP and technical plan in `docs/GAME_DESIGN_PLAN.md`
- ✅ React + TypeScript + Vite project with Courier, Telegraph, Telephone, and Digital Switching eras implemented
- 🚧 Upcoming: additional eras beyond Telegraph, prestige loop, balancing passes, and polish

## Running the Project

```bash
npm install
npm run dev
```

This launches the Vite dev server (defaults to `http://localhost:5173`). The game auto-saves to `localStorage` every tick, so progress persists between reloads.

## Project Structure

- `src/data/` – Declarative era/unit/upgrade definitions
- `src/state/` – Zustand store, simulation loop, derived selectors
- `src/components/` – UI panels for resources, units, upgrades, and progression
- `docs/` – Design documentation and future planning notes

## Gameplay Outline

- Earn money passively from unlocked era units (Courier, Telegraph, Telephone, Digital) and spend it on more units or upgrades.
- Manage workforce capacity: every unit consumes staff, and upgrades can expand the cap.
- Trigger manual boosts to temporarily double income while active.
- Build toward the Telegraph era by meeting money and tech research goals, then purchase the unlock.
- Decommission older units to reclaim workforce (and a partial refund) if they no longer fit your strategy.
- Generate and manage bandwidth, a new resource gating later-era research and unlocks.
- Activate the bandwidth amplifier to trade bandwidth per second for faster tech research.
- Explore the Cloud Native era where compute credits and pod orchestration unlock deep strategic choices.
- Manage compute credits and deploy cloud pods to customize global multipliers.

## Deploying to GitHub Pages

This repo is prepped to publish at `https://<your-username>.github.io/telecom_idle/` via GitHub Pages.

1. Push the latest changes to `main`.
2. In GitHub, go to **Settings → Pages** and choose **GitHub Actions** as the source.
3. The `Deploy to GitHub Pages` workflow (under `.github/workflows/deploy.yml`) builds the Vite project and uploads `dist/` automatically. Manually trigger it once via **Actions → Deploy to GitHub Pages → Run workflow** if needed.
4. When the workflow finishes, the published URL appears in the workflow summary and on the Pages settings screen.

The Vite config automatically uses the `/telecom_idle/` base path during CI builds, so no additional configuration is required for assets to resolve correctly.

## Leaderboard Backend

The in-game leaderboard expects a REST endpoint with two routes:

```
GET  /leaderboard?view=money|cloud_time  -> returns [{ nickname, score, recordedAt }]
POST /submit                            -> accepts { nickname, totalMoney, cloudTimeSeconds }
```

You can host this cheaply (often free) on Cloudflare Workers with KV/D1 storage. Once deployed, expose the base URL to the client by setting an environment variable:

```
VITE_LEADERBOARD_ENDPOINT=https://your-worker.example.workers.dev
```

Without this value the leaderboard UI still appears, but it remains in read-only/demo mode and does not attempt network calls.

### Example: Cloudflare Worker

You can scaffold a very small Worker using [Workers KV](https://developers.cloudflare.com/workers/wrangler/workers-kv/) to persist scoreboard data.

```ts
// worker.ts
import { Env } from './env';

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    if (request.method === 'POST' && url.pathname === '/submit') {
      const body = await request.json();
      const entries = await getEntries(env);
      entries.push({
        nickname: body.nickname ?? 'Anonymous',
        scoreMoney: body.totalMoney ?? 0,
        scoreCloud: body.cloudTimeSeconds ?? null,
        recordedAt: new Date().toISOString(),
      });
      await env.LEADERBOARD.put('entries', JSON.stringify(entries));
      return new Response('ok');
    }

    if (request.method === 'GET' && url.pathname === '/leaderboard') {
      const view = url.searchParams.get('view') === 'cloud_time' ? 'cloud_time' : 'money';
      const entries = await getEntries(env);
      const sorted = entries
        .filter((entry) => (view === 'money' ? true : entry.scoreCloud !== null))
        .sort((a, b) =>
          view === 'money'
            ? b.scoreMoney - a.scoreMoney
            : (a.scoreCloud ?? Infinity) - (b.scoreCloud ?? Infinity),
        )
        .slice(0, 50)
        .map((entry) => ({
          nickname: entry.nickname,
          score: view === 'money' ? entry.scoreMoney : entry.scoreCloud,
          recordedAt: entry.recordedAt,
        }));
      return Response.json(sorted);
    }

    return new Response('Not Found', { status: 404 });
  },
};

async function getEntries(env: Env) {
  const stored = await env.LEADERBOARD.get('entries');
  return stored ? (JSON.parse(stored) as any[]) : [];
}
```

`wrangler.toml` would bind a KV namespace named `LEADERBOARD`. Deploy the worker, grab the public URL, and set `VITE_LEADERBOARD_ENDPOINT` accordingly.
- Invest tech into research projects for permanent economy-wide bonuses.

## Next Steps

1. Continue tuning Courier/Telegraph balance across different play styles.
2. Design and implement the next era in the progression ladder.
3. Introduce basic audio loop and visual feedback for major actions.
4. Layer in automated tests for store logic and offline catch-up.

Feel free to edit `FOUNDATION_DECISIONS.md` or `docs/GAME_DESIGN_PLAN.md` as the vision evolves. Open issues or TODOs can live in a future `docs/roadmap.md` once priorities firm up.
