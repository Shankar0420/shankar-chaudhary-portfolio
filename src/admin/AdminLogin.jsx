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
  ChevronLeft,
  Copy,
  Check,
  Download,
  AlertTriangle,
  Info
} from 'lucide-react';
import { useAdminAuth } from '../context/AdminAuthContext';
import { portfolioApi } from '../services/portfolioApi';

export default function AdminLogin() {
  const { login, setup, completeAuthWithToken, isInitialized, authorizedMobile, refreshStatus } = useAdminAuth();

  const [mode, setMode] = useState(isInitialized ? 'login' : 'setup'); // 'login' | 'setup' | 'recover' | 'key_display'
  const [mobileNumber, setMobileNumber] = useState(authorizedMobile || '9905340058');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [recoveryKey, setRecoveryKey] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Recovery Key Display State (Shown once on setup or recovery)
  const [displayedRecoveryKey, setDisplayedRecoveryKey] = useState('');
  const [pendingAuthToken, setPendingAuthToken] = useState(null);
  const [hasCopied, setHasCopied] = useState(false);
  const [confirmedSaved, setConfirmedSaved] = useState(false);

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

    // --- SETUP FLOW ---
    if (mode === 'setup') {
      if (password.length < 8) {
        setError('Password must be at least 8 characters long.');
        return;
      }
      if (password !== confirmPassword) {
        setError('Passwords do not match. Please re-enter.');
        return;
      }
      setLoading(true);
      try {
        const res = await setup(mobileNumber.trim(), password);
        if (res.recoveryKey) {
          setDisplayedRecoveryKey(res.recoveryKey);
          setPendingAuthToken(res.token);
          setMode('key_display');
        } else {
          completeAuthWithToken(res.token, mobileNumber.trim(), rememberMe);
        }
      } catch (err) {
        setError(err.message || 'Failed to initialize admin account.');
      } finally {
        setLoading(false);
      }
      return;
    }

    // --- RECOVERY FLOW ---
    if (mode === 'recover') {
      if (!recoveryKey.trim()) {
        setError('Please provide your Emergency Recovery Key.');
        return;
      }
      if (password.length < 8) {
        setError('New password must be at least 8 characters long.');
        return;
      }
      if (password !== confirmPassword) {
        setError('New passwords do not match.');
        return;
      }
      setLoading(true);
      try {
        const res = await portfolioApi.recoverPassword(mobileNumber.trim(), recoveryKey.trim(), password);
        if (res.recoveryKey) {
          setDisplayedRecoveryKey(res.recoveryKey);
          setPendingAuthToken(res.token);
          setMode('key_display');
        } else {
          setSuccessNotice('Password reset successfully! Logging you in...');
          setTimeout(() => {
            completeAuthWithToken(res.token, mobileNumber.trim(), rememberMe);
          }, 1000);
        }
      } catch (err) {
        setError(err.message || 'Invalid recovery key or recovery error.');
      } finally {
        setLoading(false);
      }
      return;
    }

    // --- LOGIN FLOW ---
    if (!password) {
      setError('Please enter your admin password.');
      return;
    }

    setLoading(true);
    try {
      await login(mobileNumber.trim(), password, rememberMe);
    } catch (err) {
      setError(err.message || 'Login failed. Please verify your password.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopyKey = () => {
    if (!displayedRecoveryKey) return;
    try {
      navigator.clipboard.writeText(displayedRecoveryKey);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = displayedRecoveryKey;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    setHasCopied(true);
    setTimeout(() => setHasCopied(false), 3000);
  };

  const handleDownloadKey = () => {
    if (!displayedRecoveryKey) return;
    const content = `==========================================================\nSHANKAR CHAUDHARY PORTFOLIO - EMERGENCY RECOVERY KEY\n==========================================================\nRegistered Mobile: ${authorizedMobile}\nGenerated: ${new Date().toISOString()}\n\nEMERGENCY RECOVERY KEY:\n${displayedRecoveryKey}\n\nIMPORTANT:\n- Keep this file completely private and secure.\n- This key is required to reset your password if forgotten.\n- It will not be shown again.\n==========================================================\n`;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `portfolio-recovery-key-${authorizedMobile}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleFinishKeyDisplay = () => {
    if (pendingAuthToken) {
      completeAuthWithToken(pendingAuthToken, authorizedMobile, rememberMe);
    } else {
      setMode('login');
      refreshStatus();
    }
  };

  // --- RECOVERY KEY ONE-TIME DISPLAY SCREEN ---
  if (mode === 'key_display') {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 py-12 relative overflow-hidden bg-[#060813]">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="w-full max-w-lg glass-card rounded-3xl p-7 sm:p-9 border border-amber-500/40 shadow-2xl space-y-6 relative z-10 bg-[#090d22]">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300 shadow-lg shadow-amber-950/40 mb-2">
              <KeyRound className="w-8 h-8" />
            </div>
            <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold">
              Critical Security Credential
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Emergency Recovery Key
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              Your account has been cryptographically secured. This key is your <span className="text-white font-semibold">only method</span> to regain access if you forget your password.
            </p>
          </div>

          {/* Warning Banner */}
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-bold text-white">This key will NEVER be shown again!</p>
              <p className="text-amber-200/90 leading-relaxed">
                Copy this key or download the text file now and store it in a secure password manager or safe folder.
              </p>
            </div>
          </div>

          {/* Monospace Key Display Box */}
          <div className="p-5 rounded-2xl bg-slate-950 border-2 border-cyan-500/50 space-y-3 text-center shadow-inner">
            <span className="text-[11px] font-mono uppercase text-slate-400 tracking-wider">
              Secret 128-Bit Recovery Key
            </span>
            <div className="text-lg sm:text-xl font-mono font-extrabold text-cyan-300 tracking-wider break-all select-all py-1">
              {displayedRecoveryKey}
            </div>
          </div>

          {/* Action Buttons: Copy & Download */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={handleCopyKey}
              className={`inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                hasCopied
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-900 hover:bg-slate-800 text-white border border-slate-700'
              }`}
            >
              {hasCopied ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4 text-cyan-400" />}
              <span>{hasCopied ? 'Copied to Clipboard!' : 'Copy Recovery Key'}</span>
            </button>

            <button
              type="button"
              onClick={handleDownloadKey}
              className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold bg-slate-900 hover:bg-slate-800 text-white border border-slate-700 transition-colors"
            >
              <Download className="w-4 h-4 text-purple-400" />
              <span>Download .txt File</span>
            </button>
          </div>

          {/* Mandatory Confirmation Checkbox */}
          <label className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 cursor-pointer select-none text-xs text-slate-300 hover:border-slate-700 transition-colors">
            <input
              type="checkbox"
              checked={confirmedSaved}
              onChange={(e) => setConfirmedSaved(e.target.checked)}
              className="mt-0.5 w-4 h-4 rounded border-slate-700 bg-slate-950 text-cyan-500 focus:ring-cyan-500"
            />
            <span>
              I have copied and safely stored my Emergency Recovery Key. I understand that without this key, I cannot reset my password.
            </span>
          </label>

          {/* Continue Button */}
          <button
            type="button"
            disabled={!confirmedSaved}
            onClick={handleFinishKeyDisplay}
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white shadow-lg shadow-purple-950/40 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <span>Proceed to Admin Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  // --- LOGIN / SETUP / RECOVER SCREENS ---
  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 py-12 relative overflow-hidden bg-[#060813]">
      {/* Background ambient glows */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

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
              ? 'Reset your password using your Emergency Recovery Key.'
              : 'Sign in using your registered mobile number and password.'}
          </p>
        </div>

        {/* Notices */}
        {error && (
          <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs sm:text-sm flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span>{error}</span>
              {mode === 'recover' && (
                <p className="text-[11px] text-slate-400 pt-1">
                  Tip: If you never saved your recovery key, set <code className="font-mono text-cyan-300 bg-slate-900 px-1 py-0.5 rounded">INITIAL_ADMIN_PASSWORD=your_new_pass</code> in your hosting provider's environment variables to reset your password directly.
                </p>
              )}
            </div>
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

          {/* Recovery Key Input (Only in recover mode) */}
          {mode === 'recover' && (
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-slate-200 flex items-center justify-between">
                <span>Emergency Recovery Key <span className="text-purple-400">*</span></span>
                <span className="text-[11px] text-cyan-300 font-mono">Format: REC-XXXX...</span>
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={recoveryKey}
                  onChange={(e) => setRecoveryKey(e.target.value)}
                  placeholder="REC-XXXX-XXXX-XXXX-XXXX"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950/90 border border-slate-800 text-sm font-mono text-cyan-300 focus:outline-none focus:border-cyan-400 transition-colors"
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
                placeholder={mode === 'setup' || mode === 'recover' ? 'Set a strong password (min 8 chars)' : '••••••••••••'}
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

          {/* Confirm Password Field (for setup and recover modes) */}
          {(mode === 'setup' || mode === 'recover') && (
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-slate-200">
                Confirm {mode === 'recover' ? 'New ' : ''}Password <span className="text-purple-400">*</span>
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
                ? 'Complete Setup & Generate Key'
                : mode === 'recover'
                ? 'Reset Password & View Key'
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
        Protected with BCrypt, Secure 128-Bit Recovery Keys, and Rate Limiting
      </p>
    </div>
  );
}
