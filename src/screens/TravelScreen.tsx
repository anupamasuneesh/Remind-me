import React, { useState } from 'react';
import { ScreenId } from '../types';
import { MAP_TEXTURE } from '../data/mockData';

interface TravelScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

export const TravelScreen: React.FC<TravelScreenProps> = ({ onNavigate }) => {
  const [fromLoc, setFromLoc] = useState('Home Residence');
  const [toLoc, setToLoc] = useState('Main Campus - Hall A');
  const [trafficAlertEnabled, setTrafficAlertEnabled] = useState(true);
  const [scheduleTime, setScheduleTime] = useState('Today • 08:30 AM');
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Popup Alert checkboxes
  const [alertOptions, setAlertOptions] = useState({
    startsOnTime: true,
    arrivalLate: false,
    absentLeave: false,
    other: false,
  });

  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const handleRequestRoute = () => {
    showToast(`Live Route recalculated: ${fromLoc} → ${toLoc} (12.4 km, 24 mins)`);
  };

  const handleAlertAccept = () => {
    showToast('Alert preferences saved and synced to your Reminders schedule!');
  };

  const handleAlertUndo = () => {
    setAlertOptions({
      startsOnTime: true,
      arrivalLate: false,
      absentLeave: false,
      other: false,
    });
    showToast('Alert preferences reset to default.');
  };

  return (
    <div className="bg-surface text-on-surface min-h-[90vh] pb-28 pt-2 px-4 md:px-8 max-w-[1280px] mx-auto space-y-6">
      {/* Toast Alert */}
      {toastMsg && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-primary text-on-primary px-5 py-3 rounded-full shadow-2xl flex items-center gap-2 text-xs md:text-sm font-semibold animate-in fade-in slide-in-from-top-4">
          <span className="material-symbols-outlined text-[18px]">navigation</span>
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Main Bento Travel Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-2">
        {/* Left Column: Travel Settings Form (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-5">
          <div className="bg-surface-container-lowest p-6 rounded-[24px] shadow-[0px_4px_20px_rgba(0,0,0,0.05)] flex flex-col gap-4 border border-outline-variant/30">
            <div className="flex items-center gap-2.5 mb-1">
              <span className="material-symbols-outlined text-primary text-[28px] icon-filled">
                flight_takeoff
              </span>
              <h2 className="text-xl font-bold text-on-surface">Travel</h2>
            </div>

            {/* From Input */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-on-surface-variant px-1">From</label>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-3.5 text-outline text-[20px]">
                  my_location
                </span>
                <input
                  type="text"
                  value={fromLoc}
                  onChange={(e) => setFromLoc(e.target.value)}
                  placeholder="Your location"
                  className="w-full pl-11 pr-4 py-2.5 rounded-[16px] border-2 border-surface-container-highest focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none bg-surface-container-low text-xs md:text-sm text-on-surface"
                />
              </div>
            </div>

            {/* To Input */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-on-surface-variant px-1">To</label>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-3.5 text-outline text-[20px]">
                  location_on
                </span>
                <input
                  type="text"
                  value={toLoc}
                  onChange={(e) => setToLoc(e.target.value)}
                  placeholder="Destination"
                  className="w-full pl-11 pr-4 py-2.5 rounded-[16px] border-2 border-surface-container-highest focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none bg-surface-container-low text-xs md:text-sm text-on-surface"
                />
              </div>
            </div>

            {/* Traffic Alert Toggle Section */}
            <div className="bg-primary-container/5 rounded-2xl p-3.5 flex items-center justify-between border border-primary-container/15">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-[22px]">traffic</span>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-on-surface">Traffic Alert</span>
                  <span className="text-[10px] text-primary font-bold uppercase tracking-wider">
                    + 10 minutes
                  </span>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={trafficAlertEnabled}
                  onChange={(e) => {
                    setTrafficAlertEnabled(e.target.checked);
                    showToast(
                      e.target.checked
                        ? 'Traffic Alerts enabled (+10 min buffer)'
                        : 'Traffic Alerts disabled'
                    );
                  }}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" />
              </label>
            </div>

            {/* Date/Time Selection */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-on-surface-variant px-1">
                Date / Time
              </label>
              <button
                type="button"
                onClick={() => setShowDatePicker(!showDatePicker)}
                className="flex items-center justify-between w-full px-4 py-2.5 rounded-[16px] border-2 border-dashed border-outline-variant hover:border-primary hover:bg-primary/5 transition-all text-on-surface-variant cursor-pointer text-xs"
              >
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[18px]">calendar_today</span>
                  <span className="font-medium text-on-surface">{scheduleTime}</span>
                </div>
                <span className="material-symbols-outlined text-[18px]">add_circle</span>
              </button>

              {showDatePicker && (
                <div className="p-3 bg-surface-container rounded-xl flex gap-2 animate-in fade-in">
                  <input
                    type="time"
                    defaultValue="08:30"
                    onChange={(e) => setScheduleTime(`Today • ${e.target.value}`)}
                    className="grow bg-white px-3 py-1.5 rounded-lg text-xs"
                  />
                  <button
                    onClick={() => setShowDatePicker(false)}
                    className="bg-primary text-white text-xs px-3 py-1 rounded-lg font-bold"
                  >
                    Set
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Action Button */}
          <button
            type="button"
            onClick={handleRequestRoute}
            className="w-full bg-primary text-on-primary py-3.5 rounded-full font-bold text-base flex items-center justify-center gap-2 shadow-lg hover:bg-primary/90 active:scale-98 transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">send</span>
            <span>Request</span>
          </button>
        </div>

        {/* Middle Column: Route Visualization & Status (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-5">
          <div className="bg-surface-container-lowest flex-1 rounded-[24px] shadow-[0px_4px_20px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col border border-outline-variant/30 min-h-[380px]">
            <div className="p-5 pb-0 flex items-center justify-between">
              <h2 className="text-base font-bold text-on-surface">Route Visualization</h2>
              <span className="bg-tertiary-container text-on-tertiary-container px-3 py-0.5 rounded-full text-[11px] font-bold tracking-wider">
                LIVE
              </span>
            </div>

            <div className="grow relative p-6 flex items-center justify-center overflow-hidden">
              {/* Map Texture Background */}
              <div className="absolute inset-0 z-0 opacity-15 pointer-events-none">
                <img
                  src={MAP_TEXTURE}
                  alt="City Grid Vector Map"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Animated Route SVG */}
              <svg className="w-full h-44 relative z-10" viewBox="0 0 400 150">
                <path
                  className="route-path"
                  d="M 50 120 C 120 120, 150 30, 200 30 C 250 30, 280 120, 350 120"
                  fill="none"
                  stroke="#4361ee"
                  strokeWidth="4"
                />
                {/* Start Point */}
                <circle cx="50" cy="120" fill="#4361ee" r="8" />
                <circle cx="50" cy="120" fill="white" r="3" />

                {/* End Point */}
                <circle cx="350" cy="120" fill="#2346d5" r="8" />
                <circle cx="350" cy="120" fill="white" r="3" />

                {/* Animated Vehicle / Route Pin 'A' */}
                <g transform="translate(190, 10)">
                  <rect
                    className="animate-bounce shadow-md"
                    fill="#2346d5"
                    height="22"
                    rx="5"
                    width="22"
                  />
                  <text
                    className="font-bold select-none"
                    fill="white"
                    fontSize="11"
                    textAnchor="middle"
                    x="11"
                    y="15"
                  >
                    A
                  </text>
                </g>
              </svg>

              {/* Route Stats Chips */}
              <div className="absolute bottom-4 left-4 right-4 flex justify-between gap-3 z-10">
                <div className="bg-surface-container-high px-4 py-2.5 rounded-2xl flex-1 flex flex-col items-center shadow-xs">
                  <span className="text-[10px] text-on-surface-variant font-bold tracking-wider">
                    DISTANCE
                  </span>
                  <span className="text-base font-extrabold text-primary">12.4 km</span>
                </div>
                <div className="bg-surface-container-high px-4 py-2.5 rounded-2xl flex-1 flex flex-col items-center shadow-xs">
                  <span className="text-[10px] text-on-surface-variant font-bold tracking-wider">
                    EST. TIME
                  </span>
                  <span className="text-base font-extrabold text-primary">24 mins</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Popup Alerts & Quick Help (3 cols) */}
        <div className="lg:col-span-3 flex flex-col gap-5">
          <div className="bg-surface-container-lowest p-5 rounded-[24px] shadow-[0px_4px_20px_rgba(0,0,0,0.05)] border border-outline-variant/30">
            <div className="flex items-center gap-2 mb-3">
              <span className="material-symbols-outlined text-secondary text-[22px]">
                notifications_active
              </span>
              <h2 className="text-base font-bold text-secondary">Popup Alert</h2>
            </div>

            <div className="space-y-1.5">
              {/* Item 1 */}
              <label className="flex items-center justify-between p-2.5 rounded-xl hover:bg-secondary/5 transition-colors cursor-pointer group">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={alertOptions.startsOnTime}
                    onChange={(e) =>
                      setAlertOptions({ ...alertOptions, startsOnTime: e.target.checked })
                    }
                    className="w-4 h-4 rounded text-secondary focus:ring-secondary cursor-pointer"
                  />
                  <span className="text-xs font-semibold text-on-surface group-hover:text-secondary transition-colors">
                    Starts on time
                  </span>
                </div>
                <span className="material-symbols-outlined text-outline group-hover:text-secondary text-[16px]">
                  schedule
                </span>
              </label>

              {/* Item 2 */}
              <label className="flex items-center justify-between p-2.5 rounded-xl hover:bg-secondary/5 transition-colors cursor-pointer group">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={alertOptions.arrivalLate}
                    onChange={(e) =>
                      setAlertOptions({ ...alertOptions, arrivalLate: e.target.checked })
                    }
                    className="w-4 h-4 rounded text-secondary focus:ring-secondary cursor-pointer"
                  />
                  <span className="text-xs font-semibold text-on-surface group-hover:text-secondary transition-colors">
                    Arrival late
                  </span>
                </div>
                <span className="material-symbols-outlined text-outline group-hover:text-secondary text-[16px]">
                  warning
                </span>
              </label>

              {/* Item 3 */}
              <label className="flex items-center justify-between p-2.5 rounded-xl hover:bg-secondary/5 transition-colors cursor-pointer group">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={alertOptions.absentLeave}
                    onChange={(e) =>
                      setAlertOptions({ ...alertOptions, absentLeave: e.target.checked })
                    }
                    className="w-4 h-4 rounded text-secondary focus:ring-secondary cursor-pointer"
                  />
                  <span className="text-xs font-semibold text-on-surface group-hover:text-secondary transition-colors">
                    Absent / Leave
                  </span>
                </div>
                <span className="material-symbols-outlined text-outline group-hover:text-secondary text-[16px]">
                  event_busy
                </span>
              </label>

              {/* Item 4 */}
              <label className="flex items-center justify-between p-2.5 rounded-xl hover:bg-secondary/5 transition-colors cursor-pointer group">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={alertOptions.other}
                    onChange={(e) =>
                      setAlertOptions({ ...alertOptions, other: e.target.checked })
                    }
                    className="w-4 h-4 rounded text-secondary focus:ring-secondary cursor-pointer"
                  />
                  <span className="text-xs font-semibold text-on-surface group-hover:text-secondary transition-colors">
                    Other
                  </span>
                </div>
                <span className="material-symbols-outlined text-outline group-hover:text-secondary text-[16px]">
                  more_horiz
                </span>
              </label>
            </div>

            <div className="mt-4 pt-3 border-t border-outline-variant/30 flex gap-2">
              <button
                type="button"
                onClick={handleAlertUndo}
                className="flex-1 text-on-surface-variant font-bold text-xs py-2 rounded-full border border-outline/40 hover:bg-surface-container-high active:scale-95 transition-all cursor-pointer"
              >
                Undo
              </button>
              <button
                type="button"
                onClick={handleAlertAccept}
                className="flex-1 bg-secondary text-on-secondary font-bold text-xs py-2 rounded-full shadow-md hover:bg-secondary-container active:scale-95 transition-all cursor-pointer"
              >
                Accept
              </button>
            </div>
          </div>

          {/* Quick Help Tip */}
          <div className="bg-tertiary-container/10 p-4 rounded-[24px] border border-tertiary-container/20 flex gap-3">
            <span className="material-symbols-outlined text-tertiary text-[20px] shrink-0">
              lightbulb
            </span>
            <p className="text-xs text-on-tertiary-fixed-variant leading-relaxed">
              Enabling <strong>Traffic Alerts</strong> automatically updates your reminders
              based on real-time road conditions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
