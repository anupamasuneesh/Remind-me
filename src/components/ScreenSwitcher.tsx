import React, { useState } from 'react';
import { ScreenId } from '../types';

interface ScreenSwitcherProps {
  currentScreen: ScreenId;
  onSelectScreen: (screen: ScreenId) => void;
  isMobileFrame: boolean;
  onToggleMobileFrame: () => void;
}

const SCREENS: { id: ScreenId; label: string; icon: string }[] = [
  { id: 'create_account', label: '1. Create Account', icon: 'person_add' },
  { id: 'dashboard', label: '2. Dashboard', icon: 'dashboard' },
  { id: 'attendance', label: '3. Attendance', icon: 'calendar_month' },
  { id: 'reminders', label: '4. Reminders', icon: 'alarm' },
  { id: 'connections', label: '5. Connections', icon: 'contacts' },
  { id: 'travel', label: '6. Travel Planner', icon: 'directions_bus' },
  { id: 'chat', label: '7. Chat', icon: 'chat' },
  { id: 'login_portal', label: '8. Dark Login', icon: 'lock' },
];

export const ScreenSwitcher: React.FC<ScreenSwitcherProps> = ({
  currentScreen,
  onSelectScreen,
  isMobileFrame,
  onToggleMobileFrame,
}) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      aria-label="Screen switcher and preview controls"
      className="fixed top-20 right-4 z-50 flex flex-col items-end pointer-events-auto"
    >
      {collapsed ? (
        <button
          onClick={() => setCollapsed(false)}
          className="flex items-center gap-2 px-3 py-2 bg-primary text-on-primary rounded-full shadow-lg hover:shadow-primary/30 active:scale-95 transition-all text-xs font-semibold"
          title="Open Screen Switcher"
        >
          <span className="material-symbols-outlined text-[18px]">layers</span>
          <span>Screens ({SCREENS.find((s) => s.id === currentScreen)?.label.split(' ')[1] || 'Menu'})</span>
        </button>
      ) : (
        <div className="bg-surface-container-lowest/95 backdrop-blur-md rounded-2xl shadow-xl border border-outline-variant/40 p-3 max-w-xs transition-all animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center justify-between gap-2 pb-2 mb-2 border-b border-surface-container">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-primary text-[18px]">layers</span>
              <span className="text-xs font-bold text-on-surface">Screen Gallery</span>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={onToggleMobileFrame}
                className={`p-1 rounded-md text-[11px] font-medium transition-all ${
                  isMobileFrame
                    ? 'bg-primary-container text-on-primary-container'
                    : 'bg-surface-container hover:bg-surface-container-high text-on-surface-variant'
                }`}
                title={isMobileFrame ? 'Switch to Full Width Desktop' : 'Switch to Mobile Frame Preview'}
              >
                <span className="material-symbols-outlined text-[16px]">
                  {isMobileFrame ? 'stay_current_portrait' : 'devices'}
                </span>
              </button>
              <button
                onClick={() => setCollapsed(true)}
                className="p-1 text-outline hover:text-on-surface rounded-md transition-colors"
                title="Minimize switcher"
              >
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-1.5 max-h-56 overflow-y-auto pr-1">
            {SCREENS.map((s) => {
              const active = currentScreen === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => onSelectScreen(s.id)}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-left text-xs font-medium transition-all ${
                    active
                      ? 'bg-primary text-on-primary shadow-xs'
                      : 'hover:bg-surface-container text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px] shrink-0">
                    {s.icon}
                  </span>
                  <span className="truncate">{s.label}</span>
                </button>
              );
            })}
          </div>

          <div className="mt-2 pt-2 border-t border-surface-container flex items-center justify-between text-[11px] text-outline">
            <span>View mode:</span>
            <span className="font-semibold text-primary">
              {isMobileFrame ? 'Phone Viewport (Screenshot match)' : 'Responsive Desktop'}
            </span>
          </div>
        </div>
      )}
    </aside>
  );
};
