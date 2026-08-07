import React from 'react';
import { X, Sparkles, Send, RefreshCw, TrendingUp, CheckCircle2, ShieldCheck, AlertCircle } from 'lucide-react';
import { Workspace } from '../types';

interface AiInsightsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  currentWorkspace: Workspace;
  currentModule: string;
}

export const AiInsightsPanel: React.FC<AiInsightsPanelProps> = ({
  isOpen,
  onClose,
  currentWorkspace,
  currentModule
}) => {
  const [promptInput, setPromptInput] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [insightData, setInsightData] = React.useState<{
    insight: string;
    recommendations: string[];
    score: number;
    keyMetric?: string;
  }>({
    insight: `Based on real-time financial telemetry for ${currentWorkspace.name} (${currentWorkspace.location}), sales volume is up +28.4% MoM. However, inventory in 2 critical categories is trending towards a stockout within 12 days.`,
    recommendations: [
      `Issue automated Purchase Order for 50 units of Solar Hybrid Inverters to avoid ₦12.5M in lost revenue.`,
      `Set up automated WhatsApp payment reminders for overdue invoices (3 clients currently >14 days past due).`,
      `Hedge foreign import supplier payments by locking forward FX contracts for Q3 shipment batches.`
    ],
    score: 94,
    keyMetric: '+28.4% MoM Revenue Momentum'
  });

  if (!isOpen) return null;

  const handleGenerateInsight = async (customPrompt?: string) => {
    setLoading(true);
    const query = customPrompt || promptInput || `Analyze ${currentModule} performance and suggest 3 strategic improvements for ${currentWorkspace.name}.`;

    try {
      const res = await fetch('/api/gemini/insights', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: query,
          businessContext: {
            workspaceName: currentWorkspace.name,
            location: currentWorkspace.location,
            currency: currentWorkspace.currencySymbol,
            module: currentModule,
            revenueRunrate: '₦184,200,000 / yr',
            grossMargin: '38.2%'
          },
          module: currentModule
        })
      });

      if (res.ok) {
        const data = await res.json();
        setInsightData({
          insight: data.insight || 'No insight returned',
          recommendations: data.recommendations || ['Review working capital ratio', 'Automate collections'],
          score: data.score || 92,
          keyMetric: data.keyMetric || 'AI Analysis Complete'
        });
      }
    } catch (err) {
      console.error('Failed to query Gemini AI insights:', err);
    } finally {
      setLoading(false);
      setPromptInput('');
    }
  };

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full max-w-lg bg-[#0B1F3A] border-l border-slate-700 shadow-2xl flex flex-col text-slate-100 animate-in slide-in-from-right duration-300">
      
      {/* Header */}
      <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-900/80">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-600 text-white shadow-md">
            <Sparkles className="w-5 h-5 text-emerald-200 animate-pulse" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
              StackVerse AI Assistant
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-semibold">
                Gemini 3.6 Flash
              </span>
            </h3>
            <p className="text-[11px] text-slate-400">Contextual strategist for {currentWorkspace.name}</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Content Body */}
      <div className="flex-1 overflow-y-auto p-5 space-y-5 custom-scrollbar">
        
        {/* Module Context Badge */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-slate-300">
            <ShieldCheck className="w-4 h-4 text-blue-400" />
            <span>Active Module Context: <strong className="text-white">{currentModule}</strong></span>
          </div>
          <button
            onClick={() => handleGenerateInsight()}
            disabled={loading}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            title="Refresh AI Analysis"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-emerald-400' : ''}`} />
          </button>
        </div>

        {/* Health Score & Key Metric Card */}
        <div className="bg-gradient-to-br from-emerald-950/60 to-slate-900 border border-emerald-800/60 rounded-2xl p-4 shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <div className="text-xs font-semibold text-emerald-300 flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              AI Calculated Business Health Score
            </div>
            <div className="text-2xl font-black text-emerald-400 font-mono">
              {insightData.score} <span className="text-xs text-slate-400 font-normal">/ 100</span>
            </div>
          </div>
          {insightData.keyMetric && (
            <div className="mt-2 text-xs font-semibold text-white bg-emerald-900/40 border border-emerald-700/50 rounded-lg px-2.5 py-1 inline-block">
              ⚡ {insightData.keyMetric}
            </div>
          )}
        </div>

        {/* Executive Summary */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 space-y-2">
          <div className="text-xs font-bold text-slate-200 uppercase tracking-wider text-[10px]">
            Executive AI Assessment
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            {insightData.insight}
          </p>
        </div>

        {/* Actionable Recommendations */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 space-y-3">
          <div className="text-xs font-bold text-slate-200 uppercase tracking-wider text-[10px]">
            Strategic Recommendations
          </div>
          <div className="space-y-2.5">
            {insightData.recommendations.map((rec, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-200 bg-slate-800/60 p-2.5 rounded-xl border border-slate-700/50">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span className="leading-snug">{rec}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Suggested Quick Prompts */}
        <div className="space-y-2">
          <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
            Quick Strategist Questions
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              'Forecast Q3 Cash Flow',
              'Draft WhatsApp Promo Message',
              'Analyze Low Stock SKUs',
              'Calculate VAT & Tax Exposure'
            ].map((p, i) => (
              <button
                key={i}
                onClick={() => handleGenerateInsight(p)}
                disabled={loading}
                className="text-[11px] bg-slate-800 hover:bg-blue-600/30 text-slate-300 hover:text-blue-200 border border-slate-700 rounded-lg px-2.5 py-1.5 transition-colors text-left"
              >
                {p}
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Footer Query Input */}
      <div className="p-4 border-t border-slate-800 bg-slate-900">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (promptInput.trim()) handleGenerateInsight();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            placeholder="Ask StackVerse AI anything about your business..."
            value={promptInput}
            onChange={(e) => setPromptInput(e.target.value)}
            disabled={loading}
            className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500"
          />
          <button
            type="submit"
            disabled={loading || !promptInput.trim()}
            className="p-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white transition-all shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>

    </div>
  );
};
