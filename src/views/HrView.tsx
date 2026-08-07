import React from 'react';
import {
  UserCheck,
  Users,
  Plus,
  UserPlus,
  DollarSign,
  Calendar,
  CheckCircle2,
  FileText,
  Building2,
  X,
  Printer
} from 'lucide-react';
import { Employee } from '../types';

interface HrViewProps {
  employees: Employee[];
  currencySymbol: string;
  onAddEmployee: (e: Employee) => void;
}

export const HrView: React.FC<HrViewProps> = ({
  employees,
  currencySymbol,
  onAddEmployee
}) => {
  const [selectedEmpPayslip, setSelectedEmpPayslip] = React.useState<Employee | null>(null);
  const [payrollSubmitted, setPayrollSubmitted] = React.useState(false);

  // Onboard Employee Modal state
  const [showAddEmpModal, setShowAddEmpModal] = React.useState(false);
  const [empName, setEmpName] = React.useState('');
  const [empRole, setEmpRole] = React.useState('');
  const [empDept, setEmpDept] = React.useState('Operations');
  const [empEmail, setEmpEmail] = React.useState('');
  const [empPhone, setEmpPhone] = React.useState('');
  const [empSalary, setEmpSalary] = React.useState('');

  const handleCreateEmployee = (e: React.FormEvent) => {
    e.preventDefault();
    if (!empName.trim() || !empRole.trim()) return;

    const salaryVal = parseFloat(empSalary) || 0;

    const newEmp: Employee = {
      id: `emp-${Date.now()}`,
      fullName: empName.trim(),
      role: empRole.trim(),
      department: empDept,
      email: empEmail.trim() || 'staff@company.os',
      phone: empPhone.trim() || 'N/A',
      salary: salaryVal,
      status: 'Active',
      joinDate: new Date().toISOString().split('T')[0],
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
      attendanceRate: 100.0
    };

    onAddEmployee(newEmp);

    // Reset
    setEmpName('');
    setEmpRole('');
    setEmpEmail('');
    setEmpPhone('');
    setEmpSalary('');
    setShowAddEmpModal(false);
  };

  const totalMonthlyPayroll = employees.reduce((sum, e) => sum + e.salary, 0);

  const handleRunPayroll = () => {
    setPayrollSubmitted(true);
    setTimeout(() => {
      alert(`Payroll executed for ${employees.length} employees! Total ${currencySymbol}${totalMonthlyPayroll.toLocaleString()} dispatched to bank accounts via Zenith Corporate Direct Debit.`);
      setPayrollSubmitted(false);
    }, 1200);
  };

  return (
    <div className="p-4 sm:p-8 space-y-6 max-w-[1700px] mx-auto animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
            <UserCheck className="w-6 h-6 text-teal-600" />
            HR Directory & Automated Payroll Runner
          </h1>
          <p className="text-xs text-slate-500">Employee database, PAYE tax & pension automated calculations, payslips & attendance</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleRunPayroll}
            disabled={payrollSubmitted}
            className="px-4 py-2 bg-teal-600 hover:bg-teal-500 disabled:opacity-50 text-white font-extrabold text-xs rounded-xl shadow-md flex items-center gap-1.5 transition-all"
          >
            <DollarSign className="w-4 h-4" />
            {payrollSubmitted ? 'Executing Direct Debit...' : 'Run Monthly Payroll'}
          </button>
          <button
            onClick={() => setShowAddEmpModal(true)}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Onboard Employee
          </button>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-2">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Active Staff</div>
          <div className="text-2xl font-extrabold text-slate-900 font-mono">
            {employees.length} Staff
          </div>
          <div className="text-xs text-emerald-600 font-medium">100% Verified Profiles</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-2">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Monthly Gross Payroll</div>
          <div className="text-2xl font-extrabold text-slate-900 font-mono">
            {currencySymbol}{totalMonthlyPayroll.toLocaleString()}
          </div>
          <div className="text-xs text-slate-500">PAYE Tax & Pension Withheld</div>
        </div>

        <div className="bg-teal-950 text-white p-5 rounded-2xl border border-teal-800 shadow-md space-y-2">
          <div className="text-xs font-semibold text-teal-300 uppercase tracking-wider">Average Attendance Rate</div>
          <div className="text-2xl font-extrabold text-teal-400 font-mono">
            97.4%
          </div>
          <div className="text-xs text-teal-200 font-medium flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" /> Biometric Check-ins Active
          </div>
        </div>
      </div>

      {/* Employee Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <h3 className="font-bold text-sm text-slate-900">Staff Roster & Payroll Slips</h3>
          <span className="text-xs text-slate-500">Includes Nigerian PAYE & Pension Act deductions</span>
        </div>
        <table className="w-full text-left text-xs text-slate-700">
          <thead className="bg-slate-50 border-b border-slate-200 text-[10px] uppercase tracking-wider text-slate-500 font-semibold">
            <tr>
              <th className="p-4">Employee</th>
              <th className="p-4">Department & Role</th>
              <th className="p-4">Monthly Salary</th>
              <th className="p-4">Attendance</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium">
            {employees.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-12 text-center text-slate-400">
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <Users className="w-8 h-8 text-slate-300" />
                    <p className="font-bold text-slate-700 text-sm">No employee records found</p>
                    <p className="text-xs text-slate-500">Add staff members to run payroll and track attendance.</p>
                  </div>
                </td>
              </tr>
            ) : (
              employees.map((e) => (
                <tr key={e.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-4 flex items-center gap-3">
                    <img src={e.avatar} alt={e.fullName} className="w-9 h-9 rounded-full object-cover" />
                    <div>
                      <div className="font-bold text-slate-900">{e.fullName}</div>
                      <div className="text-[10px] text-slate-500">{e.email}</div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="font-semibold text-slate-900">{e.role}</div>
                    <div className="text-[10px] text-slate-500">{e.department}</div>
                  </td>
                  <td className="p-4 font-mono font-bold text-slate-900">
                    {currencySymbol}{e.salary.toLocaleString()}
                  </td>
                  <td className="p-4 font-mono font-bold text-emerald-600">{e.attendanceRate}%</td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        e.status === 'Active' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {e.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => setSelectedEmpPayslip(e)}
                      className="px-3 py-1 bg-slate-900 text-white rounded-lg font-bold text-[11px] hover:bg-slate-800 cursor-pointer"
                    >
                      Generate Payslip
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Payslip Modal */}
      {selectedEmpPayslip && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-300 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden p-6 text-slate-900 space-y-4 font-mono text-xs">
            <div className="text-center space-y-1">
              <div className="font-extrabold text-base uppercase tracking-widest text-teal-900">
                StackVerse OS Payroll
              </div>
              <div className="text-[10px] text-slate-500">Official Monthly Employee Payslip</div>
            </div>

            <div className="border-y border-slate-200 py-3 space-y-1">
              <div className="flex justify-between">
                <span className="text-slate-500">Employee:</span>
                <span className="font-bold">{selectedEmpPayslip.fullName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Role:</span>
                <span>{selectedEmpPayslip.role}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Department:</span>
                <span>{selectedEmpPayslip.department}</span>
              </div>
            </div>

            <div className="space-y-1.5 pt-1">
              <div className="flex justify-between font-bold">
                <span>Basic Gross Salary:</span>
                <span>{currencySymbol}{selectedEmpPayslip.salary.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-red-600">
                <span>PAYE Tax Deduction (7.5%):</span>
                <span>-{currencySymbol}{(selectedEmpPayslip.salary * 0.075).toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-red-600">
                <span>Pension Fund Contribution (8%):</span>
                <span>-{currencySymbol}{(selectedEmpPayslip.salary * 0.08).toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-900 font-extrabold text-sm border-t border-slate-300 pt-2">
                <span>Net Take-Home Pay:</span>
                <span className="text-emerald-600">
                  {currencySymbol}{(selectedEmpPayslip.salary * 0.845).toLocaleString()}
                </span>
              </div>
            </div>

            <div className="pt-2 flex gap-2">
              <button
                onClick={() => {
                  alert(`Payslip downloaded for ${selectedEmpPayslip.fullName}`);
                  setSelectedEmpPayslip(null);
                }}
                className="flex-1 py-2 bg-slate-900 text-white rounded-xl font-sans font-bold flex items-center justify-center gap-1 hover:bg-slate-800 text-xs"
              >
                <Printer className="w-3.5 h-3.5" /> Download PDF Slip
              </button>
              <button
                onClick={() => setSelectedEmpPayslip(null)}
                className="px-3 py-2 bg-slate-200 text-slate-800 rounded-xl font-sans font-bold text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Onboard Employee Modal */}
      {showAddEmpModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden text-slate-900 dark:text-slate-100">
            <div className="flex items-center justify-between p-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-teal-100 dark:bg-teal-950 text-teal-600 dark:text-teal-400 rounded-xl">
                  <UserPlus className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base">Onboard New Staff</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Add staff record to HR payroll & attendance ledger</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowAddEmpModal(false)}
                className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateEmployee} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Full Employee Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Amina Bello"
                  value={empName}
                  onChange={(e) => setEmpName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-hidden focus:border-teal-500 font-medium"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Role / Job Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Operations Manager"
                    value={empRole}
                    onChange={(e) => setEmpRole(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-hidden focus:border-teal-500 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Department</label>
                  <select
                    value={empDept}
                    onChange={(e) => setEmpDept(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-hidden focus:border-teal-500 font-medium"
                  >
                    <option value="Operations">Operations</option>
                    <option value="Sales & Marketing">Sales & Marketing</option>
                    <option value="Engineering">Engineering & Technical</option>
                    <option value="Finance">Finance & Accounting</option>
                    <option value="Human Resources">Human Resources</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Corporate Email</label>
                  <input
                    type="email"
                    placeholder="employee@company.os"
                    value={empEmail}
                    onChange={(e) => setEmpEmail(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-hidden focus:border-teal-500 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Phone Number</label>
                  <input
                    type="text"
                    placeholder="+234 800 000 0000"
                    value={empPhone}
                    onChange={(e) => setEmpPhone(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-hidden focus:border-teal-500 font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Monthly Gross Salary ({currencySymbol})</label>
                <input
                  type="number"
                  placeholder="0"
                  min="0"
                  value={empSalary}
                  onChange={(e) => setEmpSalary(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-hidden focus:border-teal-500 font-mono font-bold"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddEmpModal(false)}
                  className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs rounded-xl shadow-md cursor-pointer flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" /> Save Employee Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
