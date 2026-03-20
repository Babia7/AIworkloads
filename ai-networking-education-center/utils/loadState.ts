/**
 * Safely loads state with versioning and type checking.
 *
 * Checks 'app_version' in localStorage. If it doesn't match the current code version,
 * it ignores the stored data and returns the default fallback.
 * This prevents white-screen crashes when we update the data schema.
 */
export function loadState<T>(key: string, fallback: T, version: string): T {
  try {
    const savedVersion = localStorage.getItem('app_version');
    if (savedVersion !== version) {
      return fallback;
    }
    const saved = localStorage.getItem(key);
    if (!saved) return fallback;

    const parsed = JSON.parse(saved);

    // Critical Safety Check: JSON.parse("null") returns null, which crashes map() functions
    if (parsed === null || parsed === undefined) return fallback;

    // Type Safety: If fallback is array, ensure parsed is array
    if (Array.isArray(fallback) && !Array.isArray(parsed)) return fallback;

    // Type Safety: If fallback is object (not array), ensure parsed is object
    if (
      typeof fallback === 'object' &&
      !Array.isArray(fallback) &&
      (typeof parsed !== 'object' || Array.isArray(parsed))
    )
      return fallback;

    return parsed;
  } catch (e) {
    console.warn(`Failed to load ${key}, using fallback.`, e);
    return fallback;
  }
}
