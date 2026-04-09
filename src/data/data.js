// ============================================
// ALMENSO — Default Data
// ============================================

export const DEFAULT_SETTINGS = {
  storeName: 'Almenso',
  // ─── Affiliate / Domain Links ────────────────────────────────
  mainDomain:          'almenso.com', // apna main domain yahan — subdomain ke liye
  affiliateHostinger:  '',
  affiliateGodaddy:    '',
  affiliateNamecheap:  '',
  vendorLoginMethod: 'password', // 'password' | 'otp' — Admin se toggle karo
  gstEnabled: false,           // GST billing on/off
  gstNumber: '',               // GSTIN number
  gstRate: 18,                 // Default GST % (5, 12, 18, 28)
  gstIncluded: true,           // true = GST included in price, false = add on top
  businessName: '',            // Legal business name for invoice
  businessAddress: '',         // Address on invoice
  invoicePrefix: 'INV',        // Invoice number prefix e.g. INV-001
  tagline: 'Haldwani Ki Apni Dukan',
  phone: '+919258133689',
  whatsapp: '919258133689',
  address: 'Haldwani, Uttarakhand — 263139',
  timing: '9AM – 9PM · Mon to Sat',
  deliveryCharge: 0,
  minOrder: 199,
  storeOpen: true,
  instagram: '#',
  facebook: '#',
  youtube: '#',
  geminiKey: '',
  oneSignalKey: '',
  razorpayKey: '',
  // Shop Location (Google Maps distance ke liye)
  shopLat: 29.2183,
  shopLng: 79.5130,
  googleMapsKey: '',
  // Local delivery rules km-based
  localDeliveryRules: [
    { maxKm: 2,  charge: 0,  minOrder: 199, label: '0-2 km'  },
    { maxKm: 5,  charge: 30, minOrder: 199, label: '2-5 km'  },
    { maxKm: 10, charge: 60, minOrder: 299, label: '5-10 km' },
  ],
  localDeliveryMaxKm: 10,
  shiprocketEmail: '',
  shiprocketPassword: '',
  pickupPincode: '263139',

  // ─── Google AdSense Settings ──────────────────────────────────
  adsenseClient:     '',   // ca-pub-XXXXXXXXXXXXXXXX
  adsenseSlotTop:    '',   // Top ad slot ID
  adsenseSlotMid:    '',   // Mid ad slot ID
  adsenseSlotBottom: '',   // Bottom ad slot ID

  // ─── Banner Settings ─────────────────────────────────────────
  banners:      [],          // [] = use DEFAULT_BANNERS from HomePage
  bannerSpeed:  4,           // seconds per slide

  // ─── Earn / Affiliate Settings ───────────────────────────────
  earnLinks: [],             // [] = fallback links use honge (EarnPage mein defined)
  earnSection: {
    enabled:        true,
    title:          '💰 Earn Online',
    homeMaxItems:   6,
    showCommission: true,
    showDesc:       true,
  },

  // ─── Flash Deals Settings ──────────────────────────────────
  flashDeals: {
    enabled:     true,
    title:       'Flash Deals',
    autoSelect:  true,           // Auto-pick highest discount products
    maxItems:    8,              // Kitne products dikhao
    countdownEnabled: true,
    countdownEnd: '',            // ISO string — empty = auto 6hr from now
    bgGradient:  'linear-gradient(135deg,#1a1a2e 0%,#16213e 100%)',
    accentColor: '#ffc700',
  },

  // ─── Product Display — Admin controlled ────────────────
  productDisplay: {
    // Card Shape
    cardShape:       'blinkit',  // 'blinkit' | 'square' | 'tall' | 'minimal' | 'magazine'
    // Shop Page
    shopGridCols:    2,          // 2 | 3 on mobile
    showDiscBadge:   true,
    showWeight:      true,
    showMrp:         true,
    // Homepage sections
    homeElecShow:    true,
    homeElecTitle:   '💡 Electrical Products',
    homeElecCount:   8,
    homeGrocShow:    true,
    homeGrocTitle:   '🛒 Fresh Grocery',
    homeGrocCount:   8,
    homeFlashShow:   true,
    // Add button style
    addBtnShape:     'rounded',  // 'rounded' | 'circle' | 'pill'
    addBtnColor:     '#0f8a1f',
    // Card accent
    cardRadius:      12,         // px
    discBadgeColor:  '#ff6b35',
  },

  // ─── Categories — Admin controlled ──────────────────────
  homeCategories: [
    { id:'c1', emoji:'💡', name:'LED Bulbs',    sub:'50+ products', to:'/shop?cat=electrical&q=led',  color:'#fff8e0', border:'#ffc700', visible:true },
    { id:'c2', emoji:'🔌', name:'Wiring',        sub:'All types',    to:'/shop?cat=electrical&q=wire', color:'#fff0e8', border:'#f04f23', visible:true },
    { id:'c3', emoji:'🌀', name:'Fans',           sub:'All brands',   to:'/shop?cat=electrical&q=fan',  color:'#e8f4ff', border:'#1a56db', visible:true },
    { id:'c4', emoji:'🔋', name:'Inverters',      sub:'Top brands',   to:'/shop?cat=electrical',        color:'#f0fff4', border:'#0f8a1f', visible:true },
    { id:'c5', emoji:'🛒', name:'Grocery',        sub:'Fresh daily',  to:'/shop?cat=grocery',           color:'#edfaf0', border:'#0f8a1f', visible:true },
    { id:'c6', emoji:'⚡', name:'Services',       sub:'Book now',     to:'/services',                   color:'#fff8e0', border:'#ffc700', visible:true },
    { id:'c7', emoji:'🔲', name:'Switchboards',   sub:'All types',    to:'/shop?cat=electrical',        color:'#f5f0ff', border:'#7c3aed', visible:true },
    { id:'c8', emoji:'🛠️', name:'Tools',         sub:'Free online',  to:'/tools',                      color:'#fff0f5', border:'#e91e8c', visible:true },
  ],

  // ─── Services Section — Admin controlled ───────────────
  servicesSection: {
    homeEnabled:     true,
    homeTitle:       '🔧 Services Book Karo',
    homePosition:    5,               // 3=upar, 4=middle-top, 5=middle, 6=neeche
    homeBg:          'linear-gradient(135deg,#fff8f0,#fff3e8)',
    homeBorderColor: '#ffd9b8',
    homeLayout:      'scroll',        // 'scroll' | 'grid'
    homeCardStyle:   'default',       // 'default' | 'compact' | 'big'
    homeMaxItems:    6,
    homeShowCall:    true,
    homeShowWA:      true,
    homeAccentColor: '#f04f23',
    homeShowPrice:   true,
    homeShowDesc:    true,
    pageEnabled:     true,
    pageHeroTitle:   '⚡ Electrician Services',
    pageHeroSub:     'Haldwani mein same-day service — verified expert',
    pageHeroBg:      'linear-gradient(135deg,#7c2d12,#c2410c)',
    pageBadges:      ['✅ Verified','⚡ Same Day','⭐ 4.9 Rating'],
    pageBookMsg: `Namaste Almenso! 🙏

Mujhe {service} chahiye Haldwani mein.

Kab available hain?`,
    pageShowCall:    true,
    pageShowWA:      true,
  },

  // ─── Feature Flags — Admin se on/off karo ───────────────
  features: {
    // Payments
    onlinePayment:    false,   // Razorpay UPI/Card
    codPayment:       true,    // Cash on Delivery
    // Delivery
    localDelivery:    true,    // Khud ka delivery boy (km-based)
    courierDelivery:  false,   // Shiprocket / Delhivery
    googleMapsDistance: false, // Google Maps se exact distance
    // Catalog
    productSearch:    true,    // Shop page search
    productFilters:   true,    // Sort, price filter
    // Auth
    phoneLogin:       false,   // Phone OTP login
    googleLogin:      false,   // Google sign-in
    // Vendors
    vendorSystem:     false,   // Multi-vendor dashboard
    // Other
    aiChat:           false,   // Almo AI chatbot
    pushNotifications: false,  // OneSignal push
    pwaInstall:       true,    // Install app banner
    whatsappOrders:   true,    // WhatsApp order confirm
  },

  // ─── Vendor Limits — Admin sets these ───────────────────
  vendorLimits: {
    maxProducts:    50,        // Ek vendor kitne products add kar sakta hai
    maxOrders:      100,       // Monthly order limit per vendor (0 = unlimited)
    courierAccess:  false,     // Vendor courier book kar sakta hai?
    analyticsAccess: true,     // Analytics tab dikhao?
    bulkUploadLimit: 100,      // Ek baar mein CSV se max products
  },
  // ─── Blog Articles ───────────────────────────────────────
  blogArticles: [],            // Admin panel > Blog mein articles add karo
}

export const DEFAULT_GROCERY = [
  { id: 'g1', name: 'Atta', weight: '10 kg', price: 350, mrp: 400, emoji: '🌾', category: 'grocery', visible: true },
  { id: 'g2', name: 'Basmati Chawal', weight: '5 kg', price: 450, mrp: 520, emoji: '🍚', category: 'grocery', visible: true },
  { id: 'g3', name: 'Chana Dal', weight: '1 kg', price: 120, mrp: 140, emoji: '🫘', category: 'grocery', visible: true },
  { id: 'g4', name: 'Sarso Tel', weight: '1 L', price: 180, mrp: 210, emoji: '🫙', category: 'grocery', visible: true },
  { id: 'g5', name: 'Aloo', weight: '5 kg', price: 80, mrp: 100, emoji: '🥔', category: 'grocery', visible: true },
  { id: 'g6', name: 'Pyaz', weight: '2 kg', price: 60, mrp: 80, emoji: '🧅', category: 'grocery', visible: true },
  { id: 'g7', name: 'Doodh', weight: '1 L', price: 65, mrp: 72, emoji: '🥛', category: 'grocery', visible: true },
  { id: 'g8', name: 'Paneer', weight: '200 g', price: 90, mrp: 110, emoji: '🧀', category: 'grocery', visible: true },
]

export const DEFAULT_ELECTRICAL = [
  { id: 'e1', name: 'LED Bulb', weight: '9W', price: 85, mrp: 120, emoji: '💡', category: 'electrical', visible: true },
  { id: 'e2', name: 'Extension Board', weight: '4m', price: 220, mrp: 280, emoji: '🔌', category: 'electrical', visible: true },
  { id: 'e3', name: 'Ceiling Fan', weight: 'Premium', price: 1800, mrp: 2200, emoji: '🌀', category: 'electrical', visible: true },
  { id: 'e4', name: 'MCB Switch', weight: '32 Amp', price: 180, mrp: 220, emoji: '🎛️', category: 'electrical', visible: true },
  { id: 'e5', name: 'Emergency Light', weight: 'LED', price: 350, mrp: 450, emoji: '🔦', category: 'electrical', visible: true },
  { id: 'e6', name: 'Wire Roll', weight: '90m', price: 950, mrp: 1200, emoji: '🔗', category: 'electrical', visible: true },
]

export const DEFAULT_SERVICES = [
  { id: 's1', name: 'Fan Installation', price: '₹200 se shuru', availability: 'Aaj Available', emoji: '🌀', available: true },
  { id: 's2', name: 'Electrical Wiring', price: '₹500 se shuru', availability: 'Aaj Available', emoji: '⚡', available: true },
  { id: 's3', name: 'Switchboard Repair', price: '₹300 se shuru', availability: 'Aaj Available', emoji: '🔲', available: true },
  { id: 's4', name: 'Inverter Fitting', price: '₹600 se shuru', availability: 'Aaj Available', emoji: '🔋', available: true },
  { id: 's5', name: 'AC Servicing', price: '₹800 se shuru', availability: 'Aaj Available', emoji: '❄️', available: true },
  { id: 's6', name: 'Home Cleaning', price: '₹500 se shuru', availability: 'Aaj Available', emoji: '🏠', available: true },
]

export const AFFILIATE_DATA = [
  { id: 'a1', name: 'Jasper AI', emoji: '✍️', commission: '30% recurring', desc: 'AI writing tool', url: 'https://www.jasper.ai/affiliates' },
  { id: 'a2', name: 'Canva Pro', emoji: '🎨', commission: '₹2000/referral', desc: 'Design tool', url: 'https://www.canva.com/affiliates/' },
  { id: 'a3', name: 'Hostinger', emoji: '🌐', commission: '60% commission', desc: 'Web hosting', url: 'https://www.hostinger.in/affiliates' },
  { id: 'a4', name: 'Fiverr', emoji: '💼', commission: '$150 tak/sale', desc: 'Freelance platform', url: 'https://affiliates.fiverr.com/' },
  { id: 'a5', name: 'Upwork', emoji: '💻', commission: '70% first fee', desc: 'Freelance work', url: 'https://www.upwork.com/affiliates/' },
  { id: 'a6', name: 'Coursera', emoji: '📚', commission: '45% commission', desc: 'Online courses', url: 'https://about.coursera.org/affiliates' },
]

export const CATEGORIES = [
  { id: 'grocery', name: 'Atta & Dal', emoji: '🌾', section: 'grocery' },
  { id: 'sabzi', name: 'Sabzi', emoji: '🥦', section: 'grocery' },
  { id: 'dairy', name: 'Dairy', emoji: '🥛', section: 'grocery' },
  { id: 'tel', name: 'Tel & Masale', emoji: '🫙', section: 'grocery' },
  { id: 'led', name: 'LED Lights', emoji: '💡', section: 'electrical' },
  { id: 'electrical', name: 'Electrical', emoji: '🔌', section: 'electrical' },
  { id: 'services', name: 'Services', emoji: '⚡', section: 'services' },
  { id: 'tools', name: 'Free Tools', emoji: '🛠️', section: 'tools' },
  { id: 'earn', name: 'Earn Online', emoji: '💰', section: 'earn' },
]

// ─── Default Vendor ──────────────────────────────────────────
export const DEFAULT_VENDOR = {
  shopName:      '',
  ownerName:     '',
  phone:         '',
  email:         '',
  address:       '',
  city:          'Haldwani',
  pincode:       '263139',
  category:      'grocery',
  timing:        '9AM – 9PM',
  description:   '',
  photoURL:      '',
  coverURL:      '',
  isOpen:        true,
  approved:      false,
  createdAt:     null,
  // Local delivery
  deliveryRules: [
    { maxKm: 1, minOrder: 0,   charge: 20  },
    { maxKm: 2, minOrder: 0,   charge: 35  },
    { maxKm: 3, minOrder: 0,   charge: 50  },
  ],
  freeDeliveryRules: [
    { minOrder: 500, freeUptoKm: 3 },
  ],
  // Courier settings (outside local area)
  courierSettings: {
    preferredCourier: 'shiprocket',   // shiprocket | delhivery | none
    shiprocket: {
      email:          '',
      password:       '',
      pickupLocation: 'Primary',
      length: 15, breadth: 15, height: 10, weight: 0.5,
    },
    delhivery: {
      apiKey:         '',
      sellerName:     '',
      sellerAddress:  '',
      pincode:        '263139',
      phone:          '',
      weight:         500,
      width: 15, height: 10,
    },
  },
}

// ═══════════════════════════════════════════════════════
// LOCAL SHOPS — Max 10 shops allowed
// ═══════════════════════════════════════════════════════

export const MAX_LOCAL_SHOPS = 10

export const LOCAL_SHOPS = [
  // ── Shop 1: Anil Enterprises ──────────────────────────
  {
    id:          'anil-enterprises',
    slug:        'anil-enterprises',
    shopName:    'Anil Enterprises',
    ownerName:   'Anil Arya',
    phone:       '+919258133689',
    whatsapp:    '919258133689',
    email:       'anil@almenso.com',
    address:     'Haldwani, Uttarakhand — 263139',
    city:        'Haldwani',
    pincode:     '263139',
    serviceArea: 'Haldwani',
    emoji:       '⚡',
    coverColor:  'linear-gradient(135deg, #0a2342 0%, #1565c0 100%)',
    category:    'electrical',
    categoryLabel: 'Electrical Shop + Electrician Services',
    type:        'service_and_product', // 'product' | 'service' | 'service_and_product'
    isOpen:      true,
    approved:    true,
    featured:    true,
    rating:      4.8,
    reviewCount: 124,
    timing:      '9AM – 8PM · Mon–Sat',
    description: 'Haldwani ka sabse trusted electrical shop. Quality products aur expert electrician service — ek hi jagah!',
    tags:        ['LED Bulbs', 'Wiring', 'Inverter', 'Battery', 'Repair', 'Electrician'],

    // Product categories this shop sells
    productCategories: [
      { id: 'bulbs',    name: 'LED Bulbs & Lights', emoji: '💡' },
      { id: 'wiring',   name: 'Wiring & Cables',    emoji: '🔌' },
      { id: 'inverter', name: 'Inverter & Battery',  emoji: '🔋' },
      { id: 'switches', name: 'Switches & Boards',   emoji: '🔲' },
      { id: 'fans',     name: 'Fans & Exhaust',      emoji: '🌀' },
    ],

    // Services this shop provides
    services: [
      { id: 's1', name: 'Home Wiring',        emoji: '🔌', price: '₹500 onwards',  time: '2-4 hrs'  },
      { id: 's2', name: 'Inverter Install',   emoji: '🔋', price: '₹300 onwards',  time: '1-2 hrs'  },
      { id: 's3', name: 'Electrical Repair',  emoji: '🔧', price: '₹200 onwards',  time: '1-3 hrs'  },
      { id: 's4', name: 'Fan Installation',   emoji: '🌀', price: '₹150 onwards',  time: '30-60 min'},
      { id: 's5', name: 'AC Service',         emoji: '❄️', price: '₹400 onwards',  time: '1-2 hrs'  },
      { id: 's6', name: 'MCB/DB Work',        emoji: '⚡', price: '₹800 onwards',  time: '2-4 hrs'  },
    ],

    // Lead form fields for service booking
    leadForm: {
      title: 'Service Book Karo',
      fields: [
        { name: 'name',     label: 'Aapka Naam',      type: 'text',     required: true,  placeholder: 'Full name' },
        { name: 'phone',    label: 'Mobile Number',   type: 'tel',      required: true,  placeholder: '+91 XXXXX XXXXX' },
        { name: 'address',  label: 'Address',         type: 'textarea', required: true,  placeholder: 'Ghar ka address' },
        { name: 'work',     label: 'Kaam Kya Chahiye', type: 'select',  required: true,
          options: ['Home Wiring', 'Inverter Install', 'Electrical Repair', 'Fan Installation', 'AC Service', 'MCB/DB Work', 'Other']
        },
        { name: 'datetime', label: 'Preferred Time',  type: 'datetime-local', required: false },
      ],
      whatsappMsg: 'Namaste Anil Enterprises! 🙏\n\nService Book:\n👤 Name: {name}\n📞 Phone: {phone}\n📍 Address: {address}\n🔧 Work: {work}',
    },
  },

  // ── Shop 2: Jai Goljyu Mart ─────────────────────────
  {
    id:          'jai-goljyu-mart',
    slug:        'jai-goljyu-mart',
    shopName:    'Jai Goljyu Mart',
    ownerName:   'Vendor',
    phone:       '+919258133689',
    whatsapp:    '919258133689',
    email:       'goljyu@almenso.com',
    address:     'Haldwani, Uttarakhand — 263139',
    city:        'Haldwani',
    pincode:     '263139',
    serviceArea: 'Haldwani only',
    emoji:       '🛒',
    coverColor:  'linear-gradient(135deg, #064e3b 0%, #059669 100%)',
    category:    'grocery',
    categoryLabel: 'Grocery Store',
    type:        'product',
    isOpen:      true,
    approved:    true,
    featured:    true,
    rating:      4.6,
    reviewCount: 89,
    timing:      '7AM – 10PM · Daily',
    description: 'Haldwani mein fresh grocery, daily essentials, cleaning items aur kitchen ka saman — same day delivery!',
    tags:        ['Grocery', 'Daily Use', 'Cleaning', 'Kitchen', 'Personal Care', 'Fresh'],
    deliveryCharge: 0,
    minOrder: 199,
    freeDeliveryAbove: 499,

    // Product categories this shop sells
    productCategories: [
      { id: 'daily',    name: 'Daily Grocery',   emoji: '🌾' },
      { id: 'cleaning', name: 'Cleaning Items',  emoji: '🧹' },
      { id: 'personal', name: 'Personal Care',   emoji: '🧴' },
      { id: 'kitchen',  name: 'Kitchen Items',   emoji: '🍳' },
      { id: 'snacks',   name: 'Snacks & Drinks', emoji: '🍿' },
    ],

    services: [],

    // Lead form for delivery orders
    leadForm: {
      title: 'Order Karo',
      fields: [
        { name: 'name',    label: 'Aapka Naam',    type: 'text',     required: true,  placeholder: 'Full name' },
        { name: 'phone',   label: 'Mobile Number', type: 'tel',      required: true,  placeholder: '+91 XXXXX XXXXX' },
        { name: 'address', label: 'Delivery Address', type: 'textarea', required: true, placeholder: 'Complete address with landmark' },
        { name: 'items',   label: 'Kya Chahiye?',  type: 'textarea', required: true,  placeholder: 'Items ki list likhein...' },
      ],
      whatsappMsg: 'Namaste Jai Goljyu Mart! 🙏\n\nOrder:\n👤 Name: {name}\n📞 Phone: {phone}\n📍 Address: {address}\n🛒 Items: {items}',
    },
  },

  // ── Shop 3: Viraj Interior Design ───────────────────
  {
    id:          'viraj-interior',
    slug:        'viraj-interior',
    shopName:    'Viraj Interior Design',
    ownerName:   'Viraj',
    phone:       '+919258133689',
    whatsapp:    '919258133689',
    email:       'viraj@almenso.com',
    address:     'Haldwani, Uttarakhand — 263139',
    city:        'Haldwani',
    pincode:     '263139',
    serviceArea: 'Haldwani',
    emoji:       '🏠',
    coverColor:  'linear-gradient(135deg, #1a1a2e 0%, #7c3aed 100%)',
    category:    'interior',
    categoryLabel: 'Interior Design Services',
    type:        'service',
    isOpen:      true,
    approved:    true,
    featured:    true,
    rating:      4.9,
    reviewCount: 56,
    timing:      '10AM – 7PM · Mon–Sat',
    description: 'Professional interior design services — PVC wall panels, modular kitchen, wardrobe, aur complete home transformation!',
    tags:        ['PVC Panels', 'Modular Kitchen', 'Wardrobe', 'Interior', 'Home Decor'],

    productCategories: [],

    services: [
      { id: 's1', name: 'PVC Wall Panels',    emoji: '🔲', price: '₹150/sqft',     time: '1-3 days'   },
      { id: 's2', name: 'Modular Kitchen',    emoji: '🍳', price: '₹80,000 onwards', time: '7-15 days' },
      { id: 's3', name: 'Wardrobe Design',    emoji: '🚪', price: '₹25,000 onwards', time: '5-10 days' },
      { id: 's4', name: 'False Ceiling',      emoji: '✨', price: '₹120/sqft',     time: '2-5 days'   },
      { id: 's5', name: 'Complete Interior',  emoji: '🏠', price: 'Quote pe',       time: 'Custom'     },
      { id: 's6', name: 'TV Unit Design',     emoji: '📺', price: '₹15,000 onwards', time: '3-7 days'  },
    ],

    // Lead form for interior consultation
    leadForm: {
      title: 'Free Consultation Book Karo',
      fields: [
        { name: 'name',     label: 'Aapka Naam',      type: 'text',     required: true, placeholder: 'Full name' },
        { name: 'phone',    label: 'Mobile Number',   type: 'tel',      required: true, placeholder: '+91 XXXXX XXXXX' },
        { name: 'location', label: 'Location/Area',   type: 'text',     required: true, placeholder: 'Haldwani area/locality' },
        { name: 'workType', label: 'Kya Kaam Chahiye', type: 'select',  required: true,
          options: ['PVC Wall Panels', 'Modular Kitchen', 'Wardrobe', 'False Ceiling', 'Complete Interior', 'TV Unit', 'Other']
        },
        { name: 'budget',   label: 'Approximate Budget', type: 'select', required: false,
          options: ['Under ₹20,000', '₹20,000–₹50,000', '₹50,000–₹1,00,000', '₹1,00,000–₹3,00,000', 'Above ₹3,00,000']
        },
        { name: 'message',  label: 'Kuch aur batana hai?', type: 'textarea', required: false, placeholder: 'Additional details...' },
      ],
      whatsappMsg: 'Namaste Viraj Interior Design! 🙏\n\nConsultation Request:\n👤 Name: {name}\n📞 Phone: {phone}\n📍 Location: {location}\n🏠 Work: {workType}\n💰 Budget: {budget}\n💬 Message: {message}',
    },
  },
]
