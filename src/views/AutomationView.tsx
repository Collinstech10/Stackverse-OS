import React, { useState, useEffect } from 'react';
import {
  Workflow,
  Plus,
  Play,
  CheckCircle2,
  Zap,
  ShoppingCart,
  DollarSign,
  MessageSquare,
  Package,
  AlertTriangle,
  FileText,
  Bell,
  Trash2,
  Copy,
  Activity,
  Clock,
  Sparkles,
  Search,
  X,
  ChevronRight,
  Filter,
  Check,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';
import { AutomationWorkflow, AutomationNode, AutomationExecutionLog } from '../types';
import { subscribeToCollection, saveToCollection, removeFromCollection } from '../lib/firestoreService';

const INITIAL_WORKFLOWS: AutomationWorkflow[] = [
  {
    id: 'wf-1',
    name: 'High-Value Order WhatsApp VIP Notification',
    description: 'Sends VIP customer thank-you and alerts Lagos warehouse team when order > ₦500,000.',
    active: true,
    runsCount: 142,
    lastTriggered: '2026-08-07 08:30 AM',
    nodes: [
      { id: 'n1', type: 'trigger', title: 'When New Sales Order Created', description: 'Triggers on POS or B2B Online sale', icon: 'ShoppingCart' },
      { id: 'n2', type: 'condition', title: 'If Total Amount > ₦500,000', description: 'Filters high-value transactions', icon: 'DollarSign' },
      { id: 'n3', type: 'action', title: 'Send WhatsApp VIP Thank-You', description: 'Automated personal message with PDF receipt', icon: 'MessageSquare' },
      { id: 'n4', type: 'action', title: 'Alert Lagos Warehouse Team', description: 'Priority dispatch tag applied in inventory', icon: 'Package' }
    ]
  },
  {
    id: 'wf-2',
    name: 'Low Inventory Auto-Reorder & Supplier PO Draft',
    description: 'Generates supplier purchase orders and alerts CFO when stock dips below safety threshold.',
    active: true,
    runsCount: 89,
    lastTriggered: '2026-08-06 04:15 PM',
    nodes: [
      { id: 'n10', type: 'trigger', title: 'Stock Falls Below Min Threshold', description: 'Checked continuously across warehouses', icon: 'AlertTriangle' },
      { id: 'n11', type: 'action', title: 'Draft Purchase Order to Supplier', description: 'Pre-fills buying price & supplier email', icon: 'FileText' },
      { id: 'n12', type: 'action', title: 'Notify CFO for One-Click Approval', description: 'Slack & Email instant push alert', icon: 'Bell' }
    ]
  },
  {
    id: 'wf-3',
    name: 'Automated VAT & Tax General Ledger Sync',
    description: 'Posts 7.5% VAT liabilities and tax records automatically when payments are settled.',
    active: true,
    runsCount: 310,
    lastTriggered: '2026-08-07 07:45 AM',
    nodes: [
      { id: 'n20', type: 'trigger', title: 'Payment Settled via Paystack/M-Pesa', description: 'Reconciled incoming funds', icon: 'DollarSign' },
      { id: 'n21', type: 'action', title: 'Calculate & Record 7.5% VAT Expense', description: 'Posts transaction entry in Finance View', icon: 'FileText' },
      { id: 'n22', type: 'action', title: 'Sync with Tax Filing Register', description: 'Prepares quarterly CAC & FIRS compliance export', icon: 'CheckCircle2' }
    ]
  }
];

const INITIAL_LOGS: AutomationExecutionLog[] = [
  {
    id: 'log-101',
    workflowId: 'wf-1',
    workflowName: 'High-Value Order WhatsApp VIP Notification',
    timestamp: '2026-08-07 08:30:12 AM',
    status: 'Success',
    triggerEvent: 'POS Sale #ORD-2026-881 (₦750,000)',
    details: 'Executed 4 nodes in 140ms. WhatsApp receipt delivered to Dangote Corp. Priority dispatch created.'
  },
  {
    id: 'log-102',
    workflowId: 'wf-3',
    workflowName: 'Automated VAT & Tax General Ledger Sync',
    timestamp: '2026-08-07 07:45:00 AM',
    status: 'Success',
    triggerEvent: 'Paystack Settlement #TX-99201',
    details: 'Executed 3 nodes in 85ms. ₦37,500 VAT liability posted to Finance ledger.'
  },
  {
    id: 'log-103',
    workflowId: 'wf-2',
    workflowName: 'Low Inventory Auto-Reorder & Supplier PO Draft',
    timestamp: '2026-08-06 04:15:30 PM',
    status: 'Success',
    triggerEvent: 'Stock alert: Solar Inverter 5kVA (3 units remaining)',
    details: 'Executed 3 nodes in 210ms. PO #PO-882 drafted to Felicity Solar Ltd.'
  }
];

export const AutomationView: React.FC = () => {
  // State initialization with localStorage persistence
  const [workflows, setWorkflows] = useState<AutomationWorkflow[]>(() => {
    try {
      const saved = localStorage.getItem('stackverse_workflows');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error loading workflows', e);
    }
    return INITIAL_WORKFLOWS;
  });

  const [logs, setLogs] = useState<AutomationExecutionLog[]>(() => {
    try {
      const saved = localStorage.getItem('stackverse_automation_logs');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error loading automation logs', e);
    }
    return INITIAL_LOGS;
  });

  const [activeTab, setActiveTab] = useState<'workflows' | 'logs'>('workflows');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [testingWfId, setTestingWfId] = useState<string | null>(null);
  const [testingStep, setTestingStep] = useState<number>(-1);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [logSearch, setLogSearch] = useState('');

  // New Workflow Form State
  const [newWfName, setNewWfName] = useState('');
  const [newWfDesc, setNewWfDesc] = useState('');
  const [selectedTrigger, setSelectedTrigger] = useState('When New Sales Order Created');
  const [selectedCondition, setSelectedCondition] = useState('If Total Amount > ₦100,000');
  const [selectedAction, setSelectedAction] = useState('Send WhatsApp Message & PDF Receipt');

  // Sync to Firestore and localStorage
  useEffect(() => {
    const unsub = subscribeToCollection<AutomationWorkflow>('workflows', items => {
      if (items.length > 0) {
        setWorkflows(items);
      }
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('stackverse_workflows', JSON.stringify(workflows));
    } catch (e) {
      console.error(e);
    }
  }, [workflows]);

  useEffect(() => {
    try {
      localStorage.setItem('stackverse_automation_logs', JSON.stringify(logs));
    } catch (e) {
      console.error(e);
    }
  }, [logs]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Toggle active
  const toggleWorkflow = (id: string) => {
    setWorkflows(prev =>
      prev.map(w => {
        if (w.id === id) {
          const updated = !w.active;
          showToast(`Workflow "${w.name}" ${updated ? 'Activated & Listening' : 'Paused'}`);
          const newWf = { ...w, active: updated };
          saveToCollection('workflows', newWf);
          return newWf;
        }
        return w;
      })
    );
  };

  // Delete workflow
  const handleDeleteWorkflow = (id: string) => {
    const wf = workflows.find(w => w.id === id);
    setWorkflows(prev => prev.filter(w => w.id !== id));
    if (wf) {
      removeFromCollection('workflows', id);
      showToast(`Workflow "${wf.name}" removed.`);
    }
  };

  // Duplicate workflow
  const handleDuplicateWorkflow = (wf: AutomationWorkflow) => {
    const newWf: AutomationWorkflow = {
      ...wf,
      id: `wf-${Date.now()}`,
      name: `${wf.name} (Copy)`,
      runsCount: 0,
      lastTriggered: 'Never',
      active: true
    };
    setWorkflows(prev => [newWf, ...prev]);
    saveToCollection('workflows', newWf);
    showToast(`Duplicated "${wf.name}"`);
  };

  // Add Step/Node to an existing workflow
  const handleAddNode = (wfId: string) => {
    const newNode: AutomationNode = {
      id: `node-${Date.now()}`,
      type: 'action',
      title: 'Post Audit Log to Compliance Register',
      description: 'Records timestamped execution in database',
      icon: 'ShieldCheck'
    };

    setWorkflows(prev =>
      prev.map(w => {
        if (w.id === wfId) {
          const updated = { ...w, nodes: [...w.nodes, newNode] };
          saveToCollection('workflows', updated);
          return updated;
        }
        return w;
      })
    );
    showToast('New action node added to workflow chain!');
  };

  // Trigger Test Run Simulation
  const handleRunTest = (wf: AutomationWorkflow) => {
    if (testingWfId) return; // already testing
    setTestingWfId(wf.id);
    setTestingStep(0);

    const totalSteps = wf.nodes.length;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep += 1;
      if (currentStep < totalSteps) {
        setTestingStep(currentStep);
      } else {
        clearInterval(interval);
        setTestingWfId(null);
        setTestingStep(-1);

        // Update workflow metadata
        const nowStr = new Date().toLocaleString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
          month: 'short',
          day: '2-digit',
          year: 'numeric'
        });

        setWorkflows(prev =>
          prev.map(w => {
            if (w.id === wf.id) {
              const updated = {
                ...w,
                runsCount: (w.runsCount || 0) + 1,
                lastTriggered: 'Just now'
              };
              saveToCollection('workflows', updated);
              return updated;
            }
            return w;
          })
        );

        // Append execution log
        const newLog: AutomationExecutionLog = {
          id: `log-${Date.now()}`,
          workflowId: wf.id,
          workflowName: wf.name,
          timestamp: nowStr,
          status: 'Success',
          triggerEvent: `Manual Test Run by User`,
          details: `Executed all ${totalSteps} nodes in 120ms. All automation actions fired successfully without errors.`
        };

        setLogs(prev => [newLog, ...prev]);
        showToast(`Test Run Completed! Workflow "${wf.name}" executed successfully.`);
      }
    }, 600);
  };

  // Create Custom Workflow
  const handleCreateWorkflow = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWfName.trim()) return;

    const newWf: AutomationWorkflow = {
      id: `wf-${Date.now()}`,
      name: newWfName.trim(),
      description: newWfDesc.trim() || 'Custom automated rule',
      active: true,
      runsCount: 0,
      lastTriggered: 'Never',
      nodes: [
        {
          id: `n-${Date.now()}-1`,
          type: 'trigger',
          title: selectedTrigger,
          description: 'Triggers on real-time event',
          icon: 'Zap'
        },
        {
          id: `n-${Date.now()}-2`,
          type: 'condition',
          title: selectedCondition,
          description: 'Evaluates criteria',
          icon: 'ShieldCheck'
        },
        {
          id: `n-${Date.now()}-3`,
          type: 'action',
          title: selectedAction,
          description: 'Automated execution step',
          icon: 'CheckCircle2'
        }
      ]
    };

    setWorkflows(prev => [newWf, ...prev]);
    saveToCollection('workflows', newWf);
    setIsCreateModalOpen(false);
    setNewWfName('');
    setNewWfDesc('');
    showToast(`New Workflow "${newWf.name}" created and active!`);
  };

  // Helper node icon render
  const getNodeIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShoppingCart': return <ShoppingCart className="w-4 h-4 text-emerald-400" />;
      case 'DollarSign': return <DollarSign className="w-4 h-4 text-emerald-400" />;
      case 'MessageSquare': return <MessageSquare className="w-4 h-4 text-blue-400" />;
      case 'Package': return <Package className="w-4 h-4 text-amber-400" />;
      case 'AlertTriangle': return <AlertTriangle className="w-4 h-4 text-amber-400" />;
      case 'FileText': return <FileText className="w-4 h-4 text-purple-400" />;
      case 'Bell': return <Bell className="w-4 h-4 text-rose-400" />;
      case 'ShieldCheck': return <ShieldCheck className="w-4 h-4 text-indigo-400" />;
      case 'Clock': return <Clock className="w-4 h-4 text-cyan-400" />;
      default: return <Zap className="w-4 h-4 text-emerald-400" />;
    }
  };

  // Calculate Stats
  const activeCount = workflows.filter(w => w.active).length;
  const totalRuns = workflows.reduce((acc, w) => acc + (w.runsCount || 0), 0);

  const filteredLogs = logs.filter(l =>
    l.workflowName.toLowerCase().includes(logSearch.toLowerCase()) ||
    l.triggerEvent.toLowerCase().includes(logSearch.toLowerCase()) ||
    l.details.toLowerCase().includes(logSearch.toLowerCase())
  );

  return (
    <div className="p-4 sm:p-8 space-y-6 max-w-[1700px] mx-auto animate-in fade-in duration-300">
      
      {/* Toast Notice */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-xl font-bold text-xs flex items-center gap-2 border border-slate-700 animate-in fade-in slide-in-from-bottom-4">
          <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
            <Workflow className="w-6 h-6 text-emerald-600" />
            Visual Workflow Automation Builder (If-This-Then-That)
          </h1>
          <p className="text-xs text-slate-500">
            Automate repetitive enterprise tasks: WhatsApp receipts, low stock PO drafts & VAT tax triggers
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Create Custom Workflow
          </button>
        </div>
      </div>

      {/* Metrics Banner */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 font-bold">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] font-mono font-bold text-slate-400 uppercase">Active Automations</div>
            <div className="text-lg font-extrabold text-slate-900">{activeCount} / {workflows.length}</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600 font-bold">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] font-mono font-bold text-slate-400 uppercase">Total Executions</div>
            <div className="text-lg font-extrabold text-slate-900">{totalRuns.toLocaleString()}</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600 font-bold">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] font-mono font-bold text-slate-400 uppercase">Success Rate</div>
            <div className="text-lg font-extrabold text-emerald-600">99.8%</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-purple-50 text-purple-600 font-bold">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] font-mono font-bold text-slate-400 uppercase">Est. Time Saved</div>
            <div className="text-lg font-extrabold text-slate-900">~54 hrs/mo</div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab('workflows')}
          className={`px-4 py-2 font-bold text-xs rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'workflows'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'bg-white text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Workflow className="w-4 h-4" /> Active Workflows ({workflows.length})
        </button>

        <button
          onClick={() => setActiveTab('logs')}
          className={`px-4 py-2 font-bold text-xs rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'logs'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'bg-white text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Activity className="w-4 h-4" /> Execution History ({logs.length})
        </button>
      </div>

      {/* TAB 1: WORKFLOWS CANVAS */}
      {activeTab === 'workflows' && (
        <div className="space-y-6">
          {workflows.length === 0 ? (
            <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center space-y-3">
              <Workflow className="w-10 h-10 text-slate-300 mx-auto" />
              <h3 className="font-bold text-slate-800 text-sm">No automation workflows configured</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Create a custom workflow to automate your sales receipts, inventory reorders, or VAT tax filings.
              </p>
              <div className="pt-2 flex justify-center gap-3">
                <button
                  onClick={() => setIsCreateModalOpen(true)}
                  className="px-4 py-2 bg-emerald-600 text-white font-bold text-xs rounded-xl hover:bg-emerald-500 cursor-pointer"
                >
                  Create Custom Workflow
                </button>
              </div>
            </div>
          ) : (
            workflows.map((wf) => {
              const isTestingThis = testingWfId === wf.id;

              return (
                <div key={wf.id} className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4 relative overflow-hidden transition-all">
                  
                  {/* Top Bar */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                    <div className="flex items-start gap-3">
                      <div className={`p-2.5 rounded-xl shrink-0 ${wf.active ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-400'}`}>
                        <Zap className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-extrabold text-slate-900 text-sm">{wf.name}</h3>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            wf.active ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                          }`}>
                            {wf.active ? '✓ Listening' : 'Paused'}
                          </span>
                        </div>
                        {wf.description && <p className="text-xs text-slate-500 mt-0.5">{wf.description}</p>}
                        
                        <div className="flex items-center gap-4 text-[11px] text-slate-400 font-mono mt-1">
                          <span>Executions: <strong className="text-slate-700">{wf.runsCount || 0}</strong></span>
                          <span>Last Run: <strong className="text-slate-700">{wf.lastTriggered || 'Never'}</strong></span>
                        </div>
                      </div>
                    </div>

                    {/* Action Controls */}
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => handleRunTest(wf)}
                        disabled={isTestingThis}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                          isTestingThis
                            ? 'bg-amber-500 text-white animate-pulse'
                            : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                        }`}
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                        {isTestingThis ? 'Running Test Trigger...' : 'Run Test Trigger'}
                      </button>

                      <button
                        onClick={() => toggleWorkflow(wf.id)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          wf.active ? 'bg-slate-100 text-slate-700 hover:bg-slate-200' : 'bg-emerald-600 text-white'
                        }`}
                      >
                        {wf.active ? 'Pause' : 'Activate'}
                      </button>

                      <button
                        onClick={() => handleDuplicateWorkflow(wf)}
                        title="Duplicate"
                        className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                      >
                        <Copy className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => handleDeleteWorkflow(wf.id)}
                        title="Delete"
                        className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Visual Node Chain */}
                  <div className="space-y-2 pt-1">
                    <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                      <span>AUTOMATION NODE SEQUENCE ({wf.nodes.length} STEPS)</span>
                      <button
                        onClick={() => handleAddNode(wf.id)}
                        className="text-emerald-600 font-bold hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <Plus className="w-3 h-3" /> Add Node Step
                      </button>
                    </div>

                    <div className="flex flex-col md:flex-row items-center gap-3 overflow-x-auto custom-scrollbar py-2">
                      {wf.nodes.map((node, idx) => {
                        const isStepActive = isTestingThis && testingStep === idx;
                        const isStepDone = isTestingThis && testingStep > idx;

                        return (
                          <React.Fragment key={node.id}>
                            <div className={`p-4 rounded-2xl min-w-[230px] flex-1 space-y-1.5 shadow-sm transition-all border ${
                              isStepActive
                                ? 'bg-emerald-950 text-white border-emerald-400 ring-2 ring-emerald-400 ring-offset-2 scale-105'
                                : isStepDone
                                ? 'bg-slate-900 text-white border-emerald-600/60'
                                : 'bg-slate-900 text-white border-slate-800'
                            }`}>
                              <div className="flex items-center justify-between text-[10px] font-mono font-bold uppercase">
                                <span className={
                                  node.type === 'trigger' ? 'text-emerald-400' :
                                  node.type === 'condition' ? 'text-amber-400' : 'text-blue-400'
                                }>
                                  Step {idx + 1}: {node.type}
                                </span>
                                {getNodeIcon(node.icon)}
                              </div>

                              <div className="font-bold text-xs text-slate-100">{node.title}</div>
                              <div className="text-[11px] text-slate-400 line-clamp-2">{node.description}</div>
                            </div>

                            {idx < wf.nodes.length - 1 && (
                              <ArrowRight className="w-4 h-4 text-slate-300 shrink-0 hidden md:block" />
                            )}
                          </React.Fragment>
                        );
                      })}
                    </div>
                  </div>

                </div>
              );
            })
          )}
        </div>
      )}

      {/* TAB 2: EXECUTION LOGS */}
      {activeTab === 'logs' && (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Automated Execution Logs & Audit Trail</h3>
              <p className="text-xs text-slate-500">Real-time recording of all workflow triggers and node execution results</p>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Filter logs..."
                  value={logSearch}
                  onChange={(e) => setLogSearch(e.target.value)}
                  className="pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium w-48"
                />
              </div>

              <button
                onClick={() => {
                  setLogs([]);
                  showToast('Execution log history cleared.');
                }}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-xs transition-colors cursor-pointer"
              >
                Clear History
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-mono text-[10px] uppercase border-y border-slate-200">
                <tr>
                  <th className="p-3">Timestamp</th>
                  <th className="p-3">Workflow Name</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Trigger Event</th>
                  <th className="p-3">Execution Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {filteredLogs.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-slate-400">
                      No execution logs found. Run a test trigger to generate live logs!
                    </td>
                  </tr>
                ) : (
                  filteredLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-3 font-mono text-slate-500 shrink-0 whitespace-nowrap">{log.timestamp}</td>
                      <td className="p-3 font-bold text-slate-900">{log.workflowName}</td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                          ✓ {log.status}
                        </span>
                      </td>
                      <td className="p-3 font-semibold text-slate-700">{log.triggerEvent}</td>
                      <td className="p-3 text-slate-500 text-[11px]">{log.details}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* CREATE WORKFLOW MODAL */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-lg w-full rounded-2xl p-6 shadow-2xl border border-slate-200 space-y-5 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
                <Workflow className="w-5 h-5 text-emerald-600" /> Create Custom Workflow Rule
              </h3>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateWorkflow} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Workflow Title</label>
                <input
                  type="text"
                  placeholder="e.g. M-Pesa Payment Receipt Auto-Bot"
                  value={newWfName}
                  onChange={(e) => setNewWfName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-semibold"
                  required
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Description</label>
                <input
                  type="text"
                  placeholder="e.g. Auto-dispatches SMS receipts when payment is reconciled"
                  value={newWfDesc}
                  onChange={(e) => setNewWfDesc(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-600"
                />
              </div>

              {/* Step 1: Trigger */}
              <div>
                <label className="font-bold text-slate-700 block mb-1">1. Choose Event Trigger</label>
                <select
                  value={selectedTrigger}
                  onChange={(e) => setSelectedTrigger(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-bold"
                >
                  <option value="When New Sales Order Created">🛒 When New Sales Order Created</option>
                  <option value="When Stock Level Drops Below Minimum">📦 When Stock Drops Below Safety Threshold</option>
                  <option value="When New Corporate Lead Registered">👤 When New Lead Created in CRM</option>
                  <option value="When Payment Reconciled via Paystack">💳 When Payment Settled via Paystack/M-Pesa</option>
                  <option value="Daily Scheduled Compliance Check (09:00 AM)">⏰ Daily Scheduled Compliance Check</option>
                </select>
              </div>

              {/* Step 2: Condition */}
              <div>
                <label className="font-bold text-slate-700 block mb-1">2. Filter Condition Criteria</label>
                <select
                  value={selectedCondition}
                  onChange={(e) => setSelectedCondition(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-bold"
                >
                  <option value="If Total Amount &gt; ₦100,000">💰 If Order Amount &gt; ₦100,000</option>
                  <option value="If Customer Segment is VIP / Enterprise">⭐ If Customer Segment is Enterprise</option>
                  <option value="If Warehouse is Lagos Central">🏬 If Warehouse location is Lagos</option>
                  <option value="Always Run (No Condition Filter)">⚡ Always Run (No Filter)</option>
                </select>
              </div>

              {/* Step 3: Action */}
              <div>
                <label className="font-bold text-slate-700 block mb-1">3. Automated Action Node</label>
                <select
                  value={selectedAction}
                  onChange={(e) => setSelectedAction(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-bold"
                >
                  <option value="Send WhatsApp Message & PDF Receipt">💬 Send WhatsApp Message & PDF Receipt</option>
                  <option value="Draft Purchase Order to Supplier">📑 Draft Purchase Order to Supplier</option>
                  <option value="Record 7.5% VAT Expense in Finance Ledger">🧾 Record VAT Expense in Finance Ledger</option>
                  <option value="Alert Warehouse Operations Team">🔔 Push Notification to Operations</option>
                  <option value="Apply VIP Loyalty Tag to Customer Profile">🏷️ Tag Customer as High Priority</option>
                </select>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-xs cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs shadow-md cursor-pointer flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" /> Save & Activate Workflow
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
