import React from 'react';
import { Settings, Building, ShieldCheck, Trash2, Database, RotateCcw, AlertTriangle, CheckCircle2, User, LogOut } from 'lucide-react';
import { Workspace, Currency } from '../types';

interface SettingsViewProps {
  currentWorkspace: Workspace;
  currency: Currency;
  onUpdateWorkspace: (w: Workspace) => void;
  onUpdateCurrency: (c: Currency) => void;
  recordCounts?: {
    customers: number;
    products: number;
    orders: number;
    transactions: number;
    employees: number;
    campaigns: number;
    documents: number;
  };
  onClearAllData?: () => void;
  authUser?: any;
  onLogout?: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  currentWorkspace,
  currency,
  onUpdateWorkspace,
  onUpdateCurrency,
  recordCounts,
  onClearAllData,
  authUser,
  onLogout
}) => {
  const [companyName, setCompanyName] = React.useState(currentWorkspace.name);
  const [taxId, setTaxId] = React.useState('TIN-99201928-001');
  const [cacNumber, setCacNumber] = React.useState('RC-1849201');
  const [vatNumber, setVatNumber] = React.useState('VAT-NIG-449210');
  const [twoFactorEnabled, setTwoFactorEnabled] = React.useState(true);
  const [showWipeConfirm, setShowWipeConfirm] = React.useState(false);
  const [actionNotice, setActionNotice] = React.useState<string | null>(null);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateWorkspace({
      ...currentWorkspace,
      name: companyName
    });
    setActionNotice('Company profile & tax compliance settings saved successfully.');
    setTimeout(() => setActionNotice(null), 3000);
  };

  const handleWipeData = () => {
    if (onClearAllData) {
      onClearAllData();
      setShowWipeConfirm(false);
      setActionNotice('All application records & storage wiped. Workspace is clean and ready for live production use.');
      setTimeout(() => setActionNotice(null), 4000);
    }
  };

  return (
    <div className="p-4 sm:p-8 space-y-6 max-w-[1700px] mx-auto animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
            <Settings className="w-6 h-6 text-blue-600" />
            StackVerse OS Organization & Compliance Settings
          </h1>
          <p className="text-xs text-slate-500">Corporate tax IDs (TIN/CAC), multi-currency, RBAC user permissions, database & storage management</p>
        </div>
      </div>

      {actionNotice && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-2xl text-xs font-semibold flex items-center gap-2 shadow-xs animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{actionNotice}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Company Settings Form */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-6">
          <h3 className="font-bold text-sm text-slate-900 border-b pb-3 flex items-center gap-2">
            <Building className="w-4 h-4 text-blue-600" /> Organization Profile & Tax Compliance
          </h3>

          <form onSubmit={handleSaveSettings} className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Registered Business Name</label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-bold"
                  required
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Primary Display Currency</label>
                <select
                  value={currency}
                  onChange={(e) => onUpdateCurrency(e.target.value as Currency)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-bold"
                >
                  <option value="NGN">NGN (₦ - Nigerian Naira)</option>
                  <option value="USD">USD ($ - US Dollar)</option>
                  <option value="KES">KES (KSh - Kenyan Shilling)</option>
                  <option value="GHS">GHS (GH₵ - Ghanaian Cedi)</option>
                  <option value="ZAR">ZAR (R - South African Rand)</option>
                  <option value="EUR">EUR (€ - Euro)</option>
                  <option value="GBP">GBP (£ - British Pound)</option>
                </select>
              </div>
            </div>

            {/* Tax IDs */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Tax Identification (TIN)</label>
                <input
                  type="text"
                  value={taxId}
                  onChange={(e) => setTaxId(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-mono"
                />
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">CAC Registration (RC)</label>
                <input
                  type="text"
                  value={cacNumber}
                  onChange={(e) => setCacNumber(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-mono"
                />
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">VAT Remittance ID</label>
                <input
                  type="text"
                  value={vatNumber}
                  onChange={(e) => setVatNumber(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-mono"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-md text-xs cursor-pointer transition-colors"
              >
                Save Organization Settings
              </button>
            </div>
          </form>

          {/* Database & Production Data Control Section */}
          <div className="pt-6 border-t border-slate-200 space-y-4 text-xs">
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <Database className="w-4 h-4 text-red-600" /> Database & Workspace Production Data
            </h3>
            <p className="text-slate-500">
              Prepare this workspace for live production usage by wiping all demo data or clearing current records.
            </p>

            {/* Current Record Counts Badge Grid */}
            {recordCounts && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200 text-[11px] font-mono">
                <div><span className="text-slate-500">Orders:</span> <strong className="text-slate-900">{recordCounts.orders}</strong></div>
                <div><span className="text-slate-500">Customers:</span> <strong className="text-slate-900">{recordCounts.customers}</strong></div>
                <div><span className="text-slate-500">Products:</span> <strong className="text-slate-900">{recordCounts.products}</strong></div>
                <div><span className="text-slate-500">Finance TX:</span> <strong className="text-slate-900">{recordCounts.transactions}</strong></div>
              </div>
            )}

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                type="button"
                onClick={() => setShowWipeConfirm(true)}
                className="px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-md flex items-center gap-2 transition-colors cursor-pointer"
              >
                <Trash2 className="w-4 h-4" /> Remove All Data (Start Clean)
              </button>
            </div>

            {/* Confirmation Drawer / Modal */}
            {showWipeConfirm && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-2xl text-red-900 space-y-3 animate-in fade-in">
                <div className="flex items-center gap-2 font-bold text-xs">
                  <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
                  Confirm Data Reset & Wipe
                </div>
                <p className="text-[11px] text-red-700 leading-relaxed">
                  Are you sure you want to delete all customers, products, sales orders, transactions, and documents? This will clear all stored data and give you a completely clean slate for real operations.
                </p>
                <div className="flex items-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={handleWipeData}
                    className="px-3.5 py-1.5 bg-red-700 hover:bg-red-800 text-white font-bold rounded-lg text-xs"
                  >
                    Yes, Wipe All Data Now
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowWipeConfirm(false)}
                    className="px-3.5 py-1.5 bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 font-medium rounded-lg text-xs"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Plan & Security Card */}
        <div className="space-y-6">
          {/* Subscription */}
          <div className="bg-[#0B1F3A] text-white p-6 rounded-2xl border border-slate-800 shadow-md space-y-3">
            <span className="px-2.5 py-1 rounded-full bg-blue-600/30 text-blue-300 text-[10px] font-mono font-bold border border-blue-500/40">
              {currentWorkspace.plan}
            </span>
            <h3 className="text-lg font-extrabold">Enterprise Scaled Subscription</h3>
            <p className="text-xs text-slate-300">
              Unlimited users, high-frequency POS terminals, multi-warehouse sync & dedicated account executive.
            </p>
            <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span>Next billing date:</span>
              <span className="font-mono font-bold text-white">August 30, 2026</span>
            </div>
          </div>

          {/* Active Account Profile */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-4 text-xs">
            <h4 className="font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <User className="w-4 h-4 text-blue-600" /> Active Authenticated Account
            </h4>
            
            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl space-y-2 border border-slate-200/80 dark:border-slate-700">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-extrabold text-sm flex items-center justify-center uppercase shadow-xs shrink-0">
                  {authUser?.photoURL ? (
                    <img src={authUser.photoURL} alt="User" className="w-full h-full object-cover rounded-full" />
                  ) : (
                    <span>{(authUser?.displayName || authUser?.email || 'A').charAt(0)}</span>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-bold text-slate-900 dark:text-white truncate">
                    {authUser?.displayName || 'Workspace Administrator'}
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                    {authUser?.email || 'authenticated@workspace.os'}
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between text-[11px]">
                <span className="text-slate-500">Firebase Auth UID:</span>
                <span className="font-mono text-slate-700 dark:text-slate-300 font-semibold truncate max-w-[130px]" title={authUser?.uid}>
                  {authUser?.uid || 'Local Session'}
                </span>
              </div>
            </div>

            {onLogout && (
              <button
                type="button"
                onClick={onLogout}
                className="w-full py-2.5 px-4 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 font-bold rounded-xl shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <LogOut className="w-4 h-4 text-red-600" />
                <span>Sign Out of OS Account</span>
              </button>
            )}
          </div>

          {/* Security */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-3 text-xs">
            <h4 className="font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> Security & Access Controls
            </h4>
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
              <div>
                <div className="font-bold text-slate-900">Enforce 2FA Authentication</div>
                <div className="text-[10px] text-slate-500">Mandatory TOTP SMS/Authenticator code</div>
              </div>
              <input
                type="checkbox"
                checked={twoFactorEnabled}
                onChange={(e) => setTwoFactorEnabled(e.target.checked)}
                className="w-4 h-4 accent-blue-600 rounded"
              />
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
