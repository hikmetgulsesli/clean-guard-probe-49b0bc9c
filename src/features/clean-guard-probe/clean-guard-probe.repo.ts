/**
 * Clean Guard Probe — persistence adapter.
 *
 * The product is a tiny single-page utility; persistence covers exactly one
 * piece of user-owned preference (the ready/paused toggle) so the choice
 * survives a reload. Every read/write is wrapped in try/catch so corrupted
 * JSON or unavailable storage surfaces as `recovery` / `reason` instead of
 * crashing the app shell.
 *
 * No React imports here on purpose — the repo is consumed by the store and
 * by direct unit callers, and `createMemoryBackend()` lets tests inject a
 * Map-backed stand-in for localStorage.
 */

import {
  DEFAULT_PREFERENCE,
  PREFERENCE_STORAGE_KEY,
  type CleanGuardProbePreference,
} from './clean-guard-probe.types';

export interface PersistenceBackend {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

function resolveBackend(): PersistenceBackend | null {
  if (typeof globalThis === 'undefined') return null;
  const candidate = (globalThis as { localStorage?: PersistenceBackend })
    .localStorage;
  if (!candidate) return null;
  if (typeof candidate.getItem !== 'function') return null;
  if (typeof candidate.setItem !== 'function') return null;
  if (typeof candidate.removeItem !== 'function') return null;
  return candidate;
}

function isPreferenceShape(value: unknown): value is CleanGuardProbePreference {
  if (!value || typeof value !== 'object') return false;
  const record = value as { ready?: unknown };
  return typeof record.ready === 'boolean';
}

export type PreferenceRecovery = 'none' | 'unavailable' | 'corrupted';

export interface PreferenceLoadResult {
  preference: CleanGuardProbePreference;
  recovery: PreferenceRecovery;
  raw: string | null;
}

/**
 * Read the persisted preference.
 *
 *  - 'none'        → preference was loaded successfully (or storage is
 *                    empty so there was nothing to read).
 *  - 'unavailable' → storage is missing; the absence is expected (private
 *                    browsing, SSR-ish jsdom test env). Default preference
 *                    is returned.
 *  - 'corrupted'   → stored JSON was missing or malformed. The bad value
 *                    is dropped so future writes succeed; default
 *                    preference is returned.
 */
export function loadPreference(
  backend: PersistenceBackend | null = resolveBackend(),
): PreferenceLoadResult {
  if (!backend) {
    return {
      preference: { ...DEFAULT_PREFERENCE },
      recovery: 'unavailable',
      raw: null,
    };
  }

  let raw: string | null = null;
  try {
    raw = backend.getItem(PREFERENCE_STORAGE_KEY);
  } catch {
    return {
      preference: { ...DEFAULT_PREFERENCE },
      recovery: 'unavailable',
      raw: null,
    };
  }

  if (raw === null || raw === '') {
    return {
      preference: { ...DEFAULT_PREFERENCE },
      recovery: 'none',
      raw,
    };
  }

  try {
    const parsed: unknown = JSON.parse(raw);
    if (isPreferenceShape(parsed)) {
      return { preference: { ready: parsed.ready }, recovery: 'none', raw };
    }
  } catch {
    // fall through to recovery path below
  }

  try {
    backend.removeItem(PREFERENCE_STORAGE_KEY);
  } catch {
    // best effort cleanup
  }
  return {
    preference: { ...DEFAULT_PREFERENCE },
    recovery: 'corrupted',
    raw,
  };
}

export interface PreferencePersistResult {
  persisted: boolean;
  reason?: 'unavailable' | 'quota' | 'serialization';
}

/**
 * Persist the preference. Returns a structured failure instead of throwing
 * so the store can surface quota / availability issues onto `lastError`.
 */
export function savePreference(
  preference: CleanGuardProbePreference,
  backend: PersistenceBackend | null = resolveBackend(),
): PreferencePersistResult {
  if (!backend) {
    return { persisted: false, reason: 'unavailable' };
  }

  let payload: string;
  try {
    payload = JSON.stringify(preference);
  } catch {
    return { persisted: false, reason: 'serialization' };
  }

  try {
    backend.setItem(PREFERENCE_STORAGE_KEY, payload);
    return { persisted: true };
  } catch {
    return { persisted: false, reason: 'quota' };
  }
}

export function clearPreference(
  backend: PersistenceBackend | null = resolveBackend(),
): void {
  if (!backend) return;
  try {
    backend.removeItem(PREFERENCE_STORAGE_KEY);
  } catch {
    // best effort — leaving a stale value is acceptable here
  }
}

/** Test-only helper: in-memory localStorage stand-in. */
export function createMemoryBackend(): PersistenceBackend {
  const store = new Map<string, string>();
  return {
    getItem: (key) => (store.has(key) ? (store.get(key) as string) : null),
    setItem: (key, value) => {
      store.set(key, value);
    },
    removeItem: (key) => {
      store.delete(key);
    },
  };
}
