import React, { useState } from 'react';
import { ScreenId, UserProfile } from '../types';
import { PROFESSOR_AVATAR } from '../data/mockData';

interface NavigationProps {
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  user: UserProfile;
  unreadCount?: number;
  onOpenNotifications?: () => void;
}

export const TopAppBar: React.FC<NavigationProps> = ({
  currentScreen,
  onNavigate,
  user,
  unreadCount = 3,
}) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  // If in auth screens, show minimal or no top app bar
  if (currentScreen === 'create_account' || currentScreen === 'login_portal') {
    return null;
  }

  return (
    <>
      <header className="bg-surface sticky top-0 z-40 flex justify-between items-center w-full px-4 md:px-8 h-16 shadow-sm border-b border-surface-container">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setDrawerOpen(true)}
            className="p-2 hover:bg-surface-container-highest rounded-full text-primary transition-all active:scale-95 cursor-pointer"
            title="Open Menu"
            id="menu-toggle-btn"
          >
            <span className="material-symbols-outlined text-[24px]">menu</span>
          </button>
          <div
            onClick={() => onNavigate('dashboard')}
            className="flex items-center gap-1.5 cursor-pointer select-none group"
          >
            <span className="material-symbols-outlined text-primary text-[26px] group-hover:rotate-12 transition-transform">
              alarm_on
            </span>
            <h1 className="text-xl md:text-2xl font-bold text-primary tracking-tight font-sans">
              Remind Me
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-3">
          {currentScreen === 'connections' && (
            <button
              onClick={() => onNavigate('connections')}
              className="p-2 hover:bg-surface-container-low text-primary rounded-full transition-colors active:scale-95 cursor-pointer"
              title="Search"
            >
              <span className="material-symbols-outlined">search</span>
            </button>
          )}

          <button
            onClick={() => onNavigate('connections')}
            className="relative p-2 hover:bg-surface-container-highest text-primary rounded-full transition-all active:scale-95 cursor-pointer"
            title="Notifications & Connections"
            id="notifications-btn"
          >
            <span className="material-symbols-outlined">notifications</span>
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-error rounded-full ring-2 ring-white"></span>
            )}
          </button>

          {/* User profile picture */}
          <div
            onClick={() => setDrawerOpen(true)}
            className="w-10 h-10 rounded-full border-2 border-primary-fixed overflow-hidden cursor-pointer hover:ring-2 hover:ring-primary/40 transition-all ml-1 shrink-0"
            title="Profile Menu"
          >
            <img
              src={user.avatarUrl || PROFESSOR_AVATAR}
              alt={user.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </header>

      {/* Drawer Overlay */}
      {drawerOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 transition-opacity"
          onClick={() => setDrawerOpen(false)}
        />
      )}

      {/* Side Navigation Drawer */}
      <aside
        className={`fixed top-0 left-0 h-full w-80 max-w-[85vw] bg-surface shadow-2xl z-50 transition-transform duration-300 flex flex-col ${
          drawerOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6 border-b border-outline-variant/30 bg-surface-container-lowest">
          <div className="flex justify-between items-start mb-4">
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary shadow-sm">
              <img
                src={user.avatarUrl}
                alt={user.name}
                className="w-full h-full object-cover"
              />
            </div>
            <button
              onClick={() => setDrawerOpen(false)}
              className="p-1 rounded-full text-outline hover:bg-surface-container-high transition-colors"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
          <h3 className="text-lg font-bold text-on-surface">{user.name}</h3>
          <p className="text-xs text-on-surface-variant">ID: {user.studentId}</p>
          <div className="mt-2 flex gap-1.5">
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed">
              {user.role}
            </span>
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant">
              {user.major}
            </span>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <button
            onClick={() => {
              onNavigate('dashboard');
              setDrawerOpen(false);
            }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all ${
              currentScreen === 'dashboard'
                ? 'bg-primary-container text-on-primary-container font-semibold'
                : 'text-on-surface-variant hover:bg-surface-container-high'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">dashboard</span>
            <span>Dashboard</span>
          </button>

          <button
            onClick={() => {
              onNavigate('attendance');
              setDrawerOpen(false);
            }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all ${
              currentScreen === 'attendance'
                ? 'bg-primary-container text-on-primary-container font-semibold'
                : 'text-on-surface-variant hover:bg-surface-container-high'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">calendar_today</span>
            <span>Attendance Log</span>
          </button>

          <button
            onClick={() => {
              onNavigate('travel');
              setDrawerOpen(false);
            }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all ${
              currentScreen === 'travel'
                ? 'bg-primary-container text-on-primary-container font-semibold'
                : 'text-on-surface-variant hover:bg-surface-container-high'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">traffic</span>
            <span>Travel & Commute</span>
          </button>

          <button
            onClick={() => {
              onNavigate('reminders');
              setDrawerOpen(false);
            }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all ${
              currentScreen === 'reminders'
                ? 'bg-primary-container text-on-primary-container font-semibold'
                : 'text-on-surface-variant hover:bg-surface-container-high'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">alarm</span>
            <span>Reminders & Schedules</span>
          </button>

          <button
            onClick={() => {
              onNavigate('chat');
              setDrawerOpen(false);
            }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all ${
              currentScreen === 'chat'
                ? 'bg-primary-container text-on-primary-container font-semibold'
                : 'text-on-surface-variant hover:bg-surface-container-high'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">chat</span>
            <span>Direct Chat</span>
          </button>

          <button
            onClick={() => {
              onNavigate('connections');
              setDrawerOpen(false);
            }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all ${
              currentScreen === 'connections'
                ? 'bg-primary-container text-on-primary-container font-semibold'
                : 'text-on-surface-variant hover:bg-surface-container-high'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">group</span>
            <span>Connections & Activity</span>
          </button>

          <div className="pt-4 mt-4 border-t border-outline-variant/30">
            <button
              onClick={() => {
                onNavigate('login_portal');
                setDrawerOpen(false);
              }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium text-error hover:bg-error-container/40 transition-all"
            >
              <span className="material-symbols-outlined text-[20px]">logout</span>
              <span>Switch Account / Sign Out</span>
            </button>
          </div>
        </nav>
      </aside>
    </>
  );
};

export const BottomNavBar: React.FC<{
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
}> = ({ currentScreen, onNavigate }) => {
  if (currentScreen === 'create_account' || currentScreen === 'login_portal') {
    return null;
  }

  const navItems: { id: ScreenId; label: string; icon: string }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
    { id: 'attendance', label: 'Attendance', icon: 'calendar_today' },
    { id: 'travel', label: 'Alerts', icon: 'traffic' },
    { id: 'chat', label: 'Chat', icon: 'chat' },
    { id: 'reminders', label: 'Reminders', icon: 'alarm' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full z-40 bg-surface-container-lowest/95 backdrop-blur-md shadow-[0_-4px_20px_rgba(0,0,0,0.06)] border-t border-surface-container px-2 py-2 flex justify-around items-center">
      {navItems.map((item) => {
        const isActive = currentScreen === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`flex flex-col items-center justify-center transition-all duration-200 cursor-pointer select-none active:scale-95 ${
              isActive
                ? 'bg-primary-container text-on-primary-container rounded-2xl px-4 py-1.5 shadow-sm'
                : 'text-on-surface-variant hover:text-primary p-2'
            }`}
            title={item.label}
          >
            <span
              className={`material-symbols-outlined text-[22px] ${
                isActive ? 'icon-filled' : ''
              }`}
            >
              {item.icon}
            </span>
            <span
              className={`text-[11px] mt-0.5 ${
                isActive ? 'font-bold' : 'font-medium'
              }`}
            >
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};
