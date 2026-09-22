import React, { useState } from 'react';
import { ScreenId, UserProfile } from '../types';

interface DashboardProps {
  user: UserProfile;
  onNavigate: (screen: ScreenId) => void;
  onCheckIn: () => void;
  isCheckedIn: boolean;
}

export const DashboardScreen: React.FC<DashboardProps> = ({
  user,
  onNavigate,
  onCheckIn,
  isCheckedIn,
}) => {
  const [showIdModal, setShowIdModal] = useState(false);
  const [showCheckInToast, setShowCheckInToast] = useState(false);

  const handleCheckInClick = () => {
    onCheckIn();
    setShowCheckInToast(true);
    setTimeout(() => setShowCheckInToast(false), 3500);
  };

  return (
    <div className="text-on-surface pb-28 pt-2 px-4 md:px-8 max-w-7xl mx-auto space-y-6">
      {/* Toast Alert */}
      {showCheckInToast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-primary text-on-primary px-5 py-3 rounded-full shadow-2xl flex items-center gap-2.5 text-sm font-semibold animate-in fade-in slide-in-from-top-4">
          <span className="material-symbols-outlined text-[20px] text-green-300">verified</span>
          <span>Checked In: Design Systems Lab verified at {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
      )}

      {/* Welcome & Next Session Section */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
        {/* Welcome Banner */}
        <div className="md:col-span-8 bg-surface-container-lowest rounded-[24px] p-6 md:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-outline-variant/20 relative overflow-hidden flex flex-col justify-center min-h-[190px]">
          <div className="z-10 relative">
            <p className="text-xs md:text-sm font-bold text-primary uppercase tracking-wider mb-2">
              Good Morning, {user.name.split(' ')[0]}
            </p>
            <p className="text-sm md:text-base text-on-surface-variant max-w-md leading-relaxed">
              Stay focused on your goals today. Your schedule is clear for the next 2 hours.
            </p>
          </div>
          {/* Abstract Design Elements */}
          <div className="absolute -right-10 -bottom-10 w-44 h-44 bg-primary-container opacity-10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute right-6 top-6 opacity-15 pointer-events-none select-none">
            <span
              className="material-symbols-outlined text-[100px] text-primary icon-filled"
            >
              emoji_events
            </span>
          </div>
        </div>

        {/* Next Task/Reminder Widget */}
        <div className="md:col-span-4 bg-primary text-on-primary rounded-[24px] p-6 shadow-[0_8px_24px_rgba(67,97,238,0.2)] flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-3">
              <span className="material-symbols-outlined text-2xl opacity-90">schedule</span>
              <span className="bg-white/20 backdrop-blur-xs px-2.5 py-0.5 rounded-full text-xs font-semibold">
                In 15 mins
              </span>
            </div>
            <p className="text-xs uppercase tracking-wider text-white/80 font-medium">Next Session</p>
            <h3 className="text-xl font-bold mt-1 text-white">Design Systems Lab</h3>
          </div>
          <button
            onClick={handleCheckInClick}
            disabled={isCheckedIn}
            className={`mt-5 w-full py-3 rounded-full text-xs md:text-sm font-bold flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer shadow-sm ${
              isCheckedIn
                ? 'bg-white/90 text-primary opacity-90'
                : 'bg-white text-primary hover:bg-surface-container-lowest'
            }`}
          >
            <span className="material-symbols-outlined text-lg">
              {isCheckedIn ? 'task_alt' : 'qr_code_scanner'}
            </span>
            {isCheckedIn ? 'Checked In ✓' : 'Check In Now'}
          </button>
        </div>
      </section>

      {/* Student ID & Attendance Stats Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Student ID Card */}
        <div className="md:col-span-2 bg-white rounded-[24px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-outline-variant/30">
          <div className="flex flex-col sm:flex-row gap-5 items-center">
            <div className="w-28 h-28 md:w-32 md:h-32 rounded-2xl overflow-hidden shadow-md shrink-0 border border-outline-variant/20">
              <img
                src={user.avatarUrl}
                alt={user.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grow text-center sm:text-left">
              <h3 className="text-xl md:text-2xl font-bold text-on-surface">{user.name}</h3>
              <p className="text-xs md:text-sm text-on-surface-variant font-medium mt-0.5">
                ID: {user.studentId}
              </p>
              <div className="mt-3 flex flex-wrap justify-center sm:justify-start gap-2">
                <span className="px-3 py-1 bg-surface-container-low text-on-surface rounded-full text-xs font-semibold border border-outline-variant/40">
                  {user.role}
                </span>
                <span className="px-3 py-1 bg-surface-container-low text-on-surface rounded-full text-xs font-semibold border border-outline-variant/40">
                  {user.major}
                </span>
              </div>
              <div className="mt-5 pt-4 border-t border-outline-variant/20 flex flex-col sm:flex-row justify-between items-center gap-2">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-primary text-[18px]">verified</span>
                  <span className="text-xs text-on-surface-variant">
                    Academic Standing: <strong className="text-on-surface">{user.academicStanding}</strong>
                  </span>
                </div>
                <button
                  onClick={() => setShowIdModal(true)}
                  className="text-primary font-bold text-xs hover:underline cursor-pointer"
                >
                  View Digital ID
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Attendance Mini Stats */}
        <div className="bg-white rounded-[24px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-outline-variant/30 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-3">
              <h4 className="text-base font-bold text-on-surface">Attendance</h4>
              <button
                onClick={() => onNavigate('attendance')}
                className="text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
                title="View Full Attendance Log"
              >
                <span className="material-symbols-outlined text-[20px]">bar_chart</span>
              </button>
            </div>
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-3xl md:text-4xl font-extrabold text-primary">
                {user.attendanceRate}%
              </span>
              <span className="text-secondary text-xs font-bold">+2.4%</span>
            </div>
            <div className="w-full bg-surface-container-low h-2.5 rounded-full overflow-hidden mb-5">
              <div
                className="bg-primary h-full rounded-full transition-all duration-700"
                style={{ width: `${user.attendanceRate}%` }}
              />
            </div>
          </div>

          <div className="space-y-2.5 pt-2 border-t border-outline-variant/15 text-xs">
            <div className="flex justify-between items-center font-medium">
              <span className="text-on-surface-variant">Present</span>
              <span className="text-on-surface font-bold">{user.presentSessions} Sessions</span>
            </div>
            <div className="flex justify-between items-center font-medium">
              <span className="text-on-surface-variant">Excused</span>
              <span className="text-on-surface font-bold">{user.excusedSessions} Sessions</span>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Grid for Commute, Messages, and New Reminder */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-5">
        {/* Commute Widget */}
        <div className="bg-white rounded-[24px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-outline-variant/30 md:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-tertiary">directions_bus</span>
              <h4 className="text-base font-bold text-on-surface">Commute Alert</h4>
            </div>
            <button
              onClick={() => onNavigate('travel')}
              className="text-xs text-primary font-bold hover:underline cursor-pointer"
            >
              Route Details
            </button>
          </div>

          <div className="flex gap-4">
            <div className="flex flex-col items-center py-1">
              <div className="w-7 h-7 rounded-full bg-tertiary/10 flex items-center justify-center text-tertiary">
                <span className="material-symbols-outlined text-sm">home</span>
              </div>
              <div className="w-0.5 h-10 bg-outline-variant/40 my-1" />
              <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-sm icon-filled">school</span>
              </div>
            </div>

            <div className="grow space-y-3">
              <div>
                <p className="text-xs text-on-surface-variant">From: Home Residence</p>
                <p className="text-sm font-bold text-on-surface">Delayed (Heavy Traffic)</p>
              </div>
              <div>
                <p className="text-xs text-on-surface-variant">To: Main Campus</p>
                <p className="text-xs text-error font-medium flex items-center gap-1 mt-0.5">
                  <span className="material-symbols-outlined text-sm">report</span>
                  Recommended leave time: 08:15 AM
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Active Messages Widget */}
        <div className="bg-white rounded-[24px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-outline-variant/30 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-base font-bold text-on-surface">Messages</h4>
              <span className="bg-primary text-on-primary text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
                3
              </span>
            </div>
            <div className="space-y-3">
              <div
                onClick={() => onNavigate('chat')}
                className="flex items-center gap-3 p-1.5 rounded-xl hover:bg-surface-container cursor-pointer transition-colors"
              >
                <div className="w-9 h-9 rounded-full bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed shrink-0">
                  <span className="material-symbols-outlined text-[18px]">group</span>
                </div>
                <div className="min-w-0 grow">
                  <p className="text-xs font-bold text-on-surface truncate">Math Study Group</p>
                  <p className="text-[11px] text-on-surface-variant truncate">Sarah: "Anyone free?"</p>
                </div>
              </div>

              <div
                onClick={() => onNavigate('chat')}
                className="flex items-center gap-3 p-1.5 rounded-xl hover:bg-surface-container cursor-pointer transition-colors"
              >
                <div className="w-9 h-9 rounded-full bg-tertiary-fixed flex items-center justify-center text-on-tertiary-fixed shrink-0">
                  <span className="material-symbols-outlined text-[18px]">person</span>
                </div>
                <div className="min-w-0 grow">
                  <p className="text-xs font-bold text-on-surface truncate">Prof. Henderson</p>
                  <p className="text-[11px] text-on-surface-variant truncate">Review sent.</p>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => onNavigate('chat')}
            className="mt-4 w-full text-center py-2 text-primary font-bold text-xs hover:bg-primary/5 rounded-xl transition-colors cursor-pointer"
          >
            Go to Chat
          </button>
        </div>

        {/* Reminder Add Widget */}
        <div className="bg-secondary-container text-on-secondary-container rounded-[24px] p-6 shadow-[0_8px_24px_rgba(132,41,200,0.2)] flex flex-col items-center justify-center text-center">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-3">
            <span className="material-symbols-outlined text-2xl text-white">add_alert</span>
          </div>
          <h4 className="text-base font-bold mb-1 text-white">New Reminder</h4>
          <p className="text-xs text-white/80 mb-4 max-w-[200px]">
            Quickly set an alert for a deadline or event.
          </p>
          <button
            onClick={() => onNavigate('reminders')}
            className="bg-white text-secondary px-6 py-2 rounded-full text-xs font-bold shadow-sm hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            Create
          </button>
        </div>
      </section>

      {/* Floating Action Button */}
      <button
        onClick={() => onNavigate('reminders')}
        className="fixed bottom-20 right-6 w-14 h-14 bg-primary text-on-primary rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-30 cursor-pointer"
        title="Add Reminder"
      >
        <span className="material-symbols-outlined text-3xl">add</span>
      </button>

      {/* Digital ID Modal */}
      {showIdModal && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-in fade-in"
          onClick={() => setShowIdModal(false)}
        >
          <div
            className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-outline-variant/30 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-20 h-20 rounded-full mx-auto overflow-hidden border-2 border-primary mb-3">
              <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
            </div>
            <h3 className="text-xl font-bold text-on-surface">{user.name}</h3>
            <p className="text-xs text-primary font-semibold mt-0.5">{user.studentId}</p>
            <div className="my-4 p-4 bg-surface-container-low rounded-2xl space-y-1.5 text-xs text-left">
              <div className="flex justify-between">
                <span className="text-outline">Program</span>
                <span className="font-semibold text-on-surface">{user.major}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-outline">Academic Status</span>
                <span className="font-semibold text-green-600">{user.academicStanding}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-outline">Attendance</span>
                <span className="font-semibold text-primary">{user.attendanceRate}%</span>
              </div>
            </div>
            {/* Barcode/QR representation */}
            <div className="p-3 bg-surface-container rounded-xl flex flex-col items-center gap-1.5">
              <div className="flex gap-1 h-10 items-center justify-center w-full">
                {[4, 2, 6, 1, 3, 5, 2, 7, 3, 2, 4, 1, 6, 3, 5, 2, 4, 1, 7].map((h, i) => (
                  <span
                    key={i}
                    className="bg-on-surface inline-block"
                    style={{ width: `${(i % 3) + 2}px`, height: `${h * 4 + 10}px` }}
                  />
                ))}
              </div>
              <span className="text-[10px] font-mono tracking-widest text-outline">
                *{user.studentId}*
              </span>
            </div>
            <button
              onClick={() => setShowIdModal(false)}
              className="mt-5 w-full py-2.5 rounded-full bg-primary text-on-primary font-semibold text-xs active:scale-95"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
