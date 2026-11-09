import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Lock,
  Phone,
  KeyRound,
  ShieldCheck,
  AlertCircle,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
  HelpCircle,
  ChevronLeft
} from 'lucide-react';
import { useAdminAuth } from '../context/AdminAuthContext';
import { portfolioApi } from '../services/portfolioApi';

export default function AdminLogin() {
  const { login, setup, isInitialized, authorizedMobile, refreshStatus } = useAdminAuth();

  const [mode, setMode] = useState(isInitialized ? 'login' : 'setup'); // 'login' | 'setup' | 'recover'
  const [mobileNumber, setMobileNumber] = useState(authorizedMobile || '9905340058');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [recoveryPin, setRecoveryPin] = useState('');
  const [recoveryKey, setRecoveryKey] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successNotice, setSuccessNotice] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessNotice(null);

    if (mobileNumber.trim() !== authorizedMobile) {
      setError(`Unauthorized mobile number. Only the portfolio owner (${authorizedMobile}) is authorized.`);
      return;
    }

    if (mode === 'setup') {
      if (password.length < 8) {
        setError('Password must be at least 8 characters long.');
        return;
      }
      if (password !== confirmPassword) {
        setError('Passwords do not match.');
        return;
      }
      setLoading(true);
      try {
        await setup(mobileNumber.trim(), password, recoveryPin.trim());
        setSuccessNotice('Admin account initialized successfully! Logging you in...');
      } catch (err) {
        setError(err.message || 'Failed to initialize admin account.');
      } finally {
        setLoading(false);
      }
      return;
    }

    if (mode === 'recover') {
      if (!recoveryKey.trim()) {
        setError('Please provide your recovery key or recovery PIN.');
        return;
      }
      if (password.length < 8) {
        setError('New password must be at least 8 characters long.');
        return;
      }
      setLoading(true);
      try {
        await portfolioApi.recoverPassword(mobileNumber.trim(), recoveryKey.trim(), password);
        setSuccessNotice('Password recovered and reset successfully! Logging you in...');
        setTimeout(() => {
          refreshStatus();
          setMode('login');
        }, 1200);
      } catch (err) {
        setError(err.message || 'Invalid recovery key or recovery error.');
      } finally {
        setLoading(false);
      }
      return;
    }

    // Default: 'login'
    if (!password) {
      setError('Please enter your admin password.');
      return;
    }

    setLoading(true);
    try {
      await login(mobileNumber.trim(), password, rememberMe);
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 py-12 relative overflow-hidden bg-[#060813]">
      {/* Background ambient glows */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />

      {/* Back to Public Portfolio Link */}
      <div className="w-full max-w-md mb-6 flex justify-between items-center text-xs">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-slate-400 hover:text-cyan-300 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Return to Public Portfolio</span>
        </Link>
        <span className="font-mono text-purple-400 font-semibold text-[11px] bg-purple-500/10 px-2.5 py-1 rounded-full border border-purple-500/20">
          Owner Portal
        </span>
      </div>

      <div className="w-full max-w-md glass-card rounded-3xl p-7 sm:p-8 border border-slate-800 shadow-2xl space-y-6 relative z-10">
        {/* Header Badge & Title */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-purple-600 to-cyan-500 p-[1px] shadow-lg shadow-purple-950/50 mb-3">
            <div className="w-full h-full bg-[#090d1f] rounded-[15px] flex items-center justify-center text-cyan-300">
              <ShieldCheck className="w-7 h-7" />
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {mode === 'setup'
              ? 'One-Time Admin Setup'
              : mode === 'recover'
              ? 'Owner Password Recovery'
              : 'Admin Dashboard Login'}
          </h1>

          <p className="text-xs sm:text-sm text-slate-400">
            {mode === 'setup'
              ? `Initialize the single admin owner account for ${authorizedMobile}.`
              : mode === 'recover'
              ? 'Reset your password using your secret recovery key.'
              : 'Sign in using your registered mobile number and password.'}
          </p>
        </div>

        {/* Notices */}
        {error && (
          <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs sm:text-sm flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {successNotice && (
          <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs sm:text-sm flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span>{successNotice}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          {/* Mobile Number Field */}
          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-slate-200">
              Registered Mobile Number <span className="text-purple-400">*</span>
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="tel"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                placeholder="9905340058"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950/90 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-400 transition-colors font-mono"
                required
              />
            </div>
            <p className="text-[11px] text-slate-400">Only authorized mobile number is permitted.</p>
          </div>

          {/* Recovery Key input (for recover mode) */}
          {mode === 'recover' && (
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-slate-200">
                Secret Recovery Key / PIN <span className="text-purple-400">*</span>
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="password"
                  value={recoveryKey}
                  onChange={(e) => setRecoveryKey(e.target.value)}
                  placeholder="Enter recovery key or PIN"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950/90 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-400 transition-colors"
                  required
                />
              </div>
            </div>
          )}

          {/* Password Field */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-medium text-slate-200">
                {mode === 'recover' ? 'New Password' : 'Password'} <span className="text-purple-400">*</span>
              </label>
              {mode === 'login' && (
                <button
                  type="button"
                  onClick={() => { setMode('recover'); setError(null); }}
                  className="text-[11px] text-cyan-300 hover:text-white transition-colors"
                >
                  Forgot password?
                </button>
              )}
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={mode === 'setup' ? 'Set a strong password (min 8 chars)' : '••••••••••••'}
                className="w-full pl-10 pr-10 py-3 rounded-xl bg-slate-950/90 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-400 transition-colors"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="p-1 text-slate-400 hover:text-white absolute right-3 top-1/2 -translate-y-1/2"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Setup Extra Fields */}
          {mode === 'setup' && (
            <>
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-slate-200">
                  Confirm Password <span className="text-purple-400">*</span>
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter your password"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950/90 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-400 transition-colors"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-slate-200 flex items-center justify-between">
                  <span>Optional Recovery PIN</span>
                  <span className="text-[11px] text-slate-400">Used for password resets</span>
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="password"
                    value={recoveryPin}
                    onChange={(e) => setRecoveryPin(e.target.value)}
                    placeholder="e.g. 6-digit backup PIN"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950/90 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-400 transition-colors font-mono"
                  />
                </div>
              </div>
            </>
          )}

          {/* Remember me checkbox */}
          {mode === 'login' && (
            <div className="flex items-center gap-2 pt-1 text-xs text-slate-300">
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-slate-700 bg-slate-900 text-purple-600 focus:ring-purple-500"
              />
              <label htmlFor="remember" className="cursor-pointer">
                Keep me signed in on this device
              </label>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-3 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white shadow-lg shadow-purple-900/30 transition-all disabled:opacity-50"
          >
            <span>
              {loading
                ? 'Processing...'
                : mode === 'setup'
                ? 'Complete Initial Setup'
                : mode === 'recover'
                ? 'Reset & Sign In'
                : 'Sign In to Dashboard'}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Mode Switcher */}
        {mode !== 'login' && (
          <div className="text-center pt-2">
            <button
              type="button"
              onClick={() => { setMode('login'); setError(null); }}
              className="text-xs text-slate-400 hover:text-white transition-colors"
            >
              Already set up? Back to Login
            </button>
          </div>
        )}
      </div>

      <p className="mt-8 text-xs text-slate-500 font-mono text-center">
        Protected with BCrypt, Rate Limiting, and Session Tokens • Single-Owner System
      </p>
    </div>
  );
}

