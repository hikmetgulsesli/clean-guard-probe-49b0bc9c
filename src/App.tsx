/**
 * Application shell — Clean Guard Probe (US-001).
 *
 * The visible product is the Status Utility surface (Clean Guard Probe),
 * not a marketing landing page. App.tsx stays a thin shell: the store,
 * persistence, persistence fallback, and `window.app` runtime handle are
 * all mounted by the bridge, so this file only has to wire the root
 * component into the React tree.
 */

import { CleanGuardProbeRoot } from './test/bridge';

export default function App(): JSX.Element {
  return <CleanGuardProbeRoot />;
}
