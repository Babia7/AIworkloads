import { useEffect, useReducer, type Reducer } from 'react';
import { safeSetItem } from '../utils/safeStorage';

interface PersistedReducerOptions {
  version: string;
  versionKey?: string;
}

const safeLoadState = <T,>(key: string, fallback: T, version: string, versionKey: string): T => {
  try {
    const savedVersion = localStorage.getItem(versionKey);
    if (savedVersion !== version) {
      return fallback;
    }

    const saved = localStorage.getItem(key);
    if (!saved) return fallback;

    const parsed = JSON.parse(saved);

    if (parsed === null || parsed === undefined) return fallback;

    if (Array.isArray(fallback) && !Array.isArray(parsed)) return fallback;

    if (
      typeof fallback === 'object' &&
      fallback !== null &&
      !Array.isArray(fallback) &&
      (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed))
    ) {
      return fallback;
    }

    return parsed as T;
  } catch (error) {
    console.warn(`Failed to load persisted reducer key "${key}", using fallback.`, error);
    return fallback;
  }
};

export const usePersistedReducer = <TState, TAction>(
  key: string,
  reducer: Reducer<TState, TAction>,
  initialState: TState,
  options: PersistedReducerOptions
) => {
  const { version, versionKey = 'app_version' } = options;

  const [state, dispatch] = useReducer(
    reducer,
    initialState,
    (defaultState) => safeLoadState<TState>(key, defaultState, version, versionKey)
  );

  useEffect(() => {
    safeSetItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, dispatch] as const;
};
