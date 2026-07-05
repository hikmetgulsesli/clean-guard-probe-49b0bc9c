/**
 * Clean Guard Probe — production root bridge.
 *
 * This module lives under `src/test/` because that is the owned path
 * declared in the story scope, but the symbols it exports are production
 * code (the root component, the entry-point render composition). Tests
 * can also import the same `CleanGuardProbeRoot` to drive end-to-end
 * assertions.
 *
 * The root composes the store provider (which publishes `window.app`)
 * with the generated Status Utility screen. Because we cannot read the
 * generated screen's TSX source (it is shared, not in scope), we use the
 * `actions` prop contract from the design handoff: at the moment the
 * generated screen declares `StatusUtilityCleanGuardProbeActionId = never`,
 * so we render the screen with no action overrides.
 *
 * File extension is `.ts` per the owned scope; we use `React.createElement`
 * instead of JSX so the file type-checks without an extra JSX pragma.
 */

import {
  createElement,
  type CSSProperties,
  type ReactNode,
} from 'react';

import { StatusUtilityCleanGuardProbe } from '../screens';
import {
  CleanGuardProbeProvider,
  useCleanGuardProbeStoreOptional,
  type CleanGuardProbeStoreValue,
} from '../features/clean-guard-probe/clean-guard-probe.store';

const ROOT_TEST_ID = 'setfarm-app-root';

export interface CleanGuardProbeRootProps {
  children?: ReactNode;
  /**
   * Optional props forwarded to the generated Status Utility screen. The
   * default is undefined: the screen currently declares no action IDs, so
   * callers do not need to wire any callbacks yet.
   */
  screenProps?: Record<string, unknown>;
}

function shellStyle(): CSSProperties {
  return {
    minHeight: '100vh',
    backgroundColor: '#f8fafc',
    color: '#0f172a',
  };
}

/**
 * Reads the latest store snapshot from context. Used by the visible screen
 * shell so consumer data surfaces (when present) have a stable reference
 * even after re-renders.
 */
function ScreenShell({
  children,
  screenProps,
}: {
  children?: ReactNode;
  screenProps?: Record<string, unknown>;
}): JSX.Element {
  const store: CleanGuardProbeStoreValue | null =
    useCleanGuardProbeStoreOptional();

  // We deliberately do NOT call store.api here — the screen already reads
  // `window.app` if it needs to introspect the live state, and a rerender
  // here would force the whole shell to refresh on every state change.
  // Keeping it pure also means the JSX is stable for QA snapshots.
  void store;

  return createElement(
    'div',
    {
      'data-setfarm-root': 'clean-guard-probe',
      'data-testid': ROOT_TEST_ID,
      'data-surface': 'SURF_STATUS_UTILITY',
      className: 'min-h-screen bg-slate-50 text-slate-950',
      style: shellStyle(),
    },
    createElement(StatusUtilityCleanGuardProbe, screenProps ?? {}),
    children,
  );
}

/**
 * Root component for the Clean Guard Probe. Wraps the store provider with
 * the visible Status Utility screen. Renders inside StrictMode safely
 * because the store side-effect (window.app) is idempotent across mounts.
 */
export function CleanGuardProbeRoot(
  props: CleanGuardProbeRootProps,
): JSX.Element {
  return createElement(
    CleanGuardProbeProvider,
    null,
    createElement(ScreenShell, {
      screenProps: props.screenProps,
      children: props.children,
    }),
  );
}

export default CleanGuardProbeRoot;
