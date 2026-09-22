import React, { useState } from 'react';
import { ScreenId } from '../types';

interface AttendanceScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

interface CalendarCell {
  day: number | string;
  type: 'faded' | 'active-black' | 'present' | 'absent-light' | 'absent-vibrant' | 'normal' | 'marked-x' | 'today';
  details?: string;
}

export const AttendanceScreen: React.FC<AttendanceScreenProps> = ({ onNavigate }) => {
  const [selectedMonth, setSelectedMonth] = useState('October');
  const [selectedYear, setSelectedYear] = useState('2023');
  const [selectedCell, setSelectedCell] = useState<number | null>(17);
  const [showScheduleOptimized, setShowScheduleOptimized] = useState(false);

  // Exact calendar cells matching the screenshot
  const CALENDAR_CELLS: CalendarCell[] = [
    { day: 25, type: 'faded' },
    { day: 26, type: 'faded' },
    { day: 4, type: 'active-black', details: 'Special Seminar: AI Ethics (Present)' },
    { day: 28, type: 'faded' },
    { day: 29, type: 'faded' },
    { day: 30, type: 'faded' },
    { day: 1, type: 'present', details: 'Discrete Mathematics • Present' },
    { day: 2, type: 'present', details: 'Database Systems • Present' },
    { day: 3, type: 'present', details: 'Computer Architecture • Present' },
    { day: 4, type: 'absent-light', details: 'Late Arrival (12 mins) • Excused' },
    { day: 5, type: 'present', details: 'Web Engineering Lab • Present' },
    { day: 13, type: 'absent-vibrant', details: 'Advanced Physics • Missed' },
    { day: 7, type: 'normal', details: 'Weekend - Campus Library' },
    { day: 8, type: 'normal', details: 'Weekend' },
    { day: 9, type: 'present', details: 'Algorithms Analysis • Present' },
    { day: 17, type: 'absent-vibrant', details: 'Software Testing • Missed (Traffic)' },
    { day: 11, type: 'present', details: 'Data Structures • Present' },
    { day: 12, type: 'present', details: 'Data Structures • Present' },
    { day: 13, type: 'absent-light', details: 'Excused Leave • Medical' },
    { day: 21, type: 'marked-x', details: 'Holiday' },
    { day: 15, type: 'normal', details: 'Weekend' },
    { day: 16, type: 'present', details: 'Mobile App Dev • Present' },
    { day: 17, type: 'today', details: 'Design Systems Lab • Today Active' },
    { day: 18, type: 'normal', details: 'Scheduled' },
    { day: 19, type: 'normal', details: 'Scheduled' },
    { day: 20, type: 'normal', details: 'Scheduled' },
    { day: 21, type: 'faded', details: 'Upcoming' },
    { day: 22, type: 'faded', details: 'Upcoming' },
  ];

  return (
    <div className="bg-background text-on-surface min-h-[90vh] pb-28 pt-2 px-4 md:px-8 max-w-[1280px] mx-auto space-y-6">
      {/* Toast */}
      {showScheduleOptimized && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-primary text-on-primary px-5 py-3 rounded-full shadow-2xl flex items-center gap-2 text-sm font-semibold animate-in fade-in slide-in-from-top-4">
          <span className="material-symbols-outlined text-[20px]">auto_fix_high</span>
          <span>Schedule Optimized: Reminders shifted earlier by 15 mins for Friday sessions!</span>
        </div>
      )}

      {/* Header Section */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-4 mt-2">
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-on-surface tracking-tight">
            Attendance Log
          </h2>
          <p className="text-xs md:text-sm text-on-surface-variant mt-0.5">
            Track your academic presence and punctuality.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="flex items-center gap-2 bg-surface-container-high px-3.5 py-2 pr-8 rounded-xl text-on-surface-variant font-semibold text-xs transition-all hover:bg-surface-variant border-none outline-none appearance-none cursor-pointer"
            >
              <option>September</option>
              <option>October</option>
              <option>November</option>
              <option>December</option>
            </select>
            <span className="material-symbols-outlined text-[16px] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-outline">
              expand_more
            </span>
          </div>

          <div className="relative">
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="flex items-center gap-2 bg-surface-container-high px-3.5 py-2 pr-8 rounded-xl text-on-surface-variant font-semibold text-xs transition-all hover:bg-surface-variant border-none outline-none appearance-none cursor-pointer"
            >
              <option>2023</option>
              <option>2024</option>
              <option>2025</option>
            </select>
            <span className="material-symbols-outlined text-[16px] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-outline">
              expand_more
            </span>
          </div>
        </div>
      </section>

      {/* Main Grid: Calendar & Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Calendar Card */}
        <section className="lg:col-span-8 bg-surface-container-lowest shadow-[0_4px_20px_rgba(0,0,0,0.05)] rounded-[24px] p-5 md:p-6 border border-surface-container">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4">
            <h3 className="text-lg font-bold text-on-surface">Monthly Overview</h3>
            <div className="flex gap-4">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-primary-container" />
                <span className="text-xs font-medium text-on-surface-variant">Present</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-error" />
                <span className="text-xs font-medium text-on-surface-variant">Absent</span>
              </div>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-2 text-center select-none">
            {/* Days of Week */}
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
              <div key={day} className="text-xs font-bold text-outline py-1">
                {day}
              </div>
            ))}

            {/* Calendar Cells */}
            {CALENDAR_CELLS.map((cell, idx) => {
              const isSelected = selectedCell === idx;

              let styleClasses = 'bg-surface-container text-on-surface-variant';
              if (cell.type === 'faded') {
                styleClasses = 'bg-surface-container text-on-surface-variant opacity-30';
              } else if (cell.type === 'active-black') {
                styleClasses = 'bg-on-surface text-surface-container-lowest font-bold';
              } else if (cell.type === 'present') {
                styleClasses = 'bg-primary-container text-on-primary-container font-semibold shadow-xs';
              } else if (cell.type === 'absent-light') {
                styleClasses = 'bg-error-container text-on-error-container font-semibold';
              } else if (cell.type === 'absent-vibrant') {
                styleClasses = 'bg-error text-on-error font-bold shadow-xs';
              } else if (cell.type === 'marked-x') {
                styleClasses = 'bg-surface-container-low text-outline opacity-60 relative';
              } else if (cell.type === 'today') {
                styleClasses = 'border-2 border-primary bg-primary/10 text-primary font-bold shadow-xs';
              } else if (cell.type === 'normal') {
                styleClasses = 'bg-surface-container-low text-on-surface-variant';
              }

              return (
                <div
                  key={idx}
                  onClick={() => setSelectedCell(idx)}
                  className={`h-11 md:h-14 flex items-center justify-center rounded-xl text-xs md:text-sm transition-all duration-150 cursor-pointer ${styleClasses} ${
                    isSelected ? 'ring-2 ring-primary ring-offset-2 scale-105' : 'hover:scale-102'
                  }`}
                >
                  {cell.type === 'marked-x' && (
                    <span className="absolute inset-0 flex items-center justify-center text-error opacity-40 font-black text-lg">
                      ✕
                    </span>
                  )}
                  {cell.day}
                </div>
              );
            })}
          </div>

          {/* Selected Cell Detail Info */}
          {selectedCell !== null && CALENDAR_CELLS[selectedCell]?.details && (
            <div className="mt-4 p-3 rounded-xl bg-surface-container-low border border-outline-variant/30 flex items-center justify-between animate-in fade-in">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[18px]">info</span>
                <span className="text-xs font-semibold text-on-surface">
                  Oct {CALENDAR_CELLS[selectedCell].day}: {CALENDAR_CELLS[selectedCell].details}
                </span>
              </div>
              <span className="text-[11px] font-bold text-primary uppercase">Logged</span>
            </div>
          )}
        </section>

        {/* Stats Column: Total Attendance + Weekly Trend */}
        <div className="lg:col-span-4 flex flex-col gap-5">
          {/* Total Attendance Percentage Ring */}
          <section className="bg-primary-container text-on-primary-container rounded-[24px] p-6 shadow-[0_8px_24px_rgba(67,97,238,0.2)] flex flex-col items-center justify-center text-center">
            <h3 className="text-xs font-bold opacity-80 uppercase tracking-widest mb-3">
              Total Attendance
            </h3>
            <div className="relative w-32 h-32 flex items-center justify-center mb-3">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 128 128">
                <circle
                  className="opacity-20"
                  cx="64"
                  cy="64"
                  r="54"
                  fill="transparent"
                  stroke="currentColor"
                  strokeWidth="9"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="54"
                  fill="transparent"
                  stroke="white"
                  strokeWidth="9"
                  strokeDasharray="339.29"
                  strokeDashoffset={339.29 * (1 - 0.85)}
                  strokeLinecap="round"
                />
              </svg>
              <span className="absolute text-3xl font-extrabold text-white">85%</span>
            </div>
            <p className="text-xs text-white/90 max-w-[240px] leading-relaxed">
              You're doing great! Keep it up to stay above the 75% requirement.
            </p>
          </section>

          {/* Weekly Trend Bar Chart */}
          <section className="bg-surface-container-lowest shadow-[0_4px_20px_rgba(0,0,0,0.05)] rounded-[24px] p-5 md:p-6 border border-surface-container grow flex flex-col justify-between">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-base font-bold text-on-surface">Weekly Trend</h3>
              <span className="material-symbols-outlined text-outline text-[20px]">
                trending_up
              </span>
            </div>

            {/* Custom Bar Visualization */}
            <div className="w-full h-28 flex items-end justify-between px-2 gap-3">
              {[
                { day: 'M', height: 60, val: '60%' },
                { day: 'T', height: 85, val: '85%' },
                { day: 'W', height: 40, val: '40%' },
                { day: 'T', height: 90, val: '90%' },
                { day: 'F', height: 75, val: '75%' },
              ].map((item, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1.5 group cursor-pointer">
                  <span className="text-[10px] text-primary font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                    {item.val}
                  </span>
                  <div
                    className="w-full bg-primary-container rounded-t-lg transition-all duration-300 group-hover:bg-primary group-hover:scale-105"
                    style={{ height: `${item.height}%` }}
                  />
                  <span className="text-xs font-semibold text-outline">{item.day}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* Bottom Section: Recent Alerts & Smart Insights */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-5 pb-6">
        {/* Recent Alerts */}
        <div className="bg-surface-container-lowest shadow-[0_4px_20px_rgba(0,0,0,0.05)] rounded-[24px] p-5 md:p-6 border border-surface-container">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-base font-bold text-on-surface">Recent Alerts</h3>
            <button
              onClick={() => onNavigate('connections')}
              className="text-primary font-bold text-xs hover:underline cursor-pointer"
            >
              View All
            </button>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-surface-container-low hover:bg-surface-container transition-colors">
              <div className="w-10 h-10 rounded-full bg-error-container text-on-error-container flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[20px]">warning</span>
              </div>
              <div className="grow min-w-0">
                <p className="text-xs font-bold text-on-surface truncate">Missed Class: Adv. Physics</p>
                <p className="text-[11px] text-on-surface-variant truncate">Friday, 13 Oct • 09:00 AM</p>
              </div>
              <button
                onClick={() => onNavigate('travel')}
                className="text-outline hover:text-primary transition-colors p-1"
              >
                <span className="material-symbols-outlined text-[18px]">chevron_right</span>
              </button>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-2xl bg-surface-container-low hover:bg-surface-container transition-colors">
              <div className="w-10 h-10 rounded-full bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[20px]">check_circle</span>
              </div>
              <div className="grow min-w-0">
                <p className="text-xs font-bold text-on-surface truncate">Checked In: Data Struct</p>
                <p className="text-[11px] text-on-surface-variant truncate">Thursday, 12 Oct • 11:30 AM</p>
              </div>
              <button
                onClick={() => onNavigate('dashboard')}
                className="text-outline hover:text-primary transition-colors p-1"
              >
                <span className="material-symbols-outlined text-[18px]">chevron_right</span>
              </button>
            </div>
          </div>
        </div>

        {/* Smart Insights Card */}
        <div className="bg-surface-container-lowest shadow-[0_4px_20px_rgba(0,0,0,0.05)] rounded-[24px] p-5 md:p-6 border border-surface-container overflow-hidden relative flex flex-col justify-between">
          <div className="relative z-10">
            <h3 className="text-base font-bold text-on-surface mb-1">Smart Insights</h3>
            <p className="text-xs text-on-surface-variant mb-4">
              Based on your travel history and traffic alerts.
            </p>
            <div className="bg-white/70 backdrop-blur-xs p-4 rounded-2xl border border-white/60 shadow-xs">
              <p className="text-xs text-on-surface italic leading-relaxed">
                "Traffic is usually heavy on Friday mornings. Setting your reminder 15 minutes earlier might help avoid absences."
              </p>
            </div>
          </div>
          <div className="relative z-10 pt-4">
            <button
              onClick={() => {
                setShowScheduleOptimized(true);
                setTimeout(() => setShowScheduleOptimized(false), 3500);
              }}
              className="bg-primary text-on-primary font-bold text-xs px-5 py-2.5 rounded-full shadow-[0_8px_24px_rgba(67,97,238,0.2)] flex items-center gap-2 hover:bg-primary-container active:scale-95 transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">event_repeat</span>
              <span>Optimize Schedule</span>
            </button>
          </div>
          <div className="absolute -bottom-8 -right-8 w-44 h-44 bg-primary/5 rounded-full blur-2xl pointer-events-none" />
        </div>
      </section>

      {/* FAB */}
      <button
        onClick={() => onNavigate('reminders')}
        className="fixed bottom-20 right-6 w-14 h-14 bg-primary-container text-on-primary-container rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-30 cursor-pointer"
        title="Add Reminder"
      >
        <span className="material-symbols-outlined text-3xl">add</span>
      </button>
    </div>
  );
};
