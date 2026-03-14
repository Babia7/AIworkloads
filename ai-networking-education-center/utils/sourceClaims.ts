import type { SourceLinkedValue } from '../types';

export const claim = (
  value: string,
  source: Omit<SourceLinkedValue, 'value' | 'claimId'>,
  claimId?: string
): SourceLinkedValue => ({
  value,
  ...(claimId ? { claimId } : {}),
  ...source,
});

export const claimText = (value: string | SourceLinkedValue): string =>
  typeof value === 'string' ? value : value.value;

export const hasSourceMetadata = (value: string | SourceLinkedValue): value is SourceLinkedValue =>
  typeof value !== 'string';
