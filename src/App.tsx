import React, { useState } from 'react';
import {
  Workspace,
  ViewMode,
  DeviceType,
  Currency,
  Customer,
  Product,
  Order,
  Transaction,
  Employee,
  Campaign,
  Integration,
  DocumentItem
} from './types';
import {
  WORKSPACES,
  INITIAL_CUSTOMERS,
  INITIAL_PRODUCTS,
  INITIAL_ORDERS,
  INITIAL_TRANSACTIONS,
  INITIAL_EMPLOYEES,
  INITIAL_CAMPAIGNS,
  INITIAL_INTEGRATIONS,
  INITIAL_DOCUMENTS
} from './data/mockData';
import { subscribeToCollection, saveToCollection, clearCollection } from './lib/firestoreService';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { auth } from './lib/firebase';

// Layout & Frame Components
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { DeviceFrame } from './components/DeviceFrame';
import { CommandPalette } from './components/CommandPalette';
import { QuickActionModal } from './components/QuickActionModal';
import { AiInsightsPanel } from './components/AiInsightsPanel';
import { NotificationDrawer } from './components/NotificationDrawer';

// View Components
import { DashboardView } from './views/DashboardView';
import { SalesView } from './views/SalesView';
import { CrmView } from './views/CrmView';
import { InventoryView } from './views/InventoryView';
import { FinanceView } from './views/FinanceView';
import { HrView } from './views/HrView';
import { MarketingView } from './views/MarketingView';
import { ReportsView } from './views/ReportsView';
import { CalendarView } from './views/CalendarView';
import { MessagesView } from './views/MessagesView';
import { DocumentsView } from './views/DocumentsView';
import { AutomationView } from './views/AutomationView';
import { IntegrationsView } from './views/IntegrationsView';
import { SettingsView } from './views/SettingsView';
import { LandingPageView } from './views/LandingPageView';
import { AuthViews } from './views/AuthViews';
import { DesignSystemView } from './views/DesignSystemView';

export default function App() {
  // Firebase Auth State
  const [authUser, setAuthUser] = useState<User | null>(null);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setAuthUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setAuthUser(null);
      setCurrentView('login');
      setPlatformView('auth');
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  // Global Application State
  const [currentWorkspace, setCurrentWorkspace] = useState<Workspace>(WORKSPACES[0]);
  const [currentView, setCurrentView] = useState<ViewMode>('dashboard');
  const [deviceType, setDeviceType] = useState<DeviceType>('desktop');
  const [platformView, setPlatformView] = useState<'app' | 'landing' | 'auth' | 'design-system'>('app');
  const [currency, setCurrency] = useState<Currency>('NGN');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Theme Dark Mode State with localStorage persistence
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('stackverse_theme');
      if (saved !== null) {
        return saved === 'dark';
      }
    } catch (e) {
      console.error(e);
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  React.useEffect(() => {
    try {
      if (isDarkMode) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('stackverse_theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('stackverse_theme', 'light');
      }
    } catch (e) {
      console.error(e);
    }
  }, [isDarkMode]);

  // Modals & Panels State
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isQuickActionOpen, setIsQuickActionOpen] = useState(false);
  const [isAiInsightsOpen, setIsAiInsightsOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  // Helper function for localStorage persistence
  const getInitialCollection = <T,>(key: string, defaultVal: T[]): T[] => {
    try {
      // Check if user has explicitly cleaned storage
      const cleaned = localStorage.getItem('stackverse_cleaned_v2');
      if (!cleaned) {
        // Clear old initial sample keys
        localStorage.removeItem(`stackverse_${key}`);
        return defaultVal;
      }
      const saved = localStorage.getItem(`stackverse_${key}`);
      if (saved !== null) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error(`Error reading ${key} from localStorage`, e);
    }
    return defaultVal;
  };

  // App Data Collections State - Clean 0-data default for user to add manually
  const [customers, setCustomers] = useState<Customer[]>(() => getInitialCollection('customers', []));
  const [products, setProducts] = useState<Product[]>(() => getInitialCollection('products', []));
  const [orders, setOrders] = useState<Order[]>(() => getInitialCollection('orders', []));
  const [transactions, setTransactions] = useState<Transaction[]>(() => getInitialCollection('transactions', []));
  const [employees, setEmployees] = useState<Employee[]>(() => getInitialCollection('employees', []));
  const [campaigns, setCampaigns] = useState<Campaign[]>(() => getInitialCollection('campaigns', []));
  const [integrations, setIntegrations] = useState<Integration[]>(() => getInitialCollection('integrations', INITIAL_INTEGRATIONS));
  const [documents, setDocuments] = useState<DocumentItem[]>(() => getInitialCollection('documents', []));

  // Perform initial one-time purge of sample Firestore database documents
  React.useEffect(() => {
    const isCleaned = localStorage.getItem('stackverse_cleaned_v2');
    if (!isCleaned) {
      localStorage.setItem('stackverse_cleaned_v2', 'true');
      setCustomers([]);
      setProducts([]);
      setOrders([]);
      setTransactions([]);
      setEmployees([]);
      setCampaigns([]);
      setDocuments([]);
      clearCollection('customers');
      clearCollection('products');
      clearCollection('orders');
      clearCollection('transactions');
      clearCollection('employees');
      clearCollection('campaigns');
      clearCollection('documents');
    }
  }, []);

  // Real-time Firebase Firestore subscriptions
  React.useEffect(() => {
    const unsubCustomers = subscribeToCollection<Customer>('customers', items => {
      setCustomers(items);
    });
    const unsubProducts = subscribeToCollection<Product>('products', items => {
      setProducts(items);
    });
    const unsubOrders = subscribeToCollection<Order>('orders', items => {
      setOrders(items);
    });
    const unsubTransactions = subscribeToCollection<Transaction>('transactions', items => {
      setTransactions(items);
    });
    const unsubEmployees = subscribeToCollection<Employee>('employees', items => {
      setEmployees(items);
    });
    const unsubCampaigns = subscribeToCollection<Campaign>('campaigns', items => {
      setCampaigns(items);
    });
    const unsubDocuments = subscribeToCollection<DocumentItem>('documents', items => {
      setDocuments(items);
    });

    return () => {
      unsubCustomers();
      unsubProducts();
      unsubOrders();
      unsubTransactions();
      unsubEmployees();
      unsubCampaigns();
      unsubDocuments();
    };
  }, []);

  // Sync state to localStorage for persistence across reloads
  React.useEffect(() => {
    try {
      localStorage.setItem('stackverse_customers', JSON.stringify(customers));
      localStorage.setItem('stackverse_products', JSON.stringify(products));
      localStorage.setItem('stackverse_orders', JSON.stringify(orders));
      localStorage.setItem('stackverse_transactions', JSON.stringify(transactions));
      localStorage.setItem('stackverse_employees', JSON.stringify(employees));
      localStorage.setItem('stackverse_campaigns', JSON.stringify(campaigns));
      localStorage.setItem('stackverse_integrations', JSON.stringify(integrations));
      localStorage.setItem('stackverse_documents', JSON.stringify(documents));
    } catch (e) {
      console.error('Failed to sync state to localStorage', e);
    }
  }, [customers, products, orders, transactions, employees, campaigns, integrations, documents]);

  // Data Reset & Reset Handlers
  const handleClearAllData = async () => {
    setCustomers([]);
    setProducts([]);
    setOrders([]);
    setTransactions([]);
    setEmployees([]);
    setCampaigns([]);
    setDocuments([]);
    try {
      localStorage.removeItem('stackverse_customers');
      localStorage.removeItem('stackverse_products');
      localStorage.removeItem('stackverse_orders');
      localStorage.removeItem('stackverse_transactions');
      localStorage.removeItem('stackverse_employees');
      localStorage.removeItem('stackverse_campaigns');
      localStorage.removeItem('stackverse_documents');

      await clearCollection('customers');
      await clearCollection('products');
      await clearCollection('orders');
      await clearCollection('transactions');
      await clearCollection('employees');
      await clearCollection('campaigns');
      await clearCollection('documents');
    } catch (e) {
      console.error(e);
    }
  };

  const handleLoadSampleData = () => {
    setCustomers(INITIAL_CUSTOMERS);
    setProducts(INITIAL_PRODUCTS);
    setOrders(INITIAL_ORDERS);
    setTransactions(INITIAL_TRANSACTIONS);
    setEmployees(INITIAL_EMPLOYEES);
    setCampaigns(INITIAL_CAMPAIGNS);
    setDocuments(INITIAL_DOCUMENTS);

    INITIAL_CUSTOMERS.forEach(item => saveToCollection('customers', item));
    INITIAL_PRODUCTS.forEach(item => saveToCollection('products', item));
    INITIAL_ORDERS.forEach(item => saveToCollection('orders', item));
    INITIAL_TRANSACTIONS.forEach(item => saveToCollection('transactions', item));
    INITIAL_EMPLOYEES.forEach(item => saveToCollection('employees', item));
    INITIAL_CAMPAIGNS.forEach(item => saveToCollection('campaigns', item));
    INITIAL_DOCUMENTS.forEach(item => saveToCollection('documents', item));
  };

  // Currency Symbols Map
  const currencySymbols: Record<Currency, string> = {
    NGN: '₦',
    USD: '$',
    KES: 'KSh ',
    GHS: 'GH₵ ',
    ZAR: 'R ',
    EUR: '€',
    GBP: '£'
  };
  const currencySymbol = currencySymbols[currency];

  // Helper handlers
  const handleSelectWorkspace = (ws: Workspace) => {
    setCurrentWorkspace(ws);
    setCurrency(ws.currency);
  };

  const handleToggleIntegration = (id: string) => {
    setIntegrations(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, status: item.status === 'Connected' ? 'Disconnected' : 'Connected' }
          : item
      )
    );
  };

  const handleAddOrder = (newOrder: Order) => {
    setOrders(prev => [newOrder, ...prev]);
    saveToCollection('orders', newOrder);
  };

  const handleAddCustomer = (newCustomer: Customer) => {
    setCustomers(prev => [newCustomer, ...prev]);
    saveToCollection('customers', newCustomer);
  };

  const handleAddProduct = (newProduct: Product) => {
    setProducts(prev => [newProduct, ...prev]);
    saveToCollection('products', newProduct);
  };

  const handleAddTransaction = (newTx: Transaction) => {
    setTransactions(prev => [newTx, ...prev]);
    saveToCollection('transactions', newTx);
  };

  const handleAddEmployee = (newEmp: Employee) => {
    setEmployees(prev => [newEmp, ...prev]);
    saveToCollection('employees', newEmp);
  };

  const handleAddCampaign = (newCamp: Campaign) => {
    setCampaigns(prev => [newCamp, ...prev]);
    saveToCollection('campaigns', newCamp);
  };

  // Handle direct view switching from platform selector or landing page
  const handleSelectPlatformView = (p: 'app' | 'landing' | 'auth' | 'design-system') => {
    setPlatformView(p);
    if (p === 'landing') setCurrentView('landing');
    else if (p === 'auth') setCurrentView('login');
    else if (p === 'design-system') setCurrentView('design-system');
    else setCurrentView('dashboard');
  };

  // Navigation router rendering
  const renderCurrentView = () => {
    if (currentView === 'landing') {
      return <LandingPageView onEnterApp={(v) => { setCurrentView(v); setPlatformView('app'); }} />;
    }
    if (currentView === 'login' || currentView === 'register' || currentView === 'forgot-password') {
      return (
        <AuthViews
          mode={currentView as 'login' | 'register' | 'forgot-password'}
          onNavigateView={(v) => {
            setCurrentView(v);
            if (v === 'dashboard') setPlatformView('app');
          }}
          onAuthSuccess={() => {
            setPlatformView('app');
            setCurrentView('dashboard');
          }}
        />
      );
    }
    if (currentView === 'design-system') {
      return <DesignSystemView />;
    }

    // OS Application Modules
    switch (currentView) {
      case 'dashboard':
        return (
          <DashboardView
            currentWorkspace={currentWorkspace}
            currencySymbol={currencySymbol}
            orders={orders}
            customers={customers}
            products={products}
            onNavigateView={setCurrentView}
            onOpenQuickAction={() => setIsQuickActionOpen(true)}
            onOpenAiInsights={() => setIsAiInsightsOpen(true)}
          />
        );
      case 'sales':
        return (
          <SalesView
            orders={orders}
            products={products}
            customers={customers}
            currencySymbol={currencySymbol}
            onAddOrder={handleAddOrder}
          />
        );
      case 'crm':
        return (
          <CrmView
            customers={customers}
            currencySymbol={currencySymbol}
            onAddCustomer={handleAddCustomer}
          />
        );
      case 'inventory':
        return (
          <InventoryView
            products={products}
            currencySymbol={currencySymbol}
            onAddProduct={handleAddProduct}
          />
        );
      case 'finance':
        return (
          <FinanceView
            transactions={transactions}
            currencySymbol={currencySymbol}
            onAddTransaction={handleAddTransaction}
          />
        );
      case 'hr':
        return (
          <HrView
            employees={employees}
            currencySymbol={currencySymbol}
            onAddEmployee={handleAddEmployee}
          />
        );
      case 'marketing':
        return (
          <MarketingView
            campaigns={campaigns}
            onAddCampaign={handleAddCampaign}
          />
        );
      case 'reports':
        return <ReportsView currencySymbol={currencySymbol} />;
      case 'calendar':
        return <CalendarView />;
      case 'messages':
        return <MessagesView />;
      case 'documents':
        return <DocumentsView documents={documents} />;
      case 'automation':
        return <AutomationView />;
      case 'integrations':
        return (
          <IntegrationsView
            integrations={integrations}
            onToggleIntegration={handleToggleIntegration}
          />
        );
      case 'settings':
        return (
          <SettingsView
            currentWorkspace={currentWorkspace}
            currency={currency}
            onUpdateWorkspace={setCurrentWorkspace}
            onUpdateCurrency={setCurrency}
            recordCounts={{
              customers: customers.length,
              products: products.length,
              orders: orders.length,
              transactions: transactions.length,
              employees: employees.length,
              campaigns: campaigns.length,
              documents: documents.length
            }}
            onClearAllData={handleClearAllData}
            authUser={authUser}
            onLogout={handleLogout}
          />
        );
      default:
        return (
          <DashboardView
            currentWorkspace={currentWorkspace}
            currencySymbol={currencySymbol}
            orders={orders}
            customers={customers}
            products={products}
            onNavigateView={setCurrentView}
            onOpenQuickAction={() => setIsQuickActionOpen(true)}
            onOpenAiInsights={() => setIsAiInsightsOpen(true)}
          />
        );
    }
  };

  const isFullStandaloneScreen =
    currentView === 'landing' ||
    currentView === 'login' ||
    currentView === 'register' ||
    currentView === 'forgot-password';

  return (
    <DeviceFrame
      deviceType={deviceType}
      currentView={currentView}
      onSelectView={setCurrentView}
    >
      <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white transition-colors">
        
        {/* Render Header & Sidebar only when in main OS App view */}
        {!isFullStandaloneScreen ? (
          <div className="flex flex-col min-h-screen">
            {/* Top Navigation Header */}
            <Header
              currentWorkspace={currentWorkspace}
              workspaces={WORKSPACES}
              onSelectWorkspace={handleSelectWorkspace}
              currentView={currentView}
              currency={currency}
              onSelectCurrency={setCurrency}
              deviceType={deviceType}
              onSelectDeviceType={setDeviceType}
              platformPage={platformView}
              onSelectPlatformPage={handleSelectPlatformView}
              onOpenSearch={() => setIsCommandPaletteOpen(true)}
              onOpenQuickAction={() => setIsQuickActionOpen(true)}
              onOpenAiInsights={() => setIsAiInsightsOpen(true)}
              onOpenNotifications={() => setIsNotificationsOpen(true)}
              unreadCount={3}
              isDarkMode={isDarkMode}
              onToggleDarkMode={() => setIsDarkMode(prev => !prev)}
              authUser={authUser}
              onLogout={handleLogout}
              onNavigateView={setCurrentView}
            />

            {/* Body Content with Persistent Sidebar */}
            <div className="flex-1 flex overflow-hidden">
              <Sidebar
                currentView={currentView}
                onSelectView={setCurrentView}
                collapsed={sidebarCollapsed}
                onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
                authUser={authUser}
                onLogout={handleLogout}
              />

              {/* Main Content Area */}
              <main className="flex-1 overflow-y-auto bg-[#F8FAFC] dark:bg-slate-950">
                {renderCurrentView()}
              </main>
            </div>
          </div>
        ) : (
          /* Standalone Landing Page or Auth View */
          <main className="min-h-screen">{renderCurrentView()}</main>
        )}

        {/* Floating AI & Quick Action Triggers for quick accessibility */}
        {!isFullStandaloneScreen && (
          <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2">
            <button
              onClick={() => setIsAiInsightsOpen(true)}
              className="p-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-full shadow-2xl shadow-emerald-900/50 flex items-center justify-center transition-all hover:scale-105 active:scale-95 group"
              title="StackVerse AI Assistant"
            >
              <span className="text-xs font-mono font-bold px-1">AI</span>
            </button>
          </div>
        )}

        {/* Global Modals & Drawers */}
        <CommandPalette
          isOpen={isCommandPaletteOpen}
          onClose={() => setIsCommandPaletteOpen(false)}
          onNavigate={(v) => {
            setCurrentView(v);
            setIsCommandPaletteOpen(false);
          }}
          onOpenQuickAction={() => {
            setIsCommandPaletteOpen(false);
            setIsQuickActionOpen(true);
          }}
          onOpenAiInsights={() => {
            setIsCommandPaletteOpen(false);
            setIsAiInsightsOpen(true);
          }}
        />

        <QuickActionModal
          isOpen={isQuickActionOpen}
          onClose={() => setIsQuickActionOpen(false)}
          onSelectAction={(view) => setCurrentView(view)}
          currencySymbol={currencySymbol}
          customers={customers}
          products={products}
          onAddOrder={handleAddOrder}
          onAddCustomer={handleAddCustomer}
          onAddProduct={handleAddProduct}
          onAddTransaction={handleAddTransaction}
          onAddEmployee={handleAddEmployee}
          onAddCampaign={handleAddCampaign}
        />

        <AiInsightsPanel
          isOpen={isAiInsightsOpen}
          onClose={() => setIsAiInsightsOpen(false)}
          currentWorkspace={currentWorkspace}
          currentView={currentView}
          currencySymbol={currencySymbol}
        />

        <NotificationDrawer
          isOpen={isNotificationsOpen}
          onClose={() => setIsNotificationsOpen(false)}
          onNavigate={(v) => {
            setCurrentView(v);
            setIsNotificationsOpen(false);
          }}
        />

      </div>
    </DeviceFrame>
  );
}
