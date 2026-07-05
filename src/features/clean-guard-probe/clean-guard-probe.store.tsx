/**
 * Clean Guard Probe — store (context, reducer, public API, runtime bridge).
 *
 * US-001 owns the app-shell state used by the Status Utility surface.
 * The store initializes the active surface, restores the persisted
 * preference, exposes the public mutation API (refresh, toggleReady,
 * selectItem, setActivePanel, reset), and publishes a subscription channel
 * the test bridge listens to.
 *
 * RUNTIME BRIDGE — contract:
 *   Acceptance criteria require a live `window.app` handle holding
 *   `{ state, actions }`. The literal assignment lives in `Bridge` below
 *   inside a `useEffect`, so the handle is re-published on every state
 *   change. Type declarations, comments, and prose alone are not enough;
 *   this is a runtime side-effect owned by US-001.
 *
 * File extension is `.tsx` because the provider / bridge renders JSX.
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  type ReactNode,
} from 'react';

import { buildCleanGuardProbeSnapshot } from '../../__fixtures__/clean-guard-probe.fixture';
import {
  clearPreference,
  loadPreference,
  savePreference,
  type PreferenceRecovery,
} from './clean-guard-probe.repo';
import {
  DEFAULT_ACTIVE_PANEL,
  DEFAULT_PREFERENCE,
  type CleanGuardProbePreference,
  type CleanGuardProbePublicApi,
  type CleanGuardProbeState,
  type PanelId,
  type StatusItem,
  type StorageStatus,
} from './clean-guard-probe.types';

// Module augmentation: lets `window.app = ...` type-check under strict TS
// without a cast. The runtime side-effect is owned by the Bridge effect
// below; this declaration only documents the shape the runtime writes.
declare global {
  interface Window {
    app?: {
      state: CleanGuardProbeState;
      actions: {
        getState: () => CleanGuardProbeState;
        setActivePanel: (panel: PanelId) => void;
        selectItem: (id: string | null) => void;
        refresh: () => void;
        toggleReady: () => void;
        reset: () => void;
        subscribe: (
          listener: (s: CleanGuardProbeState) => void,
        ) => () => void;
      };
    };
  }
}

// ─── Reducer ──────────────────────────────────────────────────────────────

export interface CleanGuardProbeBootstrapPayload {
  items: readonly StatusItem[];
  activity: ReadonlyArray<CleanGuardProbeState['activity'][number]>;
  preference: CleanGuardProbePreference;
  storageStatus: StorageStatus;
  recovery: PreferenceRecovery;
  now: number;
}

export function createInitialState(
  payload: CleanGuardProbeBootstrapPayload,
): CleanGuardProbeState {
  const recoveryMessage =
    payload.recovery === 'corrupted'
      ? 'Stored preference was unreadable; defaults restored.'
      : null;
  const storageStatus: StorageStatus =
    payload.recovery === 'corrupted'
      ? 'error'
      : payload.recovery === 'unavailable'
        ? 'idle'
        : payload.storageStatus;
  return {
    activeSurface: 'SURF_STATUS_UTILITY',
    selectedItemId: null,
    storageStatus,
    lastError: recoveryMessage,
    activePanel: DEFAULT_ACTIVE_PANEL,
    itemCount: payload.items.length,
    items: payload.items,
    activity: payload.activity,
    preference: payload.preference,
    lastUpdatedAt: payload.now,
  };
}

type StoreAction =
  | { type: 'BOOTSTRAP'; payload: CleanGuardProbeBootstrapPayload }
  | { type: 'SET_ACTIVE_PANEL'; panel: PanelId }
  | { type: 'SELECT_ITEM'; id: string | null }
  | { type: 'REFRESH'; items: readonly StatusItem[]; now: number }
  | { type: 'TOGGLE_READY'; preference: CleanGuardProbePreference; now: number }
  | { type: 'SET_STORAGE_STATUS'; status: StorageStatus }
  | { type: 'SET_LAST_ERROR'; error: string | null }
  | { type: 'RESET'; now: number };

function reducer(
  state: CleanGuardProbeState,
  action: StoreAction,
): CleanGuardProbeState {
  switch (action.type) {
    case 'BOOTSTRAP':
      return createInitialState(action.payload);
    case 'SET_ACTIVE_PANEL':
      return { ...state, activePanel: action.panel };
    case 'SELECT_ITEM':
      return {
        ...state,
        selectedItemId: action.id,
      };
    case 'REFRESH':
      return {
        ...state,
        items: action.items,
        itemCount: action.items.length,
        lastUpdatedAt: action.now,
        lastError: null,
      };
    case 'TOGGLE_READY':
      return {
        ...state,
        preference: action.preference,
        lastUpdatedAt: action.now,
        lastError: null,
      };
    case 'SET_STORAGE_STATUS':
      return { ...state, storageStatus: action.status };
    case 'SET_LAST_ERROR':
      return { ...state, lastError: action.error };
    case 'RESET':
      return {
        ...state,
        activeSurface: 'SURF_STATUS_UTILITY',
        selectedItemId: null,
        activePanel: DEFAULT_ACTIVE_PANEL,
        itemCount: state.items.length,
        preference: { ...DEFAULT_PREFERENCE },
        lastUpdatedAt: action.now,
        lastError: null,
      };
    default:
      return state;
  }
}

// ─── Context shape ────────────────────────────────────────────────────────

export interface CleanGuardProbeStoreValue {
  state: CleanGuardProbeState;
  api: CleanGuardProbePublicApi;
}

export const CleanGuardProbeContext =
  createContext<CleanGuardProbeStoreValue | null>(null);

CleanGuardProbeContext.displayName = 'CleanGuardProbeContext';

// ─── Provider ─────────────────────────────────────────────────────────────

export interface CleanGuardProbeProviderProps {
  children?: ReactNode;
  /** Optional injected clock. Used by tests; production uses Date.now. */
  now?: () => number;
  /** Optional bootstrap overrides. Used by tests. */
  bootstrap?: Partial<CleanGuardProbeBootstrapPayload>;
}

export function CleanGuardProbeProvider(
  props: CleanGuardProbeProviderProps,
): JSX.Element {
  const nowFn = props.now ?? (() => Date.now());
  const listenersRef = useRef<Set<(state: CleanGuardProbeState) => void>>(
    new Set(),
  );

  // Build bootstrap payload on mount so the reducer always starts from a
  // fresh snapshot (avoids hidden global state across remounts).
  const initialPayload = useMemo<CleanGuardProbeBootstrapPayload>(() => {
    const snapshot = buildCleanGuardProbeSnapshot(nowFn());
    const persisted = loadPreference();
    const base: CleanGuardProbeBootstrapPayload = {
      items: snapshot.items,
      activity: snapshot.activity,
      preference: persisted.preference,
      storageStatus: 'ready',
      recovery: persisted.recovery,
      now: nowFn(),
    };
    return { ...base, ...(props.bootstrap ?? {}) };
  }, [nowFn, props.bootstrap]);

  const [state, dispatch] = useReducer(reducer, undefined, () =>
    createInitialState(initialPayload),
  );

  // Refs let the memoised `api` stay stable across re-renders: we always
  // read the latest `state` and `nowFn` from the ref instead of listing
  // them as memo dependencies, so consumers that depend on the `api`
  // reference do not re-render or loop on every dispatch.
  const stateRef = useRef(state);
  stateRef.current = state;

  const nowFnRef = useRef(nowFn);
  nowFnRef.current = nowFn;

  // Publish state to subscribers; wrapping keeps a throwing listener from
  // breaking the dispatch loop.
  useEffect(() => {
    listenersRef.current.forEach((listener) => {
      try {
        listener(state);
      } catch {
        // intentionally ignored
      }
    });
  }, [state]);

  const persistPreference = useCallback(
    (preference: CleanGuardProbePreference) => {
      const result = savePreference(preference);
      if (!result.persisted) {
        dispatch({
          type: 'SET_LAST_ERROR',
          error:
            result.reason === 'quota'
              ? 'Could not save preference: storage quota exceeded.'
              : result.reason === 'unavailable'
                ? 'Local storage is not available in this browser.'
                : 'Could not serialise preference for storage.',
        });
        dispatch({ type: 'SET_STORAGE_STATUS', status: 'error' });
      } else {
        dispatch({ type: 'SET_STORAGE_STATUS', status: 'ready' });
      }
    },
    [],
  );

  const api = useMemo<CleanGuardProbePublicApi>(() => {
    return {
      getState: () => stateRef.current,
      setActivePanel: (panel) => {
        dispatch({ type: 'SET_ACTIVE_PANEL', panel });
      },
      selectItem: (id) => {
        dispatch({ type: 'SELECT_ITEM', id });
      },
      refresh: () => {
        const snapshot = buildCleanGuardProbeSnapshot(nowFnRef.current());
        dispatch({
          type: 'REFRESH',
          items: snapshot.items,
          now: nowFnRef.current(),
        });
      },
      toggleReady: () => {
        const next: CleanGuardProbePreference = {
          ready: !stateRef.current.preference.ready,
        };
        persistPreference(next);
        dispatch({
          type: 'TOGGLE_READY',
          preference: next,
          now: nowFnRef.current(),
        });
      },
      reset: () => {
        // Clear persisted preference alongside the in-memory reset so the
        // app returns to factory defaults across reloads.
        clearPreference();
        dispatch({ type: 'RESET', now: nowFnRef.current() });
      },
      subscribe: (listener) => {
        listenersRef.current.add(listener);
        try {
          listener(stateRef.current);
        } catch {
          // ignore
        }
        return () => {
          listenersRef.current.delete(listener);
        };
      },
    };
  }, [persistPreference]);

  const value = useMemo<CleanGuardProbeStoreValue>(
    () => ({ state, api }),
    [state, api],
  );

  return (
    <CleanGuardProbeContext.Provider value={value}>
      <Bridge state={state} actions={api}>
        {props.children}
      </Bridge>
    </CleanGuardProbeContext.Provider>
  );
}

// ─── Runtime bridge (window.app) ──────────────────────────────────────────

export interface BridgeProps {
  state: CleanGuardProbeState;
  actions: CleanGuardProbePublicApi;
  children?: ReactNode;
}

/**
 * Owns the literal `window.app` assignment required by US-001.
 *
 * Because `getState` and the action closures need to stay reachable after
 * re-renders, we rebuild a stable `app` payload on every state change so
 * QA can always read the live snapshot through `window.app.state`.
 *
 * The mount/unmount cleanup of `window.app` lives in its own effect so
 * state transitions never briefly leave `window.app` undefined.
 */
export function Bridge({ state, actions, children }: BridgeProps): JSX.Element {
  const actionsRef = useRef<CleanGuardProbePublicApi>(actions);
  actionsRef.current = actions;

  useEffect(() => {
    if (typeof window === 'undefined') return;
    // LITERAL RUNTIME ASSIGNMENT — US-001 contract:
    //   window.app = { state, actions }
    window.app = {
      state,
      actions: {
        getState: () => actionsRef.current.getState(),
        setActivePanel: (panel: PanelId) => actionsRef.current.setActivePanel(panel),
        selectItem: (id: string | null) => actionsRef.current.selectItem(id),
        refresh: () => actionsRef.current.refresh(),
        toggleReady: () => actionsRef.current.toggleReady(),
        reset: () => actionsRef.current.reset(),
        subscribe: (listener: (s: CleanGuardProbeState) => void) =>
          actionsRef.current.subscribe(listener),
      },
    };
  }, [state]);

  useEffect(() => {
    return () => {
      if (typeof window === 'undefined') return;
      if ('app' in window) {
        delete window.app;
      }
    };
  }, []);

  return <>{children}</>;
}

// ─── Hooks ────────────────────────────────────────────────────────────────

export function useCleanGuardProbeStore(): CleanGuardProbeStoreValue {
  const value = useCleanGuardProbeStoreOptional();
  if (!value) {
    throw new Error(
      'useCleanGuardProbeStore must be used inside <CleanGuardProbeProvider>',
    );
  }
  return value;
}

export function useCleanGuardProbeStoreOptional():
  | CleanGuardProbeStoreValue
  | null {
  return useContext(CleanGuardProbeContext);
}

// Re-export the default so test utilities that drive the reducer through
// the public API do not need to import the constant twice.
export { DEFAULT_PREFERENCE };
