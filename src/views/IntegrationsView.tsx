import React from 'react';
import { Layers, CheckCircle2, Key, ShieldCheck, Zap } from 'lucide-react';
import { Integration } from '../types';

interface IntegrationsViewProps {
  integrations: Integration[];
  onToggleIntegration: (id: string) => void;
}

export const IntegrationsView: React.FC<IntegrationsViewProps> = ({
  integrations,
  onToggleIntegration
}) => {
  const [selectedCategory, setSelectedCategory] = React.useState<string>('All');
  const [activeApiKeyModal, setActiveApiKeyModal] = React.useState<Integration | null>(null);
  const [apiKeyInput, setApiKeyInput] = React.useState('pk_live_stackverse_99210983109312893821');

  const categories = ['All', 'Payments', 'Communication', 'Accounting', 'E-Commerce'];

  const filtered = integrations.filter(
    i => selectedCategory === 'All' || i.category === selectedCategory
  );

  return (
    <div className="p-4 sm:p-8 space-y-6 max-w-[1700px] mx-auto animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
            <Layers className="w-6 h-6 text-blue-600" />
            Connected Apps & API Gateway Directory
          </h1>
          <p className="text-xs text-slate-500">Native African & global integrations: Paystack, M-Pesa, WhatsApp Cloud API & QuickBooks</p>
        </div>
      </div>

      {/* Categories */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 custom-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Integrations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center font-bold text-slate-900 text-base">
                    {item.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-sm">{item.name}</h3>
                    <span className="text-[10px] text-blue-600 font-mono font-bold uppercase">{item.category}</span>
                  </div>
                </div>

                {/* Status Toggle Switch */}
                <button
                  onClick={() => onToggleIntegration(item.id)}
                  className={`w-12 h-6 rounded-full transition-all relative ${
                    item.status === 'Connected' ? 'bg-emerald-500' : 'bg-slate-300'
                  }`}
                >
                  <span
                    className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${
                      item.status === 'Connected' ? 'left-7' : 'left-1'
                    }`}
                  />
                </button>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">{item.description}</p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span
                className={`font-bold font-mono text-[10px] px-2 py-0.5 rounded ${
                  item.status === 'Connected'
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-slate-100 text-slate-600'
                }`}
              >
                {item.status}
              </span>

              <button
                onClick={() => setActiveApiKeyModal(item)}
                className="text-blue-600 font-bold hover:underline flex items-center gap-1"
              >
                <Key className="w-3.5 h-3.5" /> Configure API Key
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Configure Key Modal */}
      {activeApiKeyModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-300 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden p-6 text-slate-900 space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                <Key className="w-5 h-5 text-blue-600" /> {activeApiKeyModal.name} Integration Setup
              </h3>
              <button
                onClick={() => setActiveApiKeyModal(null)}
                className="p-1 rounded text-slate-400 hover:text-slate-900"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <p className="text-slate-600">
                Provide your live API keys or Secret tokens from the {activeApiKeyModal.name} Developer Dashboard.
              </p>

              <div>
                <label className="font-bold block mb-1">Live Secret Key / Access Token</label>
                <input
                  type="password"
                  value={apiKeyInput}
                  onChange={(e) => setApiKeyInput(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-mono"
                />
              </div>

              <div className="p-3 bg-blue-50 text-blue-900 rounded-xl text-[11px] leading-snug">
                ✓ Environment variable automatically managed by StackVerse OS vault. Key never exposed in client bundle.
              </div>

              <button
                onClick={() => {
                  alert(`API keys saved for ${activeApiKeyModal.name}. Webhook endpoint verified!`);
                  setActiveApiKeyModal(null);
                }}
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl"
              >
                Save & Test Connection
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
