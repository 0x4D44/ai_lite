const shortFormatter = new Intl.NumberFormat('en-US', {
  notation: 'compact',
  maximumFractionDigits: 2,
});

const standardFormatter = new Intl.NumberFormat('en-US', {
  maximumFractionDigits: 2,
});

const coerceNumber = (value: unknown): number => {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === 'number') {
    return 0;
  }

  if (value == null) {
    return 0;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
};

export function formatNumber(rawValue: number | null | undefined): string {
  const value = coerceNumber(rawValue);

  if (Math.abs(value) >= 1_000_000) {
    return shortFormatter.format(value);
  }

  if (Math.abs(value) >= 1_000) {
    return standardFormatter.format(value);
  }

  return value.toFixed(Math.abs(value) < 10 ? 2 : 0);
}

export function formatRate(value: number | null | undefined): string {
  return `${formatNumber(value)}/s`;
}

export function formatCurrency(value: number | null | undefined): string {
  return `$${formatNumber(value)}`;
}
