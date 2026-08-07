export type ViewMode =
  | 'dashboard'
  | 'sales'
  | 'crm'
  | 'inventory'
  | 'finance'
  | 'hr'
  | 'marketing'
  | 'reports'
  | 'calendar'
  | 'messages'
  | 'documents'
  | 'automation'
  | 'integrations'
  | 'settings'
  | 'help';

export type PlatformPage =
  | 'app'
  | 'landing'
  | 'login'
  | 'register'
  | 'forgot_password'
  | 'design_system';

export type DeviceType = 'desktop' | 'mobile_ios' | 'mobile_android' | 'tablet';

export type Currency = 'NGN' | 'USD' | 'GHS' | 'KES' | 'ZAR' | 'EUR' | 'GBP';

export interface Workspace {
  id: string;
  name: string;
  location: string;
  country: string;
  currency: Currency;
  currencySymbol: string;
  plan: string;
  logo: string;
}

export interface MetricCardData {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  timeframe: string;
  iconName: string;
  chartData?: number[];
}

export interface Customer {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  location: string;
  segment: 'Enterprise' | 'Wholesale' | 'Retail' | 'VIP';
  stage: 'Lead' | 'Contacted' | 'Proposal' | 'Negotiation' | 'Won';
  totalSpent: number;
  ordersCount: number;
  lastOrderDate: string;
  avatar: string;
  notes: string[];
  tags: string[];
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  category: string;
  warehouse: 'Lagos Central' | 'Ikeja Depot' | 'Abuja Hub' | 'Nairobi Port';
  stock: number;
  minStockAlert: number;
  buyingPrice: number;
  sellingPrice: number;
  supplier: string;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
  barcode: string;
  image: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  items: OrderItem[];
  totalAmount: number;
  paymentMethod: 'Paystack' | 'Flutterwave' | 'Bank Transfer' | 'POS Card' | 'Cash' | 'M-Pesa';
  status: 'Completed' | 'Pending' | 'Processing' | 'Cancelled';
  date: string;
  channel: 'Online Store' | 'POS Terminal' | 'WhatsApp Sale' | 'B2B Sales';
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  customerName: string;
  issueDate: string;
  dueDate: string;
  amount: number;
  taxAmount: number;
  status: 'Paid' | 'Overdue' | 'Draft' | 'Sent';
  items: { description: string; qty: number; rate: number; total: number }[];
}

export interface Transaction {
  id: string;
  description: string;
  category: 'Sales Revenue' | 'Inventory Purchase' | 'Payroll' | 'Logistics' | 'Utilities' | 'Marketing';
  type: 'Income' | 'Expense';
  amount: number;
  date: string;
  status: 'Reconciled' | 'Pending';
  account: string;
}

export interface Employee {
  id: string;
  fullName: string;
  role: string;
  department: 'Engineering' | 'Sales & Marketing' | 'Operations' | 'Finance' | 'HR';
  email: string;
  phone: string;
  salary: number;
  status: 'Active' | 'On Leave' | 'Terminated';
  joinDate: string;
  avatar: string;
  attendanceRate: number;
}

export interface Campaign {
  id: string;
  name: string;
  type: 'WhatsApp Broadcast' | 'Email Newsletter' | 'SMS Blast';
  audience: string;
  sentCount: number;
  openRate: number;
  clickRate: number;
  status: 'Active' | 'Completed' | 'Scheduled';
  date: string;
}

export interface AutomationNode {
  id: string;
  type: 'trigger' | 'condition' | 'action';
  title: string;
  description: string;
  icon: string;
}

export interface AutomationWorkflow {
  id: string;
  name: string;
  description?: string;
  active: boolean;
  nodes: AutomationNode[];
  lastTriggered?: string;
  runsCount?: number;
}

export interface AutomationExecutionLog {
  id: string;
  workflowId: string;
  workflowName: string;
  timestamp: string;
  status: 'Success' | 'Failed' | 'In Progress';
  triggerEvent: string;
  details: string;
}

export interface Integration {
  id: string;
  name: string;
  category: string;
  description: string;
  connected: boolean;
  logoUrl: string;
  apiKey?: string;
  usageCount?: string;
}

export interface DocumentItem {
  id: string;
  name: string;
  category: 'Contract' | 'Invoice' | 'Financial Report' | 'Receipt' | 'Policy';
  fileSize: string;
  updatedAt: string;
  author: string;
  version: string;
  tags: string[];
}
