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
 * action IDs published in `SCREEN_INDEX.json` to wire the interactive
 * controls to the store API: `refresh-1`, `refresh-status-3`, and
 * `retry-now-4` all dispatch `store.api.refresh()`.
 *
 * File extension is `.ts` per the owned scope; we use `React.createElement`
 * instead of JSX so the file type-checks without an extra JSX pragma.
 */

import {
  createElement,
  useMemo,
  type CSSProperties,
  type ReactNode,
} from 'react';

import { StatusUtilityCleanGuardProbe } from '../screens';
import {
  CleanGuardProbeProvider,
  useCleanGuardProbeStoreOptional,
} from '../features/clean-guard-probe/clean-guard-probe.store';

const ROOT_TEST_ID = 'setfarm-app-root';

export interface CleanGuardProbeRootProps {
  children?: ReactNode;
  /**
   * Optional props forwarded to the generated Status Utility screen. The
   * default is undefined: callers may pass overrides, but the bridge wires
   * the screen's action IDs to the live store API before any override.
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
 * even after re-renders. Also wires the generated screen's action IDs to
 * the store API so its interactive controls stay live.
 */
function ScreenShell({
  children,
  screenProps,
}: {
  children?: ReactNode;
  screenProps?: Record<string, unknown>;
}): JSX.Element {
  const store = useCleanGuardProbeStoreOptional();

  const wiredActions = useMemo(() => {
    if (!store) return {};
    return {
      'refresh-1': () => store.api.refresh(),
      'refresh-status-3': () => store.api.refresh(),
      'retry-now-4': () => store.api.refresh(),
    };
  }, [store]);

  return createElement(
    'div',
    {
      'data-setfarm-root': 'clean-guard-probe',
      'data-testid': ROOT_TEST_ID,
      'data-surface': 'SURF_STATUS_UTILITY',
      className: 'min-h-screen bg-slate-50 text-slate-950',
      style: shellStyle(),
    },
    createElement(StatusUtilityCleanGuardProbe, {
      actions: wiredActions,
      ...screenProps,
    }),
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
