import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { usePersistedReducer } from '../hooks/usePersistedReducer';

const VERSION = '3.10';
const VERSION_KEY = 'app_version';

type CountState = { count: number };
type CountAction = { type: 'increment' } | { type: 'set'; payload: number };

const countReducer = (state: CountState, action: CountAction): CountState => {
  switch (action.type) {
    case 'increment': return { count: state.count + 1 };
    case 'set': return { count: action.payload };
    default: return state;
  }
};

const defaultState: CountState = { count: 0 };
const opts = { version: VERSION, versionKey: VERSION_KEY };

beforeEach(() => {
  localStorage.clear();
});

describe('usePersistedReducer', () => {
  it('initializes from fallback when no localStorage data exists', () => {
    const { result } = renderHook(() =>
      usePersistedReducer('test_key', countReducer, defaultState, opts)
    );
    expect(result.current[0]).toEqual({ count: 0 });
  });

  it('loads from localStorage when version matches', () => {
    localStorage.setItem(VERSION_KEY, VERSION);
    localStorage.setItem('test_key', JSON.stringify({ count: 42 }));
    const { result } = renderHook(() =>
      usePersistedReducer('test_key', countReducer, defaultState, opts)
    );
    expect(result.current[0]).toEqual({ count: 42 });
  });

  it('ignores localStorage when version does not match', () => {
    localStorage.setItem(VERSION_KEY, 'old-version');
    localStorage.setItem('test_key', JSON.stringify({ count: 42 }));
    const { result } = renderHook(() =>
      usePersistedReducer('test_key', countReducer, defaultState, opts)
    );
    expect(result.current[0]).toEqual({ count: 0 });
  });

  it('persists state to localStorage after dispatch', async () => {
    const { result } = renderHook(() =>
      usePersistedReducer('test_key', countReducer, defaultState, opts)
    );
    act(() => {
      result.current[1]({ type: 'set', payload: 7 });
    });
    // Wait for the debounce in safeSetItem (300ms)
    await new Promise(r => setTimeout(r, 350));
    const stored = localStorage.getItem('test_key');
    expect(stored).not.toBeNull();
    expect(JSON.parse(stored!)).toEqual({ count: 7 });
  });

  it('returns fallback when localStorage contains corrupted JSON', () => {
    localStorage.setItem(VERSION_KEY, VERSION);
    localStorage.setItem('test_key', '{bad json}');
    const { result } = renderHook(() =>
      usePersistedReducer('test_key', countReducer, defaultState, opts)
    );
    expect(result.current[0]).toEqual({ count: 0 });
  });
});
