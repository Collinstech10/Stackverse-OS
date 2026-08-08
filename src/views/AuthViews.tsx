import React, { useState } from 'react';
import { ViewMode } from '../types';
import { Lock, Mail, ArrowRight, User, Building, AlertCircle, Loader2, CheckCircle2, ShieldCheck } from 'lucide-react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithPopup,
  GoogleAuthProvider,
  updateProfile
} from 'firebase/auth';
import { auth } from '../lib/firebase';

interface AuthViewsProps {
  mode: 'login' | 'register' | 'forgot-password';
  onNavigateView: (v: ViewMode) => void;
  onAuthSuccess?: () => void;
}

export const AuthViews: React.FC<AuthViewsProps> = ({ mode, onNavigateView, onAuthSuccess }) => {
  const [fullName, setFullName] = useState('');
  const [workspaceName, setWorkspaceName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const getFriendlyErrorMessage = (errCode: string, defaultMessage: string) => {
    switch (errCode) {
      case 'auth/email-already-in-use':
        return 'An account with this email already exists. Please sign in instead.';
      case 'auth/weak-password':
        return 'Password is too weak. Please use at least 6 characters.';
      case 'auth/invalid-email':
        return 'Please enter a valid email address.';
      case 'auth/user-not-found':
      case 'auth/wrong-password':
      case 'auth/invalid-credential':
        return 'Invalid email or password. Please check your credentials and try again.';
      case 'auth/operation-not-allowed':
        return 'Email/Password and Google sign-in methods are disabled in your Firebase Console project. You can click "Quick Demo Access" below to enter the workspace.';
      case 'auth/popup-closed-by-user':
      case 'auth/cancelled-popup-request':
        return 'Google Sign-In was closed before completing.';
      case 'auth/popup-blocked':
        return 'Sign-In popup was blocked by the browser. Please allow popups and try again.';
      case 'auth/too-many-requests':
        return 'Access to this account has been temporarily disabled due to many failed login attempts. You can reset your password or try again later.';
      default:
        return defaultMessage || 'Authentication failed. Please check your details and try again.';
    }
  };

  const handleGoogleSignIn = async () => {
    setErrorMsg(null);
    setSuccessMsg(null);
    setIsLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      setSuccessMsg('Signed in successfully with Google!');
      setTimeout(() => {
        if (onAuthSuccess) onAuthSuccess();
        onNavigateView('dashboard');
      }, 500);
    } catch (err: any) {
      if (err?.code === 'auth/operation-not-allowed') {
        setErrorMsg('Google Sign-In is disabled in your Firebase Console. Please enable Google provider in Firebase Console.');
      } else if (err?.code === 'auth/popup-closed-by-user' || err?.code === 'auth/cancelled-popup-request') {
        // User closed or cancelled popup intentionally; do not log console error
        console.log('Google Sign-In popup closed by user.');
        setErrorMsg('Google Sign-In window was closed.');
      } else {
        console.error('Google Sign-In Error:', err);
        setErrorMsg(getFriendlyErrorMessage(err?.code, err?.message));
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (mode === 'register') {
      if (!fullName.trim()) {
        setErrorMsg('Please enter your full name.');
        return;
      }
      if (password.length < 6) {
        setErrorMsg('Password must be at least 6 characters.');
        return;
      }
      if (password !== confirmPassword) {
        setErrorMsg('Passwords do not match. Please re-enter your password.');
        return;
      }

      setIsLoading(true);
      try {
        const userCred = await createUserWithEmailAndPassword(auth, email.trim(), password);
        if (userCred.user) {
          await updateProfile(userCred.user, {
            displayName: fullName.trim()
          });
        }
        setSuccessMsg('Account created successfully! Redirecting to workspace...');
        setTimeout(() => {
          if (onAuthSuccess) onAuthSuccess();
          onNavigateView('dashboard');
        }, 600);
      } catch (err: any) {
        if (err?.code === 'auth/operation-not-allowed') {
          console.warn('Email/Password registration is disabled in Firebase Console.');
          setErrorMsg('Email/Password authentication is disabled in your Firebase Console project. Please enable Email/Password provider in Firebase Console Authentication.');
        } else {
          console.error('Registration Error:', err);
          setErrorMsg(getFriendlyErrorMessage(err?.code, err?.message));
        }
      } finally {
        setIsLoading(false);
      }
    } else if (mode === 'login') {
      if (!email.trim() || !password) {
        setErrorMsg('Please provide both email and password.');
        return;
      }

      setIsLoading(true);
      try {
        await signInWithEmailAndPassword(auth, email.trim(), password);
        setSuccessMsg('Authenticated! Entering workspace...');
        setTimeout(() => {
          if (onAuthSuccess) onAuthSuccess();
          onNavigateView('dashboard');
        }, 500);
      } catch (err: any) {
        if (err?.code === 'auth/operation-not-allowed') {
          console.warn('Email/Password sign-in is disabled in Firebase Console.');
          setErrorMsg('Email/Password sign-in is disabled in your Firebase Console project. Please enable Email/Password provider in Firebase Console Authentication.');
        } else {
          console.error('Login Error:', err);
          setErrorMsg(getFriendlyErrorMessage(err?.code, err?.message));
        }
      } finally {
        setIsLoading(false);
      }
    } else if (mode === 'forgot-password') {
      if (!email.trim()) {
        setErrorMsg('Please enter your corporate email address.');
        return;
      }

      setIsLoading(true);
      try {
        await sendPasswordResetEmail(auth, email.trim());
        setSuccessMsg(`Password reset link sent to ${email.trim()}. Please check your inbox.`);
      } catch (err: any) {
        if (err?.code === 'auth/operation-not-allowed') {
          setSuccessMsg(`Password reset request acknowledged for ${email.trim()}.`);
        } else {
          console.error('Password Reset Error:', err);
          setErrorMsg(getFriendlyErrorMessage(err?.code, err?.message));
        }
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#071322] flex items-center justify-center p-4 text-slate-100 animate-in fade-in duration-300">
      <div className="bg-[#0B1F3A] border border-slate-800 w-full max-w-md rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-blue-600 mx-auto flex items-center justify-center font-extrabold text-2xl text-white shadow-lg shadow-blue-900/50">
            S
          </div>
          <h2 className="text-xl font-extrabold text-white">
            {mode === 'login' && 'Sign in to StackVerse OS'}
            {mode === 'register' && 'Create Account & Workspace'}
            {mode === 'forgot-password' && 'Reset Account Password'}
          </h2>
          <p className="text-xs text-slate-400">
            Enterprise Cloud Authentication & Multi-Tenant OS
          </p>
        </div>

        {/* Status Alerts */}
        {errorMsg && (
          <div className="bg-red-950/80 border border-red-500/50 text-red-200 p-3.5 rounded-xl text-xs flex items-start gap-2.5 animate-in fade-in">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <span className="font-medium leading-relaxed">{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="bg-emerald-950/80 border border-emerald-500/50 text-emerald-200 p-3.5 rounded-xl text-xs flex items-start gap-2.5 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span className="font-medium leading-relaxed">{successMsg}</span>
          </div>
        )}

        {/* Google OAuth Quick Button */}
        {mode !== 'forgot-password' && (
          <div className="space-y-3">
            <button
              type="button"
              disabled={isLoading}
              onClick={handleGoogleSignIn}
              className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 border border-slate-700/80 rounded-xl text-xs font-bold text-slate-200 transition-all flex items-center justify-center gap-2.5 shadow-md cursor-pointer disabled:opacity-50"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>{mode === 'login' ? 'Sign in with Google' : 'Sign up with Google'}</span>
            </button>

            <div className="relative flex items-center justify-center my-2">
              <div className="border-t border-slate-800 w-full"></div>
              <span className="bg-[#0B1F3A] px-3 text-[10px] text-slate-500 uppercase tracking-widest font-semibold absolute">
                Or with Email
              </span>
            </div>
          </div>
        )}

        {/* Main Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          {mode === 'register' && (
            <>
              <div>
                <label className="font-bold text-slate-300 block mb-1">Full Name *</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Adewale K. Aluko"
                    className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl pl-9 pr-3 py-2.5 text-white font-medium focus:outline-hidden focus:border-blue-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-300 block mb-1">Company / Workspace Name</label>
                <div className="relative">
                  <Building className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={workspaceName}
                    onChange={(e) => setWorkspaceName(e.target.value)}
                    placeholder="e.g. Dangote Group Lagos Store"
                    className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl pl-9 pr-3 py-2.5 text-white font-medium focus:outline-hidden focus:border-blue-500"
                  />
                </div>
              </div>
            </>
          )}

          <div>
            <label className="font-bold text-slate-300 block mb-1">Corporate Email Address *</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl pl-9 pr-3 py-2.5 text-white font-medium focus:outline-hidden focus:border-blue-500"
                required
              />
            </div>
          </div>

          {mode !== 'forgot-password' && (
            <div>
              <label className="font-bold text-slate-300 block mb-1">
                Password {mode === 'register' && '(Min. 6 characters)'} *
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl pl-9 pr-3 py-2.5 text-white font-medium focus:outline-hidden focus:border-blue-500"
                  required
                />
              </div>
            </div>
          )}

          {mode === 'register' && (
            <div>
              <label className="font-bold text-slate-300 block mb-1">Confirm Password *</label>
              <div className="relative">
                <ShieldCheck className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl pl-9 pr-3 py-2.5 text-white font-medium focus:outline-hidden focus:border-blue-500"
                  required
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-blue-600 hover:bg-blue-500 active:scale-[0.99] text-white font-extrabold text-xs rounded-xl shadow-lg shadow-blue-900/40 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-white" />
                <span>Processing Request...</span>
              </>
            ) : (
              <>
                <span>
                  {mode === 'login' && 'Sign In to Workspace'}
                  {mode === 'register' && 'Create Account & Open OS'}
                  {mode === 'forgot-password' && 'Send Password Reset Link'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Switch Mode Links */}
        <div className="pt-2 text-center text-xs text-slate-400 space-y-2">
          {mode === 'login' ? (
            <>
              <div>
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setErrorMsg(null);
                    setSuccessMsg(null);
                    onNavigateView('register');
                  }}
                  className="text-blue-400 font-bold hover:underline cursor-pointer"
                >
                  Create Account
                </button>
              </div>
              <div>
                <button
                  type="button"
                  onClick={() => {
                    setErrorMsg(null);
                    setSuccessMsg(null);
                    onNavigateView('forgot-password');
                  }}
                  className="text-slate-500 hover:underline cursor-pointer"
                >
                  Forgot Password?
                </button>
              </div>
            </>
          ) : (
            <div>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => {
                  setErrorMsg(null);
                  setSuccessMsg(null);
                  onNavigateView('login');
                }}
                className="text-blue-400 font-bold hover:underline cursor-pointer"
              >
                Sign In
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
