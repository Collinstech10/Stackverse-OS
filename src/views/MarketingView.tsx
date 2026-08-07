import React from 'react';
import { Megaphone, Plus, Send, CheckCircle2, MessageSquare, Mail, Phone, BarChart2 } from 'lucide-react';
import { Campaign } from '../types';

interface MarketingViewProps {
  campaigns: Campaign[];
  onAddCampaign: (c: Campaign) => void;
}

export const MarketingView: React.FC<MarketingViewProps> = ({
  campaigns,
  onAddCampaign
}) => {
  const [showNewModal, setShowNewModal] = React.useState(false);
  const [campaignName, setCampaignName] = React.useState('Q3 Solar Hybrid Flash Sale');
  const [channelType, setChannelType] = React.useState<'WhatsApp Broadcast' | 'Email Newsletter' | 'SMS Blast'>('WhatsApp Broadcast');
  const [targetAudience, setTargetAudience] = React.useState('VIP B2B Accounts (1,420 Clients)');
  const [messageText, setMessageText] = React.useState('Hi {Client_Name}, enjoy 10% off all StackVerse 5kVA Solar Inverters this week! Click to claim your quote: https://stackverse.os/promo');

  const handleLaunchCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    const created: Campaign = {
      id: `cmp-${Date.now()}`,
      name: campaignName,
      type: channelType,
      audience: targetAudience,
      sentCount: 1420,
      openRate: 91.2,
      clickRate: 38.5,
      status: 'Active',
      date: new Date().toISOString().split('T')[0]
    };
    onAddCampaign(created);
    setShowNewModal(false);
    alert(`Campaign "${campaignName}" launched to ${targetAudience} via ${channelType}!`);
  };

  return (
    <div className="p-4 sm:p-8 space-y-6 max-w-[1700px] mx-auto animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
            <Megaphone className="w-6 h-6 text-green-600" />
            WhatsApp & Omnichannel Marketing Studio
          </h1>
          <p className="text-xs text-slate-500">Dispatch WhatsApp Cloud API broadcasts, SMS blasts & email marketing campaigns</p>
        </div>

        <button
          onClick={() => setShowNewModal(true)}
          className="px-4 py-2 bg-green-600 hover:bg-green-500 text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-1.5 transition-all"
        >
          <Plus className="w-4 h-4" /> Create Broadcast Campaign
        </button>
      </div>

      {/* Campaigns Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        <table className="w-full text-left text-xs text-slate-700">
          <thead className="bg-slate-50 border-b border-slate-200 text-[10px] uppercase tracking-wider text-slate-500 font-semibold">
            <tr>
              <th className="p-4">Campaign Name</th>
              <th className="p-4">Channel</th>
              <th className="p-4">Target Audience</th>
              <th className="p-4">Recipients</th>
              <th className="p-4">Open Rate</th>
              <th className="p-4">Click Rate</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium">
            {campaigns.length === 0 ? (
              <tr>
                <td colSpan={8} className="p-12 text-center text-slate-400">
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <Megaphone className="w-8 h-8 text-slate-300" />
                    <p className="font-bold text-slate-700 text-sm">No broadcast campaigns</p>
                    <p className="text-xs text-slate-500">Launch a WhatsApp, Email, or SMS broadcast to reach your contacts.</p>
                  </div>
                </td>
              </tr>
            ) : (
              campaigns.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-4 font-bold text-slate-900">{c.name}</td>
                  <td className="p-4">
                    <span className="px-2 py-0.5 rounded bg-green-50 text-green-700 font-bold text-[10px]">
                      {c.type}
                    </span>
                  </td>
                  <td className="p-4 font-semibold text-slate-700">{c.audience}</td>
                  <td className="p-4 font-mono font-bold text-slate-900">{c.sentCount.toLocaleString()}</td>
                  <td className="p-4 font-mono font-bold text-emerald-600">{c.openRate}%</td>
                  <td className="p-4 font-mono font-bold text-blue-600">{c.clickRate}%</td>
                  <td className="p-4">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      {c.status}
                    </span>
                  </td>
                  <td className="p-4 text-right font-mono text-slate-500">{c.date}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showNewModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-300 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden p-6 text-slate-900 space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                <Megaphone className="w-5 h-5 text-green-600" /> Create Marketing Broadcast
              </h3>
              <button
                onClick={() => setShowNewModal(false)}
                className="p-1 rounded text-slate-400 hover:text-slate-900"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleLaunchCampaign} className="space-y-3 text-xs">
              <div>
                <label className="font-bold block mb-1">Campaign Title</label>
                <input
                  type="text"
                  value={campaignName}
                  onChange={(e) => setCampaignName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-semibold"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold block mb-1">Channel</label>
                  <select
                    value={channelType}
                    onChange={(e) => setChannelType(e.target.value as any)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-semibold"
                  >
                    <option value="WhatsApp Broadcast">WhatsApp Cloud API</option>
                    <option value="Email Newsletter">Email Newsletter</option>
                    <option value="SMS Blast">SMS Blast</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold block mb-1">Audience Segment</label>
                  <input
                    type="text"
                    value={targetAudience}
                    onChange={(e) => setTargetAudience(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="font-bold block mb-1">Broadcast Copy / Message</label>
                <textarea
                  rows={4}
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-green-600 hover:bg-green-500 text-white font-bold rounded-xl flex items-center justify-center gap-1.5"
              >
                <Send className="w-4 h-4" /> Dispatch Broadcast
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
