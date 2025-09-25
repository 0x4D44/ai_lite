import type { ReactNode } from 'react';

import type { ResourceKey } from '../icons/ResourceIcons';
import { ResourceIcon } from '../icons/ResourceIcons';

interface ResourceValueProps {
  resource: ResourceKey;
  value: ReactNode;
  className?: string;
}

export const ResourceValue = ({ resource, value, className }: ResourceValueProps) => {
  return (
    <span className={`resource-value ${className ?? ''}`.trim()}>
      <ResourceIcon resource={resource} />
      <span className="resource-value-text">{value}</span>
    </span>
  );
};
