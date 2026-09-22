import React, { useState } from 'react';
import { ScreenId, ReminderItem, ChatMessage } from '../types';
import { INITIAL_REMINDERS, INITIAL_ARCHIVED_ALERTS } from '../data/mockData';

interface RemindersScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

export const RemindersScreen: React.FC<RemindersScreenProps> = ({ onNavigate }) => {
  const [reminders, setReminders] = useState<ReminderItem[]>(INITIAL_REMINDERS);
  const [archivedList, setArchivedList] = useState(INITIAL_ARCHIVED_ALERTS);
  const [newLabel, setNewLabel] = useState('');
  const [newDateTime, setNewDateTime] = useState('2023-10-18T09:00');
  const [newAlertSetting, setNewAlertSetting] = useState('10 minutes before');
  const [miniChatInput, setMiniChatInput] = useState('');
  const [miniChatMessages, setMiniChatMessages] = useState<ChatMessage[]>([
    {
      id: 'm-1',
      sender: 'alex',
      text: 'Did you send the attendance alerts for the morning shift yet?',
      time: '08:45 AM',
    },
    {
      id: 'm-2',
      sender: 'user',
      text: 'Typing it up now. Setting the scheduled alerts for 10 minutes prior.',
      time: '08:47 AM',
    },
  ]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleAddReminder = () => {
    if (!newLabel.trim()) {
      showToast('Please enter a label for the reminder.');
      return;
    }
    const newRem: ReminderItem = {
      id: `rem-${Date.now()}`,
      title: newLabel,
      location: 'Campus Auditorium',
      time: newDateTime ? new Date(newDateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '10:00 AM',
      alertBefore: newAlertSetting,
      category: 'custom',
    };
    setReminders([newRem, ...reminders]);
    setNewLabel('');
    showToast(`Reminder created: "${newRem.title}"!`);
  };

  const handleSendAlertAtAll = () => {
    showToast('🚨 Broadcast Alert sent to @All active members and instructors!');
  };

  const handleMiniChatSend = () => {
    if (!miniChatInput.trim()) return;
    const newMsg: ChatMessage = {
      id: `mini-${Date.now()}`,
      sender: 'user',
      text: miniChatInput,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMiniChatMessages([...miniChatMessages, newMsg]);
    setMiniChatInput('');
  };

  const handleUnarchive = (id: string, title: string) => {
    setArchivedList(archivedList.filter((a) => a.id !== id));
    showToast(`Unarchived: "${title}" moved back to active list.`);
  };

  return (
    <div className="bg-background text-on-surface min-h-[90vh] pb-28 pt-2 px-4 md:px-8 max-w-7xl mx-auto space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-primary text-on-primary px-5 py-3 rounded-full shadow-2xl flex items-center gap-2 text-xs md:text-sm font-semibold animate-in fade-in slide-in-from-top-4">
          <span className="material-symbols-outlined text-[18px]">campaign</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Hero Section / Motivational Quote */}
      <section className="mt-2">
        <div className="rounded-3xl p-6 md:p-8 bg-gradient-to-br from-primary-container via-[#4361ee] to-secondary-container text-on-primary-container shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-xl text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-wide uppercase mb-3 drop-shadow-xs">
              EXCUSES DON'T BUILD EMPIRES
            </h2>
            <p className="text-sm md:text-base text-white/90 leading-relaxed font-normal">
              Stay ahead of your schedule. Every minute tracked is a step toward academic
              excellence and professional mastery.
            </p>
          </div>
          <div className="flex items-center justify-center p-5 bg-white/20 rounded-2xl backdrop-blur-md shadow-inner shrink-0">
            <span
              className="material-symbols-outlined text-[54px] text-white icon-filled"
            >
              hourglass_top
            </span>
          </div>
        </div>
      </section>

      {/* Bento Grid Layout: Reminders on Left, Chat & Archive on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* REMINDER CREATION & SCHEDULE PANEL (Left - 8 cols) */}
        <div className="lg:col-span-8 space-y-5">
          <section className="bg-surface-container-lowest rounded-[24px] p-6 md:p-7 shadow-[0px_4px_20px_rgba(0,0,0,0.05)] border border-surface-variant">
            <div className="flex items-center gap-2.5 mb-6 border-b border-surface-variant pb-4">
              <span className="material-symbols-outlined text-primary text-2xl">alarm</span>
              <h2 className="text-xl md:text-2xl font-bold text-on-surface">Reminders</h2>
            </div>

            <div className="space-y-5">
              {/* Label Input */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-on-surface-variant px-0.5">Label</label>
                <div className="flex gap-2">
                  <div className="relative grow">
                    <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-outline text-[20px]">
                      label
                    </span>
                    <input
                      type="text"
                      value={newLabel}
                      onChange={(e) => setNewLabel(e.target.value)}
                      placeholder="Meeting name or task..."
                      className="w-full pl-11 pr-4 py-3 rounded-xl border-2 border-surface-container-high bg-surface-container-low focus:border-primary focus:bg-white outline-none transition-all text-xs md:text-sm text-on-surface"
                      onKeyDown={(e) => e.key === 'Enter' && handleAddReminder()}
                    />
                  </div>
                  <button
                    onClick={handleAddReminder}
                    className="bg-primary text-on-primary px-4 rounded-xl flex items-center justify-center hover:bg-primary-container transition-all active:scale-95 shadow-sm cursor-pointer"
                    title="Add Reminder"
                  >
                    <span className="material-symbols-outlined text-xl">add</span>
                  </button>
                </div>
              </div>

              {/* Date/Time and Alert Dropdown Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Date / Time / Year */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-on-surface-variant px-0.5">
                    Date / Time / Year
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-outline text-[20px]">
                      calendar_month
                    </span>
                    <input
                      type="datetime-local"
                      value={newDateTime}
                      onChange={(e) => setNewDateTime(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 rounded-xl border-2 border-surface-container-high bg-surface-container-low focus:border-primary focus:bg-white outline-none transition-all text-xs md:text-sm text-on-surface"
                    />
                  </div>
                </div>

                {/* Alert Settings */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-on-surface-variant px-0.5">Alert</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-outline text-[20px]">
                      notifications_active
                    </span>
                    <select
                      value={newAlertSetting}
                      onChange={(e) => setNewAlertSetting(e.target.value)}
                      className="w-full pl-11 pr-10 py-3 rounded-xl border-2 border-surface-container-high bg-surface-container-low focus:border-primary focus:bg-white outline-none transition-all text-xs md:text-sm text-on-surface appearance-none cursor-pointer"
                    >
                      <option>10 minutes before</option>
                      <option>30 minutes before</option>
                      <option>1 hour before</option>
                      <option>At time of event</option>
                    </select>
                    <span className="material-symbols-outlined text-[18px] absolute right-3 top-1/2 -translate-y-1/2 text-outline pointer-events-none">
                      expand_more
                    </span>
                  </div>
                </div>
              </div>

              {/* Schedules List */}
              <div className="flex flex-col gap-2 pt-2">
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-semibold text-on-surface-variant">Schedules</label>
                  <button
                    onClick={() => onNavigate('dashboard')}
                    className="text-primary font-bold text-xs hover:underline cursor-pointer"
                  >
                    View All
                  </button>
                </div>

                <div className="space-y-2.5">
                  {reminders.map((rem) => (
                    <div
                      key={rem.id}
                      onClick={() => showToast(`Schedule selected: ${rem.title}`)}
                      className="flex items-center gap-3.5 p-3.5 bg-surface-container rounded-xl border border-transparent hover:border-primary/30 transition-all cursor-pointer group"
                    >
                      <div
                        className={`w-11 h-11 rounded-xl flex items-center justify-center transition-colors ${
                          rem.category === 'system'
                            ? 'bg-secondary/15 text-secondary group-hover:bg-secondary group-hover:text-white'
                            : 'bg-primary/15 text-primary group-hover:bg-primary group-hover:text-white'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[20px]">
                          {rem.category === 'system' ? 'event' : 'school'}
                        </span>
                      </div>
                      <div className="grow min-w-0">
                        <h4 className="text-sm font-bold text-on-surface truncate">{rem.title}</h4>
                        <p className="text-xs text-outline truncate">
                          {rem.location} • {rem.time}
                        </p>
                      </div>
                      <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors text-[20px]">
                        chevron_right
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Send alert @All Button */}
              <div className="pt-4">
                <button
                  type="button"
                  onClick={handleSendAlertAtAll}
                  className="w-full py-3.5 bg-primary text-on-primary rounded-full font-bold text-base flex items-center justify-center gap-2 shadow-lg hover:bg-primary-container active:scale-98 transition-all cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[20px]">send</span>
                  <span>Send alert @All</span>
                </button>
              </div>
            </div>
          </section>
        </div>

        {/* SIDEBAR COMPONENTS (Right - 4 cols) */}
        <div className="lg:col-span-4 space-y-5">
          {/* Mini Chat Interface */}
          <section className="bg-surface-container-lowest rounded-[24px] overflow-hidden flex flex-col h-[460px] border border-surface-variant shadow-[0px_4px_20px_rgba(0,0,0,0.05)]">
            <div className="bg-surface-container-high p-3.5 flex items-center justify-between border-b border-surface-variant">
              <div
                onClick={() => onNavigate('chat')}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <div className="relative">
                  <img
                    className="w-9 h-9 rounded-full object-cover border border-white"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuApsBkJXwvsFi9Hz9spX-n2xd-lKR8Fre_XS2tZWfmk7rrUzHcLCPkOKreA4i6By4q17BAW99mEyICrUuwvDknzb2n_cmewJU_CXgV_Qz0v5Ir1XpwMbWPPxw_UozVPx-NF6xZPXYULnMNazUgpH2IU9GHDLbDlcT5yjgvfMG-AS5yXqJwTFwu2WHcwYh0XyjNmM5BHRlCiF_avIOJPAXxySnobQ6d7C8cp_7mL1NLfAgJMVRVFgtuWOg"
                    alt="Chat Partner"
                  />
                  <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-surface-container-high rounded-full" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-on-surface leading-tight group-hover:text-primary transition-colors">
                    Chat
                  </h3>
                  <p className="text-[10px] text-outline">Active Now</p>
                </div>
              </div>
              <button
                onClick={() => onNavigate('chat')}
                className="material-symbols-outlined text-outline hover:text-primary text-[20px] cursor-pointer"
                title="Open Full Chat"
              >
                more_horiz
              </button>
            </div>

            {/* Mini Chat Message List */}
            <div className="grow p-3.5 overflow-y-auto space-y-3 bg-surface-container-low/30 text-xs">
              {miniChatMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-2.5 rounded-2xl ${
                      msg.sender === 'user'
                        ? 'bg-primary text-on-primary rounded-tr-none shadow-xs'
                        : 'bg-white text-on-surface rounded-tl-none shadow-xs border border-surface-variant'
                    }`}
                  >
                    <p className="leading-snug">{msg.text}</p>
                    <span
                      className={`text-[9px] mt-1 block ${
                        msg.sender === 'user' ? 'text-white/75 text-right' : 'text-outline text-left'
                      }`}
                    >
                      {msg.time}
                    </span>
                  </div>
                </div>
              ))}

              <div className="text-center my-1">
                <span className="text-[10px] text-outline px-2.5 py-0.5 bg-surface-container rounded-full">
                  Today
                </span>
              </div>
            </div>

            {/* Input Bar */}
            <div className="p-2.5 bg-white border-t border-surface-variant">
              <div className="flex items-center gap-1.5 px-2 text-outline mb-1">
                <span className="material-symbols-outlined text-[13px] animate-pulse">edit</span>
                <span className="text-[10px] italic">Alex is typing...</span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={miniChatInput}
                  onChange={(e) => setMiniChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleMiniChatSend()}
                  placeholder="Type a message..."
                  className="grow border-none focus:ring-0 text-xs bg-transparent py-1.5 px-2 outline-none text-on-surface"
                />
                <button
                  type="button"
                  onClick={handleMiniChatSend}
                  className="material-symbols-outlined text-primary bg-primary-container/20 p-1.5 rounded-xl hover:bg-primary-container hover:text-white transition-all active:scale-90 text-[18px] cursor-pointer"
                >
                  send
                </button>
              </div>
            </div>
          </section>

          {/* Archived Notifications */}
          <section className="bg-surface-container-lowest rounded-[24px] p-5 border border-surface-variant shadow-[0px_4px_20px_rgba(0,0,0,0.05)]">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-sm font-bold text-on-surface">Archived</h3>
              <span className="text-[11px] bg-surface-container-high px-2 py-0.5 rounded-full text-on-surface-variant font-medium">
                {archivedList.length} items
              </span>
            </div>
            <div className="space-y-2">
              {archivedList.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-2.5 bg-surface-container-low rounded-xl text-xs"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="material-symbols-outlined text-outline text-[18px] shrink-0">
                      archive
                    </span>
                    <span className="truncate text-on-surface font-medium">{item.title}</span>
                  </div>
                  <button
                    onClick={() => handleUnarchive(item.id, item.title)}
                    className="text-primary hover:bg-primary-container/10 px-2 py-1 rounded-lg transition-colors font-semibold shrink-0 cursor-pointer"
                  >
                    unarchive
                  </button>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
