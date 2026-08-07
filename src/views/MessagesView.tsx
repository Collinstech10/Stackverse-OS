import React from 'react';
import { MessageSquare, Send, Hash, User, Phone, CheckCheck } from 'lucide-react';

export const MessagesView: React.FC = () => {
  const [activeChannel, setActiveChannel] = React.useState('#sales-lagos');
  const [messageInput, setMessageInput] = React.useState('');
  const [messages, setMessages] = React.useState([
    { sender: 'Chief Oladipo Johnson', text: 'Hi team, Zenith Bank payment for Invoice #41 is completed.', time: '10:14 AM' },
    { sender: 'Babajide Ogundele (CTO)', text: 'Awesome! Inventory updated automatically in Lagos Central warehouse.', time: '10:16 AM' }
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim()) return;
    setMessages(prev => [...prev, { sender: 'You (Eniola)', text: messageInput, time: 'Just now' }]);
    setMessageInput('');
  };

  return (
    <div className="p-4 sm:p-8 space-y-6 max-w-[1700px] mx-auto animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-blue-600" />
            Internal Team Chat & WhatsApp Customer Inbox
          </h1>
          <p className="text-xs text-slate-500">Real-time team communication & unified WhatsApp Business Cloud inbox</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden h-[600px]">
        {/* Sidebar Channels */}
        <div className="bg-slate-900 text-slate-300 p-4 space-y-4 border-r border-slate-800">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Team Channels</div>
          <div className="space-y-1">
            {['#general', '#sales-lagos', '#executives-board', '#whatsapp-inbox'].map((ch) => (
              <button
                key={ch}
                onClick={() => setActiveChannel(ch)}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-left transition-colors ${
                  activeChannel === ch ? 'bg-blue-600 text-white' : 'hover:bg-slate-800 text-slate-300'
                }`}
              >
                <Hash className="w-3.5 h-3.5" /> {ch}
              </button>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="lg:col-span-3 flex flex-col justify-between p-4">
          <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
            <div className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
              <Hash className="w-4 h-4 text-blue-600" /> {activeChannel}
            </div>
            <span className="text-xs text-slate-500">24 Team Members Active</span>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
            {messages.map((m, i) => (
              <div key={i} className="p-3 bg-slate-50 rounded-2xl border border-slate-100 max-w-lg space-y-1">
                <div className="flex items-center justify-between text-xs font-bold text-slate-900">
                  <span>{m.sender}</span>
                  <span className="text-[10px] text-slate-400 font-mono">{m.time}</span>
                </div>
                <p className="text-xs text-slate-700 leading-snug">{m.text}</p>
              </div>
            ))}
          </div>

          {/* Input Form */}
          <form onSubmit={handleSendMessage} className="flex gap-2 pt-3 border-t border-slate-200">
            <input
              type="text"
              placeholder={`Message ${activeChannel}...`}
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-blue-500"
            />
            <button type="submit" className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-xs">
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
