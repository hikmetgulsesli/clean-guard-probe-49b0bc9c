// AUTO-GENERATED from Stitch — DO NOT modify layout or CSS
// Screen: Status Utility - Clean Guard Probe
// 
// AGENT INSTRUCTIONS:
// 1. DO NOT change className values or layout structure
// 2. Add useState for dynamic values (replace hardcoded text)
// 3. Wire interactive controls through the typed actions prop
// 4. Replace placeholder data with props/state

import { BadgeHelp, CheckCircle2, CircleAlert, Clock, HeartPulse, Info, RadioTower, RefreshCw, Settings, TriangleAlert, Wifi } from "lucide-react";


export type StatusUtilityCleanGuardProbeActionId = "refresh-1" | "settings-2" | "refresh-status-3" | "retry-now-4";

export interface StatusUtilityCleanGuardProbeProps {
  actions?: Partial<Record<StatusUtilityCleanGuardProbeActionId, () => void>>;

}

export function StatusUtilityCleanGuardProbe({ actions }: StatusUtilityCleanGuardProbeProps) {
  return (
    <>
      {/* TopAppBar JSON Implementation */}
      <header className="bg-surface flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop h-12 border-b border-surface-variant z-10 sticky top-0">
      <div className="flex items-center gap-sm">
      <RadioTower style={{fontVariationSettings: "'FILL' 1"}} className="text-primary" aria-hidden={true} focusable="false" />
      <span className="font-headline-sm text-headline-sm font-bold text-on-surface tracking-tight">Clean Guard Probe</span>
      </div>
      <div className="flex items-center gap-sm">
      <button aria-label="refresh" className="p-sm rounded text-on-surface-variant hover:bg-surface-container-low transition-colors flex items-center justify-center active:opacity-80" type="button" data-action-id="refresh-1" onClick={actions?.["refresh-1"]}>
      <RefreshCw className="text-[20px]" aria-hidden={true} focusable="false" />
      </button>
      <button aria-label="settings" className="p-sm rounded text-on-surface-variant hover:bg-surface-container-low transition-colors flex items-center justify-center active:opacity-80" type="button" data-action-id="settings-2" onClick={actions?.["settings-2"]}>
      <Settings className="text-[20px]" aria-hidden={true} focusable="false" />
      </button>
      </div>
      </header>
      {/* Main Utility Canvas */}
      <main className="flex-1 flex flex-col items-center p-md md:p-lg">
      <div className="w-full max-w-[800px] flex flex-col gap-lg">
      {/* Utility Header & Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-md pb-md border-b border-surface-variant">
      <div className="flex flex-col gap-xs">
      <h1 className="font-headline-md text-headline-md text-on-surface">System Status</h1>
      <span className="font-code-sm text-code-sm text-on-surface-variant flex items-center gap-xs">
      <Clock className="text-[14px]" aria-hidden={true} focusable="false" />
                              Last Updated: 2023-10-27 14:32:01 UTC
                          </span>
      </div>
      <div className="flex items-center gap-md">
      {/* ACT_TOGGLE_STATUS */}
      <label className="flex items-center cursor-pointer gap-sm">
      <span className="font-data-label text-data-label text-on-surface-variant uppercase tracking-wider">Ready State</span>
      <div className="relative">
      <input defaultChecked={true} className="sr-only peer" type="checkbox" />
      <div className="w-10 h-6 bg-surface-variant peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-outline-variant after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
      </div>
      </label>
      {/* ACT_REFRESH_STATUS */}
      <button className="bg-primary text-on-primary font-body-sm text-body-sm px-md py-sm rounded hover:opacity-90 active:opacity-100 transition-opacity flex items-center gap-xs" type="button" data-action-id="refresh-status-3" onClick={actions?.["refresh-status-3"]}>
      <RefreshCw className="text-[16px]" aria-hidden={true} focusable="false" />
                              Refresh Status
                          </button>
      </div>
      </div>
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-md">
      {/* Health Card */}
      <div className="bg-surface-container-lowest border border-outline-variant rounded p-md flex flex-col gap-sm relative overflow-hidden">
      <div className="absolute top-0 left-0 w-1 h-full bg-[#10B981]"></div> {/* Success indicator hint */}
      <div className="flex justify-between items-center">
      <span className="font-data-label text-data-label text-on-surface-variant uppercase">Probe Health</span>
      <HeartPulse className="text-on-surface-variant text-[20px]" aria-hidden={true} focusable="false" />
      </div>
      <div className="flex items-end gap-sm">
      <span className="font-headline-md text-headline-md text-on-surface leading-none">Optimal</span>
      </div>
      <span className="font-code-sm text-code-sm text-[#10B981]">All systems nominal</span>
      </div>
      {/* Connection Card */}
      <div className="bg-surface-container-lowest border border-outline-variant rounded p-md flex flex-col gap-sm relative overflow-hidden">
      <div className="absolute top-0 left-0 w-1 h-full bg-[#10B981]"></div>
      <div className="flex justify-between items-center">
      <span className="font-data-label text-data-label text-on-surface-variant uppercase">Connection</span>
      <Wifi className="text-on-surface-variant text-[20px]" aria-hidden={true} focusable="false" />
      </div>
      <div className="flex items-end gap-sm">
      <span className="font-headline-md text-headline-md text-on-surface leading-none">24ms</span>
      </div>
      <span className="font-code-sm text-code-sm text-on-surface-variant">Latency to gateway</span>
      </div>
      {/* Signal Card */}
      <div className="bg-surface-container-lowest border border-outline-variant rounded p-md flex flex-col gap-sm relative overflow-hidden">
      <div className="absolute top-0 left-0 w-1 h-full bg-[#F59E0B]"></div> {/* Warning indicator hint */}
      <div className="flex justify-between items-center">
      <span className="font-data-label text-data-label text-on-surface-variant uppercase">Signal Strength</span>
      <BadgeHelp className="text-on-surface-variant text-[20px]" aria-hidden={true} focusable="false" />
      </div>
      <div className="flex items-end gap-sm">
      <span className="font-headline-md text-headline-md text-on-surface leading-none">-78 dBm</span>
      </div>
      <span className="font-code-sm text-code-sm text-[#F59E0B]">Slight degradation</span>
      </div>
      </div>
      {/* System Feedback (Error State Example) */}
      <div className="bg-error-container border border-error/20 rounded p-md flex items-start gap-md">
      <CircleAlert  style={{fontVariationSettings: "'FILL' 1"}} className="text-on-error-container mt-xs" aria-hidden={true} focusable="false" />
      <div className="flex flex-col gap-xs flex-1">
      <h3 className="font-body-md text-body-md font-medium text-on-error-container">Data Sync Interrupted</h3>
      <p className="font-body-sm text-body-sm text-on-error-container opacity-80">Connection lost to secondary telemetry node. Retrying automatically in 30 seconds.</p>
      </div>
      <button className="text-on-error-container font-data-label text-data-label hover:underline px-sm py-xs" type="button" data-action-id="retry-now-4" onClick={actions?.["retry-now-4"]}>Retry Now</button>
      </div>
      {/* Activity Log */}
      <div className="flex flex-col gap-sm">
      <h2 className="font-headline-sm text-headline-sm text-on-surface">Activity Log</h2>
      <div className="bg-surface-container-lowest border border-outline-variant rounded overflow-hidden">
      {/* Log Item */}
      <div className="flex items-center gap-md p-sm px-md border-b border-surface-variant last:border-b-0 hover:bg-surface-container-low transition-colors">
      <span className="font-code-sm text-code-sm text-on-surface-variant w-24 shrink-0">14:32:01</span>
      <Info className="text-[16px] text-on-surface-variant shrink-0" aria-hidden={true} focusable="false" />
      <span className="font-body-sm text-body-sm text-on-surface truncate">Full diagnostic scan completed successfully.</span>
      </div>
      {/* Log Item */}
      <div className="flex items-center gap-md p-sm px-md border-b border-surface-variant last:border-b-0 hover:bg-surface-container-low transition-colors">
      <span className="font-code-sm text-code-sm text-on-surface-variant w-24 shrink-0">14:28:45</span>
      <TriangleAlert className="text-[16px] text-[#F59E0B] shrink-0" aria-hidden={true} focusable="false" />
      <span className="font-body-sm text-body-sm text-on-surface truncate">Signal strength dropped below threshold (-75 dBm).</span>
      </div>
      {/* Log Item */}
      <div className="flex items-center gap-md p-sm px-md border-b border-surface-variant last:border-b-0 hover:bg-surface-container-low transition-colors">
      <span className="font-code-sm text-code-sm text-on-surface-variant w-24 shrink-0">14:15:00</span>
      <BadgeHelp className="text-[16px] text-on-surface-variant shrink-0" aria-hidden={true} focusable="false" />
      <span className="font-body-sm text-body-sm text-on-surface truncate">Routine calibration sequence initiated.</span>
      </div>
      {/* Log Item */}
      <div className="flex items-center gap-md p-sm px-md border-b border-surface-variant last:border-b-0 hover:bg-surface-container-low transition-colors">
      <span className="font-code-sm text-code-sm text-on-surface-variant w-24 shrink-0">13:50:22</span>
      <CheckCircle2 className="text-[16px] text-[#10B981] shrink-0" aria-hidden={true} focusable="false" />
      <span className="font-body-sm text-body-sm text-on-surface truncate">System initialized and primary connection established.</span>
      </div>
      </div>
      </div>
      </div>
      </main>
    </>
  );
}
