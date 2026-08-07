import React from 'react';
import {
  ShoppingCart,
  Plus,
  Search,
  ScanLine,
  CheckCircle2,
  Trash2,
  Printer,
  X,
  CreditCard,
  DollarSign,
  FileText,
  User,
  QrCode
} from 'lucide-react';
import { Order, Product, Customer } from '../types';

interface SalesViewProps {
  orders: Order[];
  products: Product[];
  customers: Customer[];
  currencySymbol: string;
  onAddOrder: (newOrder: Order) => void;
}

export const SalesView: React.FC<SalesViewProps> = ({
  orders,
  products,
  customers,
  currencySymbol,
  onAddOrder
}) => {
  const [activeTab, setActiveTab] = React.useState<'pos' | 'orders' | 'invoices'>('pos');
  const [cart, setCart] = React.useState<{ product: Product; qty: number }[]>([]);
  const [selectedCustomer, setSelectedCustomer] = React.useState<string>('Walk-in Customer');
  const [paymentMethod, setPaymentMethod] = React.useState<'Paystack' | 'POS Card' | 'Cash' | 'Bank Transfer' | 'M-Pesa'>('Paystack');
  const [couponCode, setCouponCode] = React.useState('');
  const [discountPercent, setDiscountPercent] = React.useState(0);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState<string>('All');
  const [completedOrder, setCompletedOrder] = React.useState<Order | null>(null);

  const categories = ['All', 'Energy & Power', 'Retail Hardware', 'Agro Tech', 'Healthcare'];

  const filteredProducts = products.filter(p => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.sku.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { product, qty: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateQty = (productId: string, delta: number) => {
    setCart(prev =>
      prev
        .map(item => {
          if (item.product.id === productId) {
            const newQty = item.qty + delta;
            return newQty > 0 ? { ...item, qty: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as { product: Product; qty: number }[]
    );
  };

  const applyCoupon = () => {
    if (couponCode.trim().toUpperCase() === 'STACK10') {
      setDiscountPercent(10);
    } else if (couponCode.trim().toUpperCase() === 'VIP20') {
      setDiscountPercent(20);
    } else {
      alert('Invalid coupon code. Try STACK10 or VIP20');
    }
  };

  const subtotal = cart.reduce((sum, item) => sum + item.product.sellingPrice * item.qty, 0);
  const discountAmount = (subtotal * discountPercent) / 100;
  const vatAmount = (subtotal - discountAmount) * 0.075; // 7.5% VAT
  const grandTotal = subtotal - discountAmount + vatAmount;

  const handleCheckout = () => {
    if (cart.length === 0) return;

    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber: `SO-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      customerName: selectedCustomer,
      customerEmail: `${selectedCustomer.toLowerCase().replace(/\s+/g, '')}@stackverse.os`,
      items: cart.map(i => ({
        productId: i.product.id,
        productName: i.product.name,
        price: i.product.sellingPrice,
        quantity: i.qty
      })),
      totalAmount: Math.round(grandTotal),
      paymentMethod,
      status: 'Completed',
      date: new Date().toISOString().replace('T', ' ').slice(0, 16),
      channel: 'POS Terminal'
    };

    onAddOrder(newOrder);
    setCompletedOrder(newOrder);
    setCart([]);
  };

  return (
    <div className="p-4 sm:p-8 space-y-6 max-w-[1700px] mx-auto animate-in fade-in duration-300">
      
      {/* Header & Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
            <ShoppingCart className="w-6 h-6 text-blue-600" />
            Sales & Point of Sale (POS) Terminal
          </h1>
          <p className="text-xs text-slate-500">Walk-in cashier checkout, tax invoices & automated receipts</p>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-semibold text-slate-600">
          <button
            onClick={() => setActiveTab('pos')}
            className={`px-4 py-2 rounded-lg transition-all ${
              activeTab === 'pos' ? 'bg-blue-600 text-white shadow-sm' : 'hover:text-slate-900'
            }`}
          >
            POS Register Terminal
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 rounded-lg transition-all ${
              activeTab === 'orders' ? 'bg-blue-600 text-white shadow-sm' : 'hover:text-slate-900'
            }`}
          >
            Sales Orders History
          </button>
        </div>
      </div>

      {activeTab === 'pos' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Product Catalog Grid (2 Cols) */}
          <div className="lg:col-span-2 space-y-4">
            
            {/* Search & Barcode Scan */}
            <div className="flex items-center gap-3 bg-white p-3 rounded-2xl border border-slate-200/80 shadow-sm">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="Search products by SKU, name or barcode..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-blue-500"
                />
              </div>
              <button
                onClick={() => {
                  if (products.length > 0) addToCart(products[0]);
                }}
                className="px-3.5 py-2 bg-slate-900 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 hover:bg-slate-800 transition-colors"
                title="Simulate Barcode Scanner"
              >
                <ScanLine className="w-4 h-4 text-emerald-400" />
                <span className="hidden sm:inline">Scan SKU Barcode</span>
              </button>
            </div>

            {/* Category Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 custom-scrollbar">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                    selectedCategory === cat
                      ? 'bg-slate-900 text-white font-semibold'
                      : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Product Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {filteredProducts.length === 0 ? (
                <div className="col-span-full p-10 text-center bg-white border border-slate-200/80 rounded-2xl space-y-2">
                  <p className="font-bold text-slate-700 text-xs">No product SKUs in catalog</p>
                  <p className="text-[11px] text-slate-500">Stock your inventory first to start selling products through the POS terminal.</p>
                </div>
              ) : (
                filteredProducts.map((prod) => (
                  <div
                    key={prod.id}
                    onClick={() => addToCart(prod)}
                    className="bg-white border border-slate-200/80 rounded-2xl p-3.5 shadow-sm hover:shadow-md hover:border-blue-500/50 transition-all cursor-pointer flex flex-col justify-between group"
                  >
                    <div className="space-y-2">
                      <img
                        src={prod.image}
                        alt={prod.name}
                        className="w-full h-24 object-cover rounded-xl bg-slate-100"
                      />
                      <div className="text-[10px] text-blue-600 font-mono font-bold uppercase">{prod.sku}</div>
                      <div className="font-bold text-xs text-slate-900 line-clamp-2 leading-snug group-hover:text-blue-600">
                        {prod.name}
                      </div>
                    </div>
                    <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between">
                      <span className="font-mono font-extrabold text-sm text-slate-900">
                        {currencySymbol}{prod.sellingPrice.toLocaleString()}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-blue-50 text-blue-600 font-semibold">
                        + Add
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>

          </div>

          {/* Checkout Cart Drawer (1 Col) */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm flex flex-col justify-between space-y-4 h-fit sticky top-20">
            <div>
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                  <ShoppingCart className="w-4 h-4 text-blue-600" /> Current Register Cart
                </h3>
                <span className="text-xs font-mono bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full font-bold">
                  {cart.reduce((a, c) => a + c.qty, 0)} Items
                </span>
              </div>

              {/* Customer Selector */}
              <div className="mt-3">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                  Customer Account
                </label>
                <select
                  value={selectedCustomer}
                  onChange={(e) => setSelectedCustomer(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:border-blue-500"
                >
                  <option value="Walk-in Customer">Walk-in Cash Customer</option>
                  {customers.map(c => (
                    <option key={c.id} value={c.name}>{c.name} ({c.company})</option>
                  ))}
                </select>
              </div>

              {/* Cart Items List */}
              <div className="mt-4 max-h-[220px] overflow-y-auto space-y-2 custom-scrollbar pr-1">
                {cart.length === 0 ? (
                  <div className="p-8 text-center text-slate-400 text-xs">
                    Cart is empty. Click a product on the left to add items.
                  </div>
                ) : (
                  cart.map((item) => (
                    <div key={item.product.id} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                      <div className="flex-1 pr-2">
                        <div className="font-bold text-slate-900 truncate max-w-[140px]">{item.product.name}</div>
                        <div className="text-[10px] text-slate-500 font-mono">
                          {currencySymbol}{item.product.sellingPrice.toLocaleString()} each
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQty(item.product.id, -1)}
                          className="w-5 h-5 rounded bg-slate-200 text-slate-700 font-bold flex items-center justify-center hover:bg-slate-300"
                        >
                          -
                        </button>
                        <span className="font-mono font-bold text-slate-900">{item.qty}</span>
                        <button
                          onClick={() => updateQty(item.product.id, 1)}
                          className="w-5 h-5 rounded bg-slate-200 text-slate-700 font-bold flex items-center justify-center hover:bg-slate-300"
                        >
                          +
                        </button>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-red-500 hover:text-red-700 ml-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Calculations & Payment Methods */}
            <div className="space-y-3 pt-3 border-t border-slate-100 text-xs">
              
              {/* Coupon input */}
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Coupon code (e.g. STACK10)"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs uppercase font-mono"
                />
                <button
                  onClick={applyCoupon}
                  className="px-3 py-1.5 bg-slate-800 text-white rounded-xl font-semibold hover:bg-slate-700"
                >
                  Apply
                </button>
              </div>

              {/* Totals Breakdown */}
              <div className="space-y-1.5 text-slate-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono">{currencySymbol}{subtotal.toLocaleString()}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>Discount ({discountPercent}%)</span>
                    <span className="font-mono">-{currencySymbol}{discountAmount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>VAT (7.5%)</span>
                  <span className="font-mono">{currencySymbol}{vatAmount.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
                </div>
                <div className="flex justify-between text-slate-900 font-extrabold text-sm pt-2 border-t border-slate-200">
                  <span>Grand Total</span>
                  <span className="font-mono text-blue-600">
                    {currencySymbol}{Math.round(grandTotal).toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Payment Gateway Selector */}
              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                  Payment Gateway
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  {(['Paystack', 'POS Card', 'Bank Transfer', 'M-Pesa'] as const).map(m => (
                    <button
                      key={m}
                      onClick={() => setPaymentMethod(m)}
                      className={`py-1.5 px-2 rounded-xl text-[11px] font-medium border text-center transition-all ${
                        paymentMethod === m
                          ? 'bg-blue-600 text-white border-blue-600 font-bold'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              {/* Complete Order Button */}
              <button
                onClick={handleCheckout}
                disabled={cart.length === 0}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-emerald-900/20 transition-all flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                Complete Transaction ({currencySymbol}{Math.round(grandTotal).toLocaleString()})
              </button>

            </div>

          </div>

        </div>
      ) : (
        /* Orders List Table */
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 border-b border-slate-200 text-[10px] uppercase tracking-wider text-slate-500 font-semibold">
              <tr>
                <th className="p-4">Order Number</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Channel</th>
                <th className="p-4">Payment Method</th>
                <th className="p-4">Total Amount</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-12 text-center text-slate-400">
                    <div className="flex flex-col items-center justify-center space-y-3">
                      <ShoppingCart className="w-8 h-8 text-slate-300" />
                      <p className="font-bold text-slate-700 text-sm">No sales orders found</p>
                      <p className="text-xs text-slate-500 max-w-sm">Your order book is currently empty. Switch to the POS Terminal tab to make a sale or record an order.</p>
                      <button
                        onClick={() => setActiveTab('pos')}
                        className="mt-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs shadow-xs cursor-pointer"
                      >
                        Open POS Terminal
                      </button>
                    </div>
                  </td>
                </tr>
              ) : (
                orders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-4 font-mono font-bold text-blue-600">{ord.orderNumber}</td>
                    <td className="p-4 font-bold text-slate-900">{ord.customerName}</td>
                    <td className="p-4">{ord.channel}</td>
                    <td className="p-4 font-mono">{ord.paymentMethod}</td>
                    <td className="p-4 font-mono font-bold text-slate-900">
                      {currencySymbol}{ord.totalAmount.toLocaleString()}
                    </td>
                    <td className="p-4">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                        {ord.status}
                      </span>
                    </td>
                    <td className="p-4 text-right text-slate-500 font-mono">{ord.date}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Completed Thermal Receipt Modal */}
      {completedOrder && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-300 w-full max-w-sm rounded-2xl shadow-2xl overflow-hidden p-6 text-slate-900 space-y-4 font-mono text-xs">
            <div className="text-center space-y-1">
              <div className="font-extrabold text-base uppercase tracking-widest text-blue-900">StackVerse OS POS</div>
              <div className="text-[10px] text-slate-500">Official Sales Thermal Receipt</div>
              <div className="text-[10px] font-bold text-emerald-600">✓ Transaction Paid</div>
            </div>

            <div className="border-y border-dashed border-slate-300 py-2 space-y-1 text-[11px]">
              <div className="flex justify-between">
                <span>Receipt #:</span>
                <span className="font-bold">{completedOrder.orderNumber}</span>
              </div>
              <div className="flex justify-between">
                <span>Customer:</span>
                <span>{completedOrder.customerName}</span>
              </div>
              <div className="flex justify-between">
                <span>Method:</span>
                <span>{completedOrder.paymentMethod}</span>
              </div>
              <div className="flex justify-between">
                <span>Date:</span>
                <span>{completedOrder.date}</span>
              </div>
            </div>

            <div className="space-y-1 text-[11px]">
              {completedOrder.items.map((item, idx) => (
                <div key={idx} className="flex justify-between">
                  <span className="truncate max-w-[180px]">{item.quantity}x {item.productName}</span>
                  <span>{currencySymbol}{(item.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-dashed border-slate-300 pt-2 flex justify-between font-extrabold text-sm">
              <span>Total Paid:</span>
              <span>{currencySymbol}{completedOrder.totalAmount.toLocaleString()}</span>
            </div>

            <div className="pt-2 flex justify-center">
              <QrCode className="w-16 h-16 text-slate-800" />
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => {
                  alert('Receipt sent to printer and PDF saved.');
                  setCompletedOrder(null);
                }}
                className="flex-1 py-2 bg-slate-900 text-white rounded-xl font-sans font-bold flex items-center justify-center gap-1 text-xs hover:bg-slate-800"
              >
                <Printer className="w-3.5 h-3.5" /> Print Receipt
              </button>
              <button
                onClick={() => setCompletedOrder(null)}
                className="px-3 py-2 bg-slate-200 text-slate-800 rounded-xl font-sans font-bold text-xs hover:bg-slate-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
