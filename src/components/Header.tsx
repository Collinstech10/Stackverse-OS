import React from 'react';
import {
  Search,
  Plus,
  Sparkles,
  Bell,
  ChevronDown,
  Layout,
  Smartphone,
  CheckCircle2,
  Building2,
  Sun,
  Moon,
  LogOut,
  User as UserIcon
} from 'lucide-react';
import { Workspace, Currency, PlatformPage, DeviceType, ViewMode } from '../types';

interface HeaderProps {
  currentWorkspace: Workspace;
  workspaces?: Workspace[];
  onSelectWorkspace: (ws: Workspace) => void;
  currency?: Currency;
  onSelectCurrency?: (c: Currency) => void;
  platformPage?: PlatformPage;
  platformView?: PlatformPage;
  currentView?: ViewMode;
  onSelectPlatformPage?: (page: PlatformPage) => void;
  onChangePlatformView?: (page: PlatformPage) => void;
  deviceType?: DeviceType;
  onSelectDeviceType?: (device: DeviceType) => void;
  onChangeDeviceType?: (device: DeviceType) => void;
  onOpenSearch?: () => void;
  onOpenCommandPalette?: () => void;
  onOpenQuickAction: () => void;
  onOpenAiInsights: () => void;
  onOpenNotifications: () => void;
  unreadCount?: number;
  isDarkMode?: boolean;
  onToggleDarkMode?: () => void;
  authUser?: any;
  onLogout?: () => void;
  onNavigateView?: (v: ViewMode) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentWorkspace,
  workspaces = [],
  onSelectWorkspace,
  currency = 'NGN',
  onSelectCurrency,
  platformPage,
  platformView,
  onSelectPlatformPage,
  onChangePlatformView,
  deviceType = 'desktop',
  onSelectDeviceType,
  onChangeDeviceType,
  onOpenSearch,
  onOpenCommandPalette,
  onOpenQuickAction,
  onOpenAiInsights,
  onOpenNotifications,
  unreadCount = 3,
  isDarkMode = false,
  onToggleDarkMode,
  authUser,
  onLogout,
  onNavigateView
}) => {
  const [showWsMenu, setShowWsMenu] = React.useState(false);
  const [showPageMenu, setShowPageMenu] = React.useState(false);
  const [showCurrencyMenu, setShowCurrencyMenu] = React.useState(false);
  const [showUserMenu, setShowUserMenu] = React.useState(false);

  const activePage = platformPage || platformView || 'app';
  const handleDeviceChange = onSelectDeviceType || onChangeDeviceType;
  const handlePageChange = onSelectPlatformPage || onChangePlatformView;
  const handleSearchOpen = onOpenSearch || onOpenCommandPalette;

  const currencies: Currency[] = ['NGN', 'USD', 'GHS', 'KES', 'ZAR', 'EUR', 'GBP'];

  const pagesList: { id: PlatformPage; label: string }[] = [
    { id: 'app', label: 'StackVerse OS App' },
    { id: 'landing', label: 'Landing Page' },
    { id: 'login', label: 'Login View' },
    { id: 'register', label: 'Register Account' },
    { id: 'forgot_password', label: 'Forgot Password' },
    { id: 'design_system', label: 'Design System' },
  ];

  return (
    <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 sm:px-8 flex items-center justify-between shrink-0 text-[#111827] dark:text-slate-100 sticky top-0 z-30 shadow-xs transition-colors">
      
      {/* Left: Workspace & View Selectors */}
      <div className="flex items-center gap-3">
        {/* Workspace Switcher */}
        <div className="relative">
          <button
            id="workspace-switcher-btn"
            onClick={() => setShowWsMenu(!showWsMenu)}
            className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-colors text-left"
          >
            <div className="w-7 h-7 rounded-md bg-blue-50 border border-blue-200 flex items-center justify-center text-[#2563EB] font-bold text-xs shrink-0">
              <Building2 className="w-4 h-4 text-[#2563EB]" />
            </div>
            <div className="hidden md:block text-xs">
              <div className="font-semibold text-slate-800 truncate max-w-[130px]">
                {currentWorkspace.name}
              </div>
              <div className="text-[10px] text-slate-500 flex items-center gap-1">
                <span>{currentWorkspace.location}</span>
                <span className="text-[#2563EB] font-mono font-medium">({currentWorkspace.currencySymbol})</span>
              </div>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-1" />
          </button>

          {/* Workspace Dropdown */}
          {showWsMenu && (
            <div className="absolute left-0 mt-2 w-64 bg-white border border-slate-200 rounded-xl shadow-xl py-2 z-50 text-xs text-slate-700">
              <div className="px-3 py-1.5 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                Select Workspace
              </div>
              {(workspaces || []).map((ws) => (
                <button
                  key={ws.id}
                  onClick={() => {
                    onSelectWorkspace?.(ws);
                    setShowWsMenu(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 hover:bg-slate-50 transition-colors ${
                    ws.id === currentWorkspace?.id ? 'bg-blue-50 text-[#2563EB] font-medium' : ''
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-6 h-6 rounded bg-slate-100 flex items-center justify-center font-bold text-[#2563EB] text-[10px]">
                      {ws.currencySymbol}
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-slate-800">{ws.name}</div>
                      <div className="text-[10px] text-slate-500">{ws.location}</div>
                    </div>
                  </div>
                  {ws.id === currentWorkspace?.id && (
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#2563EB]" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Deliverable Page Switcher */}
        <div className="relative hidden lg:block">
          <button
            id="platform-page-switcher-btn"
            onClick={() => setShowPageMenu(!showPageMenu)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs text-slate-700 font-medium transition-colors"
          >
            <Layout className="w-3.5 h-3.5 text-[#2563EB]" />
            <span>
              {activePage === 'app' && 'OS App Workspace'}
              {activePage === 'landing' && 'Landing Page'}
              {activePage === 'login' && 'Login View'}
              {activePage === 'register' && 'Register View'}
              {activePage === 'forgot_password' && 'Forgot Password'}
              {activePage === 'design_system' && 'Design System'}
            </span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>

          {showPageMenu && (
            <div className="absolute left-0 mt-2 w-56 bg-white border border-slate-200 rounded-xl shadow-xl py-2 z-50 text-xs text-slate-700">
              <div className="px-3 py-1 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                Switch Screen
              </div>
              {(pagesList || []).map((p) => (
                <button
                  key={p.id}
                  onClick={() => {
                    handlePageChange?.(p.id);
                    setShowPageMenu(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 hover:bg-slate-50 transition-colors ${
                    activePage === p.id ? 'bg-blue-50 text-[#2563EB] font-medium' : ''
                  }`}
                >
                  <span>{p.label}</span>
                  {activePage === p.id && <CheckCircle2 className="w-3.5 h-3.5 text-[#2563EB]" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Device Frame Simulator Selector */}
        <div className="hidden xl:flex items-center bg-slate-100 border border-slate-200 rounded-lg p-0.5 text-xs text-slate-600">
          <button
            onClick={() => handleDeviceChange?.('desktop')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all ${
              deviceType === 'desktop' ? 'bg-white text-slate-900 shadow-xs font-semibold' : 'hover:text-slate-900'
            }`}
          >
            Desktop
          </button>
          <button
            onClick={() => handleDeviceChange?.('mobile_ios')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-medium flex items-center gap-1 transition-all ${
              deviceType === 'mobile_ios' ? 'bg-white text-slate-900 shadow-xs font-semibold' : 'hover:text-slate-900'
            }`}
          >
            <Smartphone className="w-3 h-3" />
            Mobile
          </button>
          <button
            onClick={() => handleDeviceChange?.('tablet')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all ${
              deviceType === 'tablet' ? 'bg-white text-slate-900 shadow-xs font-semibold' : 'hover:text-slate-900'
            }`}
          >
            Tablet
          </button>
        </div>
      </div>

      {/* Center: Command Search Input */}
      <div className="flex-1 max-w-md mx-4">
        <div className="relative w-full">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 pointer-events-none">
            <Search className="w-4 h-4" />
          </span>
          <input
            type="text"
            onClick={() => handleSearchOpen?.()}
            readOnly
            className="block w-full pl-10 pr-10 py-2 border border-slate-200 rounded-lg bg-slate-50 text-sm text-slate-800 placeholder-slate-400 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-[#2563EB] transition-all"
            placeholder="Search commands, orders, or customers..."
          />
          <kbd className="absolute right-3 top-2.5 hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-slate-200 text-slate-600 rounded">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Right: Notifications, AI, New Action, Currency */}
      <div className="flex items-center gap-3">
        
        {/* Currency Switcher */}
        <div className="relative hidden md:block">
          <button
            onClick={() => setShowCurrencyMenu(!showCurrencyMenu)}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs text-slate-700 font-mono font-medium"
          >
            <span>{currency}</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>

          {showCurrencyMenu && (
            <div className="absolute right-0 mt-2 w-28 bg-white border border-slate-200 rounded-xl shadow-xl py-1 z-50 text-xs">
              {(currencies || []).map((c) => (
                <button
                  key={c}
                  onClick={() => {
                    onSelectCurrency?.(c);
                    setShowCurrencyMenu(false);
                  }}
                  className={`w-full text-left px-3 py-1.5 hover:bg-slate-50 font-mono ${
                    currency === c ? 'text-[#2563EB] font-bold bg-blue-50' : 'text-slate-700'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Global Dark Mode Theme Toggle */}
        <button
          id="theme-toggle-btn"
          onClick={onToggleDarkMode}
          className="p-2 rounded-lg text-slate-500 dark:text-slate-300 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center justify-center cursor-pointer"
          title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          aria-label="Toggle Dark Mode"
        >
          {isDarkMode ? (
            <Sun className="w-5 h-5 text-amber-400 transition-transform duration-300 rotate-0 hover:rotate-45" />
          ) : (
            <Moon className="w-5 h-5 text-slate-600 dark:text-slate-300 transition-transform duration-300 hover:-rotate-12" />
          )}
        </button>

        {/* AI Insight Trigger */}
        <button
          onClick={onOpenAiInsights}
          className="p-2 sm:px-3 sm:py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 text-xs font-semibold border border-emerald-200 dark:border-emerald-800/80 flex items-center gap-1.5 transition-colors cursor-pointer"
          title="StackVerse AI Assistant"
        >
          <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span className="hidden sm:inline">AI Advisor</span>
        </button>

        {/* Notifications Icon Button */}
        <button
          id="notifications-bell-btn"
          onClick={onOpenNotifications}
          className="relative p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          title="Notifications"
        >
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900"></span>
          )}
        </button>

        {/* Primary Action Button */}
        <button
          id="quick-create-btn"
          onClick={onOpenQuickAction}
          className="px-4 py-2 bg-[#2563EB] text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-xs flex items-center gap-2 active:scale-95 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">New Action</span>
        </button>

        {/* Account User Profile Pill & Dropdown */}
        <div className="relative">
          <button
            id="user-profile-menu-btn"
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 pl-2 pr-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer border border-slate-200 dark:border-slate-700"
            title="Account Profile & Authentication"
          >
            <div className="w-7 h-7 rounded-lg bg-blue-600 text-white font-extrabold text-xs flex items-center justify-center uppercase shadow-xs">
              {authUser?.photoURL ? (
                <img src={authUser.photoURL} alt="User" className="w-full h-full object-cover rounded-lg" />
              ) : (
                <span>{(authUser?.displayName || authUser?.email || 'A').charAt(0)}</span>
              )}
            </div>
            <span className="hidden xl:inline text-xs font-bold text-slate-800 dark:text-slate-200 truncate max-w-[110px]">
              {authUser?.displayName || (authUser?.email ? authUser.email.split('@')[0] : 'Account')}
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl py-2 z-50 text-xs text-slate-700 dark:text-slate-200 animate-in fade-in">
              <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
                <p className="font-bold text-slate-900 dark:text-white truncate">
                  {authUser?.displayName || 'Workspace Staff'}
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                  {authUser?.email || 'Logged in user'}
                </p>
              </div>

              <div className="py-1">
                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    onNavigateView?.('settings');
                  }}
                  className="w-full flex items-center gap-2.5 px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-left font-medium cursor-pointer"
                >
                  <UserIcon className="w-4 h-4 text-slate-400" />
                  <span>Account & Compliance</span>
                </button>
              </div>

              {onLogout && (
                <div className="pt-1 border-t border-slate-100 dark:border-slate-800">
                  <button
                    onClick={() => {
                      setShowUserMenu(false);
                      onLogout();
                    }}
                    className="w-full flex items-center gap-2.5 px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors text-left font-bold cursor-pointer"
                  >
                    <LogOut className="w-4 h-4 text-red-500" />
                    <span>Sign Out / Logout</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

      </div>

    </header>
  );
};

