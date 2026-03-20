import { describe, it, expect, beforeEach } from 'vitest';
import { loadState } from '../utils/loadState';

const VERSION = '3.10';

beforeEach(() => {
  localStorage.clear();
});

describe('loadState', () => {
  it('returns fallback when key is missing', () => {
    localStorage.setItem('app_version', VERSION);
    expect(loadState('missing_key', ['default'], VERSION)).toEqual(['default']);
  });

  it('parses and returns valid stored data', () => {
    localStorage.setItem('app_version', VERSION);
    localStorage.setItem('my_key', JSON.stringify([1, 2, 3]));
    expect(loadState('my_key', [], VERSION)).toEqual([1, 2, 3]);
  });

  it('returns fallback on version mismatch', () => {
    localStorage.setItem('app_version', 'old-version');
    localStorage.setItem('my_key', JSON.stringify([1, 2, 3]));
    expect(loadState('my_key', ['fallback'], VERSION)).toEqual(['fallback']);
  });

  it('returns fallback when stored value is null JSON', () => {
    localStorage.setItem('app_version', VERSION);
    localStorage.setItem('my_key', 'null');
    expect(loadState('my_key', ['fallback'], VERSION)).toEqual(['fallback']);
  });

  it('returns fallback when stored value is corrupted JSON', () => {
    localStorage.setItem('app_version', VERSION);
    localStorage.setItem('my_key', '{invalid json}');
    expect(loadState('my_key', ['fallback'], VERSION)).toEqual(['fallback']);
  });

  it('returns fallback when fallback is array but stored is object', () => {
    localStorage.setItem('app_version', VERSION);
    localStorage.setItem('my_key', JSON.stringify({ a: 1 }));
    expect(loadState('my_key', [], VERSION)).toEqual([]);
  });

  it('returns fallback when fallback is object but stored is array', () => {
    localStorage.setItem('app_version', VERSION);
    localStorage.setItem('my_key', JSON.stringify([1, 2]));
    expect(loadState('my_key', { a: 1 }, VERSION)).toEqual({ a: 1 });
  });
});
