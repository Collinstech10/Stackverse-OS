import React from 'react';
import { Calendar as CalendarIcon, Plus, Clock, Users, MapPin } from 'lucide-react';

export const CalendarView: React.FC = () => {
  const events = [
    { title: 'Series A Board Review & Financials', time: '10:00 AM - 11:30 AM', date: 'Today', type: 'Executive', location: 'Lagos HQ / Zoom' },
    { title: 'Dangote Logistics B2B Contract Renewal', time: '02:00 PM - 03:00 PM', date: 'Today', type: 'Sales', location: 'Victoria Island, Lagos' },
    { title: 'Felicity Solar Inverter Shipment Arrival', time: '09:00 AM', date: 'Tomorrow', type: 'Operations', location: 'Tincan Port, Lagos' },
    { title: 'Monthly PAYE Tax Remittance Deadline', time: '5:00 PM', date: 'August 10', type: 'Finance', location: 'LIRS Portal' },
  ];

  return (
    <div className="p-4 sm:p-8 space-y-6 max-w-[1700px] mx-auto animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
            <CalendarIcon className="w-6 h-6 text-blue-600" />
            Executive Calendar & Operational Deadlines
          </h1>
          <p className="text-xs text-slate-500">Schedule meetings, track tax filing deadlines & shipment arrivals</p>
        </div>
        <button
          onClick={() => alert('New event created.')}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" /> Schedule Event
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
          <h3 className="font-bold text-sm text-slate-900">August 2026 Monthly Overview</h3>
          <div className="grid grid-cols-7 gap-2 text-center text-xs font-semibold text-slate-600">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => <div key={d} className="p-2 bg-slate-50 rounded-lg">{d}</div>)}
            {Array.from({ length: 31 }).map((_, i) => (
              <div
                key={i}
                className={`p-3 rounded-xl border text-xs font-bold text-left min-h-[60px] flex flex-col justify-between ${
                  i + 1 === 3 ? 'bg-blue-600 text-white border-blue-600' : 'bg-white border-slate-200 text-slate-800'
                }`}
              >
                <span>{i + 1}</span>
                {i + 1 === 3 && <span className="text-[9px] bg-blue-800 px-1 py-0.5 rounded">2 Events</span>}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
          <h3 className="font-bold text-sm text-slate-900 border-b pb-2">Upcoming Events & Deadlines</h3>
          <div className="space-y-3">
            {events.map((ev, idx) => (
              <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                <div className="font-bold text-xs text-slate-900">{ev.title}</div>
                <div className="text-[11px] text-slate-500 flex items-center gap-2 font-mono">
                  <Clock className="w-3 h-3 text-blue-600" /> {ev.date} • {ev.time}
                </div>
                <div className="text-[10px] text-slate-400 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-slate-400" /> {ev.location}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
