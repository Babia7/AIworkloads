/** Immutably sets a field on one item of an array. */
export function arraySet<T, K extends keyof T>(arr: T[], idx: number, field: K, value: T[K]): T[] {
  const next = [...arr];
  next[idx] = { ...next[idx], [field]: value };
  return next;
}

/** Immutably sets a field on a nested array item. */
export function arraySetNested<T extends Record<string, any>>(
  arr: T[],
  idx: number,
  nestedKey: keyof T,
  nestedIdx: number,
  field: string,
  value: unknown
): T[] {
  const next = [...arr];
  const nested = [...(next[idx][nestedKey] as unknown[])];
  nested[nestedIdx] = { ...(nested[nestedIdx] as object), [field]: value };
  next[idx] = { ...next[idx], [nestedKey]: nested };
  return next;
}
