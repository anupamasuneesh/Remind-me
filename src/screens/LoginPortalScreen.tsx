import React, { useState } from 'react';
import { ScreenId } from '../types';

interface LoginPortalProps {
  onNavigate: (screen: ScreenId) => void;
  onLoginSuccess: () => void;
}

export const LoginPortalScreen: React.FC<LoginPortalProps> = ({
  onNavigate,
  onLoginSuccess,
}) => {
  const [accountId, setAccountId] = useState('alex.rivera@university.edu');
  const [securityKey, setSecurityKey] = useState('empire12345');
  const [showPassword, setShowPassword] = useState(false);
  const [bannerMsg, setBannerMsg] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setBannerMsg('Authenticating portal access...');
    setTimeout(() => {
      onLoginSuccess();
    }, 700);
  };

  return (
    <div className="relative min-h-screen bg-[#0e0c20] text-white flex items-center justify-center overflow-hidden p-4 md:p-8 select-none">
      {/* Immersive Background Glowing Shapes */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="floating-blob w-[450px] md:w-[600px] h-[450px] md:h-[600px] bg-[#9e49e3] -top-36 -left-36 opacity-35" />
        <div
          className="floating-blob w-[500px] md:w-[650px] h-[500px] md:h-[650px] bg-[#4361ee] -bottom-48 -right-32 opacity-30"
          style={{ animationDelay: '-5s' }}
        />
        <div
          className="floating-blob w-[350px] md:w-[450px] h-[350px] md:h-[450px] bg-[#0a70c8] top-1/2 left-1/3 opacity-20"
          style={{ animationDelay: '-10s' }}
        />
      </div>

      {bannerMsg && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-primary-container text-white px-6 py-2.5 rounded-full shadow-2xl text-xs md:text-sm font-semibold animate-in fade-in slide-in-from-top-4 flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px] animate-spin">refresh</span>
          <span>{bannerMsg}</span>
        </div>
      )}

      <main className="w-full max-w-md relative z-10 flex flex-col items-center">
        {/* Brand Identity */}
        <div className="text-center mb-8 w-full">
          <div className="flex items-center justify-center mb-5">
            <div className="glass-card p-4 md:p-5 rounded-[24px] text-primary-fixed flex items-center justify-center shadow-2xl border border-white/10 hover:rotate-6 transition-transform">
              <span
                className="material-symbols-outlined text-[42px] md:text-[48px] icon-filled text-[#bac3ff]"
              >
                event_repeat
              </span>
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-3">
            Remind Me
          </h1>

          {/* Motivational Quote Glass Badge */}
          <div className="mx-auto my-3 inline-block">
            <h2
              className="text-base md:text-lg text-primary-fixed italic font-extrabold text-center px-6 py-2 glass-card rounded-2xl border border-white/10 shadow-xl transition-transform hover:scale-[1.03]"
              style={{
                textShadow: 'rgba(186, 195, 255, 0.35) 0px 0px 20px',
                letterSpacing: '0.04em',
              }}
            >
              “Excuses Don't Build Empires”
            </h2>
          </div>

          <p className="text-xs md:text-sm text-white/60 mt-1">
            Your premium portal to attendance management.
          </p>
        </div>

        {/* Login Glass Card */}
        <div className="glass-card rounded-[32px] p-6 md:p-8 w-full shadow-2xl border border-white/15">
          <form onSubmit={handleLogin} className="space-y-5">
            {/* Account ID */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-white/80 ml-1">Account ID</label>
              <div className="relative group">
                <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-primary-fixed transition-colors text-[20px]">
                  alternate_email
                </span>
                <input
                  type="text"
                  value={accountId}
                  onChange={(e) => setAccountId(e.target.value)}
                  placeholder="Email or phone"
                  className="glass-input w-full pl-11 pr-4 py-3.5 rounded-[18px] outline-none transition-all text-xs md:text-sm placeholder:text-white/30"
                  required
                />
              </div>
            </div>

            {/* Security Key */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center px-1">
                <label className="text-xs font-semibold text-white/80">Security Key</label>
                <button
                  type="button"
                  onClick={() =>
                    setBannerMsg('Password recovery link sent to your registered email.')
                  }
                  className="text-xs text-primary-fixed hover:text-white transition-colors cursor-pointer"
                >
                  Recovery?
                </button>
              </div>
              <div className="relative group">
                <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-primary-fixed transition-colors text-[20px]">
                  lock
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={securityKey}
                  onChange={(e) => setSecurityKey(e.target.value)}
                  placeholder="••••••••"
                  className="glass-input w-full pl-11 pr-11 py-3.5 rounded-[18px] outline-none transition-all text-xs md:text-sm placeholder:text-white/30 font-mono"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors cursor-pointer"
                  title={showPassword ? 'Hide Security Key' : 'Show Security Key'}
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            {/* Enter Portal Button */}
            <button
              type="submit"
              className="w-full py-4 bg-primary text-on-primary rounded-full font-bold text-sm md:text-base shadow-2xl shadow-primary/40 hover:bg-primary-container hover:scale-[1.02] active:scale-95 transition-all flex justify-center items-center gap-2 mt-4 cursor-pointer"
            >
              <span>Enter Portal</span>
              <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
            </button>
          </form>
        </div>

        {/* Create Account Section */}
        <div
          onClick={() => onNavigate('create_account')}
          className="glass-card rounded-full mt-5 px-6 py-3.5 w-full flex items-center justify-between group cursor-pointer hover:bg-white/10 transition-all border border-white/10 active:scale-98"
        >
          <span className="text-xs md:text-sm font-medium text-white/70">New here?</span>
          <button
            type="button"
            className="text-xs md:text-sm font-bold text-primary-fixed flex items-center gap-1.5 group-hover:translate-x-1 transition-transform cursor-pointer"
          >
            <span>Create Account</span>
            <span className="material-symbols-outlined text-[18px]">add_circle</span>
          </button>
        </div>

        {/* Footer */}
        <footer className="mt-8 text-center">
          <p className="text-xs text-white/40 max-w-[280px] mx-auto leading-relaxed">
            Secure access protected by{' '}
            <span className="text-white/70 hover:underline cursor-pointer">Terms</span> &amp;{' '}
            <span className="text-white/70 hover:underline cursor-pointer">Privacy</span>.
          </p>
        </footer>
      </main>
    </div>
  );
};
