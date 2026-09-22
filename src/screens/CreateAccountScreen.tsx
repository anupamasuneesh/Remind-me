import React, { useState } from 'react';
import { ScreenId } from '../types';

interface CreateAccountProps {
  onNavigate: (screen: ScreenId) => void;
  onSuccess: () => void;
}

export const CreateAccountScreen: React.FC<CreateAccountProps> = ({
  onNavigate,
  onSuccess,
}) => {
  const [username, setUsername] = useState('johndoe123');
  const [contact, setContact] = useState('email@example.com');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('password123');
  const [confirmPassword, setConfirmPassword] = useState('password123');
  const [agreed, setAgreed] = useState(true);
  const [otpSent, setOtpSent] = useState(false);
  const [bannerMessage, setBannerMessage] = useState<string | null>(null);

  const handleSendOtp = () => {
    setOtpSent(true);
    setOtp('849201');
    setBannerMessage('OTP code 849201 sent to your contact!');
    setTimeout(() => setBannerMessage(null), 4000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) {
      setBannerMessage('Please accept the Terms of Service to continue.');
      return;
    }
    setBannerMessage('Account created successfully! Welcome to Remind Me.');
    setTimeout(() => {
      onSuccess();
    }, 800);
  };

  return (
    <div className="bg-background text-on-surface min-h-[90vh] flex flex-col items-center justify-center relative overflow-hidden py-8 px-4">
      {/* Decorative Atmosphere Blobs */}
      <div className="absolute top-10 left-[10%] w-24 h-24 bg-primary/10 blur-3xl rounded-full -z-10 pointer-events-none" />
      <div className="absolute bottom-10 right-[15%] w-32 h-32 bg-secondary/10 blur-3xl rounded-full -z-10 pointer-events-none" />

      {/* Side Decorative Shapes on XL screens */}
      <div className="absolute top-20 left-[6%] w-12 h-12 border-2 border-primary/20 rounded-lg rotate-12 animate-pulse hidden xl:block pointer-events-none" />
      <div
        className="absolute bottom-20 right-[8%] w-16 h-16 border-2 border-secondary/20 rounded-full animate-bounce hidden xl:block pointer-events-none"
        style={{ animationDuration: '4s' }}
      />

      {bannerMessage && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-primary text-on-primary px-5 py-2.5 rounded-full shadow-lg text-sm font-medium animate-in fade-in slide-in-from-top-4 flex items-center gap-2">
          <span className="material-symbols-outlined text-sm">info</span>
          <span>{bannerMessage}</span>
        </div>
      )}

      {/* Main Content Area */}
      <main className="w-full max-w-[1200px] flex items-center justify-center z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center w-full">
          {/* Left Branding Side (Desktop Only) */}
          <div className="hidden lg:flex lg:col-span-6 flex-col gap-4">
            <div className="flex items-center gap-2">
              <span
                className="material-symbols-outlined text-primary text-[48px] icon-filled"
              >
                alarm_on
              </span>
              <h1 className="text-4xl font-bold text-primary tracking-tight font-sans">
                Remind Me
              </h1>
            </div>
            <p className="text-lg text-on-surface-variant max-w-md leading-relaxed">
              Empowering students with structured clarity. Join thousands of users managing
              their schedules and attendance with professional rigor.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="bg-surface-container-lowest p-5 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-outline-variant/30">
                <span
                  className="material-symbols-outlined text-secondary text-2xl icon-filled"
                >
                  calendar_month
                </span>
                <h3 className="text-base font-bold mt-2 text-on-surface">Smart Schedules</h3>
                <p className="text-xs text-outline mt-1">Never miss a class again.</p>
              </div>
              <div className="bg-surface-container-lowest p-5 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-outline-variant/30">
                <span
                  className="material-symbols-outlined text-tertiary text-2xl icon-filled"
                >
                  bar_chart
                </span>
                <h3 className="text-base font-bold mt-2 text-on-surface">Live Tracking</h3>
                <p className="text-xs text-outline mt-1">Analyze your attendance trends.</p>
              </div>
            </div>
          </div>

          {/* Right Registration Card */}
          <div className="lg:col-span-6 flex justify-center w-full">
            <div className="glass-panel w-full max-w-[460px] rounded-[32px] p-6 md:p-8 shadow-[0_8px_40px_rgba(0,0,0,0.08)] relative border border-white/60">
              <div className="text-center mb-6">
                <div className="flex justify-center mb-3">
                  <span
                    className="material-symbols-outlined text-primary text-[42px] icon-filled"
                  >
                    alarm_on
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-on-surface">Create Account</h2>
                <p className="text-sm text-on-surface-variant mt-1">
                  Enter your details to get started with Remind Me
                </p>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {/* Username Field */}
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-on-surface-variant px-1" htmlFor="username">
                    Username
                  </label>
                  <div className="relative group">
                    <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors text-[20px]">
                      person
                    </span>
                    <input
                      id="username"
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="johndoe123"
                      className="w-full pl-11 pr-4 py-3 rounded-xl border-2 border-surface-container-highest bg-surface-container-lowest focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none text-sm text-on-surface"
                      required
                    />
                  </div>
                </div>

                {/* Contact Field & Send OTP */}
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-on-surface-variant px-1" htmlFor="contact">
                    Phone Number or Email ID
                  </label>
                  <div className="flex gap-2">
                    <div className="relative flex-grow group">
                      <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors text-[20px]">
                        alternate_email
                      </span>
                      <input
                        id="contact"
                        type="text"
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                        placeholder="email@example.com"
                        className="w-full pl-11 pr-4 py-3 rounded-xl border-2 border-surface-container-highest bg-surface-container-lowest focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none text-sm text-on-surface"
                        required
                      />
                    </div>
                    <button
                      type="button"
                      onClick={handleSendOtp}
                      className="px-4 py-2.5 whitespace-nowrap rounded-xl bg-surface-container-high text-primary font-semibold text-xs hover:bg-primary-container hover:text-on-primary-container transition-all active:scale-95 shadow-xs cursor-pointer"
                    >
                      {otpSent ? 'OTP Sent ✓' : 'Send OTP'}
                    </button>
                  </div>
                </div>

                {/* OTP Field */}
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-on-surface-variant px-1" htmlFor="otp">
                    Verification Code
                  </label>
                  <div className="relative group">
                    <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors text-[20px]">
                      verified_user
                    </span>
                    <input
                      id="otp"
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="6-digit code"
                      className="w-full pl-11 pr-4 py-3 rounded-xl border-2 border-surface-container-highest bg-surface-container-lowest focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none text-sm tracking-widest text-on-surface font-mono"
                    />
                  </div>
                </div>

                {/* Password Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold text-on-surface-variant px-1" htmlFor="password">
                      Password
                    </label>
                    <div className="relative group">
                      <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors text-[20px]">
                        lock
                      </span>
                      <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full pl-11 pr-3 py-3 rounded-xl border-2 border-surface-container-highest bg-surface-container-lowest focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none text-sm text-on-surface"
                        required
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold text-on-surface-variant px-1" htmlFor="confirm_password">
                      Confirm Password
                    </label>
                    <div className="relative group">
                      <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors text-[20px]">
                        lock_reset
                      </span>
                      <input
                        id="confirm_password"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full pl-11 pr-3 py-3 rounded-xl border-2 border-surface-container-highest bg-surface-container-lowest focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none text-sm text-on-surface"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Terms of Service Checkbox */}
                <div className="flex items-start gap-2 px-1 mt-1">
                  <input
                    id="terms"
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="mt-0.5 rounded text-primary focus:ring-primary cursor-pointer w-4 h-4"
                  />
                  <label htmlFor="terms" className="text-xs text-on-surface-variant leading-relaxed cursor-pointer select-none">
                    I agree to the{' '}
                    <span className="text-primary hover:underline font-medium">Terms of Service</span> and{' '}
                    <span className="text-primary hover:underline font-medium">Privacy Policy</span>.
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full mt-2 bg-primary text-on-primary py-3.5 rounded-full font-semibold text-base shadow-[0_8px_24px_rgba(67,97,238,0.25)] hover:bg-primary-container hover:shadow-[0_12px_28px_rgba(67,97,238,0.35)] transition-all active:scale-[0.98] cursor-pointer"
                >
                  Create Account
                </button>
              </form>

              {/* Footer Link */}
              <div className="mt-6 text-center">
                <p className="text-xs text-on-surface-variant">
                  Already have an account?
                  <button
                    type="button"
                    onClick={() => onNavigate('login_portal')}
                    className="font-bold text-primary hover:underline ml-1.5 cursor-pointer"
                  >
                    Login
                  </button>
                </p>
              </div>

              {/* Decorative Card Glows */}
              <div className="absolute -top-8 -right-8 w-24 h-24 bg-secondary/15 blur-2xl rounded-full -z-10 pointer-events-none" />
              <div className="absolute -bottom-8 -left-8 w-28 h-28 bg-primary/15 blur-2xl rounded-full -z-10 pointer-events-none" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
