import React from 'react';
import {
  ArrowRight,
  ShieldCheck,
  Zap,
  Building2,
  CheckCircle2,
  Smartphone,
  Globe,
  Layers,
  Sparkles,
  Users,
  Lock,
  ChevronRight,
  Star
} from 'lucide-react';
import { ViewMode } from '../types';

interface LandingPageViewProps {
  onEnterApp: (v: ViewMode) => void;
}

export const LandingPageView: React.FC<LandingPageViewProps> = ({ onEnterApp }) => {
  return (
    <div className="min-h-screen bg-[#071322] text-slate-100 font-sans selection:bg-blue-600 selection:text-white">
      
      {/* Top Banner Navigation */}
      <nav className="border-b border-slate-800/80 bg-[#071322]/80 backdrop-blur-xl sticky top-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => onEnterApp('dashboard')}>
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-emerald-500 p-0.5 shadow-lg shadow-blue-500/20 flex items-center justify-center">
              <div className="w-full h-full bg-[#0B1F3A] rounded-[10px] flex items-center justify-center">
                <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 text-base">S</span>
              </div>
            </div>
            <div>
              <span className="text-lg font-extrabold tracking-tight text-white">StackVerse</span>
              <span className="text-xs font-mono text-emerald-400 ml-1 font-bold">OS</span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8 text-xs font-semibold text-slate-300">
            <a href="#features" className="hover:text-white transition-colors">OS Modules</a>
            <a href="#security" className="hover:text-white transition-colors">African Tax Compliance</a>
            <a href="#design-system" onClick={() => onEnterApp('design-system')} className="hover:text-blue-400 transition-colors">Design System</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onEnterApp('login')}
              className="px-4 py-2 text-xs font-bold text-slate-300 hover:text-white transition-colors"
            >
              Sign In
            </button>
            <button
              onClick={() => onEnterApp('dashboard')}
              className="px-4 py-2 text-xs font-extrabold bg-blue-600 hover:bg-blue-500 text-white rounded-xl shadow-lg shadow-blue-900/40 transition-all active:scale-95 flex items-center gap-1.5"
            >
              Launch Platform Demo <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative px-6 py-20 lg:py-32 overflow-hidden text-center max-w-5xl mx-auto space-y-8">
        
        {/* Eyebrow Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/80 border border-blue-500/30 text-blue-300 text-xs font-mono font-semibold shadow-inner">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
          <span>The Operating System for Modern African Businesses</span>
        </div>

        {/* Hero Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.08]">
          One Connected System for your Entire Business
        </h1>

        {/* Subhead */}
        <p className="text-base sm:text-xl text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed">
          Unify POS Sales, CRM pipelines, Multi-Warehouse Inventory, Accounting, Payroll & WhatsApp Marketing in a single Stripe-quality enterprise operating system.
        </p>

        {/* Hero CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            onClick={() => onEnterApp('dashboard')}
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold rounded-2xl shadow-xl shadow-blue-900/50 text-sm transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            Launch Live Interactive OS Demo <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => onEnterApp('design-system')}
            className="w-full sm:w-auto px-8 py-4 bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 text-slate-200 font-bold rounded-2xl text-sm transition-all"
          >
            Inspect Design System Tokens
          </button>
        </div>

        {/* Trust Stats */}
        <div className="pt-12 grid grid-cols-2 sm:grid-cols-4 gap-6 border-t border-slate-800/80 text-center">
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-white">$140M+</div>
            <div className="text-xs text-slate-400 font-medium">Monthly Processed GMV</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-400">14,200+</div>
            <div className="text-xs text-slate-400 font-medium">African SMEs & Enterprise</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-blue-400">99.99%</div>
            <div className="text-xs text-slate-400 font-medium">Uptime Guarantee</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-purple-400">6 Countries</div>
            <div className="text-xs text-slate-400 font-medium">NIG, KAN, GHA, ZAF, USA, UK</div>
          </div>
        </div>

        {/* Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/15 rounded-full blur-[140px] pointer-events-none" />
      </section>

      {/* Feature Modules Cards Grid */}
      <section id="features" className="px-6 py-20 bg-[#0B1F3A] border-y border-slate-800">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
              Built to Replace 10 Disjointed Software Apps
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto">
              No more switching between separate tools for sales, accounting, payroll & inventory. StackVerse OS connects everything natively.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'POS Register & Sales', desc: 'Walk-in cashier barcode scanning, Paystack/M-Pesa payments & thermal receipt printers.' },
              { title: 'B2B CRM Pipeline', desc: 'Visual Kanban sales funnel, account timeline history & WhatsApp client communication.' },
              { title: 'Multi-Warehouse Inventory', desc: 'Track SKUs across Lagos, Abuja, Nairobi & Accra with automated low-stock reorder triggers.' },
              { title: 'Finance & Tax Ledger', desc: 'Real-time Profit & Loss, multi-bank account reconciliation & African VAT/WHT filing.' },
              { title: 'Automated Payroll', desc: 'Calculate PAYE tax, pension fund deductions & execute one-click bank payouts.' },
              { title: 'WhatsApp Broadcasts', desc: 'Dispatch catalog promos directly via official WhatsApp Cloud API with instant open rates.' }
            ].map((f, idx) => (
              <div key={idx} className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 space-y-3 hover:border-blue-500/50 transition-all">
                <div className="p-2.5 w-fit rounded-xl bg-blue-600/20 text-blue-400 font-mono font-bold text-xs">
                  0{idx + 1}
                </div>
                <h3 className="font-extrabold text-base text-white">{f.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <footer className="px-6 py-12 text-center border-t border-slate-800 text-xs text-slate-500">
        <p>© 2026 StackVerse OS Technologies Inc. Designed with Stripe & Apple level polish for African Enterprise.</p>
      </footer>

    </div>
  );
};
