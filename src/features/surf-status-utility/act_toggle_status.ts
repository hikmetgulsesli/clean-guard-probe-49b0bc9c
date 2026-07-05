/**
 * ACT_TOGGLE_STATUS action handler for the Status Utility surface.
 *
 * Story: US-002 - Clean Guard Probe - Status Utility - Clean Guard Probe screen
 * Surface: SURF_STATUS_UTILITY
 * Generated control: checkbox input "Ready State" (toggle)
 *
 * Tiny pure function so the controlled checkbox in
 * StatusUtilityCleanGuardProbe can use it as the single source of truth
 * for the next ready-state value, both for the visual switch and any
 * downstream state aggregation.
 */

export interface ReadyStateChange {
  /** Previous ready-state value (the toggle's source of truth). */
  previous: boolean;
  /** Next ready-state value to commit. */
  next: boolean;
  /** Convenience timestamp for any audit log / activity feed entry. */
  changedAt: string;
}

/**
 * Flip the ready-state flag. Optional `changedAt` is exposed for callers
 * that want to attach the timestamp to a UI feedback element (badge, log
 * line) without reaching back into Date themselves.
 */
export function act_toggle_status(
  currentReadyState: boolean,
  now: Date = new Date(),
): ReadyStateChange {
  return {
    previous: currentReadyState,
    next: !currentReadyState,
    changedAt: now.toISOString(),
  };
}

/**
 * Convenience helper: returns only the next boolean value. Useful for
 * controlled inputs whose onChange handler should not need to thread the
 * whole ReadyStateChange object back to the screen.
 */
export function nextReadyState(currentReadyState: boolean): boolean {
  return !currentReadyState;
}