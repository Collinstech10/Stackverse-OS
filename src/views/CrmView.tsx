import React from 'react';
import {
  Users,
  Search,
  Plus,
  UserPlus,
  Phone,
  Mail,
  MapPin,
  Building2,
  Tag,
  Kanban,
  Table as TableIcon,
  X,
  FileText,
  DollarSign,
  Send,
  MessageSquare,
  CheckCircle2
} from 'lucide-react';
import { Customer } from '../types';

interface CrmViewProps {
  customers: Customer[];
  currencySymbol: string;
  onAddCustomer: (c: Customer) => void;
}

export const CrmView: React.FC<CrmViewProps> = ({
  customers,
  currencySymbol,
  onAddCustomer
}) => {
  const [viewType, setViewType] = React.useState<'table' | 'kanban'>('kanban');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedSegment, setSelectedSegment] = React.useState<string>('All');
  const [activeCustomer, setActiveCustomer] = React.useState<Customer | null>(null);
  const [newNoteInput, setNewNoteInput] = React.useState('');

  // Add Customer Modal State
  const [showAddCustomerModal, setShowAddCustomerModal] = React.useState(false);
  const [custName, setCustName] = React.useState('');
  const [custCompany, setCustCompany] = React.useState('');
  const [custEmail, setCustEmail] = React.useState('');
  const [custPhone, setCustPhone] = React.useState('');
  const [custLocation, setCustLocation] = React.useState('');
  const [custSegment, setCustSegment] = React.useState<Customer['segment']>('Enterprise');
  const [custStage, setCustStage] = React.useState<Customer['stage']>('Lead');

  const handleCreateCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!custName.trim()) return;

    const newC: Customer = {
      id: `cust-${Date.now()}`,
      name: custName.trim(),
      company: custCompany.trim() || 'Independent Client',
      email: custEmail.trim() || 'client@contact.com',
      phone: custPhone.trim() || 'N/A',
      location: custLocation.trim() || 'Lagos, Nigeria',
      segment: custSegment,
      stage: custStage,
      totalSpent: 0,
      ordersCount: 0,
      lastOrderDate: new Date().toISOString().split('T')[0],
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      notes: [],
      tags: [custSegment]
    };

    onAddCustomer(newC);
    setActiveCustomer(newC);

    // Reset
    setCustName('');
    setCustCompany('');
    setCustEmail('');
    setCustPhone('');
    setCustLocation('');
    setShowAddCustomerModal(false);
  };

  const stages: Customer['stage'][] = ['Lead', 'Contacted', 'Proposal', 'Negotiation', 'Won'];

  const filteredCustomers = customers.filter(c => {
    const matchesSegment = selectedSegment === 'All' || c.segment === selectedSegment;
    const matchesQuery =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSegment && matchesQuery;
  });

  const handleAddNote = () => {
    if (!activeCustomer || !newNoteInput.trim()) return;
    const updated = {
      ...activeCustomer,
      notes: [newNoteInput.trim(), ...activeCustomer.notes]
    };
    setActiveCustomer(updated);
    setNewNoteInput('');
  };

  return (
    <div className="p-4 sm:p-8 space-y-6 max-w-[1700px] mx-auto animate-in fade-in duration-300">
      
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
            <Users className="w-6 h-6 text-indigo-600" />
            CRM & Customer Pipeline
          </h1>
          <p className="text-xs text-slate-500">Manage B2B lead qualification, sales funnel stages & customer timeline</p>
        </div>

        {/* View Switcher & Action */}
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-semibold text-slate-600">
            <button
              onClick={() => setViewType('kanban')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                viewType === 'kanban' ? 'bg-indigo-600 text-white shadow-sm' : 'hover:text-slate-900'
              }`}
            >
              <Kanban className="w-3.5 h-3.5" /> Pipeline Kanban
            </button>
            <button
              onClick={() => setViewType('table')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                viewType === 'table' ? 'bg-indigo-600 text-white shadow-sm' : 'hover:text-slate-900'
              }`}
            >
              <TableIcon className="w-3.5 h-3.5" /> Directory Table
            </button>
          </div>

          <button
            onClick={() => setShowAddCustomerModal(true)}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Add B2B Client
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-slate-200/80 shadow-sm">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search by name, company or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-indigo-500"
          />
        </div>

        {/* Segments */}
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
          {['All', 'Enterprise', 'Wholesale', 'Retail', 'VIP'].map((seg) => (
            <button
              key={seg}
              onClick={() => setSelectedSegment(seg)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                selectedSegment === seg
                  ? 'bg-slate-900 text-white font-semibold'
                  : 'bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {seg}
            </button>
          ))}
        </div>
      </div>

      {/* Kanban Funnel View */}
      {viewType === 'kanban' ? (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 overflow-x-auto pb-4 custom-scrollbar">
          {stages.map((stage) => {
            const stageCustomers = filteredCustomers.filter(c => c.stage === stage);
            const stageTotal = stageCustomers.reduce((acc, c) => acc + c.totalSpent, 0);

            return (
              <div key={stage} className="bg-slate-100/80 rounded-2xl p-3 border border-slate-200/80 space-y-3 min-w-[240px]">
                {/* Stage Header */}
                <div className="flex items-center justify-between px-1">
                  <div className="font-bold text-xs text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-indigo-600" />
                    {stage}
                  </div>
                  <span className="text-[10px] font-mono font-bold bg-white px-2 py-0.5 rounded-full text-slate-600 shadow-xs">
                    {stageCustomers.length}
                  </span>
                </div>

                {/* Stage Cards */}
                <div className="space-y-2.5">
                  {stageCustomers.map((c) => (
                    <div
                      key={c.id}
                      onClick={() => setActiveCustomer(c)}
                      className="bg-white p-3.5 rounded-xl border border-slate-200/80 shadow-xs hover:shadow-md hover:border-indigo-500/50 transition-all cursor-pointer space-y-2 group"
                    >
                      <div className="flex items-center gap-2.5">
                        <img
                          src={c.avatar}
                          alt={c.name}
                          className="w-8 h-8 rounded-full object-cover ring-2 ring-slate-100"
                        />
                        <div className="truncate">
                          <div className="font-bold text-xs text-slate-900 group-hover:text-indigo-600 truncate">
                            {c.name}
                          </div>
                          <div className="text-[10px] text-slate-500 truncate">{c.company}</div>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                        <span className="text-slate-500">Value:</span>
                        <span className="font-mono font-bold text-slate-900">
                          {currencySymbol}{c.totalSpent.toLocaleString()}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-1 pt-1">
                        {c.tags.map((t, idx) => (
                          <span key={idx} className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-indigo-50 text-indigo-700 font-semibold">
                            #{t}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Table Directory View */
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 border-b border-slate-200 text-[10px] uppercase tracking-wider text-slate-500 font-semibold">
              <tr>
                <th className="p-4">Customer</th>
                <th className="p-4">Company & Location</th>
                <th className="p-4">Segment</th>
                <th className="p-4">Stage</th>
                <th className="p-4">Total Spent</th>
                <th className="p-4">Orders</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredCustomers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-12 text-center text-slate-400">
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <Users className="w-8 h-8 text-slate-300" />
                      <p className="font-bold text-slate-700 text-sm">No customer records in pipeline</p>
                      <p className="text-xs text-slate-500">Add your first corporate client or retail buyer to start managing leads.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredCustomers.map((c) => (
                  <tr
                    key={c.id}
                    onClick={() => setActiveCustomer(c)}
                    className="hover:bg-slate-50/80 transition-colors cursor-pointer"
                  >
                    <td className="p-4 flex items-center gap-3">
                      <img src={c.avatar} alt={c.name} className="w-8 h-8 rounded-full object-cover" />
                      <div>
                        <div className="font-bold text-slate-900">{c.name}</div>
                        <div className="text-[10px] text-slate-500">{c.email}</div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="font-semibold text-slate-800">{c.company}</div>
                      <div className="text-[10px] text-slate-500">{c.location}</div>
                    </td>
                    <td className="p-4">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 text-indigo-700">
                        {c.segment}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                        {c.stage}
                      </span>
                    </td>
                    <td className="p-4 font-mono font-bold text-slate-900">
                      {currencySymbol}{c.totalSpent.toLocaleString()}
                    </td>
                    <td className="p-4 font-mono">{c.ordersCount} Orders</td>
                    <td className="p-4 text-right font-semibold text-indigo-600 hover:underline">
                      View Profile
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Deep Customer Profile Slide-Over Drawer */}
      {activeCustomer && (
        <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white border-l border-slate-300 shadow-2xl flex flex-col text-slate-900 animate-in slide-in-from-right duration-300">
          
          {/* Drawer Header */}
          <div className="p-5 border-b border-slate-200 bg-slate-900 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={activeCustomer.avatar}
                alt={activeCustomer.name}
                className="w-10 h-10 rounded-full object-cover ring-2 ring-indigo-500"
              />
              <div>
                <h3 className="font-bold text-sm text-white">{activeCustomer.name}</h3>
                <p className="text-[11px] text-slate-300">{activeCustomer.company}</p>
              </div>
            </div>
            <button
              onClick={() => setActiveCustomer(null)}
              className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Body */}
          <div className="flex-1 overflow-y-auto p-5 space-y-5 text-xs custom-scrollbar">
            
            {/* Quick Contact Info */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 space-y-2">
              <div className="flex items-center gap-2 text-slate-700">
                <Mail className="w-3.5 h-3.5 text-indigo-600" />
                <span>{activeCustomer.email}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <Phone className="w-3.5 h-3.5 text-indigo-600" />
                <span>{activeCustomer.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <MapPin className="w-3.5 h-3.5 text-indigo-600" />
                <span>{activeCustomer.location}</span>
              </div>
            </div>

            {/* Financial Value Stats */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-indigo-50 rounded-xl border border-indigo-100">
                <div className="text-[10px] text-indigo-600 font-bold uppercase">Lifetime Value</div>
                <div className="text-base font-extrabold font-mono text-indigo-900 mt-0.5">
                  {currencySymbol}{activeCustomer.totalSpent.toLocaleString()}
                </div>
              </div>
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100">
                <div className="text-[10px] text-emerald-600 font-bold uppercase">Total Orders</div>
                <div className="text-base font-extrabold font-mono text-emerald-900 mt-0.5">
                  {activeCustomer.ordersCount} Completed
                </div>
              </div>
            </div>

            {/* Account Notes */}
            <div className="space-y-2">
              <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[10px] flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-indigo-600" /> Account Activity Notes
              </h4>
              <div className="space-y-2">
                {activeCustomer.notes.map((note, idx) => (
                  <div key={idx} className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-slate-700 leading-snug">
                    {note}
                  </div>
                ))}
              </div>

              {/* Add Note Form */}
              <div className="flex gap-2 pt-1">
                <input
                  type="text"
                  placeholder="Add a new note or interaction log..."
                  value={newNoteInput}
                  onChange={(e) => setNewNoteInput(e.target.value)}
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs"
                />
                <button
                  onClick={handleAddNote}
                  className="px-3 py-1.5 bg-indigo-600 text-white rounded-xl font-bold"
                >
                  Save
                </button>
              </div>
            </div>

          </div>

          {/* Drawer Footer */}
          <div className="p-4 border-t border-slate-200 bg-slate-50 flex gap-2">
            <button
              onClick={() => alert(`Sending WhatsApp message to ${activeCustomer.phone}...`)}
              className="flex-1 py-2 bg-green-600 hover:bg-green-500 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5" /> WhatsApp Client
            </button>
            <button
              onClick={() => alert(`Creating tax invoice for ${activeCustomer.name}...`)}
              className="flex-1 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5"
            >
              <FileText className="w-3.5 h-3.5" /> Issue Invoice
            </button>
          </div>

        </div>
      )}

      {/* Add Customer Modal */}
      {showAddCustomerModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden text-slate-900 dark:text-slate-100">
            <div className="flex items-center justify-between p-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 rounded-xl">
                  <UserPlus className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base">Add New B2B Client</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Onboard client to pipeline and CRM database</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowAddCustomerModal(false)}
                className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateCustomer} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Full Contact / Lead Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Chief Hassan Bello"
                  value={custName}
                  onChange={(e) => setCustName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-hidden focus:border-indigo-500 font-medium"
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Company / Business Name</label>
                <input
                  type="text"
                  placeholder="e.g. Abuja Solar Grid Enterprise"
                  value={custCompany}
                  onChange={(e) => setCustCompany(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-hidden focus:border-indigo-500 font-medium"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Email Address</label>
                  <input
                    type="email"
                    placeholder="client@company.com"
                    value={custEmail}
                    onChange={(e) => setCustEmail(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-hidden focus:border-indigo-500 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Phone Number</label>
                  <input
                    type="text"
                    placeholder="+234 800 000 0000"
                    value={custPhone}
                    onChange={(e) => setCustPhone(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-hidden focus:border-indigo-500 font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Location</label>
                  <input
                    type="text"
                    placeholder="Lagos, Nigeria"
                    value={custLocation}
                    onChange={(e) => setCustLocation(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-hidden focus:border-indigo-500 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Segment</label>
                  <select
                    value={custSegment}
                    onChange={(e) => setCustSegment(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-hidden focus:border-indigo-500 font-medium"
                  >
                    <option value="Enterprise">Enterprise</option>
                    <option value="Wholesale">Wholesale</option>
                    <option value="Retail">Retail</option>
                    <option value="SME">SME</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Pipeline Stage</label>
                  <select
                    value={custStage}
                    onChange={(e) => setCustStage(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-hidden focus:border-indigo-500 font-medium"
                  >
                    <option value="Lead">Lead</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Proposal">Proposal</option>
                    <option value="Negotiation">Negotiation</option>
                    <option value="Won">Won</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddCustomerModal(false)}
                  className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs rounded-xl shadow-md cursor-pointer flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" /> Save Client Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
