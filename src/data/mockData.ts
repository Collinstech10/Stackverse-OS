import {
  Workspace,
  Customer,
  Product,
  Order,
  Invoice,
  Transaction,
  Employee,
  Campaign,
  Integration,
  DocumentItem,
  AutomationNode
} from '../types';

export const WORKSPACES: Workspace[] = [
  {
    id: 'ws-lagos',
    name: 'Dangote Logistics & Trading',
    location: 'Lagos, Nigeria',
    country: 'Nigeria',
    currency: 'NGN',
    currencySymbol: '₦',
    plan: 'Enterprise Series A',
    logo: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=120&q=80',
  },
  {
    id: 'ws-accra',
    name: 'Amina Apparel & Retail Hub',
    location: 'Accra, Ghana',
    country: 'Ghana',
    currency: 'GHS',
    currencySymbol: 'GH₵',
    plan: 'Growth OS Plan',
    logo: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=120&q=80',
  },
  {
    id: 'ws-nairobi',
    name: 'Safari Tech & Agribusiness',
    location: 'Nairobi, Kenya',
    country: 'Kenya',
    currency: 'KES',
    currencySymbol: 'KSh',
    plan: 'Enterprise Multi-Branch',
    logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=120&q=80',
  }
];

export const INITIAL_CUSTOMERS: Customer[] = [
  {
    id: 'cust-1',
    name: 'Chief Oladipo Johnson',
    company: 'Lagos Premier Agro Industries',
    email: 'oladipo@lagosagro.ng',
    phone: '+234 803 123 4567',
    location: 'Victoria Island, Lagos',
    segment: 'Enterprise',
    stage: 'Won',
    totalSpent: 14500000,
    ordersCount: 28,
    lastOrderDate: '2026-08-01',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    notes: ['Key account for bulk solar pumps', 'Prefers invoice payments via Zenith Bank'],
    tags: ['VIP', 'Bulk Buyer', 'Agro Tech']
  },
  {
    id: 'cust-2',
    name: 'Kwame Mensah',
    company: 'Gold Coast Electronics Ltd',
    email: 'kwame@goldcoastelec.gh',
    phone: '+233 24 555 0192',
    location: 'Osu, Accra',
    segment: 'Wholesale',
    stage: 'Proposal',
    totalSpent: 8200000,
    ordersCount: 14,
    lastOrderDate: '2026-07-28',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    notes: ['Requesting 15% discount for 500 unit batch order'],
    tags: ['Electronics', 'Ghana Branch']
  },
  {
    id: 'cust-3',
    name: 'Dr. Amina Al-Hassan',
    company: 'Northern Healthcare Supplies',
    email: 'amina@northernhealth.ng',
    phone: '+234 812 987 6543',
    location: 'Kano, Nigeria',
    segment: 'Enterprise',
    stage: 'Won',
    totalSpent: 22400000,
    ordersCount: 42,
    lastOrderDate: '2026-08-02',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
    notes: ['Reordering cold storage medical equipment bi-monthly'],
    tags: ['Medical', 'Government Contractor']
  },
  {
    id: 'cust-4',
    name: 'Nanjala Wafula',
    company: 'Savannah Logistics Kenya',
    email: 'nanjala@savannahlogistics.ke',
    phone: '+254 711 234 567',
    location: 'Mombasa Road, Nairobi',
    segment: 'Wholesale',
    stage: 'Negotiation',
    totalSpent: 6700000,
    ordersCount: 11,
    lastOrderDate: '2026-07-15',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    notes: ['Integrating M-Pesa automated collection link'],
    tags: ['Logistics', 'Kenya']
  },
  {
    id: 'cust-5',
    name: 'Tunde Bakare',
    company: 'Eko Digital Mart',
    email: 'tunde@ekodigital.ng',
    phone: '+234 901 333 4444',
    location: 'Ikeja Computer Village, Lagos',
    segment: 'Retail',
    stage: 'Contacted',
    totalSpent: 1250000,
    ordersCount: 5,
    lastOrderDate: '2026-07-30',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80',
    notes: ['Walk-in POS regular customer'],
    tags: ['POS Retail']
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    sku: 'SLR-INV-5KVA',
    name: 'StackVerse Solar Hybrid Inverter 5.5kVA',
    category: 'Energy & Power',
    warehouse: 'Lagos Central',
    stock: 48,
    minStockAlert: 10,
    buyingPrice: 420000,
    sellingPrice: 650000,
    supplier: 'Sunking Energy Global',
    status: 'In Stock',
    barcode: '8901234567890',
    image: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'prod-2',
    sku: 'LFP-BAT-48V',
    name: 'LiFePO4 Lithium Battery 100Ah 48V Rack',
    category: 'Energy & Power',
    warehouse: 'Lagos Central',
    stock: 7,
    minStockAlert: 15,
    buyingPrice: 850000,
    sellingPrice: 1250000,
    supplier: 'Felicity Solar Ltd',
    status: 'Low Stock',
    barcode: '8901234567891',
    image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'prod-3',
    sku: 'POS-TERM-4G',
    name: 'Android 4G Smart POS Terminal with Printer',
    category: 'Retail Hardware',
    warehouse: 'Ikeja Depot',
    stock: 120,
    minStockAlert: 20,
    buyingPrice: 65000,
    sellingPrice: 110000,
    supplier: 'Paystack Hardware Inc',
    status: 'In Stock',
    barcode: '8901234567892',
    image: 'https://images.unsplash.com/photo-1556742049-0a670f4a45a7?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'prod-4',
    sku: 'AGR-DRN-20L',
    name: 'Precision Crop Spraying Drone 20 Litre',
    category: 'Agro Tech',
    warehouse: 'Abuja Hub',
    stock: 3,
    minStockAlert: 5,
    buyingPrice: 3800000,
    sellingPrice: 5200000,
    supplier: 'DJI Agriculture',
    status: 'Low Stock',
    barcode: '8901234567893',
    image: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'prod-5',
    sku: 'MED-FRG-200',
    name: 'Solar Vaccine Medical Refrigerator 200L',
    category: 'Healthcare',
    warehouse: 'Lagos Central',
    stock: 0,
    minStockAlert: 4,
    buyingPrice: 1900000,
    sellingPrice: 2800000,
    supplier: 'Vestfrost Solutions',
    status: 'Out of Stock',
    barcode: '8901234567894',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=200&q=80'
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-101',
    orderNumber: 'SO-2026-0891',
    customerName: 'Chief Oladipo Johnson',
    customerEmail: 'oladipo@lagosagro.ng',
    items: [
      { productId: 'prod-1', productName: 'StackVerse Solar Hybrid Inverter 5.5kVA', price: 650000, quantity: 4 },
      { productId: 'prod-2', productName: 'LiFePO4 Lithium Battery 100Ah', price: 1250000, quantity: 2 }
    ],
    totalAmount: 5100000,
    paymentMethod: 'Paystack',
    status: 'Completed',
    date: '2026-08-03 14:22',
    channel: 'B2B Sales'
  },
  {
    id: 'ord-102',
    orderNumber: 'SO-2026-0892',
    customerName: 'Tunde Bakare',
    customerEmail: 'tunde@ekodigital.ng',
    items: [
      { productId: 'prod-3', productName: 'Android 4G Smart POS Terminal', price: 110000, quantity: 2 }
    ],
    totalAmount: 220000,
    paymentMethod: 'POS Card',
    status: 'Completed',
    date: '2026-08-03 11:05',
    channel: 'POS Terminal'
  },
  {
    id: 'ord-103',
    orderNumber: 'SO-2026-0893',
    customerName: 'Dr. Amina Al-Hassan',
    customerEmail: 'amina@northernhealth.ng',
    items: [
      { productId: 'prod-5', productName: 'Solar Vaccine Medical Refrigerator 200L', price: 2800000, quantity: 1 }
    ],
    totalAmount: 2800000,
    paymentMethod: 'Bank Transfer',
    status: 'Processing',
    date: '2026-08-02 16:40',
    channel: 'WhatsApp Sale'
  }
];

export const INITIAL_INVOICES: Invoice[] = [
  {
    id: 'inv-801',
    invoiceNumber: 'INV-2026-041',
    customerName: 'Lagos Premier Agro Industries',
    issueDate: '2026-08-01',
    dueDate: '2026-08-15',
    amount: 5100000,
    taxAmount: 382500,
    status: 'Paid',
    items: [
      { description: 'Solar Hybrid Inverter 5.5kVA', qty: 4, rate: 650000, total: 2600000 },
      { description: 'LiFePO4 Battery Pack 100Ah', qty: 2, rate: 1250000, total: 2500000 }
    ]
  },
  {
    id: 'inv-802',
    invoiceNumber: 'INV-2026-042',
    customerName: 'Savannah Logistics Kenya',
    issueDate: '2026-07-25',
    dueDate: '2026-08-08',
    amount: 3400000,
    taxAmount: 255000,
    status: 'Overdue',
    items: [
      { description: 'GPS Fleet Telematics Modems', qty: 20, rate: 170000, total: 3400000 }
    ]
  },
  {
    id: 'inv-803',
    invoiceNumber: 'INV-2026-043',
    customerName: 'Gold Coast Electronics Ghana',
    issueDate: '2026-08-03',
    dueDate: '2026-08-17',
    amount: 8200000,
    taxAmount: 615000,
    status: 'Sent',
    items: [
      { description: 'Smart Android POS Terminals Batch', qty: 74, rate: 110000, total: 8200000 }
    ]
  }
];

export const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: 'tx-1',
    description: 'Paystack Merchant Settlement - Orders #0891',
    category: 'Sales Revenue',
    type: 'Income',
    amount: 5100000,
    date: '2026-08-03',
    status: 'Reconciled',
    account: 'Zenith Bank Corporate (0092)'
  },
  {
    id: 'tx-2',
    description: 'Import Customs Clearance & Port Duty (Tincan Port)',
    category: 'Logistics',
    type: 'Expense',
    amount: 1420000,
    date: '2026-08-02',
    status: 'Reconciled',
    account: 'GTBank Main Account (4412)'
  },
  {
    id: 'tx-3',
    description: 'Felicity Solar Inverter Factory Invoice Batch',
    category: 'Inventory Purchase',
    type: 'Expense',
    amount: 8500000,
    date: '2026-08-01',
    status: 'Reconciled',
    account: 'Zenith Bank Corporate (0092)'
  },
  {
    id: 'tx-4',
    description: 'Google Cloud & AWS Infrastructure Hosting',
    category: 'Utilities',
    type: 'Expense',
    amount: 320000,
    date: '2026-07-31',
    status: 'Reconciled',
    account: 'Corporate Dollar Mastercard'
  }
];

export const INITIAL_EMPLOYEES: Employee[] = [
  {
    id: 'emp-1',
    fullName: 'Babajide Ogundele',
    role: 'Chief Technology Officer',
    department: 'Engineering',
    email: 'jide@stackverse.os',
    phone: '+234 802 111 2222',
    salary: 2800000,
    status: 'Active',
    joinDate: '2024-03-15',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    attendanceRate: 98.4
  },
  {
    id: 'emp-2',
    fullName: 'Chidimma Eze',
    role: 'Head of Growth & Marketing',
    department: 'Sales & Marketing',
    email: 'chidimma@stackverse.os',
    phone: '+234 813 444 5555',
    salary: 1950000,
    status: 'Active',
    joinDate: '2024-07-01',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
    attendanceRate: 96.8
  },
  {
    id: 'emp-3',
    fullName: 'Farooq Yusuf',
    role: 'Warehouse & Logistics Lead',
    department: 'Operations',
    email: 'farooq@stackverse.os',
    phone: '+234 905 777 8888',
    salary: 1400000,
    status: 'Active',
    joinDate: '2025-01-10',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    attendanceRate: 99.1
  },
  {
    id: 'emp-4',
    fullName: 'Grace Wambui',
    role: 'Financial Controller (Kenya)',
    department: 'Finance',
    email: 'grace@stackverse.os',
    phone: '+254 722 999 000',
    salary: 2100000,
    status: 'On Leave',
    joinDate: '2024-11-20',
    avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=150&q=80',
    attendanceRate: 94.2
  }
];

export const INITIAL_CAMPAIGNS: Campaign[] = [
  {
    id: 'cmp-1',
    name: 'August Solar Hybrid Promo - 10% Off',
    type: 'WhatsApp Broadcast',
    audience: 'VIP & Bulk Buyers (1,420 Contacts)',
    sentCount: 1420,
    openRate: 88.4,
    clickRate: 34.2,
    status: 'Active',
    date: '2026-08-01'
  },
  {
    id: 'cmp-2',
    name: 'Q3 Enterprise Software & POS Catalog',
    type: 'Email Newsletter',
    audience: 'All Wholesale Leads (4,850 Contacts)',
    sentCount: 4850,
    openRate: 42.1,
    clickRate: 12.8,
    status: 'Completed',
    date: '2026-07-28'
  },
  {
    id: 'cmp-3',
    name: 'Instant Payment Settlement Notification',
    type: 'SMS Blast',
    audience: 'Active Merchants (890 Contacts)',
    sentCount: 890,
    openRate: 97.5,
    clickRate: 48.0,
    status: 'Completed',
    date: '2026-07-15'
  }
];

export const INITIAL_INTEGRATIONS: Integration[] = [
  {
    id: 'int-paystack',
    name: 'Paystack Payments',
    category: 'Payment Gateway',
    description: 'Accept Card, Bank Transfer, USSD, and Apple Pay across West & East Africa.',
    connected: true,
    logoUrl: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=80&q=80',
    apiKey: 'pk_live_89123*****************',
    usageCount: '₦84.2M processed this month'
  },
  {
    id: 'int-flutterwave',
    name: 'Flutterwave for Business',
    category: 'Payment Gateway',
    description: 'Multi-currency settlement, Virtual Cards, and Mobile Money integration.',
    connected: true,
    logoUrl: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=80&q=80',
    apiKey: 'FLWSECK-*****************',
    usageCount: 'GH₵1.2M processed'
  },
  {
    id: 'int-whatsapp',
    name: 'WhatsApp Business Cloud API',
    category: 'Communication',
    description: 'Send automated order receipts, delivery updates, and interactive customer bots.',
    connected: true,
    logoUrl: 'https://images.unsplash.com/photo-1614680376593-902f749f7ba3?auto=format&fit=crop&w=80&q=80',
    apiKey: 'EAA129384*****************',
    usageCount: '18,400 messages sent'
  },
  {
    id: 'int-mpesa',
    name: 'Safaricom M-Pesa Express',
    category: 'Mobile Money',
    description: 'Instant STK Push payments and Till/Paybill automated reconciliation.',
    connected: true,
    logoUrl: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=80&q=80',
    apiKey: 'MPESA_LIVE_KEY_9921',
    usageCount: 'KSh 4.8M processed'
  },
  {
    id: 'int-quickbooks',
    name: 'QuickBooks Online Sync',
    category: 'Accounting',
    description: 'Auto-sync general ledger, chart of accounts, and tax statements.',
    connected: false,
    logoUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=80&q=80'
  },
  {
    id: 'int-shopify',
    name: 'Shopify Storefront Connector',
    category: 'E-Commerce',
    description: '2-way inventory sync, order routing, and unified customer profiles.',
    connected: false,
    logoUrl: 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&w=80&q=80'
  }
];

export const INITIAL_DOCUMENTS: DocumentItem[] = [
  {
    id: 'doc-1',
    name: 'Dangote Agro B2B Supply Master Agreement.pdf',
    category: 'Contract',
    fileSize: '4.2 MB',
    updatedAt: '2026-08-01',
    author: 'Chief Legal Counsel',
    version: 'v2.4',
    tags: ['Signed', 'Enterprise', 'Lagos']
  },
  {
    id: 'doc-2',
    name: 'Q2 2026 Financial Audit & Tax Filing Report.pdf',
    category: 'Financial Report',
    fileSize: '8.7 MB',
    updatedAt: '2026-07-28',
    author: 'PwC Tax Advisors',
    version: 'v1.0',
    tags: ['Audited', 'Tax']
  },
  {
    id: 'doc-3',
    name: 'Felicity Solar Inverter Import Customs Clearance Bill.pdf',
    category: 'Receipt',
    fileSize: '1.8 MB',
    updatedAt: '2026-07-20',
    author: 'Farooq Yusuf',
    version: 'v1.1',
    tags: ['Port Duty', 'Logistics']
  }
];

export const AUTOMATION_WORKFLOWS: { id: string; name: string; active: boolean; nodes: AutomationNode[] }[] = [
  {
    id: 'wf-1',
    name: 'High-Value Order WhatsApp VIP Notification',
    active: true,
    nodes: [
      { id: 'n1', type: 'trigger', title: 'When New Sales Order Created', description: 'Triggers on POS or B2B Online sale', icon: 'ShoppingCart' },
      { id: 'n2', type: 'condition', title: 'If Total Amount > ₦500,000', description: 'Filters high-value transactions', icon: 'DollarSign' },
      { id: 'n3', type: 'action', title: 'Send WhatsApp VIP Thank-You', description: 'Automated personal message with PDF receipt', icon: 'MessageSquare' },
      { id: 'n4', type: 'action', title: 'Alert Lagos Warehouse Team', description: 'Priority dispatch tag applied in inventory', icon: 'Package' }
    ]
  },
  {
    id: 'wf-2',
    name: 'Low Inventory Auto-Reorder Trigger',
    active: true,
    nodes: [
      { id: 'n10', type: 'trigger', title: 'Stock Falls Below Min Threshold', description: 'Checked continuously across warehouses', icon: 'AlertTriangle' },
      { id: 'n11', type: 'action', title: 'Draft Purchase Order to Supplier', description: 'Pre-fills buying price & supplier email', icon: 'FileText' },
      { id: 'n12', type: 'action', title: 'Notify CFO for One-Click Approval', description: 'Slack & Email instant push alert', icon: 'Bell' }
    ]
  }
];
