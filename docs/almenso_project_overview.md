# Almenso React - Project Overview

## 📋 Project Information

**Name**: Almenso  
**Version**: 1.0.0 (v29 in development)  
**Domain**: almenso.com  
**Framework**: React 18.2 + Vite 5.1  
**Routing**: React Router DOM v6.22

---

## 🏗️ Architecture Overview

### Tech Stack
- **Frontend**: React 18.2.0
- **Build Tool**: Vite 5.1.0
- **Routing**: React Router DOM 6.22.0
- **Deployment**: Vercel (configured with vercel.json)
- **PWA**: Custom service worker implementation
- **Push Notifications**: OneSignal integration
- **Image Hosting**: Cloudinary (based on setup docs)
- **Backend**: Firebase (authentication, database, storage)

### Key Features
1. **Multi-tenant Architecture**
   - Admin subdomain (admin.almenso.com)
   - Vendor subdomains (vendor-name.almenso.com)
   - Main customer-facing site

2. **Progressive Web App (PWA)**
   - Service worker registration
   - Install prompt component
   - Offline capability
   - Push notifications via OneSignal

3. **E-commerce Functionality**
   - Product catalog
   - Shopping cart
   - Checkout system
   - Vendor management
   - GST calculation (v29 feature)

4. **Affiliate/Earn System** (v29 feature)
   - Admin-controlled affiliate links
   - Category-based organization
   - Commission tracking
   - Featured products

---

## 📁 Project Structure

```
almenso-react/
├── public/                    # Static assets
│   ├── manifest.json         # PWA manifest
│   ├── sw.js                 # Service worker
│   ├── OneSignalSDKWorker.js # Push notifications
│   ├── sitemap.xml           # SEO sitemap
│   ├── robots.txt            # Crawler directives
│   └── icons/                # PWA icons (multiple sizes)
│
├── src/
│   ├── App.jsx               # Main app component with routing
│   ├── main.jsx              # App entry point
│   │
│   ├── components/           # Reusable UI components
│   │   ├── Header.jsx        # Top navigation header
│   │   ├── BottomNav.jsx     # Mobile bottom navigation
│   │   ├── DesktopNav.jsx    # Desktop sidebar navigation
│   │   ├── Cart.jsx          # Shopping cart sidebar
│   │   ├── AlmoChat.jsx      # AI chat assistant
│   │   ├── ProductCard.jsx   # Product display card
│   │   ├── ImageUploader.jsx # Cloudinary image upload
│   │   ├── NotificationPrompt.jsx  # Push permission prompt
│   │   ├── InstallPrompt.jsx       # PWA install prompt
│   │   ├── SEOHead.jsx       # Meta tags component
│   │   ├── ToolWrapper.jsx   # Wrapper for tool pages
│   │   └── AdSlot.jsx        # Google AdSense integration
│   │
│   ├── pages/                # Page components
│   │   ├── HomePage.jsx      # Landing page
│   │   ├── ShopPage.jsx      # Product listing
│   │   ├── ProductPage.jsx   # Individual product details
│   │   ├── CheckoutPage.jsx  # Checkout flow
│   │   ├── AdminPage.jsx     # Admin dashboard (206KB!)
│   │   ├── VendorPage.jsx    # Vendor management
│   │   ├── VendorShopPage.jsx # Vendor storefront
│   │   ├── ProfilePage.jsx   # User profile
│   │   ├── LoginPage.jsx     # Authentication
│   │   ├── EarnPage.jsx      # Affiliate program (v29)
│   │   ├── ServicesPage.jsx  # Services offered
│   │   ├── ToolsPage.jsx     # Tools directory
│   │   ├── BlogPage.jsx      # Blog/content (107KB)
│   │   ├── ContactPage.jsx   # Contact form
│   │   ├── AboutPage.jsx     # About us
│   │   ├── PrivacyPage.jsx   # Privacy policy
│   │   ├── TermsPage.jsx     # Terms of service
│   │   ├── DisclaimerPage.jsx # Legal disclaimer
│   │   │
│   │   └── tools/            # Calculator/utility tools (28 tools!)
│   │       ├── BijliPage.jsx          # Electricity manager
│   │       ├── InvoicePage.jsx        # Invoice generator
│   │       ├── BudgetPage.jsx         # Budget planner
│   │       ├── ProfitPage.jsx         # Profit calculator
│   │       ├── AgeCalculator.jsx
│   │       ├── GSTCalculator.jsx
│   │       ├── EMICalculator.jsx
│   │       ├── ElectricityBillAnalyzer.jsx
│   │       ├── PowerConsumptionPlanner.jsx
│   │       ├── ElectricityCostCalculator.jsx
│   │       ├── SolarROICalculator.jsx
│   │       ├── InverterLoadPlanner.jsx
│   │       ├── WireSizeCalculator.jsx
│   │       ├── WebsitePerformanceAnalyzer.jsx
│   │       ├── YouTubeThumbnailExtractor.jsx
│   │       ├── YouTubeTitleGenerator.jsx
│   │       ├── InstagramCaptionGenerator.jsx
│   │       ├── HashtagGenerator.jsx
│   │       ├── ImageResizer.jsx
│   │       ├── ImageFormatConverter.jsx
│   │       ├── ImageCompressor.jsx
│   │       ├── RemoveDuplicateLines.jsx
│   │       ├── UnitConverter.jsx
│   │       ├── PasswordGenerator.jsx
│   │       ├── AppliancePowerConsumptionCalculator.jsx
│   │       ├── AIPromptGenerator.jsx
│   │       ├── ContentIdeaGenerator.jsx
│   │       ├── TextCaseConverter.jsx
│   │       └── OtherTools.jsx (79KB - multiple calculators)
│   │
│   ├── context/              # React Context providers
│   │   ├── StoreContext.jsx  # Global store state
│   │   └── AuthContext.jsx   # Authentication state
│   │
│   ├── utils/                # Utility functions
│   │   ├── oneSignal.js      # Push notification setup
│   │   ├── pwa.js            # PWA registration
│   │   └── (other utilities)
│   │
│   ├── api/                  # API integration
│   ├── data/                 # Static data/constants
│   ├── styles/               # Global CSS
│   └── assets/               # Images, icons
│
├── dist/                     # Production build output
├── node_modules/             # Dependencies
│
└── Configuration Files
    ├── package.json          # Dependencies & scripts
    ├── vite.config.js        # Vite configuration
    ├── vercel.json           # Deployment config
    ├── generate-sitemap.js   # SEO sitemap generator
    ├── FIREBASE_SETUP.md     # Firebase guide
    ├── CLOUDINARY_SETUP.md   # Image hosting guide
    ├── ONESIGNAL_SETUP.md    # Push notifications guide
    └── ADMIN_SUBDOMAIN_SETUP.md # Admin setup guide
```

---

## 🚀 Key Features by Module

### 1. **Admin Panel** (AdminPage.jsx - 206KB)
The largest component in the project, containing:
- Product management
- Order management
- Vendor management
- Settings configuration
- GST configuration (v29)
- Earn/Affiliate section management (v29)
- User management
- Analytics dashboard

### 2. **Vendor System**
- Vendor registration and profiles
- Individual vendor storefronts
- Subdomain routing (vendor-name.almenso.com)
- Product catalog per vendor
- Commission tracking

### 3. **E-commerce Core**
- Product catalog with categories
- Shopping cart with localStorage persistence
- Checkout flow with WhatsApp integration
- GST calculation (inclusive/exclusive modes)
- Order confirmation via WhatsApp
- Product search and filtering

### 4. **Tools Suite** (28+ calculators/utilities)
Categories:
- **Financial**: GST, EMI, Profit Margin, Loan Interest, Percentage
- **Electricity**: Bill Analyzer, Cost Calculator, Solar ROI, Inverter Planning, Wire Size
- **Content Creation**: YouTube tools, Instagram captions, Hashtags, AI prompts
- **Image Processing**: Resizer, Compressor, Format Converter
- **General Utilities**: Age Calculator, Unit Converter, Password Generator, QR Code, Word Counter

### 5. **Affiliate/Earn Program** (v29)
- Admin-managed affiliate links
- Category-based organization
- Commission rates display
- Featured products
- Search and filtering
- Direct link tracking

### 6. **SEO & Marketing**
- Google AdSense integration (3 ad slots)
- Dynamic sitemap generation
- robots.txt configuration
- Meta tags via SEOHead component
- Blog content system (BlogPage.jsx - 107KB)

### 7. **PWA Features**
- Installable as mobile/desktop app
- Offline capability
- Push notifications
- Custom install prompt
- Service worker caching

---

## 🔐 Authentication & Security

### Authentication
- Firebase Authentication
- Login/Register flow
- Profile management
- Role-based access (admin, vendor, customer)

### Admin Access
- Secret path: `/ab43d21a8` (configurable via localStorage)
- Admin subdomain: admin.almenso.com
- Protected routes

---

## 🎨 UI/UX Features

### Navigation
- **Desktop**: Sidebar navigation (DesktopNav)
- **Mobile**: Bottom navigation bar (BottomNav)
- **Header**: Search, cart, user menu
- **Responsive**: Mobile-first design

### Interactive Elements
- Floating WhatsApp button (💬)
- Floating AI Chat button (🤖)
- Toast notifications
- Cart sidebar
- Chat sidebar (AlmoChat)

---

## 📊 Recent Development (v29)

### GST System Implementation
- Master toggle for GST enable/disable
- GSTIN and legal name fields
- Tax rate selection (0%, 5%, 12%, 18%, 28%)
- Inclusive vs Exclusive tax modes
- CGST+SGST vs IGST toggle
- Per-product GST rate configuration
- Live preview calculator
- GST breakup in checkout
- GST data in orders and WhatsApp confirmations

### Earn/Affiliate Section
- EarnManager component in admin panel
- Add/Edit/Delete affiliate links
- Fields: emoji, name, category, commission, URL, featured status
- Redesigned EarnPage (/earn) with:
  - Hero banner
  - Search functionality
  - Category filters
  - Card grid layout
- Homepage integration showing affiliate products

---

## 🔄 Routing Structure

### Public Routes
- `/` - HomePage
- `/shop` - ShopPage
- `/shop/:slug` - VendorShopPage
- `/product/:id` - ProductPage
- `/services` - ServicesPage
- `/earn` - EarnPage
- `/tools` - ToolsPage (+ 28 tool routes)
- `/blog` - BlogPage
- `/contact` - ContactPage
- `/about` - AboutPage
- `/privacy-policy` - PrivacyPage
- `/terms` - TermsPage
- `/disclaimer` - DisclaimerPage

### Protected Routes
- `/checkout` - CheckoutPage
- `/profile` - ProfilePage
- `/vendor` - VendorPage (vendor dashboard)

### Admin Routes
- `/ab43d21a8` - AdminPage (secret path)
- `/admin-panel` - AdminPage (fallback)
- `admin.almenso.com` - Admin subdomain

### Subdomain Routes
- `vendor-name.almenso.com` - Vendor-specific storefront

---

## 🛠️ Development Scripts

```json
{
  "dev": "vite",              // Development server
  "build": "vite build",      // Production build
  "preview": "vite preview"   // Preview production build
}
```

---

## 📦 Dependencies

### Core
- react: ^18.2.0
- react-dom: ^18.2.0
- react-router-dom: ^6.22.0

### Dev Dependencies
- @vitejs/plugin-react: ^4.2.1
- vite: ^5.1.0

### External Services
- Firebase (Auth, Database, Storage)
- Cloudinary (Image hosting)
- OneSignal (Push notifications)
- Google AdSense (Advertising)

---

## 🎯 Outstanding Items

Based on your recent work, there's an **open thread** regarding purchase and sales recording with GST:

### To Decide:
1. **What to build**: Purchase ledger? Sales ledger? Both? GST report summary?
2. **Where to place it**: Which section of the admin panel?

### Considerations:
- GST data is already captured in orders
- WhatsApp confirmations include GST breakup
- Need to determine reporting requirements
- Integration with existing admin dashboard

---

## 💡 Notable Implementation Patterns

### 1. **Context-Based State Management**
- StoreContext for global store state
- AuthContext for authentication
- No external state management library (Redux, etc.)

### 2. **Subdomain Detection**
```javascript
const isAdminSubdomain = hostname.startsWith('admin.')
const isVendorSubdomain = hostname.endsWith('.' + mainDomain)
```

### 3. **Dynamic Admin Path**
```javascript
function getAdminPath() {
  const saved = localStorage.getItem('almenso_admin_path')
  return saved || 'ab43d21a8'
}
```

### 4. **WhatsApp Integration**
Direct checkout → WhatsApp order confirmation flow

### 5. **Progressive Enhancement**
- PWA install prompt with delay
- Notification permission with 4s delay
- Service worker for offline support

---

## 📈 Scale & Size

### Component Sizes (largest)
- AdminPage.jsx: **206KB** (comprehensive admin dashboard)
- BlogPage.jsx: **107KB** (content management)
- VendorPage.jsx: **102KB** (vendor management)
- OtherTools.jsx: **79KB** (multiple calculators)
- AdminPage.css: **75KB** (admin styling)

### Tools Count
**28 specialized calculators/utilities** covering:
- Finance & GST
- Electricity & Solar
- Content Creation
- Image Processing
- General Utilities

---

## 🔍 Code Quality Notes

### Strengths
- Well-organized component structure
- Comprehensive feature set
- Mobile-first responsive design
- PWA-ready implementation
- Multi-tenant architecture

### Areas to Monitor
- Large component files (AdminPage.jsx at 206KB)
- Multiple CSS approaches (CSS modules + regular CSS)
- localStorage for critical state (admin path)
- Direct WhatsApp integration (no backend order storage visible)

---

## 🚀 Deployment

### Platform
- **Vercel** (vercel.json configured)
- Custom domain: almenso.com
- Subdomain support for admin and vendors

### Build Process
```bash
npm run build  # Creates dist/ folder
```

### Environment Variables Needed
- Firebase credentials
- Cloudinary credentials
- OneSignal app ID
- Google AdSense client ID
- WhatsApp business number

---

## 📝 Next Steps Considerations

Based on the v29 development:

1. **Complete GST Ledger Decision**
   - Define requirements for purchase/sales recording
   - Design admin UI for ledger management
   - Implement reporting views

2. **Performance Optimization**
   - Consider code-splitting for AdminPage.jsx
   - Lazy load tool pages
   - Optimize large CSS files

3. **Testing**
   - User acceptance testing for GST features
   - Cross-browser PWA testing
   - Subdomain routing validation

4. **Documentation**
   - User guide for GST configuration
   - Vendor onboarding documentation
   - Admin panel user manual

---

## 🎉 Summary

Almenso is a feature-rich, production-ready React ecommerce platform with:
- **Multi-tenant architecture** (main site + vendor subdomains + admin)
- **28+ utility tools** for various business needs
- **Full ecommerce functionality** including cart, checkout, GST
- **Vendor marketplace** with individual storefronts
- **PWA capabilities** with offline support and push notifications
- **SEO optimization** with sitemap, meta tags, and AdSense
- **Recent v29 features**: GST system and Affiliate/Earn section

The codebase is well-structured with clear separation of concerns, though some components (particularly AdminPage) could benefit from further modularization as the project scales.
