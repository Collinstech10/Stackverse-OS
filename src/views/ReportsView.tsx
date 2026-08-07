import React from 'react';
import { BarChart3, Download, Printer, FileText, CheckCircle2 } from 'lucide-react';

interface ReportsViewProps {
  currencySymbol: string;
}

export const ReportsView: React.FC<ReportsViewProps> = ({ currencySymbol }) => {
  const reportsList = [
    { id: 'rep-1', title: 'Q3 Executive Sales & Revenue Breakdown', category: 'Sales', date: 'August 2026', format: 'PDF & CSV' },
    { id: 'rep-2', title: 'Audited Profit & Loss Statement (NIG & East Africa)', category: 'Finance', date: 'Q2 2026', format: 'PDF & CSV' },
    { id: 'rep-3', title: 'Multi-Warehouse Inventory Stock Valuation', category: 'Inventory', date: 'Real-time', format: 'Excel CSV' },
    { id: 'rep-4', title: 'PAYE Tax & Pension Remittance Ledger', category: 'HR & Tax', date: 'July 2026', format: 'PDF' },
  ];

  return (
    <div className="p-4 sm:p-8 space-y-6 max-w-[1700px] mx-auto animate-in fade-in duration-300">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-blue-600" />
            Executive Reports & Analytics Center
          </h1>
          <p className="text-xs text-slate-500">Generate, view & export board-ready financial, sales & operational reports</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {reportsList.map((rep) => (
          <div key={rep.id} className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-3 flex flex-col justify-between">
            <div className="space-y-1">
              <span className="text-[10px] font-mono font-bold bg-blue-50 text-blue-600 px-2 py-0.5 rounded uppercase">
                {rep.category} Report
              </span>
              <h3 className="font-extrabold text-slate-900 text-sm pt-1">{rep.title}</h3>
              <p className="text-xs text-slate-500">Period: {rep.date} • Available formats: {rep.format}</p>
            </div>

            <div className="flex gap-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => alert(`Simulating PDF Export for "${rep.title}"... File downloaded!`)}
                className="flex-1 py-2 bg-slate-900 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 hover:bg-slate-800"
              >
                <Download className="w-3.5 h-3.5" /> Download PDF
              </button>
              <button
                onClick={() => alert(`Exporting raw CSV data for "${rep.title}"...`)}
                className="px-3 py-2 bg-slate-100 text-slate-800 font-bold rounded-xl text-xs hover:bg-slate-200"
              >
                CSV Data
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
