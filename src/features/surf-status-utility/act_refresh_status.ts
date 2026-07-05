/**
 * ACT_REFRESH_STATUS action handler for the Status Utility surface.
 *
 * Story: US-002 - Clean Guard Probe - Status Utility - Clean Guard Probe screen
 * Surface: SURF_STATUS_UTILITY
 * Generated control: refresh-status-3 (primary button "Refresh Status")
 *
 * Pure function — the screen (and any future shared state owner) consumes
 * the returned snapshot without side-effects leaking into the UI tree.
 * Visible feedback (badges, lanes, counts, timestamps, activity feed
 * updates) is driven by the returned snapshot.
 */

export type ProbeHealthStatus = 'optimal' | 'degraded' | 'failed';

export interface StatusRefreshResult {
  /** UTC timestamp formatted for display in the "Last Updated" header. */
  lastUpdated: string;
  /** Aggregated probe health used by metric cards. */
  health: ProbeHealthStatus;
  /** Aggregate connection latency in milliseconds. */
  latencyMs: number;
  /** Signal strength in dBm. */
  signalDbm: number;
  /** Generated activity log entry appended after a refresh. */
  activityLogEntry: {
    timestamp: string;
    severity: 'info' | 'warning' | 'error';
    message: string;
  };
}

function formatUtcTimestamp(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, '0');
  return (
    `${date.getUTCFullYear()}-${pad(date.getUTCMonth() + 1)}-${pad(date.getUTCDate())} ` +
    `${pad(date.getUTCHours())}:${pad(date.getUTCMinutes())}:${pad(date.getUTCSeconds())} UTC`
  );
}

/**
 * Compute a fresh status snapshot. In the Clean Guard Probe demo the probe
 * is always healthy after a manual refresh; the previous snapshot is
 * forwarded so callers can preserve user-visible values that are not
 * driven by the refresh (e.g. the ready-state toggle).
 */
export function act_refresh_status(
  previous?: Pick<StatusRefreshResult, 'latencyMs' | 'signalDbm'>,
  now: Date = new Date(),
): StatusRefreshResult {
  const timestamp = formatUtcTimestamp(now);
  const latencyMs = previous?.latencyMs ?? 24;
  const signalDbm = previous?.signalDbm ?? -78;
  const health: ProbeHealthStatus = 'optimal';

  return {
    lastUpdated: timestamp,
    health,
    latencyMs,
    signalDbm,
    activityLogEntry: {
      timestamp: timestamp.slice(11, 19),
      severity: 'info',
      message: 'Status refresh completed via ACT_REFRESH_STATUS.',
    },
  };
}