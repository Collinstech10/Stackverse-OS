import React from 'react';
import {
  Package,
  Plus,
  Search,
  ScanLine,
  AlertTriangle,
  Upload,
  Building2,
  CheckCircle2,
  X,
  Filter
} from 'lucide-react';
import { Product } from '../types';

interface InventoryViewProps {
  products: Product[];
  currencySymbol: string;
  onAddProduct: (p: Product) => void;
}

export const InventoryView: React.FC<InventoryViewProps> = ({
  products,
  currencySymbol,
  onAddProduct
}) => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedWarehouse, setSelectedWarehouse] = React.useState<string>('All Warehouses');
  const [showAddModal, setShowAddModal] = React.useState(false);

  // New product form state
  const [newSku, setNewSku] = React.useState('');
  const [newName, setNewName] = React.useState('');
  const [newCategory, setNewCategory] = React.useState('Energy & Power');
  const [newWarehouse, setNewWarehouse] = React.useState<Product['warehouse']>('Lagos Central');
  const [newStock, setNewStock] = React.useState<number | ''>('');
  const [newBuyingPrice, setNewBuyingPrice] = React.useState<number | ''>('');
  const [newSellingPrice, setNewSellingPrice] = React.useState<number | ''>('');
  const [newSupplier, setNewSupplier] = React.useState('');

  const warehouses = ['All Warehouses', 'Lagos Central', 'Ikeja Depot', 'Abuja Hub', 'Nairobi Port'];

  const filteredProducts = products.filter(p => {
    const matchesWh = selectedWarehouse === 'All Warehouses' || p.warehouse === selectedWarehouse;
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.supplier.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesWh && matchesSearch;
  });

  const lowStockItems = products.filter(p => p.status === 'Low Stock' || p.status === 'Out of Stock');

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const created: Product = {
      id: `prod-${Date.now()}`,
      sku: newSku,
      name: newName,
      category: newCategory,
      warehouse: newWarehouse,
      stock: Number(newStock),
      minStockAlert: 10,
      buyingPrice: Number(newBuyingPrice),
      sellingPrice: Number(newSellingPrice),
      supplier: newSupplier,
      status: Number(newStock) > 10 ? 'In Stock' : 'Low Stock',
      barcode: `890${Math.floor(1000000000 + Math.random() * 9000000000)}`,
      image: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=200&q=80'
    };

    onAddProduct(created);
    setShowAddModal(false);
  };

  return (
    <div className="p-4 sm:p-8 space-y-6 max-w-[1700px] mx-auto animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
            <Package className="w-6 h-6 text-purple-600" />
            Inventory & Warehouse Management
          </h1>
          <p className="text-xs text-slate-500">Track multi-warehouse SKU counts, buying/selling margins & reorder triggers</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => alert('Simulated CSV catalog import complete. 120 SKUs synced.')}
            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs rounded-xl flex items-center gap-1.5 transition-colors"
          >
            <Upload className="w-4 h-4 text-slate-600" /> Bulk Import CSV
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-1.5 transition-all"
          >
            <Plus className="w-4 h-4" /> Add Product SKU
          </button>
        </div>
      </div>

      {/* Low Stock Warning Banner */}
      {lowStockItems.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-amber-900 text-xs">
          <div className="flex items-center gap-2.5">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
            <div>
              <span className="font-extrabold text-amber-950">
                Low Inventory Stock Alert ({lowStockItems.length} SKUs below threshold):
              </span>
              <span className="ml-1 text-amber-800">
                {lowStockItems.map(i => i.name).join(', ')}
              </span>
            </div>
          </div>
          <button
            onClick={() => alert('Automated Purchase Orders generated for low stock items.')}
            className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl text-[11px] shrink-0"
          >
            Auto-Generate Reorder PO
          </button>
        </div>
      )}

      {/* Search & Warehouse Filter */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-slate-200/80 shadow-sm">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search SKU, item name or supplier..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-purple-500"
          />
        </div>

        {/* Warehouse Pills */}
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
          {warehouses.map((wh) => (
            <button
              key={wh}
              onClick={() => setSelectedWarehouse(wh)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                selectedWarehouse === wh
                  ? 'bg-purple-600 text-white font-semibold shadow-sm'
                  : 'bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {wh}
            </button>
          ))}
        </div>
      </div>

      {/* Stock Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        <table className="w-full text-left text-xs text-slate-700">
          <thead className="bg-slate-50 border-b border-slate-200 text-[10px] uppercase tracking-wider text-slate-500 font-semibold">
            <tr>
              <th className="p-4">SKU / Item</th>
              <th className="p-4">Category</th>
              <th className="p-4">Warehouse</th>
              <th className="p-4">In Stock Qty</th>
              <th className="p-4">Buying Price</th>
              <th className="p-4">Selling Price</th>
              <th className="p-4">Margin %</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium">
            {filteredProducts.length === 0 ? (
              <tr>
                <td colSpan={8} className="p-12 text-center text-slate-400">
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <Package className="w-8 h-8 text-slate-300" />
                    <p className="font-bold text-slate-700 text-sm">No inventory SKUs registered</p>
                    <p className="text-xs text-slate-500">Add your first product SKU or import a CSV catalog to populate your warehouse inventory.</p>
                  </div>
                </td>
              </tr>
            ) : (
              filteredProducts.map((p) => {
                const margin = Math.round(((p.sellingPrice - p.buyingPrice) / p.sellingPrice) * 100);

                return (
                  <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-4 flex items-center gap-3">
                      <img src={p.image} alt={p.name} className="w-9 h-9 rounded-xl object-cover bg-slate-100" />
                      <div>
                        <div className="font-mono font-bold text-purple-600 text-[11px]">{p.sku}</div>
                        <div className="font-bold text-slate-900 max-w-xs truncate">{p.name}</div>
                        <div className="text-[10px] text-slate-400">Supplier: {p.supplier}</div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-semibold">
                        {p.category}
                      </span>
                    </td>
                    <td className="p-4 font-semibold text-slate-800">{p.warehouse}</td>
                    <td className="p-4 font-mono font-bold text-slate-900">{p.stock} Units</td>
                    <td className="p-4 font-mono">{currencySymbol}{p.buyingPrice.toLocaleString()}</td>
                    <td className="p-4 font-mono font-bold text-slate-900">
                      {currencySymbol}{p.sellingPrice.toLocaleString()}
                    </td>
                    <td className="p-4 font-mono font-bold text-emerald-600">+{margin}%</td>
                    <td className="p-4">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          p.status === 'In Stock'
                            ? 'bg-emerald-100 text-emerald-800'
                            : p.status === 'Low Stock'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {p.status}
                      </span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-300 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden text-slate-900 p-6 space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                <Package className="w-5 h-5 text-purple-600" /> Catalog New Inventory SKU
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 rounded hover:bg-slate-100 text-slate-400 hover:text-slate-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">SKU Identifier</label>
                  <input
                    type="text"
                    value={newSku}
                    onChange={(e) => setNewSku(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-mono"
                    required
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Category</label>
                  <input
                    type="text"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Product Name</label>
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-semibold"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Warehouse Location</label>
                  <select
                    value={newWarehouse}
                    onChange={(e) => setNewWarehouse(e.target.value as any)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-semibold"
                  >
                    <option value="Lagos Central">Lagos Central</option>
                    <option value="Ikeja Depot">Ikeja Depot</option>
                    <option value="Abuja Hub">Abuja Hub</option>
                    <option value="Nairobi Port">Nairobi Port</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Initial Stock Qty</label>
                  <input
                    type="number"
                    value={newStock}
                    onChange={(e) => setNewStock(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-mono"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Buying Price ({currencySymbol})</label>
                  <input
                    type="number"
                    value={newBuyingPrice}
                    onChange={(e) => setNewBuyingPrice(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-mono"
                    required
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Selling Price ({currencySymbol})</label>
                  <input
                    type="number"
                    value={newSellingPrice}
                    onChange={(e) => setNewSellingPrice(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-mono"
                    required
                  />
                </div>
              </div>

              <div className="pt-3 flex gap-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl"
                >
                  Save Product to Inventory
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
