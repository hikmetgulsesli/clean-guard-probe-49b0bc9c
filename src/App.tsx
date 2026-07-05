import { useCallback } from 'react';
import { StatusUtilityCleanGuardProbe, type StatusUtilityCleanGuardProbeActionId } from './screens/StatusUtilityCleanGuardProbe';

const APP_ROOT_TEST_ID = 'setfarm-app-root';

export default function App() {
  const handleHeaderRefresh = useCallback(() => {
    // Mirror the header refresh icon to the same refresh-status pipeline.
    // The header button does not have its own data-action-id in the typed
    // ActionId union, so dispatching via a synthetic event keeps the
    // documented buttons (refresh-1, refresh-status-3) in sync. For the
    // Clean Guard Probe demo the surface itself owns the state update.
    if (typeof window !== 'undefined' && typeof window.dispatchEvent === 'function') {
      window.dispatchEvent(new CustomEvent('clean-guard-probe:refresh-request'));
    }
  }, []);

  const handleSettingsNavigate = useCallback(() => {
    // Surface-level navigation hook. The Clean Guard Probe demo keeps the
    // settings route as a no-op placeholder so the navigation contract can
    // be exercised without a router dependency.
    if (typeof window !== 'undefined') {
      window.history.replaceState({}, '', '/settings');
    }
  }, []);

  const handleRetryNow = useCallback(() => {
    // Retry the failed sync action. Visual feedback is owned by the screen;
    // this handler exists so the App shell can later wire telemetry or a
    // retry queue without touching the generated surface.
    if (typeof window !== 'undefined' && typeof window.dispatchEvent === 'function') {
      window.dispatchEvent(new CustomEvent('clean-guard-probe:retry-request'));
    }
  }, []);

  const actions = {
    'refresh-1': handleHeaderRefresh,
    'settings-2': handleSettingsNavigate,
    'refresh-status-3': handleRetryNow, // not used: handled inside the screen
    'retry-now-4': handleRetryNow,
  } satisfies Partial<Record<StatusUtilityCleanGuardProbeActionId, () => void>>;

  return (
    <div
      data-setfarm-root="status-utility"
      data-testid={APP_ROOT_TEST_ID}
      data-surface="SURF_STATUS_UTILITY"
      className="relative min-h-screen w-full overflow-hidden flex flex-col bg-slate-50 text-slate-950"
    >
      <StatusUtilityCleanGuardProbe actions={actions} />
    </div>
  );
}