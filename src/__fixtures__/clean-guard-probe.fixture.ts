/**
 * Clean Guard Probe — fixture / snapshot data.
 *
 * The product spec is intentionally narrow: three compact status tiles, a
 * Refresh action, a small activity list, and a last-updated timestamp. We
 * expose those as plain data so the store, the persistence adapter, and
 * future test suites all import the same starting snapshot.
 *
 * No React, no DOM access — just typed records and a builder for a fresh
 * bootstrap snapshot.
 */

import type {
  ActivityEntry,
  CleanGuardProbeBootstrapSnapshot,
  StatusItem,
} from '../features/clean-guard-probe/clean-guard-probe.types';

export const cleanGuardProbeItems: readonly StatusItem[] = [
  {
    id: 'item-data',
    label: 'Data feed',
    state: 'healthy',
    detail: 'Last sync within 60s',
  },
  {
    id: 'item-queue',
    label: 'Background queue',
    state: 'warning',
    detail: '12 jobs pending',
  },
  {
    id: 'item-storage',
    label: 'Local storage',
    state: 'healthy',
    detail: 'Preferences saved',
  },
] as const;

export const cleanGuardProbeActivity: readonly ActivityEntry[] = [
  {
    id: 'act-bootstrap',
    message: 'Clean Guard Probe initialised',
    timestamp: 0,
  },
  {
    id: 'act-refresh',
    message: 'Status snapshot loaded',
    timestamp: 0,
  },
] as const;

export function buildCleanGuardProbeSnapshot(
  now: number = Date.now(),
): CleanGuardProbeBootstrapSnapshot {
  return {
    items: cleanGuardProbeItems.map((item) => ({ ...item })),
    activity: cleanGuardProbeActivity.map((entry) => ({
      ...entry,
      timestamp: now,
    })),
  };
}
