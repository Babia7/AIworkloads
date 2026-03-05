/**
 * Returns the URL only if it uses the https: scheme or is a same-page anchor.
 * Any other scheme (javascript:, data:, http:, etc.) returns an empty string
 * so that it is safe to use directly in an href attribute.
 */
export function sanitizeUrl(url: string | undefined | null): string {
  if (!url) return '';
  // Allow same-page anchors
  if (url.startsWith('#')) return url;
  try {
    const parsed = new URL(url);
    if (parsed.protocol === 'https:') return url;
  } catch {
    // Not a valid absolute URL — treat as empty
  }
  return '';
}
