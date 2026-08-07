import React from 'react';
import { Search, X, ShoppingCart, Users, Package, FileText, ArrowRight } from 'lucide-react';
import { ViewMode } from '../types';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateView: (view: ViewMode) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onNavigateView,
}) => {
  const [query, setQuery] = React.useState('');

  if (!isOpen) return null;

  const quickLinks: { label: string; view: ViewMode; icon: React.FC<{ className?: string }>; category: string }[] = [
    { label: 'Executive Dashboard & Financial Health', view: 'dashboard', icon: FileText, category: 'General' },
    { label: 'POS Terminal & Cashier Checkout', view: 'sales', icon: ShoppingCart, category: 'Sales' },
    { label: 'Customer Directory & CRM Pipeline', view: 'crm', icon: Users, category: 'CRM' },
    { label: 'Inventory Stock Table & Barcode Scanner', view: 'inventory', icon: Package, category: 'Inventory' },
    { label: 'Profit & Loss Statement & Taxes', view: 'finance', icon: FileText, category: 'Finance' },
    { label: 'One-Click Payroll Runner & Payslips', view: 'hr', icon: Users, category: 'HR' },
    { label: 'WhatsApp Broadcast Campaign Builder', view: 'marketing', icon: FileText, category: 'Marketing' },
    { label: 'Visual Workflow Node Editor (If-This-Then-That)', view: 'automation', icon: FileText, category: 'Automation' },
    { label: 'Paystack, Flutterwave & M-Pesa Keys', view: 'integrations', icon: FileText, category: 'Integrations' },
  ];

  const filteredLinks = quickLinks.filter(l =>
    l.label.toLowerCase().includes(query.toLowerCase()) || l.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-start justify-center pt-16 sm:pt-24 px-4 animate-in fade-in duration-200">
      <div className="bg-[#0B1F3A] border border-slate-700 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden text-slate-100">
        
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-800 gap-3">
          <Search className="w-5 h-5 text-blue-400 shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Search commands, customers, SKU items, invoices or modules..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-sm text-slate-100 placeholder-slate-400 focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search Results / Command List */}
        <div className="p-3 max-h-[380px] overflow-y-auto space-y-1 custom-scrollbar">
          <div className="px-3 py-1.5 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
            Quick Navigation & Modules
          </div>

          {filteredLinks.length === 0 ? (
            <div className="p-8 text-center text-slate-400 text-xs">
              No matching commands or modules found for "{query}".
            </div>
          ) : (
            filteredLinks.map((item, idx) => {
              const Icon = item.icon;
              return (
                <button
                  key={idx}
                  onClick={() => {
                    onNavigateView(item.view);
                    onClose();
                  }}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-blue-600/20 hover:text-blue-200 text-slate-300 text-xs transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="text-left">
                      <div className="font-medium text-slate-100 group-hover:text-white">{item.label}</div>
                      <div className="text-[10px] text-slate-400">{item.category} Module</div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-500 opacity-0 group-hover:opacity-100 group-hover:text-blue-400 transition-all transform group-hover:translate-x-1" />
                </button>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="bg-slate-900/90 px-4 py-2.5 border-t border-slate-800 text-[10px] text-slate-400 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span>Use <kbd className="px-1 bg-slate-800 border border-slate-700 rounded">↑</kbd> <kbd className="px-1 bg-slate-800 border border-slate-700 rounded">↓</kbd> to navigate</span>
            <span><kbd className="px-1 bg-slate-800 border border-slate-700 rounded">ESC</kbd> to exit</span>
          </div>
          <span className="text-blue-400 font-semibold">StackVerse OS Universal Search</span>
        </div>

      </div>
    </div>
  );
};
