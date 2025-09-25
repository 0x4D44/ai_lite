# Telecom Idle – Design & Technical Plan

This document translates the foundational decisions into a concrete plan for the first playable version of Telecom Idle. It emphasizes rapid iteration, clarity, and a lightweight toolchain suitable for a solo developer collaborating with Codex.

## 1. Project Overview
- **Audience:** Solely you; no commercial pressure, prioritize fun and learning.
- **Objective:** Deliver a desktop-playable idle game with satisfying number growth and a telecom-themed progression ladder.
- **Design Philosophy:** Keep scope intentionally narrow, reinforce the feeling of advancement with each tech era, and bias toward systems that are easy to expand later.

## 2. Experience Goals
1. **"Number goes up" satisfaction:** Money growth should be visible, accelerating through smart decisions.
2. **Clear era progress:** Every new telecom technology must outclass the prior one and visually feel like a leap.
3. **Active choices matter:** Players can always tweak something—manual boosts, allocation changes, or upgrades—to optimize throughput even while idle gain persists.

## 3. MVP Definition
The minimum playable slice should include:
- One complete era (Courier Era) with at least two production structures (e.g., *Hand Courier* and *Horse Relay*).
- Core resources: `Money ($)`, `Workforce`, `Power` (introduced later in eras but scaffold now), and `Tech Progress` for unlocks.
- Actions: purchase/upgrade production nodes, reallocate workforce, manual click booster, and at least one multiplier upgrade.
- Basic UI showing totals and per-second rates for each resource, plus upgrade panels.
- Offline/closed-window accumulation with no penalties.
- Local save/load to resume progress.

Stretch (post-MVP) features include additional eras, prestige loop, equipment sets, and richer automation.

## 4. Core Gameplay Loops
### 4.1 Moment-to-moment loop
1. Observe resource totals and rates in dashboard.
2. Spend money on production units or upgrades.
3. Reassign workforce or toggle modifiers to optimize output.
4. Trigger manual "Boost Signal" clicker for temporary production spike with a short cooldown.

### 4.2 Short-term progression loop
1. Accumulate `Money` and `Tech Progress`.
2. Unlock new buildings/tools in the current era.
3. Research the next era once the monetary requirement is met (and optional secondary resource threshold).
4. Transition to the next era; newly unlocked content immediately surpasses the previous era’s efficiency.

### 4.3 Long-term loop (future roadmap)
- Introduce prestige/reset via "Infrastructure Overhaul" that trades current progress for era-wide multipliers, once multiple eras exist.
- Add events or modifiers (even if only for personal experimentation) to explore balance tuning.

## 5. Systems Breakdown
### 5.1 Resources
- **Money ($):** Primary score and spending currency. Produced by all operational units.
- **Workforce:** Assignable workers. Each production node consumes workforce capacity; upgrades can increase efficiency per worker.
- **Power:** Reserved for later eras but define early to keep simulation flexible. Acts as a gating utility resource.
- **Tech Progress:** Represents research toward next unlock. Generated slowly by dedicated buildings or upgrades.

### 5.2 Production Units
- Defined via data: cost curve, production rate, workforce requirement, optional power usage.
- Example Courier Era units:
  - `Hand Courier`: low cost, baseline worker usage.
  - `Horse Relay`: higher cost, faster delivery, maybe small tech gain.

### 5.3 Upgrades & Modifiers
- Permanent upgrades: purchase multiplicative or additive boosts tied to units/resources.
- Manual boost ability: clickable button applying a temporary multiplier with cooldown (keeps active engagement available).
- Later: equipment loadouts or set bonuses (design hooks reserved, not in MVP).

### 5.4 Era Progression
- Each era defined by JSON config: name, theme, unlock cost, flavor text, units, upgrades.
- Transition triggers: pay cost; optionally require certain workforce or tech milestones.
- Post-transition, prior era units remain but become less efficient whereas new units dominate throughput—ensures feeling of progress.

### 5.5 Offline Simulation
- On load, compute elapsed real time since last save and apply passive gains using capped tick simulation (e.g., simulate in chunks of 1 minute to avoid numerical instability).
- Since no decay/caps, ensure formula respects upgrade multipliers and maximum throughput.

### 5.6 Save System
- Auto-save to `localStorage` (browser) every N seconds and on key actions.
- Provide manual save/export JSON button for safety (nice-to-have).

## 6. Technical Architecture
### 6.1 Stack Selection
- **Frontend Framework:** React + TypeScript for component-based UI, familiarity, and strong tooling.
- **Build Tool:** Vite for fast dev server and production bundling.
- **State Management:** Zustand for lightweight, ergonomic global state with actions (alternative: use React Context if desired). Zustand simplifies simulation loop integrations.
- **Styling:** CSS modules or Tailwind (choose during implementation). Recommend Tailwind for rapid iteration if you're comfortable; otherwise, simple CSS with utility classes.
- **Charts/Visualization:** Basic text/number display initially; leave hooks for sparklines later.
- **Persistence:** Zustand persistence middleware to sync with `localStorage`.

### 6.2 Project Structure (proposed)
```
telecom_idle/
├─ src/
│  ├─ app/
│  │  ├─ App.tsx
│  │  └─ routes/
│  ├─ components/
│  ├─ features/
│  │  ├─ dashboard/
│  │  ├─ production/
│  │  └─ upgrades/
│  ├─ state/
│  │  ├─ store.ts
│  │  ├─ simulation.ts
│  │  └─ persistence.ts
│  └─ data/
│     └─ eras/
│        └─ courier-era.json
├─ docs/
│  └─ GAME_DESIGN_PLAN.md
└─ tests/
```
- Keep era definitions in structured JSON/TypeScript modules for easy editing.
- Simulation runs in a central loop (e.g., `requestAnimationFrame` or `setInterval`) updating resource totals.

### 6.3 Tooling & Quality
- **Testing:** Vitest + React Testing Library for unit/integration tests (start with simulation math and store logic).
- **Linting/Formatting:** ESLint + Prettier with TypeScript config.
- **Type Safety:** Strict TypeScript mode to prevent runtime issues.

## 7. Milestone Plan
1. **Project Bootstrap**
   - Initialize Vite + React + TS project structure.
   - Configure ESLint, Prettier, and basic CI (GitHub Actions optional for personal project).
2. **Core Simulation Engine**
   - Implement resource store, time step simulation, and manual boost action stub.
   - Hardcode Courier Era data for first iteration.
3. **MVP UI Layer**
   - Build dashboard showing totals, per-second rates, and manual boost button.
   - Create panels for purchasing units and upgrades with simple styling.
4. **Persistence & Offline Gains**
   - Add localStorage save/load and offline time catch-up on boot.
5. **Balance & Polish**
   - Tune numbers for Courier Era to ensure satisfying pacing (~5–15 minutes for completion).
   - Add basic audio loop and feedback (button highlights, etc.).
6. **Post-MVP Extensions**
   - Add Telegraph Era (or whichever next) using same data pipeline.
   - Introduce prestige concept once at least three eras exist.

## 8. Risks & Mitigations
- **Balance Complexity:** Idle games require careful pacing. Mitigate by building spreadsheet-like tuning tables and writing small simulation scripts/tests.
- **Feature Creep:** Resist the urge to add new systems until MVP era feels tight. Use this plan as scope guard.
- **Tool Familiarity:** If React/Tailwind feels heavy, switch to plain TypeScript + DOM quickly—decision should be made during bootstrap.
- **Codex Reliability:** Maintain iterative checkpoints (commit early, test frequently) so adjustments can happen quickly if Codex output needs tweaks.

## 9. Immediate Next Actions
1. Confirm acceptance of React + TypeScript + Vite + Zustand stack (or request alternative).
2. Translate Courier Era spec into initial data tables: production nodes, costs, outputs.
3. Scaffold the project using Vite and commit baseline.

Once you sign off on the plan, we can proceed with project scaffolding and begin implementing the MVP milestone steps.
