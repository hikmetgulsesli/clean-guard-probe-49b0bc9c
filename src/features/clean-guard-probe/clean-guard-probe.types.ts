/**
 * Clean Guard Probe — shared domain types.
 *
 * US-001 owns the app-shell state used by the Status Utility surface. These
 * types describe the persistent preference, the in-memory status payload,
 * and the public mutation API that both the generated screen and the test
 * bridge consume.
 *
 * Framework-agnostic on purpose: the persistence adapter, the fixture, and
 * the test bridge import them without dragging React into the repo layer.
 */

export type SurfaceId = 'SURF_STATUS_UTILITY';

export type PanelId = 'main' | 'activity' | null;

export type StorageStatus = 'idle' | 'loading' | 'ready' | 'error';

export type ItemState = 'healthy' | 'warning' | 'error';

export interface StatusItem {
  readonly id: string;
  readonly label: string;
  readonly state: ItemState;
  readonly detail?: string;
}

export interface ActivityEntry {
  readonly id: string;
  readonly message: string;
  readonly timestamp: number;
}

export interface CleanGuardProbePreference {
  readonly ready: boolean;
}

export interface CleanGuardProbeState {
  readonly activeSurface: SurfaceId;
  readonly selectedItemId: string | null;
  readonly storageStatus: StorageStatus;
  readonly lastError: string | null;
  readonly activePanel: PanelId;
  readonly itemCount: number;
  readonly items: readonly StatusItem[];
  readonly activity: readonly ActivityEntry[];
  readonly preference: CleanGuardProbePreference;
  readonly lastUpdatedAt: number;
}

export interface CleanGuardProbeBootstrapSnapshot {
  readonly items: readonly StatusItem[];
  readonly activity: readonly ActivityEntry[];
}

export interface CleanGuardProbePublicApi {
  readonly getState: () => CleanGuardProbeState;
  readonly setActivePanel: (panel: PanelId) => void;
  readonly selectItem: (id: string | null) => void;
  readonly refresh: () => void;
  readonly toggleReady: () => void;
  readonly reset: () => void;
  readonly subscribe: (
    listener: (state: CleanGuardProbeState) => void,
  ) => () => void;
}

export const PREFERENCE_STORAGE_KEY = 'clean-guard-probe:preference:v1';

export const DEFAULT_PREFERENCE: CleanGuardProbePreference = {
  ready: true,
};

export const DEFAULT_ACTIVE_PANEL: PanelId = 'main';
