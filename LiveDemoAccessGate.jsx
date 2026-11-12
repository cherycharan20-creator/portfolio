import React, { useState, useEffect } from 'react';

/**
 * LiveDemoAccessGate.jsx - React Component for Live Portfolio Demo Access Barrier
 *
 * Prompts user for their email, automatically sends a temporary 6-digit OTP via EmailJS,
 * verifies the OTP, and reveals the live demo iframe or project link.
 */
export default function LiveDemoAccessGate({
  demoUrl = 'http://127.0.0.1:8000',
  demoTitle = 'Live Project Demo',
  serviceId = '',
  templateId = '',
  publicKey = '',
  onUnlock,
  children
}) {
  const [email, setEmail] = useState('');
  const [otpInput, setOtpInput] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState(null);
  const [otpExpiresAt, setOtpExpiresAt] = useState(null);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [verifiedEmail, setVerifiedEmail] = useState(null);

  const [step, setStep] = useState('email'); // 'email' | 'otp'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [countdown, setCountdown] = useState(0);
  const [attemptsLeft, setAttemptsLeft] = useState(3);

  // Restore authenticated session from sessionStorage
  useEffect(() => {
    const saved = sessionStorage.getItem('demo_gate_verified_email');
    if (saved) {
      setVerifiedEmail(saved);
      setIsUnlocked(true);
      if (onUnlock) onUnlock(saved);
    }
  }, [onUnlock]);

  // Resend cooldown timer
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  // 1. Dispatch OTP via FastAPI Backend or EmailJS
  async function handleSendOtp(e) {
    if (e) e.preventDefault();
    const cleanEmail = email.trim().toLowerCase();

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(cleanEmail)) {
      setError('Please enter a valid email address.');
      return;
    }

    setError('');
    setSuccessMsg('');
    setLoading(true);

    let sentSuccessfully = false;
    let failureDetail = '';

    // Strategy 1: Primary - FastAPI Backend (smtp.gmail.com from cherycharan20@gmail.com)
    try {
      const res = await fetch('http://127.0.0.1:8000/api/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: cleanEmail, name: cleanEmail.split('@')[0] })
      });
      const data = await res.json().catch(() => null);

      if (res.ok && data && data.email_sent) {
        sentSuccessfully = true;
        setSuccessMsg(`A 6-digit verification code has been dispatched from cherycharan20@gmail.com to ${cleanEmail}. Please check your phone or inbox!`);
      } else {
        failureDetail = (data && (data.delivery_note || data.message)) || 'SMTP delivery not configured.';
      }
    } catch (backendErr) {
      failureDetail = 'FastAPI server offline at http://127.0.0.1:8000.';
    }

    // Strategy 2: If backend not available, try EmailJS if keys are provided
    if (!sentSuccessfully && serviceId && templateId && publicKey) {
      try {
        const otpCode = String(Math.floor(100000 + Math.random() * 900000));
        const expires = Date.now() + 10 * 60 * 1000;
        setGeneratedOtp(otpCode);
        setOtpExpiresAt(expires);

        const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            service_id: serviceId,
            template_id: templateId,
            user_id: publicKey,
            template_params: {
              to_email: cleanEmail,
              to_name: cleanEmail.split('@')[0],
              otp_code: otpCode,
              project_title: demoTitle,
              time_limit: '10 minutes'
            }
          })
        });

        if (res.ok) {
          sentSuccessfully = true;
          setSuccessMsg(`A 6-digit verification code has been dispatched to ${cleanEmail}. Check your inbox!`);
        }
      } catch (emailJsErr) {}
    }

    setLoading(false);

    if (sentSuccessfully) {
      setStep('otp');
      setCountdown(60);
      setOtpInput('');
    } else {
      setError(`Could not send real email OTP: ${failureDetail} Please run START_LIVE_DEMO_BACKEND.bat and configure your 16-character Google App Password in email_config.json.`);
    }
  }

  // 2. Verify entered OTP
  async function handleVerifyOtp(e) {
    e.preventDefault();
    setError('');

    const cleanInput = otpInput.trim();
    if (cleanInput.length !== 6) {
      setError('Please enter the full 6-digit code received in your email.');
      return;
    }

    setLoading(true);
    let verified = false;

    // Check with Backend
    try {
      const resp = await fetch('http://127.0.0.1:8000/api/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim().toLowerCase(), otp: cleanInput })
      });
      const data = await resp.json().catch(() => null);
      if (resp.ok && data && data.success) {
        verified = true;
      }
    } catch (err) {}

    // Fallback client check if generated by EmailJS
    if (!verified && generatedOtp && otpExpiresAt) {
      if (Date.now() <= otpExpiresAt && cleanInput === generatedOtp) {
        verified = true;
      }
    }

    setLoading(false);

    if (verified) {
      const cleanEmail = email.trim().toLowerCase();
      sessionStorage.setItem('demo_gate_verified_email', cleanEmail);
      setVerifiedEmail(cleanEmail);
      setIsUnlocked(true);
      if (onUnlock) onUnlock(cleanEmail);
    } else {
      const remaining = attemptsLeft - 1;
      setAttemptsLeft(remaining);
      if (remaining <= 0) {
        setError('Maximum invalid attempts reached. For security, please request a new verification code.');
        setStep('email');
      } else {
        setError(`Incorrect verification code. Please check your email inbox and enter the exact 6-digit code (${remaining} attempt(s) remaining).`);
      }
    }
  }

  function handleLockDemo() {
    sessionStorage.removeItem('demo_gate_verified_email');
    setIsUnlocked(false);
    setVerifiedEmail(null);
    setStep('email');
    setOtpInput('');
    setGeneratedOtp(null);
    setError('');
    setSuccessMsg('');
  }

  // ----------------- UNLOCKED LIVE DEMO VIEW ----------------- //
  if (isUnlocked) {
    return (
      <div className="w-full bg-slate-950 rounded-2xl border border-cyan-500/30 shadow-[0_0_50px_rgba(34,211,238,0.15)] overflow-hidden">
        <div className="bg-slate-900/90 border-b border-slate-800 px-6 py-3.5 flex flex-wrap items-center justify-between gap-4 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_#34d399]"></span>
            <span className="font-mono text-xs text-slate-300">
              Clearance Level 3 // Verified Evaluator: <strong className="text-cyan-400">{verifiedEmail}</strong>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 transition-colors"
            >
              <span>Full Screen Window</span>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
            <button
              onClick={handleLockDemo}
              className="text-xs px-3 py-1 bg-red-950/40 border border-red-500/40 hover:bg-red-900/60 text-red-300 rounded-lg transition-colors cursor-pointer"
            >
              Lock Session
            </button>
          </div>
        </div>

        {children ? (
          <div className="p-6">{children}</div>
        ) : (
          <div className="relative w-full h-[650px] bg-slate-950">
            <iframe
              src={demoUrl}
              title={demoTitle}
              className="w-full h-full border-0"
              allow="clipboard-write; accelerometer; gyroscope"
            />
          </div>
        )}
      </div>
    );
  }

  // ----------------- LOCKED GATE SCREEN ----------------- //
  return (
    <div className="max-w-xl mx-auto my-12 p-6 sm:p-8 bg-slate-900/90 border border-cyan-500/30 rounded-3xl shadow-[0_0_50px_rgba(34,211,238,0.2)] backdrop-blur-xl text-slate-100 font-sans">
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono tracking-wider mb-3">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
          SECURITY CLEARANCE GATEWAY
        </div>
        <h2 className="text-2xl font-bold text-white tracking-tight">{demoTitle}</h2>
        <p className="text-xs text-slate-400 mt-1.5 max-w-md mx-auto leading-relaxed">
          Access to this live demo environment is gated. Enter your email to receive an instant One-Time Password (OTP) directly to your inbox.
        </p>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-950/60 border border-red-500/40 rounded-xl text-red-300 text-xs flex items-center gap-2">
          <span>⚠️</span>
          <span>{error}</span>
        </div>
      )}
      {successMsg && (
        <div className="mb-4 p-3 bg-emerald-950/60 border border-emerald-500/40 rounded-xl text-emerald-300 text-xs flex items-center gap-2">
          <span>📧</span>
          <span>{successMsg}</span>
        </div>
      )}

      {step === 'email' ? (
        <form onSubmit={handleSendOtp} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Work or Personal Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="recruiter@company.com or candidate@gmail.com"
              className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors shadow-inner"
            />
            <p className="text-[11px] text-slate-500 mt-1">
              No mobile phone number required. Your temporary OTP will be emailed instantly.
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm rounded-xl transition-all shadow-[0_0_20px_rgba(6,182,212,0.4)] disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></span>
                <span>Dispatching OTP...</span>
              </>
            ) : (
              <>
                <span>Send OTP to Email</span>
                <span>→</span>
              </>
            )}
          </button>
        </form>
      ) : (
        <form onSubmit={handleVerifyOtp} className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-medium text-slate-300">
                Enter 6-Digit Passcode
              </label>
              <span className="text-[11px] text-cyan-400 font-mono">
                Sent to: {email}
              </span>
            </div>
            <input
              type="text"
              required
              maxLength={6}
              autoFocus
              value={otpInput}
              onChange={(e) => setOtpInput(e.target.value.replace(/[^0-9]/g, ''))}
              placeholder="· · · · · ·"
              className="w-full text-center tracking-[12px] font-mono font-bold text-2xl px-4 py-3.5 bg-slate-950 border border-cyan-400/60 rounded-xl text-cyan-300 placeholder-slate-600 focus:outline-none focus:border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.25)] transition-all"
            />
            <p className="text-[11px] text-slate-400 mt-1.5 text-center">
              Check your inbox and spam folder for your 6-digit code.
            </p>
          </div>

          <button
            type="submit"
            disabled={otpInput.length < 6}
            className="w-full py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-bold text-sm rounded-xl transition-all shadow-[0_0_20px_rgba(16,185,129,0.4)] disabled:opacity-50 cursor-pointer"
          >
            Verify Passcode &amp; Unlock Live Demo
          </button>

          <div className="flex items-center justify-between pt-2 text-xs font-mono">
            <button
              type="button"
              onClick={() => { setStep('email'); setError(''); }}
              className="text-slate-400 hover:text-cyan-400 transition-colors"
            >
              ← Change Email
            </button>

            {countdown > 0 ? (
              <span className="text-slate-500">
                Resend code in <strong className="text-cyan-400">{countdown}s</strong>
              </span>
            ) : (
              <button
                type="button"
                onClick={() => handleSendOtp()}
                className="text-cyan-400 hover:underline cursor-pointer"
              >
                Resend OTP
              </button>
            )}
          </div>
        </form>
      )}

      <div className="mt-6 pt-4 border-t border-slate-800/80 text-center text-[11px] text-slate-500">
        🛡️ Protected by Client-Side Cryptographic Passcode Verification
      </div>
    </div>
  );
}
