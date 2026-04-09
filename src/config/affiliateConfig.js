/**
 * ALMENSO — Affiliate Program Configuration
 * Master list of all affiliate programs and tracking IDs
 * Update this as you get approvals and tracking IDs
 */

export const AFFILIATE_PROGRAMS = {
  // ═══════════════════════════════════════════════════════════════
  // 🔴 AMAZON ASSOCIATES (HIGH PRIORITY)
  // ═══════════════════════════════════════════════════════════════
  amazon: {
    name: 'Amazon Associates',
    status: 'pending', // pending | active | paused
    trackingId: 'almenso-21', // UPDATE AFTER APPROVAL
    baseUrl: 'https://www.amazon.in/s?k=',
    commission: '3-8%',
    categories: {
      inverter: {
        keyword: 'inverter+battery',
        products: [
          { name: 'Luminous Inverter', avgPrice: '₹12000', commission: '₹400-800' },
          { name: 'UTL Battery', avgPrice: '₹7000', commission: '₹200-600' },
          { name: 'Okaya Inverter', avgPrice: '₹8000', commission: '₹250-700' }
        ]
      },
      solar: {
        keyword: 'solar+panel+kit',
        products: [
          { name: 'Luminous Solar Panel', avgPrice: '₹60000', commission: '₹2000-4800' },
          { name: 'Sukam Solar', avgPrice: '₹50000', commission: '₹1500-4000' }
        ]
      },
      smartphone: {
        keyword: 'budget+smartphone',
        products: [
          { name: 'Redmi Note', avgPrice: '₹12000', commission: '₹300-800' },
          { name: 'Realme', avgPrice: '₹10000', commission: '₹250-700' }
        ]
      },
      tools: {
        keyword: 'electrical+tools',
        products: [
          { name: 'Havells Copper Wire', avgPrice: '₹500', commission: '₹15-50' },
          { name: 'Syska LED Lights', avgPrice: '₹300', commission: '₹10-40' }
        ]
      }
    }
  },

  // ═══════════════════════════════════════════════════════════════
  // 💚 ZERODHA (Finance Affiliate - HIGH VALUE)
  // ═══════════════════════════════════════════════════════════════
  zerodha: {
    name: 'Zerodha Referral',
    status: 'active',
    referralCode: 'almenso', // UPDATE WITH YOUR CODE
    baseUrl: 'https://zerodha.com/open-account/?c=',
    commission: '₹300-500 per signup',
    notes: 'Best for SIP & mutual fund content',
    expectedMonthly: '₹1500-10000'
  },

  // ═══════════════════════════════════════════════════════════════
  // 💛 GROWW (Finance Affiliate)
  // ═══════════════════════════════════════════════════════════════
  groww: {
    name: 'Groww Affiliate',
    status: 'active',
    referralCode: 'almenso', // UPDATE
    baseUrl: 'https://groww.in/invite/',
    commission: '₹200-300 per signup',
    notes: 'Mutual funds & stocks app'
  },

  // ═══════════════════════════════════════════════════════════════
  // 🟠 FLIPKART (Alternative to Amazon)
  // ═══════════════════════════════════════════════════════════════
  flipkart: {
    name: 'Flipkart Affiliate',
    status: 'pending',
    trackingId: '', // UPDATE AFTER APPROVAL
    baseUrl: 'https://flipkart.com/search?q=',
    commission: '3-10%',
    notes: 'Apply at affiliate.flipkart.com'
  },

  // ═══════════════════════════════════════════════════════════════
  // 🏥 INSURANCE AGGREGATORS
  // ═══════════════════════════════════════════════════════════════
  insurance: {
    name: 'Insurance Aggregators',
    status: 'pending',
    programs: [
      { name: 'Policybazaar', commission: '₹200-500 per lead' },
      { name: 'Digit Insurance', commission: '₹300-800 per policy' }
    ],
    notes: 'For health insurance content'
  }
}

export function getAffiliateLink(program, keyword) {
  const config = AFFILIATE_PROGRAMS[program]
  
  if (!config) {
    console.error(`Affiliate program "${program}" not found`)
    return null
  }

  if (config.status !== 'active' && config.status !== 'approved') {
    console.warn(`Program ${program} is not active yet`)
    return null
  }

  switch (program) {
    case 'amazon':
      return `${config.baseUrl}${keyword}&tag=${config.trackingId}`
    
    case 'zerodha':
      return `${config.baseUrl}${config.referralCode}`
    
    case 'groww':
      return `${config.baseUrl}${config.referralCode}`
    
    case 'flipkart':
      return `${config.baseUrl}${keyword}&affid=${config.trackingId}`
    
    default:
      return null
  }
}

export const BLOG_AFFILIATE_KEYWORDS = {
  'inverter-buying-guide': {
    program: 'amazon',
    keyword: 'inverter+battery',
    placement: ['mid-content', 'conclusion'],
    cta: 'Check Price on Amazon'
  },
  
  'sip-calculator-guide': {
    program: 'zerodha',
    cta: 'Open Zerodha Account',
    bonus: '₹300-500 signup bonus'
  },

  'solar-subsidy-guide': {
    program: 'amazon',
    keyword: 'solar+panel+kit',
    cta: 'Shop Solar Panels on Amazon'
  },

  'phone-under-20k': {
    program: 'amazon',
    keyword: 'smartphone+under+20000',
    cta: 'Check Phones on Amazon'
  }
}

export default AFFILIATE_PROGRAMS
