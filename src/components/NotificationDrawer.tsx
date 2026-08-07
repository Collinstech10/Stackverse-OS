import React from 'react';
import { X, Bell, Check, ShoppingCart, AlertTriangle, FileText, CheckCircle2 } from 'lucide-react';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: { id: string; title: string; time: string; read: boolean; type: 'order' | 'alert' | 'invoice' }[];
  onMarkAllRead: () => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({
  isOpen,
  onClose,
  notifications = [],
  onMarkAllRead
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-[#0B1F3A] border-l border-slate-700 shadow-2xl flex flex-col text-slate-100 animate-in slide-in-from-right duration-300">
      
      {/* Header */}
      <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900">
        <div className="flex items-center gap-2">
          <Bell className="w-4 h-4 text-blue-400" />
          <h3 className="text-sm font-bold text-white">System Notifications</h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onMarkAllRead}
            className="text-[11px] text-blue-400 hover:underline flex items-center gap-1"
          >
            <Check className="w-3 h-3" /> Mark read
          </button>
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2 custom-scrollbar">
        {(notifications || []).map((n) => {
          let Icon = Bell;
          let colorClass = 'text-blue-400 bg-blue-900/30';
          if (n.type === 'order') { Icon = ShoppingCart; colorClass = 'text-emerald-400 bg-emerald-900/30'; }
          if (n.type === 'alert') { Icon = AlertTriangle; colorClass = 'text-amber-400 bg-amber-900/30'; }
          if (n.type === 'invoice') { Icon = FileText; colorClass = 'text-purple-400 bg-purple-900/30'; }

          return (
            <div
              key={n.id}
              className={`p-3 rounded-xl border transition-all text-xs flex items-start gap-3 ${
                n.read
                  ? 'bg-slate-900/40 border-slate-800/80 text-slate-400'
                  : 'bg-slate-900 border-slate-700/80 text-slate-200'
              }`}
            >
              <div className={`p-2 rounded-lg ${colorClass} shrink-0`}>
                <Icon className="w-3.5 h-3.5" />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-slate-100 leading-snug">{n.title}</div>
                <div className="text-[10px] text-slate-400 mt-1">{n.time}</div>
              </div>
              {!n.read && (
                <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0 mt-1" />
              )}
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="p-3 bg-slate-900 border-t border-slate-800 text-center text-[10px] text-slate-400">
        All notifications logged to Audit Trail in Settings
      </div>

    </div>
  );
};
