import React from 'react';
import { DeviceType, ViewMode } from '../types';
import { Smartphone, Tablet, Monitor, LayoutDashboard, ShoppingCart, Users, Package, MoreHorizontal } from 'lucide-react';

interface DeviceFrameProps {
  deviceType: DeviceType;
  children: React.ReactNode;
  currentView: ViewMode;
  onSelectView: (v: ViewMode) => void;
}

export const DeviceFrame: React.FC<DeviceFrameProps> = ({
  deviceType,
  children,
  currentView,
  onSelectView
}) => {
  if (deviceType === 'desktop') {
    return <div className="w-full h-full min-h-screen bg-[#F8FAFC] text-slate-900">{children}</div>;
  }

  const isMobile = deviceType === 'mobile_ios' || deviceType === 'mobile_android';
  const isTablet = deviceType === 'tablet';

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 sm:p-8">
      {/* Simulator Info Header */}
      <div className="mb-4 text-center">
        <div className="inline-flex items-center gap-2 bg-slate-900 border border-slate-800 text-slate-300 px-3 py-1.5 rounded-full text-xs font-mono">
          {deviceType === 'mobile_ios' && <Smartphone className="w-3.5 h-3.5 text-blue-400" />}
          {deviceType === 'mobile_android' && <Smartphone className="w-3.5 h-3.5 text-emerald-400" />}
          {deviceType === 'tablet' && <Tablet className="w-3.5 h-3.5 text-purple-400" />}
          <span>
            {deviceType === 'mobile_ios' && 'iPhone 16 Pro Mobile View'}
            {deviceType === 'mobile_android' && 'Android Pixel 9 Native View'}
            {deviceType === 'tablet' && 'iPad Pro 11" Tablet Mode'}
          </span>
        </div>
      </div>

      {/* Frame Container */}
      <div
        className={`bg-[#F8FAFC] text-slate-900 overflow-hidden shadow-2xl relative transition-all duration-300 flex flex-col ${
          isMobile
            ? 'w-[390px] h-[844px] rounded-[48px] border-[12px] border-slate-800 ring-1 ring-slate-700'
            : 'w-[820px] h-[1080px] rounded-[32px] border-[14px] border-slate-800 ring-1 ring-slate-700'
        }`}
      >
        {/* Mobile Top Dynamic Island / Status Bar */}
        {isMobile && (
          <div className="bg-[#0B1F3A] text-white px-6 py-2.5 flex items-center justify-between text-[11px] font-mono shrink-0 select-none">
            <span>09:41</span>
            {/* Dynamic Notch */}
            <div className="w-24 h-4 bg-black rounded-full mx-auto my-0" />
            <div className="flex items-center gap-1 text-[10px]">
              <span>5G</span>
              <span>100%</span>
            </div>
          </div>
        )}

        {/* Child Screen View */}
        <div className="flex-1 overflow-y-auto custom-scrollbar relative">
          {children}
        </div>

        {/* Mobile Bottom Navigation Bar */}
        {isMobile && (
          <div className="bg-[#0B1F3A] text-slate-300 border-t border-slate-800 px-4 py-2 flex items-center justify-around shrink-0 select-none">
            <button
              onClick={() => onSelectView('dashboard')}
              className={`flex flex-col items-center text-[10px] ${
                currentView === 'dashboard' ? 'text-blue-400 font-bold' : 'text-slate-400'
              }`}
            >
              <LayoutDashboard className="w-4 h-4 mb-0.5" />
              <span>Dashboard</span>
            </button>
            <button
              onClick={() => onSelectView('sales')}
              className={`flex flex-col items-center text-[10px] ${
                currentView === 'sales' ? 'text-blue-400 font-bold' : 'text-slate-400'
              }`}
            >
              <ShoppingCart className="w-4 h-4 mb-0.5" />
              <span>Sales</span>
            </button>
            <button
              onClick={() => onSelectView('crm')}
              className={`flex flex-col items-center text-[10px] ${
                currentView === 'crm' ? 'text-blue-400 font-bold' : 'text-slate-400'
              }`}
            >
              <Users className="w-4 h-4 mb-0.5" />
              <span>CRM</span>
            </button>
            <button
              onClick={() => onSelectView('inventory')}
              className={`flex flex-col items-center text-[10px] ${
                currentView === 'inventory' ? 'text-blue-400 font-bold' : 'text-slate-400'
              }`}
            >
              <Package className="w-4 h-4 mb-0.5" />
              <span>Inventory</span>
            </button>
            <button
              onClick={() => onSelectView('settings')}
              className={`flex flex-col items-center text-[10px] ${
                currentView === 'settings' ? 'text-blue-400 font-bold' : 'text-slate-400'
              }`}
            >
              <MoreHorizontal className="w-4 h-4 mb-0.5" />
              <span>More</span>
            </button>
          </div>
        )}

        {/* iPhone Home Bar */}
        {isMobile && (
          <div className="bg-[#0B1F3A] py-1.5 flex justify-center shrink-0">
            <div className="w-32 h-1 bg-slate-600 rounded-full" />
          </div>
        )}

      </div>
    </div>
  );
};
