import React from 'react';
import { FileText, Plus, Download, Share2, Shield, Folder } from 'lucide-react';
import { DocumentItem } from '../types';

interface DocumentsViewProps {
  documents: DocumentItem[];
}

export const DocumentsView: React.FC<DocumentsViewProps> = ({ documents }) => {
  return (
    <div className="p-4 sm:p-8 space-y-6 max-w-[1700px] mx-auto animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
            <FileText className="w-6 h-6 text-purple-600" />
            Document Vault & B2B Contracts
          </h1>
          <p className="text-xs text-slate-500">Encrypted master contracts, tax filing proofs, customs bills & versioning</p>
        </div>
        <button
          onClick={() => alert('New document uploaded.')}
          className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" /> Upload Document
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        <table className="w-full text-left text-xs text-slate-700">
          <thead className="bg-slate-50 border-b border-slate-200 text-[10px] uppercase tracking-wider text-slate-500 font-semibold">
            <tr>
              <th className="p-4">Document Name</th>
              <th className="p-4">Category</th>
              <th className="p-4">Author</th>
              <th className="p-4">File Size</th>
              <th className="p-4">Version</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium">
            {documents.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-12 text-center text-slate-400">
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <FileText className="w-8 h-8 text-slate-300" />
                    <p className="font-bold text-slate-700 text-sm">No corporate documents</p>
                    <p className="text-xs text-slate-500">Upload agreements, invoices, or compliance certificates to share across your organization.</p>
                  </div>
                </td>
              </tr>
            ) : (
              documents.map((d) => (
                <tr key={d.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-4 font-bold text-slate-900 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-purple-600 shrink-0" />
                    <span>{d.name}</span>
                  </td>
                  <td className="p-4 font-semibold text-slate-700">{d.category}</td>
                  <td className="p-4 text-slate-600">{d.author}</td>
                  <td className="p-4 font-mono">{d.fileSize}</td>
                  <td className="p-4 font-mono font-bold text-purple-600">{d.version}</td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => alert(`Downloading ${d.name}...`)}
                      className="px-3 py-1 bg-slate-900 text-white rounded-lg font-bold text-[11px] hover:bg-slate-800 cursor-pointer"
                    >
                      Download
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
