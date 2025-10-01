import { formatNumber } from '../utils/format';
import { ResourceValue } from './ResourceValue';
import { useGameStore } from '../state/gameStore';

const AMPLIFIER_TIERS = [
  { id: 'off', label: 'Off', cost: 0, bonus: 0 },
  { id: 'low', label: '5 /s -> +15% research', cost: 5, bonus: 0.15 },
  { id: 'medium', label: '25 /s -> +35% research', cost: 25, bonus: 0.35 },
  { id: 'high', label: '100 /s -> +75% research', cost: 100, bonus: 0.75 },
] as const;

type AmplifierTierId = (typeof AMPLIFIER_TIERS)[number]['id'];

export const BandwidthBoostPanel = () => {
  const bandwidth = useGameStore((state) => state.resources.bandwidth ?? 0);
  const production = useGameStore((state) => state.productionRates.bandwidth ?? 0);
  const boost = useGameStore((state) => state.bandwidthBoost ?? { tier: 'off' });
  const setTier = useGameStore((state) => state.setBandwidthBoostTier);

  const activeTier = AMPLIFIER_TIERS.find((tier) => tier.id === boost.tier) ?? AMPLIFIER_TIERS[0];
  const canSustain = activeTier.cost === 0 || production >= activeTier.cost;

  const handleSelect = (tierId: AmplifierTierId) => {
    setTier(tierId);
  };

  return (
    <section className="panel">
      <header className="panel-header">
        <h2>Data Flow Accelerator</h2>
        <p className="subdued">Trade data flow reserves for accelerated research gains.</p>
      </header>
      <div className="card-body">
        <div className="card-row">
          <span className="label">Current Tier</span>
          <span>{activeTier.label}</span>
        </div>
        <div className="card-row">
          <span className="label">Data Flow Stock</span>
          <ResourceValue resource="bandwidth" value={formatNumber(bandwidth)} />
        </div>
        <div className="card-row">
          <span className="label">Generation</span>
          <ResourceValue resource="bandwidth" value={`${formatNumber(production)}/s`} />
        </div>
      </div>
      <footer className="card-footer" style={{ flexWrap: 'wrap', gap: '0.5rem' }}>
        {AMPLIFIER_TIERS.map((tier) => {
          const isActive = tier.id === boost.tier;
          const disabled = tier.id !== 'off' && bandwidth <= 0;
          return (
            <button
              key={tier.id}
              type="button"
              className={`secondary ${isActive ? 'chip chip-active' : ''}`}
              onClick={() => handleSelect(tier.id)}
              disabled={disabled}
            >
              {tier.label}
            </button>
          );
        })}
        {!canSustain && activeTier.cost > 0 && (
          <span className="warning">Data flow generation below upkeep; reserves will drain</span>
        )}
        {activeTier.cost > 0 && bandwidth <= 0 && (
          <span className="warning">Need data flow available to start</span>
        )}
      </footer>
    </section>
  );
};