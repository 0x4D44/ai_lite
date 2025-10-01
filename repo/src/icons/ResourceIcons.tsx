import type { ResourceId } from '../data/types';

export type ResourceKey = ResourceId | 'time';

const RESOURCE_SYMBOLS: Record<ResourceKey, string> = {
  money: '$',
  tech: '🧪',
  workforce: '👥',
  power: '⚡',
  bandwidth: '📡',
  compute: '☁️',
  time: '⏳',
};

export const ResourceIcon = ({ resource, className }: { resource: ResourceKey; className?: string }) => {
  const symbol = RESOURCE_SYMBOLS[resource];
  return (
    <span className={`resource-icon resource-icon-${resource} ${className ?? ''}`.trim()} aria-hidden="true">
      {symbol}
    </span>
  );
};
