# AI Idle: Foundational Decisions Worksheet

Use this worksheet to lock in the vision and constraints before production begins. Each question is designed so you can answer inline (e.g., after the `A:` marker). Once filled, we can reference it to drive design, tooling, and scheduling decisions.

## 1. Vision & Pillars
- **Primary fantasy:** What promise does the game make to the player? `A:` That they will see the number go up, where this number is the $ amount they earn. Smarter play should reward with the number going up faster.
- **Core pillars (max 3):** What guiding principles must every feature support? `A:` Every step up in the AI stack (manual labeling -> automated pipelines -> cloud platforms -> foundation models -> autonomous agents) should be better than the last so each era feels like real progress.
- **Differentiator:** How does AI Idle stand apart from existing idle games? `A:` It doesn't - the purpose here is to learn, experiment, and build a personal idle sandbox.

## 2. Audience & Platforms
- **Target audience:** Who are you building for (demographics, motivations, idle familiarity)? `A:` Me, who is familiar with idle games.
- **Primary platform(s):** Web, mobile, desktop? Why this order? `A:` Desktop.
- **Session expectations:** How long/often should players engage actively versus idle? `A:` There should mostly be something that could actively be done to speed things up, but waits of a couple of minutes with nothing that can actively speed things up is fine.
- **Accessibility goals:** Any commitments for controls, color, language, or onboarding? `A:` No, game is just for me so this is less important.

## 3. Scope & Content Strategy
- **Initial launch scope:** What is the minimum viable slice (eras, features, achievements)? `A:` Minimum viable is just a singular working era with one or two basic features.
- **Planned content cadence:** How often do you expect to add new eras/systems post-launch? `A:` As often as you can make them
- **Live operations:** Will you run events, seasonal content, or rolling resets? `A:` No
- **Narrative depth:** Light flavor text, episodic stories, or deep lore? `A:` Light flavour text

## 4. Monetization & Pricing
- **Business model:** Free-to-play with ads/IAP, premium purchase, hybrid? `A:` There is no monetization
- **Fairness philosophy:** How do you protect against pay-to-win or paywalls? `A:` There is no monetization
- **Retention incentives:** What hooks (daily bonuses, prestige rewards) align with the model? `A:` There is no monetization

## 5. Core Mechanics & Systems
- **Primary interaction loop:** Describe the actions players repeat during active play. `A:` Buying upgrades, reallocating resources to optimize production, manually clicking to gain bonus production, handling equipment/items/set bonus.
- **Idle progression model:** How will resources accrue while offline? Any caps or decay? `A:` No caps, no penalty for closing the game vs leaving it open.
- **Prestige/reset design:** Will prestige exist, and what is the thematic justification? `A:` Eventually yes, but not in the first iteration
- **Era progression rules:** What unlocks the next AI era? `A:` Primarily a monetary goal to purchase or research the technology, but i am open to other resources being required.
- **Economy complexity:** How many resources, currencies, or upgrade tracks at launch? `A:` Lets have a few, but not too many. Resources like funding, available talent, compute capacity, and data flow. 

## 6. Technology & Tooling
- **Game engine/stack choice:** Engine, framework, or custom stack? Why? `A:` I have no preference
- **Backend needs:** Any online services, syncing, account systems required? `A:` No accounts, local data store. 
- **Build & deployment pipeline:** How will you package, deploy, and update builds? `A:` Whatever the standard is for the engine/framework you choose as best suited
- **Analytics & telemetry:** What data will you collect to tune progression? `A:` Technology research times, overall money earnt

## 7. Art, Audio & UX Direction
- **Visual identity:** Desired style (retro pixel, flat UI, illustrative)? `A:` Relatively simple, but clear
- **UI priorities:** What information must be surfaced front-and-center? `A:` Overall $, $ production rate, other resource count and production rate, overall bonuses
- **Audio strategy:** Music, SFX, voice? What mood should they set? `A:` background on-hold style music
- **Branding assets:** Logos, key art, marketing imagery requirements? `A:` Futuristic AI imagery (neon palettes, data streams, agent silhouettes)

## 8. Production & Team Structure
- **Roles & responsibilities:** Who handles design, code, art, audio, QA? `A:` You do
- **External partners:** Any contractors or marketplace assets planned? `A:`No
- **Decision cadence:** How often will you review progress and adjust scope? `A:` I will manually test frequently
- **Risk management:** Biggest unknowns and mitigation ideas? `A:` I don't know how good you are at making a game

## 9. Timeline & Milestones
- **Launch target:** Desired release window or event? `A:` ASAP
- **Milestone roadmap:** Prototype, alpha, beta dates? `A:` Depends how quickly you can code it
- **Buffer strategy:** How much slack do you build into the schedule? `A:` N/A

## 10. Community & Marketing
- **Community channels:** Where will you engage players (Discord, Reddit, etc.)? `A:` No community
- **Marketing beats:** Planned announcements, devlogs, or trailers? `A:` No
- **Feedback loops:** How will you gather and process player feedback? `A:` I will ask myself

---

Fill in each `A:` line with your answers. Once complete, share the updated file and we can start translating the decisions into design docs, technical plans, and production tasks.
