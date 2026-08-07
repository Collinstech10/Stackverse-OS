import React from 'react';
import {
  LayoutDashboard,
  ShoppingCart,
  Users,
  Package,
  Landmark,
  UserCheck,
  Megaphone,
  BarChart3,
  Calendar,
  MessageSquare,
  FileText,
  Workflow,
  Cpu,
  Settings,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  LogOut
} from 'lucide-react';
import { ViewMode } from '../types';

interface SidebarProps {
  currentView: ViewMode;
  onSelectView: (view: ViewMode) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
  lowStockCount?: number;
  pendingInvoicesCount?: number;
  authUser?: any;
  onLogout?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onSelectView,
  collapsed,
  onToggleCollapse,
  lowStockCount = 0,
  pendingInvoicesCount = 0,
  authUser,
  onLogout
}) => {
  const menuItems: { id: ViewMode; label: string; icon: React.FC<{ className?: string }>; badge?: string; badgeColor?: string }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'sales', label: 'Sales & POS', icon: ShoppingCart },
    { id: 'crm', label: 'CRM & Clients', icon: Users, badge: '5 Active' },
    { id: 'inventory', label: 'Inventory', icon: Package, badge: lowStockCount > 0 ? `${lowStockCount} Low` : undefined, badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30' },
    { id: 'finance', label: 'Finance', icon: Landmark, badge: pendingInvoicesCount > 0 ? `${pendingInvoicesCount} Due` : undefined, badgeColor: 'bg-red-500/20 text-red-300 border-red-500/30' },
    { id: 'hr', label: 'HR & Payroll', icon: UserCheck },
    { id: 'marketing', label: 'Marketing', icon: Megaphone },
    { id: 'reports', label: 'Reports', icon: BarChart3 },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'messages', label: 'Messages', icon: MessageSquare, badge: '3' },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'automation', label: 'Automation', icon: Workflow, badge: 'AI', badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' },
    { id: 'integrations', label: 'Integrations', icon: Cpu },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'help', label: 'Help Desk', icon: HelpCircle },
  ];

  return (
    <aside
      className={`bg-[#0B1F3A] text-slate-300 flex flex-col transition-all duration-300 relative z-20 shrink-0 ${
        collapsed ? 'w-16' : 'w-60'
      }`}
    >
      {/* Brand Header */}
      <div className="p-6 flex items-center justify-between gap-3">
        {!collapsed ? (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#2563EB] rounded-lg flex items-center justify-center shadow-lg shrink-0">
              <div className="w-4 h-4 bg-white rounded-sm rotate-45"></div>
            </div>
            <span className="text-white font-bold text-xl tracking-tight">StackVerse</span>
          </div>
        ) : (
          <div className="w-8 h-8 bg-[#2563EB] rounded-lg flex items-center justify-center shadow-lg mx-auto">
            <div className="w-4 h-4 bg-white rounded-sm rotate-45"></div>
          </div>
        )}

        <button
          onClick={onToggleCollapse}
          className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Workspace Indicator Card */}
      {!collapsed && (
        <div className="px-4 mb-4">
          <div className="bg-white/10 rounded-xl p-3 flex items-center gap-3 cursor-pointer border border-white/5 hover:bg-white/15 transition-all">
            <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-xs font-bold text-white shrink-0 shadow-sm">
              LS
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-medium text-white truncate">Lagos Store</span>
              <span className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">Workspace</span>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Links */}
      <nav className="flex-1 px-4 space-y-1 overflow-y-auto custom-scrollbar">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;

          return (
            <button
              key={item.id}
              id={`sidebar-item-${item.id}`}
              onClick={() => onSelectView(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                isActive
                  ? 'bg-[#2563EB] text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              } ${collapsed ? 'justify-center px-0' : ''}`}
              title={collapsed ? item.label : undefined}
            >
              <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
              
              {!collapsed && (
                <div className="flex-1 flex items-center justify-between text-left truncate">
                  <span className="truncate">{item.label}</span>
                  {item.badge && (
                    <span
                      className={`text-[10px] font-mono px-1.5 py-0.5 rounded-md border font-semibold ${
                        item.badgeColor || 'bg-slate-800 text-slate-300 border-slate-700'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </div>
              )}
            </button>
          );
        })}
      </nav>

      {/* System Health / Bottom Widget when expanded */}
      {!collapsed && (
        <div className="px-4 py-2">
          <div className="bg-white/5 rounded-xl p-3 border border-white/5 text-xs">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-medium text-slate-300 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" /> System Status
              </span>
              <span className="text-xs font-bold text-emerald-400">Optimal</span>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div className="bg-emerald-500 h-full w-[94%]" />
            </div>
          </div>
        </div>
      )}

      {/* Bottom User Profile Section */}
      <div className="p-3 border-t border-white/10 mt-auto">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-extrabold text-xs ring-2 ring-blue-500/30 overflow-hidden shrink-0 uppercase">
              {authUser?.photoURL ? (
                <img src={authUser.photoURL} alt={authUser.displayName || 'User'} className="w-full h-full object-cover" />
              ) : (
                <span>{(authUser?.displayName || authUser?.email || 'U').charAt(0)}</span>
              )}
            </div>
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-white truncate">
                  {authUser?.displayName || (authUser?.email ? authUser.email.split('@')[0] : 'Workspace User')}
                </p>
                <p className="text-[10px] text-slate-400 truncate">
                  {authUser?.email || 'Authenticated Staff'}
                </p>
              </div>
            )}
          </div>

          {onLogout && (
            <button
              type="button"
              onClick={onLogout}
              className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-colors cursor-pointer shrink-0"
              title="Sign Out / Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </aside>
  );
};

