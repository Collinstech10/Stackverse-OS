import React from 'react';
import { Palette, Type, Grid, Code, Layers, Sparkles, CheckCircle2 } from 'lucide-react';

export const DesignSystemView: React.FC = () => {
  return (
    <div className="p-4 sm:p-8 space-y-8 max-w-[1700px] mx-auto animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="bg-[#0B1F3A] text-white p-6 rounded-2xl border border-slate-800 shadow-xl space-y-2">
        <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-blue-600/30 text-blue-300 text-xs font-mono font-bold border border-blue-500/40">
          StackVerse OS Design Token Architecture v2.4
        </div>
        <h1 className="text-2xl font-extrabold tracking-tight">
          Enterprise Design System & Developer Handoff
        </h1>
        <p className="text-xs text-slate-300 max-w-2xl">
          Complete mathematical scales, semantic color tokens, typography rules & UI component specifications for Stripe/Apple level craftsmanship.
        </p>
      </div>

      {/* 1. Color Tokens Palette */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
        <h2 className="text-sm font-extrabold text-slate-900 flex items-center gap-2 uppercase tracking-wider">
          <Palette className="w-4 h-4 text-blue-600" /> 1. Semantic Color Token Matrix
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-[#0B1F3A] text-white space-y-2 border border-slate-800">
            <div className="font-bold text-xs">Primary Dark Navy</div>
            <div className="font-mono text-xs text-blue-300">#0B1F3A</div>
            <div className="text-[10px] text-slate-400">Header, Sidebar, Dark Badges</div>
          </div>

          <div className="p-4 rounded-xl bg-[#2563EB] text-white space-y-2 shadow-md">
            <div className="font-bold text-xs">Royal Blue Brand</div>
            <div className="font-mono text-xs text-blue-100">#2563EB</div>
            <div className="text-[10px] text-blue-100">Primary CTAs, Active States</div>
          </div>

          <div className="p-4 rounded-xl bg-[#10B981] text-white space-y-2 shadow-md">
            <div className="font-bold text-xs">Emerald Success</div>
            <div className="font-mono text-xs text-emerald-100">#10B981</div>
            <div className="text-[10px] text-emerald-100">Net Profit, Paid Badges, POS</div>
          </div>

          <div className="p-4 rounded-xl bg-[#F8FAFC] text-slate-900 border border-slate-300 space-y-2">
            <div className="font-bold text-xs">Canvas Light Base</div>
            <div className="font-mono text-xs text-slate-600">#F8FAFC</div>
            <div className="text-[10px] text-slate-500">Main Content Canvas</div>
          </div>
        </div>
      </div>

      {/* 2. Typography Scale */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
        <h2 className="text-sm font-extrabold text-slate-900 flex items-center gap-2 uppercase tracking-wider">
          <Type className="w-4 h-4 text-blue-600" /> 2. Mathematical Typography Scale (Inter / SF Pro Display)
        </h2>

        <div className="space-y-3 divide-y divide-slate-100 text-slate-800">
          <div className="pt-2 flex items-baseline justify-between">
            <span className="text-2xl font-extrabold">Heading 1 (24px / 1.25)</span>
            <span className="font-mono text-xs text-slate-500">24px • Bold</span>
          </div>
          <div className="pt-2 flex items-baseline justify-between">
            <span className="text-lg font-bold">Heading 2 (18px)</span>
            <span className="font-mono text-xs text-slate-500">18px • SemiBold</span>
          </div>
          <div className="pt-2 flex items-baseline justify-between">
            <span className="text-sm font-semibold">Body Standard (14px)</span>
            <span className="font-mono text-xs text-slate-500">14px • Regular</span>
          </div>
          <div className="pt-2 flex items-baseline justify-between">
            <span className="text-xs font-mono font-medium text-slate-600">Monospace Financial Code (12px)</span>
            <span className="font-mono text-xs text-slate-500">12px • JetBrains Mono</span>
          </div>
        </div>
      </div>

      {/* 3. Component Library Showcase */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
        <h2 className="text-sm font-extrabold text-slate-900 flex items-center gap-2 uppercase tracking-wider">
          <Layers className="w-4 h-4 text-blue-600" /> 3. Atomic UI Component Specifications
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          
          {/* Buttons */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase">Button Variants</label>
            <div className="space-y-2">
              <button className="w-full py-2.5 bg-blue-600 text-white font-extrabold text-xs rounded-xl shadow-md">
                Primary Brand Button
              </button>
              <button className="w-full py-2.5 bg-slate-900 text-white font-bold text-xs rounded-xl">
                Secondary Dark Button
              </button>
              <button className="w-full py-2.5 bg-slate-100 text-slate-800 font-bold text-xs rounded-xl border border-slate-200">
                Outline Ghost Button
              </button>
            </div>
          </div>

          {/* Badges */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase">Status Pill Badges</label>
            <div className="flex flex-wrap gap-2">
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                Completed
              </span>
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800">
                Pending Approval
              </span>
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
                Enterprise Plan
              </span>
            </div>
          </div>

          {/* Form Controls */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase">Input Fields</label>
            <input
              type="text"
              value="Sample Input Token"
              readOnly
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800"
            />
          </div>

        </div>
      </div>

    </div>
  );
};
