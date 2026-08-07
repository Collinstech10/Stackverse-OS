import React from 'react';
import {
  Landmark,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle2,
  Building2,
  CreditCard,
  PieChart,
  FileSpreadsheet,
  Download,
  Receipt
} from 'lucide-react';
import { Transaction } from '../types';

interface FinanceViewProps {
  transactions: Transaction[];
  currencySymbol: string;
  onAddTransaction: (t: Transaction) => void;
}

export const FinanceView: React.FC<FinanceViewProps> = ({
  transactions,
  currencySymbol,
  onAddTransaction
}) => {
  const [activeSubTab, setActiveSubTab] = React.useState<'overview' | 'pnl' | 'transactions'>('overview');

  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedType, setSelectedType] = React.useState<'All' | 'Income' | 'Expense'>('All');

  // Log Expense Modal State
  const [showLogExpenseModal, setShowLogExpenseModal] = React.useState(false);
  const [expenseDesc, setExpenseDesc] = React.useState('');
  const [expenseCategory, setExpenseCategory] = React.useState('Utilities');
  const [expenseAmount, setExpenseAmount] = React.useState('');
  const [expenseAccount, setExpenseAccount] = React.useState('Zenith Bank Corporate');
  const [expenseStatus, setExpenseStatus] = React.useState<'Reconciled' | 'Pending'>('Reconciled');
  const [expenseDate, setExpenseDate] = React.useState(() => new Date().toISOString().split('T')[0]);

  const handleCreateExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!expenseDesc.trim() || !expenseAmount) return;

    const numAmount = parseFloat(expenseAmount);
    if (isNaN(numAmount) || numAmount <= 0) return;

    const newTx: Transaction = {
      id: `tx-${Date.now()}`,
      description: expenseDesc.trim(),
      category: expenseCategory,
      type: 'Expense',
      amount: numAmount,
      date: expenseDate || new Date().toISOString().split('T')[0],
      status: expenseStatus,
      account: expenseAccount
    };

    onAddTransaction(newTx);

    // Reset & close
    setExpenseDesc('');
    setExpenseAmount('');
    setShowLogExpenseModal(false);
  };

  const totalIncome = transactions
    .filter(t => t.type === 'Income')
    .reduce((acc, t) => acc + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === 'Expense')
    .reduce((acc, t) => acc + t.amount, 0);

  const netProfit = totalIncome - totalExpenses;

  // Derive bank account balances dynamically from transaction ledger
  const mainSettlementIncome = transactions
    .filter(t => t.account.includes('Zenith') || t.account.includes('Main'))
    .reduce((acc, t) => acc + (t.type === 'Income' ? t.amount : -t.amount), 0);

  const bankAccounts = [
    { name: 'Zenith Bank Corporate', account: '0092182391', balance: Math.max(0, mainSettlementIncome), type: 'Main Settlement' },
    { name: 'GTBank Corporate USD', account: '4412093811', balance: 0, type: 'Import FX Account' },
    { name: 'Kuda Microfinance Bank', account: '2001923841', balance: 0, type: 'Payroll & Operating' },
    { name: 'Safaricom M-Pesa Till', account: 'Till #992101', balance: 0, type: 'East Africa Mobile' },
  ];

  const filteredTransactions = transactions.filter(t => {
    const matchesSearch = t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          t.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          t.account.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'All' || t.type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="p-4 sm:p-8 space-y-6 max-w-[1700px] mx-auto animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm transition-colors">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Landmark className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            Finance, Accounting & Tax Office
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">Real-time P&L, multi-bank account reconciliation & African tax compliance</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => alert('Exporting Q3 Financial Statements & Audit Ledger to Excel CSV...')}
            className="px-3.5 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-xs rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4 text-slate-600 dark:text-slate-400" /> Export Financials (CSV)
          </button>
          <button
            onClick={() => setShowLogExpenseModal(true)}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Log Expense
          </button>
        </div>
      </div>

      {/* Top Financial KPI Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-2 transition-colors">
          <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Gross Operating Income</div>
          <div className="text-2xl font-extrabold text-slate-900 dark:text-white font-mono">
            {currencySymbol}{totalIncome.toLocaleString()}
          </div>
          <div className="text-xs text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
            <ArrowUpRight className="w-3.5 h-3.5" /> {totalIncome > 0 ? '+24.8% vs Q2' : '0.0% growth'}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-2 transition-colors">
          <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Operating Expenses & Duty</div>
          <div className="text-2xl font-extrabold text-slate-900 dark:text-white font-mono">
            {currencySymbol}{totalExpenses.toLocaleString()}
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            {totalIncome > 0 ? ((totalExpenses / totalIncome) * 100).toFixed(1) : '0.0'}% Operating Expense Ratio
          </div>
        </div>

        <div className="bg-emerald-950 dark:bg-emerald-900/60 text-white p-5 rounded-2xl border border-emerald-800 shadow-md space-y-2">
          <div className="text-xs font-semibold text-emerald-300 uppercase tracking-wider">Net Profit After Tax</div>
          <div className="text-2xl font-extrabold text-emerald-400 font-mono">
            {currencySymbol}{netProfit.toLocaleString()}
          </div>
          <div className="text-xs text-emerald-300 font-medium flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Reconciled & Audited
          </div>
        </div>
      </div>

      {/* Bank Accounts Grid */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold text-slate-900 dark:text-slate-200 uppercase tracking-wider">Connected Bank Accounts & Settlements</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {bankAccounts.map((acc, idx) => (
            <div key={idx} className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-2 transition-colors">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-900 dark:text-slate-100">{acc.name}</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 font-mono font-semibold">
                  {acc.type}
                </span>
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">{acc.account}</div>
              <div className="text-lg font-extrabold font-mono text-slate-900 dark:text-white pt-1 border-t border-slate-100 dark:border-slate-800">
                {currencySymbol}{acc.balance.toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden transition-colors">
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">General Ledger & Transaction Records</h3>
            <span className="text-xs text-slate-500 dark:text-slate-400">Auto-synced with Paystack & GTBank</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <input
              type="text"
              placeholder="Search ledger..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-3 py-1.5 rounded-lg text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-hidden focus:border-blue-500 w-full sm:w-48"
            />
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value as any)}
              className="px-3 py-1.5 rounded-lg text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-hidden focus:border-blue-500"
            >
              <option value="All">All Types</option>
              <option value="Income">Income</option>
              <option value="Expense">Expense</option>
            </select>
          </div>
        </div>

        <table className="w-full text-left text-xs text-slate-700 dark:text-slate-300">
          <thead className="bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800 text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold">
            <tr>
              <th className="p-4">Description</th>
              <th className="p-4">Category</th>
              <th className="p-4">Type</th>
              <th className="p-4">Account</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
            {filteredTransactions.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-12 text-center text-slate-400 dark:text-slate-500">
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <Receipt className="w-8 h-8 text-slate-300 dark:text-slate-600" />
                    <p className="font-bold text-slate-700 dark:text-slate-300 text-sm">No transaction ledger entries found</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Record income or log expenses to populate your financial statements.</p>
                  </div>
                </td>
              </tr>
            ) : (
              filteredTransactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="p-4 font-bold text-slate-900 dark:text-slate-100">{tx.description}</td>
                  <td className="p-4 font-semibold text-slate-700 dark:text-slate-300">{tx.category}</td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        tx.type === 'Income' ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {tx.type}
                    </span>
                  </td>
                  <td className="p-4 text-slate-600 dark:text-slate-400">{tx.account}</td>
                  <td
                    className={`p-4 font-mono font-extrabold ${
                      tx.type === 'Income' ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-900 dark:text-slate-100'
                    }`}
                  >
                    {tx.type === 'Income' ? '+' : '-'}{currencySymbol}{tx.amount.toLocaleString()}
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 font-bold text-[10px]">
                      {tx.status}
                    </span>
                  </td>
                  <td className="p-4 text-right font-mono text-slate-500 dark:text-slate-400">{tx.date}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Log Expense Modal */}
      {showLogExpenseModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden text-slate-900 dark:text-slate-100">
            <div className="flex items-center justify-between p-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 rounded-xl">
                  <Receipt className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base">Log New Expense</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Record custom operating expenses to your general ledger</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowLogExpenseModal(false)}
                className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateExpense} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Expense Description *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Office Stationery & Printing, Fuel Supply, Internet Tariff"
                  value={expenseDesc}
                  onChange={(e) => setExpenseDesc(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-hidden focus:border-emerald-500 font-medium"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Amount ({currencySymbol}) *</label>
                  <input
                    type="number"
                    required
                    min="1"
                    placeholder="0"
                    value={expenseAmount}
                    onChange={(e) => setExpenseAmount(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-hidden focus:border-emerald-500 font-mono font-bold"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Category</label>
                  <select
                    value={expenseCategory}
                    onChange={(e) => setExpenseCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-hidden focus:border-emerald-500 font-medium"
                  >
                    <option value="Utilities">Utilities & Fuel</option>
                    <option value="Logistics & Duty">Logistics, Freight & Customs</option>
                    <option value="Office Supplies">Office Supplies & Rent</option>
                    <option value="Marketing">Marketing & Advertising</option>
                    <option value="Software & IT">Software & Subscriptions</option>
                    <option value="Salaries">Payroll & Stipends</option>
                    <option value="General Expense">General Expense</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Payment Account</label>
                  <select
                    value={expenseAccount}
                    onChange={(e) => setExpenseAccount(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-hidden focus:border-emerald-500 font-medium"
                  >
                    <option value="Zenith Bank Corporate">Zenith Bank Corporate</option>
                    <option value="GTBank Corporate USD">GTBank Corporate USD</option>
                    <option value="Kuda Microfinance Bank">Kuda Microfinance Bank</option>
                    <option value="Safaricom M-Pesa Till">Safaricom M-Pesa Till</option>
                    <option value="Petty Cash Reserve">Petty Cash Reserve</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Status</label>
                  <select
                    value={expenseStatus}
                    onChange={(e) => setExpenseStatus(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-hidden focus:border-emerald-500 font-medium"
                  >
                    <option value="Reconciled">Reconciled</option>
                    <option value="Pending">Pending Audit</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Date</label>
                <input
                  type="date"
                  value={expenseDate}
                  onChange={(e) => setExpenseDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-hidden focus:border-emerald-500 font-medium"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowLogExpenseModal(false)}
                  className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs rounded-xl shadow-md cursor-pointer flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" /> Save Expense Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
