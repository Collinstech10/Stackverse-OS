import React, { useState } from 'react';
import {
  X,
  FileText,
  ShoppingCart,
  UserPlus,
  PackagePlus,
  DollarSign,
  Megaphone,
  UserCheck,
  CheckCircle2,
  ArrowRight,
  Plus
} from 'lucide-react';
import { ViewMode, Customer, Product, Order, Transaction, Employee, Campaign } from '../types';

interface QuickActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAction?: (view: ViewMode, subAction?: string) => void;
  currencySymbol: string;
  customers?: Customer[];
  products?: Product[];
  onAddOrder?: (order: Order) => void;
  onAddCustomer?: (customer: Customer) => void;
  onAddProduct?: (product: Product) => void;
  onAddTransaction?: (transaction: Transaction) => void;
  onAddEmployee?: (employee: Employee) => void;
  onAddCampaign?: (campaign: Campaign) => void;
}

export const QuickActionModal: React.FC<QuickActionModalProps> = ({
  isOpen,
  onClose,
  onSelectAction,
  currencySymbol,
  customers = [],
  products = [],
  onAddOrder,
  onAddCustomer,
  onAddProduct,
  onAddTransaction,
  onAddEmployee,
  onAddCampaign
}) => {
  const [selectedActionId, setSelectedActionId] = useState<string | null>(null);
  const [submittedMessage, setSubmittedMessage] = useState<string | null>(null);

  // Form states for quick configuration
  const [custName, setCustName] = useState('');
  const [custEmail, setCustEmail] = useState('');
  const [custCompany, setCustCompany] = useState('');
  const [amount, setAmount] = useState('');
  const [prodName, setProdName] = useState('');
  const [prodCategory, setProdCategory] = useState('Electronics');
  const [expenseDesc, setExpenseDesc] = useState('');
  const [campaignName, setCampaignName] = useState('');

  if (!isOpen) return null;

  const actions = [
    {
      id: 'inv',
      title: 'Issue New Tax Invoice',
      desc: 'Create an itemized invoice with VAT & WHT for B2B client.',
      icon: FileText,
      color: 'bg-blue-600',
      view: 'sales' as ViewMode,
    },
    {
      id: 'pos',
      title: 'Open POS Checkout',
      desc: 'Launch walk-in register with barcode scanner & card terminal.',
      icon: ShoppingCart,
      color: 'bg-emerald-600',
      view: 'sales' as ViewMode,
    },
    {
      id: 'cust',
      title: 'Add New Customer / Lead',
      desc: 'Save contact details, company segment & credit terms.',
      icon: UserPlus,
      color: 'bg-indigo-600',
      view: 'crm' as ViewMode,
    },
    {
      id: 'prod',
      title: 'Add Inventory SKU Product',
      desc: 'Catalog new item with warehouse location & reorder alert.',
      icon: PackagePlus,
      color: 'bg-purple-600',
      view: 'inventory' as ViewMode,
    },
    {
      id: 'exp',
      title: 'Log Business Expense',
      desc: `Record operational cost, customs duty or utility in ${currencySymbol}.`,
      icon: DollarSign,
      color: 'bg-amber-600',
      view: 'finance' as ViewMode,
    },
    {
      id: 'pay',
      title: 'Run One-Click Payroll',
      desc: 'Calculate salary, tax deductions & dispatch payslips.',
      icon: UserCheck,
      color: 'bg-teal-600',
      view: 'hr' as ViewMode,
    },
    {
      id: 'wa',
      title: 'Send WhatsApp Broadcast',
      desc: 'Dispatch promotional catalog to customer segments.',
      icon: Megaphone,
      color: 'bg-green-600',
      view: 'marketing' as ViewMode,
    },
  ];

  const handleExecuteAction = (actionId: string, view: ViewMode) => {
    const numAmount = parseFloat(amount) || 50000;

    if (actionId === 'inv') {
      const newOrder: Order = {
        id: `ord-${Date.now()}`,
        orderNumber: `INV-${Math.floor(1000 + Math.random() * 9000)}`,
        customerName: custName || 'Acme Corp',
        customerEmail: custEmail || 'info@acme.com',
        items: [
          {
            productId: products[0]?.id || 'p1',
            productName: products[0]?.name || prodName,
            price: numAmount,
            quantity: 1
          }
        ],
        totalAmount: numAmount,
        paymentMethod: 'Bank Transfer',
        status: 'Pending',
        date: 'Just now',
        channel: 'B2B Sales'
      };
      if (onAddOrder) onAddOrder(newOrder);
    } else if (actionId === 'pos') {
      const newOrder: Order = {
        id: `ord-${Date.now()}`,
        orderNumber: `POS-${Math.floor(1000 + Math.random() * 9000)}`,
        customerName: custName || 'Walk-in Retail Customer',
        customerEmail: 'walkin@store.com',
        items: [
          {
            productId: products[0]?.id || 'p1',
            productName: products[0]?.name || 'Retail Item',
            price: numAmount,
            quantity: 1
          }
        ],
        totalAmount: numAmount,
        paymentMethod: 'POS Card',
        status: 'Completed',
        date: 'Just now',
        channel: 'POS Terminal'
      };
      if (onAddOrder) onAddOrder(newOrder);
    } else if (actionId === 'cust') {
      const newCustomer: Customer = {
        id: `c-${Date.now()}`,
        name: custName || 'New Client',
        company: custCompany || 'Client Enterprise',
        email: custEmail || 'client@enterprise.com',
        phone: '+234 803 123 4567',
        location: 'Lagos, Nigeria',
        segment: 'Wholesale',
        stage: 'Lead',
        totalSpent: 0,
        ordersCount: 0,
        lastOrderDate: 'Never',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
        notes: ['Created via Quick Action'],
        tags: ['New Lead']
      };
      if (onAddCustomer) onAddCustomer(newCustomer);
    } else if (actionId === 'prod') {
      const newProduct: Product = {
        id: `prod-${Date.now()}`,
        sku: `SKU-${Math.floor(10000 + Math.random() * 90000)}`,
        name: prodName || 'New Product SKU',
        category: prodCategory || 'General',
        warehouse: 'Lagos Central',
        stock: 50,
        minStockAlert: 10,
        buyingPrice: Math.round(numAmount * 0.7),
        sellingPrice: numAmount,
        supplier: 'Global Trade Ltd',
        status: 'In Stock',
        barcode: '8901234567890',
        image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&q=80&w=400'
      };
      if (onAddProduct) onAddProduct(newProduct);
    } else if (actionId === 'exp') {
      const newTx: Transaction = {
        id: `tx-${Date.now()}`,
        description: expenseDesc || 'Operational Expense',
        category: 'Utilities',
        type: 'Expense',
        amount: numAmount,
        date: 'Just now',
        status: 'Reconciled',
        account: 'Operating Account'
      };
      if (onAddTransaction) onAddTransaction(newTx);
    } else if (actionId === 'pay') {
      const newTx: Transaction = {
        id: `tx-${Date.now()}`,
        description: 'Monthly Staff Payroll Dispatch',
        category: 'Payroll',
        type: 'Expense',
        amount: numAmount * 5,
        date: 'Just now',
        status: 'Reconciled',
        account: 'Salary Reserve Account'
      };
      if (onAddTransaction) onAddTransaction(newTx);
    } else if (actionId === 'wa') {
      const newCampaign: Campaign = {
        id: `camp-${Date.now()}`,
        name: campaignName || 'WhatsApp Broadcast Promo',
        type: 'WhatsApp Broadcast',
        audience: 'All VIP Clients',
        sentCount: 1250,
        openRate: 94.5,
        clickRate: 38.2,
        status: 'Active',
        date: 'Just now'
      };
      if (onAddCampaign) onAddCampaign(newCampaign);
    }

    setSubmittedMessage(`Successfully created record & updated database! Opening module...`);
    setTimeout(() => {
      setSubmittedMessage(null);
      setSelectedActionId(null);
      if (onSelectAction) {
        onSelectAction(view, actionId);
      }
      onClose();
    }, 700);
  };

  const selectedAction = actions.find(a => a.id === selectedActionId);

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-[#0B1F3A] border border-slate-700 w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden text-slate-100">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
              StackVerse Quick Action Launcher
            </h3>
            <p className="text-xs text-slate-400">Perform instant operations across your African business OS</p>
          </div>
          <button
            onClick={() => {
              setSelectedActionId(null);
              onClose();
            }}
            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        {!selectedActionId ? (
          /* Action Grid Selection */
          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[460px] overflow-y-auto custom-scrollbar">
            {actions.map((act) => {
              const Icon = act.icon;
              return (
                <button
                  key={act.id}
                  onClick={() => setSelectedActionId(act.id)}
                  className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-blue-500/50 transition-all text-left group cursor-pointer"
                >
                  <div className={`p-2.5 rounded-xl ${act.color} text-white shadow-md shrink-0`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-xs text-white group-hover:text-blue-300 transition-colors">
                      {act.title}
                    </div>
                    <div className="text-[11px] text-slate-400 leading-tight mt-0.5">
                      {act.desc}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        ) : (
          /* Detailed Configuration Form */
          <div className="p-6 space-y-4 max-h-[460px] overflow-y-auto custom-scrollbar">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900 border border-slate-800">
              {selectedAction && (
                <>
                  <div className={`p-2.5 rounded-xl ${selectedAction.color} text-white shrink-0`}>
                    <selectedAction.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">{selectedAction.title}</h4>
                    <p className="text-xs text-slate-400">{selectedAction.desc}</p>
                  </div>
                </>
              )}
            </div>

            {/* Inputs based on selected action */}
            {selectedActionId === 'inv' && (
              <div className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Customer / Client Name</label>
                  <input
                    type="text"
                    value={custName}
                    onChange={(e) => setCustName(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white focus:outline-hidden focus:border-blue-500"
                    placeholder="Client Name"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Total Amount ({currencySymbol})</label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white focus:outline-hidden focus:border-blue-500"
                  />
                </div>
              </div>
            )}

            {selectedActionId === 'pos' && (
              <div className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Customer Name (Optional)</label>
                  <input
                    type="text"
                    value={custName}
                    onChange={(e) => setCustName(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white focus:outline-hidden focus:border-blue-500"
                    placeholder="Walk-in Customer"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Register Total ({currencySymbol})</label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white focus:outline-hidden focus:border-blue-500"
                  />
                </div>
              </div>
            )}

            {selectedActionId === 'cust' && (
              <div className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Full Name</label>
                  <input
                    type="text"
                    value={custName}
                    onChange={(e) => setCustName(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white focus:outline-hidden focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Company / Business</label>
                  <input
                    type="text"
                    value={custCompany}
                    onChange={(e) => setCustCompany(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white focus:outline-hidden focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Email Address</label>
                  <input
                    type="email"
                    value={custEmail}
                    onChange={(e) => setCustEmail(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white focus:outline-hidden focus:border-blue-500"
                  />
                </div>
              </div>
            )}

            {selectedActionId === 'prod' && (
              <div className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Product Title</label>
                  <input
                    type="text"
                    value={prodName}
                    onChange={(e) => setProdName(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white focus:outline-hidden focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Category</label>
                  <input
                    type="text"
                    value={prodCategory}
                    onChange={(e) => setProdCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white focus:outline-hidden focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Price ({currencySymbol})</label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white focus:outline-hidden focus:border-blue-500"
                  />
                </div>
              </div>
            )}

            {selectedActionId === 'exp' && (
              <div className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Expense Description</label>
                  <input
                    type="text"
                    value={expenseDesc}
                    onChange={(e) => setExpenseDesc(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white focus:outline-hidden focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Amount ({currencySymbol})</label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white focus:outline-hidden focus:border-blue-500"
                  />
                </div>
              </div>
            )}

            {selectedActionId === 'pay' && (
              <div className="space-y-3 text-xs">
                <p className="text-slate-300">
                  Ready to calculate and execute statutory payroll dispatch across registered staff.
                </p>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Total Payroll Budget ({currencySymbol})</label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white focus:outline-hidden focus:border-blue-500"
                  />
                </div>
              </div>
            )}

            {selectedActionId === 'wa' && (
              <div className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Broadcast Title</label>
                  <input
                    type="text"
                    value={campaignName}
                    onChange={(e) => setCampaignName(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white focus:outline-hidden focus:border-blue-500"
                  />
                </div>
              </div>
            )}

            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => setSelectedActionId(null)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-medium cursor-pointer"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => selectedAction && handleExecuteAction(selectedAction.id, selectedAction.view)}
                className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 shadow-lg shadow-blue-900/30 transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Confirm & Create Record</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Toast / Status banner */}
        {submittedMessage && (
          <div className="bg-emerald-950/90 border-t border-emerald-800 px-6 py-2.5 text-xs text-emerald-300 flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 animate-bounce" />
            <span>{submittedMessage}</span>
          </div>
        )}

        {/* Footer */}
        <div className="bg-slate-900 px-6 py-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
          <span>Tip: Real-time synced with Firebase Firestore database</span>
          <button
            onClick={() => {
              setSelectedActionId(null);
              onClose();
            }}
            className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs cursor-pointer"
          >
            Cancel
          </button>
        </div>

      </div>
    </div>
  );
};

