import React, { useState } from 'react';
import { ScreenId, UserProfile } from './types';
import { INITIAL_USER } from './data/mockData';
import { TopAppBar, BottomNavBar } from './components/Navigation';
import { ScreenSwitcher } from './components/ScreenSwitcher';
import { CreateAccountScreen } from './screens/CreateAccountScreen';
import { DashboardScreen } from './screens/DashboardScreen';
import { AttendanceScreen } from './screens/AttendanceScreen';
import { RemindersScreen } from './screens/RemindersScreen';
import { ConnectionsScreen } from './screens/ConnectionsScreen';
import { TravelScreen } from './screens/TravelScreen';
import { ChatScreen } from './screens/ChatScreen';
import { LoginPortalScreen } from './screens/LoginPortalScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('dashboard');
  const [user, setUser] = useState<UserProfile>(INITIAL_USER);
  const [isCheckedIn, setIsCheckedIn] = useState<boolean>(false);
  const [isMobileFrame, setIsMobileFrame] = useState<boolean>(false);

  const handleCheckIn = () => {
    setIsCheckedIn(true);
    setUser((prev) => ({
      ...prev,
      presentSessions: prev.presentSessions + 1,
      attendanceRate: 94.6,
    }));
  };

  const renderActiveScreen = () => {
    switch (currentScreen) {
      case 'create_account':
        return (
          <CreateAccountScreen
            onNavigate={setCurrentScreen}
            onSuccess={() => setCurrentScreen('dashboard')}
          />
        );
      case 'dashboard':
        return (
          <DashboardScreen
            user={user}
            onNavigate={setCurrentScreen}
            onCheckIn={handleCheckIn}
            isCheckedIn={isCheckedIn}
          />
        );
      case 'attendance':
        return <AttendanceScreen onNavigate={setCurrentScreen} />;
      case 'reminders':
        return <RemindersScreen onNavigate={setCurrentScreen} />;
      case 'connections':
        return <ConnectionsScreen onNavigate={setCurrentScreen} />;
      case 'travel':
        return <TravelScreen onNavigate={setCurrentScreen} />;
      case 'chat':
        return <ChatScreen onNavigate={setCurrentScreen} />;
      case 'login_portal':
        return (
          <LoginPortalScreen
            onNavigate={setCurrentScreen}
            onLoginSuccess={() => setCurrentScreen('dashboard')}
          />
        );
      default:
        return (
          <DashboardScreen
            user={user}
            onNavigate={setCurrentScreen}
            onCheckIn={handleCheckIn}
            isCheckedIn={isCheckedIn}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-[#191c1d] flex flex-col font-sans relative selection:bg-primary-fixed selection:text-on-primary-fixed">
      {/* Screen Gallery & Viewport Switcher */}
      <ScreenSwitcher
        currentScreen={currentScreen}
        onSelectScreen={setCurrentScreen}
        isMobileFrame={isMobileFrame}
        onToggleMobileFrame={() => setIsMobileFrame(!isMobileFrame)}
      />

      {isMobileFrame ? (
        /* Mobile Device Frame Simulation */
        <div className="min-h-screen bg-slate-900/90 py-8 px-4 flex items-center justify-center overflow-x-hidden">
          <div className="relative w-full max-w-[412px] min-h-[860px] max-h-[92vh] bg-surface rounded-[44px] shadow-[0_25px_70px_rgba(0,0,0,0.6)] border-[9px] border-slate-800 flex flex-col overflow-hidden ring-1 ring-white/15">
            {/* Speaker / Camera Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 h-5 w-36 bg-slate-800 rounded-b-2xl z-50 flex items-center justify-center">
              <div className="w-12 h-1 bg-slate-700 rounded-full" />
            </div>

            {/* Mobile Top App Bar */}
            <TopAppBar
              currentScreen={currentScreen}
              onNavigate={setCurrentScreen}
              user={user}
            />

            {/* Mobile Screen Body */}
            <div className="grow overflow-y-auto pt-2">
              {renderActiveScreen()}
            </div>

            {/* Mobile Bottom Nav */}
            <BottomNavBar
              currentScreen={currentScreen}
              onNavigate={setCurrentScreen}
            />
          </div>
        </div>
      ) : (
        /* Responsive Desktop & Tablet Layout */
        <div className="flex flex-col min-h-screen">
          <TopAppBar
            currentScreen={currentScreen}
            onNavigate={setCurrentScreen}
            user={user}
          />

          <main className="grow">
            {renderActiveScreen()}
          </main>

          <BottomNavBar
            currentScreen={currentScreen}
            onNavigate={setCurrentScreen}
          />
        </div>
      )}
    </div>
  );
}
