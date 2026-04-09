import React, { useState, useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSettings } from '../context/SettingsContext'
import AdSlot from '../components/AdSlot'
import SEOHead from '../components/SEOHead'
import { RelatedProducts } from './ProductsPage'
import { ToolCTACard, RelatedToolsGrid, RelatedArticlesCard, ARTICLE_TOOL_MAP } from '../components/InterlinkedWidget'
import './BlogPage.css'

// ── Default seed articles (Admin se aur add/edit ho sakte hain) ──
export const DEFAULT_ARTICLES = [
  {
    id: 'bijli-bill-kaise-kam-kare',
    title: 'Bijli Bill Kaise Kam Kare? 10 Proven Tips jo Haldwani Mein Kaam Karti Hain',
    slug: 'bijli-bill-kaise-kam-kare',
    category: 'bijli',
    emoji: '⚡',
    coverColor: '#fff3e0',
    accentColor: '#e65100',
    readMin: 5,
    date: '2025-01-15',
    tags: ['bijli', 'bachat', 'tips', 'uttarakhand'],
    summary: 'Uttarakhand mein bijli ke rates badh rahe hain. Yahan 10 asaan tarike hain jinse aap har mahine ₹200–500 tak bachaa sakte hain.',
    toolLink: { path: '/tools/bijli', label: '⚡ Bijli Bill Calculator', desc: 'Apna exact bill calculate karo' },
    content: [
      { type: 'intro', text: 'Haldwani aur poore Uttarakhand mein UPCL ke rates 2025 mein phir badhein hain. Agar aapka mahine ka bill ₹800 se zyada aa raha hai, toh yeh article aapke liye hi hai. In 10 tips ko follow karke aap asaani se ₹200–500 tak bacha sakte hain — bilkul koi investment nahi, sirf thodi si samajhdari!' },
      { type: 'heading', text: '1. LED Bulb Lagao — Sabse Bada Farak' },
      { type: 'text', text: 'Agar aapke ghar mein abhi bhi purane CFL ya incandescent bulbs hain, toh aaj hi LED mein badlo. Ek 9W LED bulb utni hi roshni deta hai jitna 60W ka purana bulb — matlab 85% bijli ki bachat! 5 bulbs badle toh mahine mein ₹150–200 tak bachenge.' },
      { type: 'tip', text: '💡 Pro Tip: BEE 5-star rated LED bulbs lo — thode mehnge hote hain lekin 3–4 mahine mein paise vasool ho jaate hain.' },
      { type: 'heading', text: '2. AC Ko 24°C Pe Rakho' },
      { type: 'text', text: 'Yeh ek simple rule hai jo bahut log nahi jaante — AC ka temperature har 1°C badhane se lagbhag 6% bijli bachti hai. Agar aap 18°C ki jagah 24°C pe rakho, toh 36% tak bachat ho sakti hai! Plus, 24°C health ke liye bhi better hai.' },
      { type: 'heading', text: '3. Geyser Ko Timer Pe Chalao' },
      { type: 'text', text: 'Geyser ghar ke sabse bade bijli khaane wale appliances mein se ek hai. Isko sirf 15–20 minute pehle on karo, use karo, aur turant band kar do. "Hamesha on rehna" wali aadat chhodo — isse mahine mein ₹100–150 bachenge.' },
      { type: 'heading', text: '4. Fridge Ki Back Coil Clean Karo' },
      { type: 'text', text: 'Fridge ke peeche ki coil pe dhool jam jaati hai jisse compressor zyada mehnat karta hai. Har 3 mahine mein ek baar brush se saaf karo — 10–15% bijli bachegi aur fridge ki life bhi badhegi.' },
      { type: 'heading', text: '5. Washing Machine Full Load Mein Hi Chalao' },
      { type: 'text', text: 'Half load mein washing machine chalana double bijli barbaadi hai. Kapde ek baar mein jama karke full load mein dho. Top-load ki jagah front-load machine use karo — 40% zyada efficient hoti hai.' },
      { type: 'tip', text: '⚡ Meter Reading Tip: Mahine mein ek baar reading khud lena — bill aane se pehle pata chalega aur planning kar sakte hain.' },
      { type: 'heading', text: '6. Phantom Load Se Bachao' },
      { type: 'text', text: 'TV, charger, microwave — yeh sab standby mein bhi bijli khaate hain. Isko "phantom load" kehte hain. Raat ko sone se pehle sab ka switch off karo — mahine mein ₹50–80 bachenge.' },
      { type: 'heading', text: '7. Inverter AC Ya BEE 5-Star Appliances Kharido' },
      { type: 'text', text: 'Naya AC ya fridge khareedne ka plan hai? Hamesha BEE 5-star rating wala lo. Inverter AC normal se 30–50% kam bijli khaata hai. Pehle thoda zyada lagta hai lekin 2–3 saal mein bijli bachat mein pura vasool ho jaata hai.' },
      { type: 'heading', text: '8. Natural Roshni Ka Use Karo' },
      { type: 'text', text: 'Din mein curtain hatao, khidkiyan kholo — natural light mein bulb band rakho. Ghar mein light-colored walls aur ceilings roshni reflect karte hain jisse kam bulbs chahiye hote hain.' },
      { type: 'heading', text: '9. UPCL Ka Time-of-Use Advantage Lo' },
      { type: 'text', text: 'Raat 11 baje ke baad aur subah 6 baje se pehle bijli ka load kam hota hai. Washing machine, geyser aisa sab raat ko chalao — UPCL ke off-peak hours mein rates thode better hote hain.' },
      { type: 'heading', text: '10. Monthly Meter Reading Track Karo' },
      { type: 'text', text: 'Ek simple notebook mein har mahine ki reading likhte jao. Isse pata chalega kaunse mahine zyada use hua aur kyun. Pattern samjho toh control karna aasaan ho jaata hai.' },
      { type: 'summary', text: 'In 10 tareekon ko apnao aur har mahine ₹200–500 bacha ke apne family ke liye kuch achha karo! Neeche calculator se apna exact bill check karo.' },
    ]
  },
  {
    id: 'gst-kya-hoti-hai-chote-business-ke-liye',
    title: 'GST Kya Hoti Hai? Chote Dukandaaron Ke Liye Complete Guide 2025',
    slug: 'gst-kya-hoti-hai-chote-business-ke-liye',
    category: 'business',
    emoji: '🧾',
    coverColor: '#e8f5e9',
    accentColor: '#1565c0',
    readMin: 7,
    date: '2025-01-20',
    tags: ['gst', 'business', 'tax', 'invoice', 'dukaan'],
    summary: 'GST registration kab zaruri hai, kaise karte hain, aur invoice mein kaise lagaate hain — yeh sab asaan bhasha mein samjhein.',
    toolLink: { path: '/tools/gst-calculator', label: '🧾 GST Calculator', desc: 'Instantly GST calculate karo' },
    content: [
      { type: 'intro', text: 'Bahut se chote dukandaar GST se confuse rehte hain — "Kya mujhe bhi register karna padega?", "Invoice mein kaise likhein?", "Return file karna mushkil hai kya?" Yeh article aapke saare sawaalon ka jawab dega — bilkul asaan bhasha mein!' },
      { type: 'heading', text: 'GST Kya Hai?' },
      { type: 'text', text: 'GST (Goods and Services Tax) ek unified tax hai jo 2017 mein India mein lagi. Pehle VAT, Service Tax, Excise — sab alag alag the. Aab sab milake sirf ek GST hai. Customer jo pay karta hai usme GST shaamil hoti hai, aur aap government ko de dete hain.' },
      { type: 'heading', text: 'GST Registration Kab Zaruri Hai?' },
      { type: 'text', text: 'Agar aapka annual turnover ₹40 lakh (services ke liye ₹20 lakh) se zyada hai — tab GST registration zaruri hai. Isse kam pe voluntary registration le sakte hain. Online business ya interstate sales ke liye limit ₹20 lakh hai.' },
      { type: 'tip', text: '📋 Important: Agar aap Amazon, Flipkart, Meesho pe sell karte hain toh GST number mandatory hai — chahe turnover kitna bhi ho!' },
      { type: 'heading', text: 'GST Rates — Kya Rate Lagti Hai?' },
      { type: 'text', text: 'GST ke 4 main slabs hain: 5% (essential items — grocery, medicines), 12% (processed food, computers), 18% (most services, electronics), 28% (luxury items — cars, AC). Zero GST: fresh vegetables, fruits, milk, bread.' },
      { type: 'heading', text: 'Invoice Mein GST Kaise Likhein?' },
      { type: 'text', text: 'GST invoice mein yeh zaroori hain: Aapka GSTIN number, Customer ka naam/address, Item ka naam, HSN code, Quantity, Rate, GST amount alag se (CGST + SGST ya IGST). Hisab: ₹1000 ka item + 18% GST = ₹180 GST = Total ₹1180.' },
      { type: 'tip', text: '💡 Tip: Almenso ke free Invoice Generator mein GST automatically calculate hoti hai — sirf rate select karo!' },
      { type: 'heading', text: 'GST Return — Kitni Baar File Karni Padti Hai?' },
      { type: 'text', text: 'Regular taxpayer ke liye: GSTR-1 (monthly/quarterly — outward supplies), GSTR-3B (monthly — summary + payment). Composition scheme wale: sirf ek quarterly return. Accountant se help lo — ₹500–1000 mein file ho jaati hai.' },
      { type: 'heading', text: 'Composition Scheme — Chote Business Ka Fayda' },
      { type: 'text', text: 'Agar turnover ₹1.5 crore se kam hai toh Composition Scheme le sakte hain. Fayde: Sirf 1–6% flat tax, Quarterly return (monthly nahi), Kam paperwork. Nuksan: Input tax credit nahi milti, Interstate supply nahi kar sakte.' },
      { type: 'summary', text: 'GST se darna nahi hai — samajh ke chalein toh aapka business professional aur trusted lagega. Neeche free invoice generator se apna GST invoice banao!' },
    ]
  },
  {
    id: 'monthly-budget-kaise-banaye',
    title: 'Monthly Budget Kaise Banayein? ₹20,000 se ₹50,000 Tak Ke Liye Complete Plan',
    slug: 'monthly-budget-kaise-banaye',
    category: 'budget',
    emoji: '💵',
    coverColor: '#f3e8ff',
    accentColor: '#6a1b9a',
    readMin: 6,
    date: '2025-01-25',
    tags: ['budget', 'savings', 'planning', 'family', 'paise'],
    summary: '50/30/20 rule se step-by-step budget banayein. Income chahe ₹20,000 ho ya ₹50,000 — yeh formula sabke liye kaam karta hai.',
    toolLink: { path: '/tools/savings-calculator', label: '💰 Savings Calculator', desc: 'Monthly savings plan karo' },
    content: [
      { type: 'intro', text: 'Mahine ke aakhir mein paisa khatam ho jaata hai? Salary aati hai aur pata nahi kahan jaati? Yeh aapki galti nahi — sirf planning nahi hoti. Aaj hum ek aisa simple system sikhenge jo India ki middle class families ke liye khas bana hai.' },
      { type: 'heading', text: '50/30/20 Rule — Sabse Simple Budget Formula' },
      { type: 'text', text: 'Yeh formula American Senator Elizabeth Warren ne popular kiya tha lekin India mein bhi perfectly kaam karta hai: 50% Needs (zaroori kharch), 30% Wants (shauk), 20% Savings. Bas itna yaad rakho!' },
      { type: 'heading', text: '₹30,000 Monthly Income Ka Example' },
      { type: 'text', text: '₹30,000 salary pe: Needs (50%) = ₹15,000 — rent ₹8000 + grocery ₹4000 + bijli/paani ₹1500 + transport ₹1500. Wants (30%) = ₹9,000 — bahar khaana ₹3000 + shopping ₹3000 + entertainment ₹3000. Savings (20%) = ₹6,000 — FD ya SIP.' },
      { type: 'tip', text: '💰 Golden Rule: Salary aate hi pehle ₹6,000 savings mein daalo — phir baaki kharch karo. "Pay yourself first!"' },
      { type: 'heading', text: 'Emergency Fund Kya Hota Hai?' },
      { type: 'text', text: 'Emergency fund matlab 3–6 mahine ke zaruri kharch side mein rakhna. Agar ₹15,000/month zaruri kharch hai toh ₹45,000–₹90,000 emergency fund banao. Isko separate savings account mein rakho — regular kharch wale account mein nahi.' },
      { type: 'heading', text: 'Grocery Budget Kaise Control Karein?' },
      { type: 'text', text: 'List banakar jaao — supermarket mein list ke bina mat jaao. Sasta matlab bekar nahi hota lekin brand loyalty chhodo. Local sabzi mandi se kharido — 20–30% sasta milega. Monthly bulk shopping se bhi bachat hoti hai.' },
      { type: 'heading', text: 'EMI Ka Jaal — Savdhaan Rahein' },
      { type: 'text', text: 'Total EMI income ka 40% se zyada kabhi mat lo. Agar ₹30,000 income hai toh ₹12,000 se zyada EMI mat lo. Car loan + home loan + personal loan sab milakar. Credit card ki minimum payment trap mein mat pado — poora paisa do.' },
      { type: 'heading', text: 'Chote Chote Kharch — Sabse Bada Drain' },
      { type: 'text', text: 'Coffee ₹150 × 20 din = ₹3,000/month. OTT subscriptions 3–4 = ₹1,500/month. Cigarette, pan masala = ₹2,000+. In choti choti cheezon ka hisab rakho — yahi sabse zyada drain karti hain.' },
      { type: 'summary', text: 'Budget banana mushkil nahi — sirf ek baar shuru karo. Neeche Budget Planner tool se apna personalized plan banao — bilkul free!' },
    ]
  },
  {
    id: 'online-business-kaise-start-kare',
    title: 'Online Dukaan Kaise Shuru Karein? Haldwani Ke Chote Dukandaaron Ki Aasaan Guide',
    slug: 'online-business-kaise-start-kare',
    category: 'business',
    emoji: '🏪',
    coverColor: '#e0f7fa',
    accentColor: '#0c831f',
    readMin: 8,
    date: '2025-02-01',
    tags: ['business', 'online', 'dukaan', 'vendor', 'haldwani'],
    summary: 'Apni local dukaan ko online lane ke liye kya chahiye — phone, internet, aur thodi si planning. Poora process step-by-step.',
    toolLink: { path: '/tools/profit-calculator', label: '📊 Profit Calculator', desc: 'Online business ka profit calculate karo' },
    content: [
      { type: 'intro', text: 'Haldwani mein hazaron choti dukaanein hain jo sirf local customers pe depend hain. Lekin aaj ke zamane mein online presence se aapki dukaan 10x grow kar sakti hai — aur isके liye na bada budget chahiye, na technical knowledge.' },
      { type: 'heading', text: 'Kya Kya Chahiye Online Dukaan Ke Liye?' },
      { type: 'text', text: 'Bas yeh 4 cheezein: Smartphone (camera achha hona chahiye), WhatsApp Business (free), Product photos (natural light mein), Almenso jaise platform pe registration (free se shuru karo).' },
      { type: 'tip', text: '📱 Quick Start: Almenso pe free registration karo → products add karo → link share karo WhatsApp pe → orders aane lagte hain!' },
      { type: 'heading', text: 'Product Photos Kaise Lein?' },
      { type: 'text', text: 'Natural light best hoti hai — subah 8–10 baje ya shaam 4–6 baje window ke paas. White ya plain background use karo — ek plain dupatta bhi kaam aata hai. Product ke 3 photos lo — front, side, aur close-up. Phone ko zyada zoom mat karo.' },
      { type: 'heading', text: 'Pricing Kaise Karo?' },
      { type: 'text', text: 'Cost price + delivery charge + apna profit = selling price. Grocery mein 8–15% margin normal hai. Electronics mein 15–25%. Services mein 40–60%. Competitor ka price dekho lekin sirf price war mat karo — quality aur service pe focus karo.' },
      { type: 'heading', text: 'Delivery System Setup Karo' },
      { type: 'text', text: 'Pehle 2–3 km radius mein khud deliver karo ya delivery boy rakho. ₹30–50 delivery charge lo. Minimum order ₹200–300 rakho. Order aate hi WhatsApp pe confirm karo — customer trust badhta hai.' },
      { type: 'heading', text: 'WhatsApp Business Ka Poora Use Karo' },
      { type: 'text', text: 'Catalog feature mein apne products daalo. Business hours set karo. Auto-reply message set karo — "Namaste! Aapka order 30 min mein confirm hoga." Status pe daily offers daalo — free marketing hai yeh!' },
      { type: 'heading', text: 'Kitna Kamaa Sakte Hain?' },
      { type: 'text', text: 'Grocery store: ₹10,000–15,000/day sales pe ₹1,000–1,500 profit. Electronics: ₹5,000/day pe ₹750–1,250. Services: ₹3,000/day pe ₹1,200–1,800. Shuru mein kam hoga — 3–6 mahine mein momentum aata hai.' },
      { type: 'summary', text: 'Aaj hi shuru karo — kal ka intezaar mat karo! Almenso pe free mein register karo aur apni online dukaan ki journey start karo.' },
    ]
  },
  {
    id: 'profit-margin-kaise-badhaye',
    title: 'Business Profit Margin Kaise Badhayein? 8 Smart Strategies jo Kaam Karti Hain',
    slug: 'profit-margin-kaise-badhaye',
    category: 'business',
    emoji: '📊',
    coverColor: '#e8f5e9',
    accentColor: '#0c831f',
    readMin: 5,
    date: '2025-02-10',
    tags: ['profit', 'business', 'margin', 'strategy', 'dukaan'],
    summary: 'Zyada bechna zaroori nahi — smarter bechna zaroori hai. Yeh 8 strategies se apni margin 20–40% tak badha sakte hain.',
    toolLink: { path: '/tools/profit-calculator', label: '📊 Profit Calculator', desc: 'Apna margin calculate karo' },
    content: [
      { type: 'intro', text: 'Bahut se dukandaar sochte hain ki zyada sales matlab zyada profit. Lekin yeh sach nahi! Ek dukandaar jo ₹1 lakh ka maal bechta hai aur ek jo ₹50,000 ka — dono same profit kama sakte hain agar margin sahi ho. Aaj jaanein kaise.' },
      { type: 'heading', text: '1. Dead Stock Ko Pahchaano' },
      { type: 'text', text: 'Woh products jo 3 mahine se nahi bike — unhe discount pe hatao. Dead stock capital block karta hai. ₹10,000 ka maal 20% discount pe bhi becho toh ₹8,000 wapas milega — jo aap fresh high-margin stock mein lagaa sakte hain.' },
      { type: 'heading', text: '2. Combo Offers — Average Order Value Badhao' },
      { type: 'text', text: 'Akele ek item ₹50 profit. Do items combo mein ₹80 profit. Customer ko laga offer mila, tumhe zyada mila! Grocery mein: "Doodh + Bread + Eggs combo ₹180 mein" — teen items ek saath.' },
      { type: 'tip', text: '💡 Amazon ka yeh trick use karo: "Log yeh bhi khareedete hain" — related products suggest karo.' },
      { type: 'heading', text: '3. High Margin Items Ko Front Pe Rakho' },
      { type: 'text', text: 'Dukaan mein ya online — high margin products pehle dikhao. Grocery mein branded items pe margin zyada hota hai. Ghar ke bane products (achaar, papad, namkeen) pe 40–60% margin possible hai.' },
      { type: 'heading', text: '4. Bulk Kharido — Cost Kam Karo' },
      { type: 'text', text: 'Monthly order ki jagah quarterly order karo — 10–15% discount milti hai. Doosre dukandaaron ke saath milke bulk order karo aur discount share karo. Seasonal stock pehle se lo jab price kam hoti hai.' },
      { type: 'heading', text: '5. Regular Customers Ko Loyalty Discount Do' },
      { type: 'text', text: 'Naya customer lane mein 5x zyada kharch hota hai existing customer ko rokne se. Regular ko 5% extra discount do — woh 10 naye customers laayenge. Word of mouth — free marketing!' },
      { type: 'heading', text: '6. Wastage Kam Karo' },
      { type: 'text', text: 'Vegetables/dairy mein wastage 10–15% tak hoti hai. FIFO (First In First Out) follow karo. Expiry ke 2 din pehle discount lagao. Wastage track karo — ek notebook mein likhte jao.' },
      { type: 'heading', text: '7. Online Pe Premium Charge Lo' },
      { type: 'text', text: 'Delivery mein convenience ka value hota hai. Online order pe 5–10% zyada charge kar sakte hain. Customer ghar baith ke order karta hai toh thoda zyada dene ko ready hota hai.' },
      { type: 'heading', text: '8. Monthly Profit Track Karo' },
      { type: 'text', text: 'Jo measure nahi hota woh improve nahi hota. Har mahine: Total sales, Total cost, Total profit. Compare karo — kaunsa month achha tha, kaunsa bura, kyun.' },
      { type: 'summary', text: 'Aaj se hi in strategies ko implement karo. Neeche Profit Calculator se apna current aur target margin calculate karo!' },
    ]
  },
,
  {
    id: 'how-emi-is-calculated',
    title: 'EMI Kaise Calculate Hoti Hai? Bank Loan Ki Poori Sachchi Baat',
    slug: 'how-emi-is-calculated',
    category: 'business',
    emoji: '🏦',
    coverColor: '#e3f2fd',
    accentColor: '#0d47a1',
    readMin: 7,
    date: '2025-02-15',
    tags: ['emi', 'loan', 'home loan', 'bank', 'interest'],
    summary: 'Bank EMI kaise calculate karta hai, interest kaise lagta hai, aur loan lene se pehle kya jaanna zaroori hai — sab simple language mein.',
    toolLink: { path:'/tools/emi-calculator', label:'🏦 EMI Calculator Use Karo', desc:'Apni loan ki exact EMI nikalo' },
    content: [
      { type:'intro', text:'Aapne kabhi socha hai ki ₹5 lakh ka loan lene pe aakhir mein kitna dete hain? Bank sirf ₹5 lakh nahi — interest milake ₹7-8 lakh tak le leta hai! EMI formula samajhna zaroori hai taaki aap sahi decision le sakein.' },
      { type:'heading', text:'EMI Formula Kya Hai?' },
      { type:'text', text:'EMI = P × R × (1+R)^N ÷ [(1+R)^N – 1]. Yahan P = Principal (loan amount), R = Monthly interest rate (annual rate ÷ 12 ÷ 100), N = Total months. Example: ₹5,00,000 loan, 10% annual rate, 5 saal = ₹10,624 per month.' },
      { type:'tip', text:'💡 Simple Rule: Lower interest rate ya longer tenure se EMI kam hoti hai, lekin total interest zyada lagta hai. Short tenure = zyada EMI lekin total cost kam.' },
      { type:'heading', text:'Interest Types — Simple vs Compound' },
      { type:'text', text:'Home loan aur car loan mein "reducing balance" method hota hai — har mahine interest balance pe lagta hai, jo ghatta rehta hai. Personal loan mein flat rate hoti hai — jo actually reducing se double expensive hoti hai! Hamesha "effective interest rate" poochho.' },
      { type:'heading', text:'Prepayment — Loan Jaldi Khatam Karo' },
      { type:'text', text:'Agar aapke paas extra paisa aaye — bonus, tax refund — toh loan prepay karo. ₹1 lakh ka prepayment 5 saal pehle karna ₹40,000-60,000 interest bachata hai. Home loan pe prepayment pe koi charge nahi (floating rate pe). Fixed rate pe 2-3% charge lag sakta hai.' },
      { type:'heading', text:'EMI Bounce — Kya Hota Hai?' },
      { type:'text', text:'EMI bounce hone pe ₹300-500 bounce charge lagta hai. CIBIL score pe negative impact padta hai — jo future loan mushkil banata hai. 3 consecutive bounces pe loan NPA ho sakta hai aur legal notice aa sakta hai. Account mein hamesha EMI + ₹500 buffer rakho.' },
      { type:'heading', text:'Best Banks — Kaunsa Loan Lein?' },
      { type:'text', text:'Home Loan 2025: SBI — 8.50%, HDFC — 8.75%, ICICI — 8.75%. Car Loan: SBI — 8.65%, Axis Bank — 8.75%. Personal Loan: Hamesha compare karo — rates 10% se 24% tak vary karti hain. BankBazaar ya PaisaBazaar se compare karo — 15 minute mein best deal milegi.' },
      { type:'summary', text:'Loan lene se pehle hamesha total cost calculate karo — sirf monthly EMI nahi. Neeche EMI Calculator se apni exact EMI aur total payment nikalo!' },
    ],
  },
  {
    id: 'how-to-calculate-gst',
    title: 'GST Kaise Calculate Karte Hain? Step by Step Guide India 2025',
    slug: 'how-to-calculate-gst',
    category: 'business',
    emoji: '🧾',
    coverColor: '#e8f5e9',
    accentColor: '#1565c0',
    readMin: 6,
    date: '2025-02-20',
    tags: ['gst', 'tax', 'calculation', 'invoice', 'india'],
    summary: 'GST calculate karna is tutorial mein step by step sikhein. Inclusive, exclusive, CGST, SGST — sab clear ho jaayega.',
    toolLink: { path:'/tools/gst-calculator', label:'🧾 GST Calculator', desc:'Instantly GST calculate karo' },
    content: [
      { type:'intro', text:'Dukaan pe koi item ₹1000 ka hai — toh GST ke baad kitna charge karein? Customer ne ₹1180 diye — toh GST kitni gayi? Yeh do common sawaal hain jinmein zyaatar dukandaar confuse rehte hain. Aaj clear kar lete hain.' },
      { type:'heading', text:'Exclusive GST (GST Upar Se Add Karo)' },
      { type:'text', text:'Jab aap base price pe GST add karte hain: Base price = ₹1000, GST 18% = ₹180, Total = ₹1180. Formula: GST Amount = Base Price × GST Rate ÷ 100. Yeh method wholesale aur B2B transactions mein use hota hai.' },
      { type:'tip', text:'📌 Yaad Rakho: Invoice mein hamesha base price, GST amount, aur total alag alag dikhao. Tax inspector ke liye yeh zaroori hai.' },
      { type:'heading', text:'Inclusive GST (Price Mein GST Pehle Se Shaamil)' },
      { type:'text', text:'Jab customer ₹1180 de raha hai aur aapko nikalna hai ki GST kitni: Base Price = Total ÷ (1 + Rate/100) = ₹1180 ÷ 1.18 = ₹1000. GST = ₹1180 – ₹1000 = ₹180. MRP wali items mein yeh method hota hai.' },
      { type:'heading', text:'CGST aur SGST Kya Hai?' },
      { type:'text', text:'Same state mein selling pe: CGST (Central GST) = GST ka aadha. SGST (State GST) = GST ka aadha. Example: 18% GST mein CGST 9% + SGST 9%. Dusre state mein bechne pe sirf IGST lagti hai — poori 18%.' },
      { type:'heading', text:'GST Rate Kaise Pata Karein?' },
      { type:'text', text:'Common items: Grocery (atta, daal, sabzi) — 0%. Packed food — 5%. Readymade kapde — 5% (₹1000 se upar 12%). Electronics — 18%. Restaurant khana — 5% (AC restaurant 18%). Mobile phones — 18%. HSN code check karo — GST Council ki official list pe sab hain.' },
      { type:'heading', text:'Input Tax Credit (ITC) — Free Money!' },
      { type:'text', text:'GST registered dealer hain toh purchase pe jo GST di woh wapas milti hai. Example: ₹5000 ka maal kharida + ₹900 GST di. ₹8000 mein becha + ₹1440 GST li. Government ko deni hai: ₹1440 – ₹900 = sirf ₹540. Yeh ITC ka fayda hai.' },
      { type:'summary', text:'GST calculation mein koi rocket science nahi — ek baar formula samjho aur hamesha sahi invoice banao. Free GST Calculator neeche try karo!' },
    ],
  },
  {
    id: 'how-to-calculate-age-online',
    title: 'Online Age Calculator Kaise Use Karein? Aadhaar, School, Naukri Ke Liye',
    slug: 'how-to-calculate-age-online',
    category: 'tools',
    emoji: '🎂',
    coverColor: '#f3e8ff',
    accentColor: '#7c3aed',
    readMin: 4,
    date: '2025-02-25',
    tags: ['age calculator', 'aadhaar', 'dob', 'umar', 'online tool'],
    summary: 'Exact age seconds mein nikalo — Aadhaar form se leke naukri form tak kaam aata hai. Online age calculator ka poora use.',
    toolLink: { path:'/tools/age-calculator', label:'🎂 Age Calculator', desc:'Apni exact umar nikalo' },
    content: [
      { type:'intro', text:'Government form bharte waqt "exact age in years, months, days" maangta hai aur dimag chakra jaata hai. School admission, Aadhaar correction, job application, passport form — sab mein exact date of birth se age calculate karni padti hai. Yahan aasaan tarika hai.' },
      { type:'heading', text:'Kab Kaam Aata Hai Age Calculator?' },
      { type:'text', text:'1. School admission: 6 saal puri honi chahiye 31 March tak. 2. Government jobs: Age limit exact date pe check hoti hai. 3. Senior citizen schemes: 60 ya 65 saal poore hone ka date verify karna. 4. Retirement planning: Exactly kitne saal baaki hain jaanna. 5. Legal documents: Affidavit mein exact age mandatory hai.' },
      { type:'tip', text:'📋 Naukri Tip: UPSC, SSC, Railway forms mein "age as on date of application" calculate hoti hai — closing date pe nahi. Hamesha correct date use karo.' },
      { type:'heading', text:'Date of Birth Bhool Gaaye? Kya Karein' },
      { type:'text', text:'Aadhaar card aur PAN card mein date of birth hoti hai. School certificate (Class 10 marksheet) mein bhi hoti hai. Agar yeh sab nahi hain toh nazdiki tehsil office se janma praman patra milta hai. Hospital records bhi valid proof hain.' },
      { type:'heading', text:'Age Calculator se Kya Kya Nikalta Hai?' },
      { type:'text', text:'Exact age — years, months, days. Next birthday kitne din mein. Total days lived. Zodiac sign (optional). Retirement date (agar job start year daalo). Almenso ka Age Calculator yeh sab free mein deta hai — sirf date daalo, result aajaayega.' },
      { type:'summary', text:'Neeche Age Calculator try karo — date of birth daalo aur 1 second mein exact umar pao. Bilkul free, koi login nahi!' },
    ],
  },
  {
    id: 'how-to-calculate-home-electricity-usage',
    title: 'How to calculate home electricity usage in India',
    slug: 'how-to-calculate-home-electricity-usage',
    category: 'bijli',
    emoji: '⚡',
    coverColor: '#fff3e0',
    accentColor: '#e65100',
    readMin: 8,
    date: '2025-03-01',
    tags: ['electricity', 'usage', 'units', 'calculator', 'bill'],
    summary: 'Monthly unit consumption kaise calculate karein, meter reading kaise karein, aur bill ko sahi se samjhein.',
    toolLink: { path:'/tools/power-consumption-planner', label:'🏠 Power Consumption Planner', desc:'Apne appliances se monthly bill estimate karo' },
    content: [
      { type: 'intro', text: 'Agar aapko pata ho ki aapka ghar mahine mein kitni bijli kharch karta hai, toh aap budget plan aur savings decisions aasan ho jaate hain. Is article mein hum step-by-step batayenge ki kaise meter reading se consumption calculate karen, aur kaise monthly units estimate karein (jisse aap bill ka hisaab rakh sakein).' },
      { type: 'heading', text: 'Meter Reading Kaise Samjhein' },
      { type: 'text', text: 'Aapke meter par do numbers diye honge — previous reading aur current reading. Farak aapka units consumption hota hai. Agar aapka meter digital hai toh dono readings ek saath hoti hain; agar analog hai toh har wheel ko dhyan se padhna hota hai. Ye difference aapko daily, weekly, ya monthly basis par track karte rehna chahiye.' },
      { type: 'heading', text: 'Units Ka Monthly Estimate' },
      { type: 'text', text: 'Har mahine ki reading note karo (same date). Agar aap 1st April ko 1200 units aur 1st May ko 1450 units padhte ho, toh aapne 250 units consume kiye. Isko 30 se divide karke daily average bhi nikal sakte ho (≈8.3 units per day).' },
      { type: 'heading', text: 'Appliance Breakdown' },
      { type: 'text', text: 'Har appliance ka wattage dekh ke uska daily consumption nikal sakte ho. Example: 75W fan 10 hours chalne par 0.75 kWh (0.75 units) deti hai. Isi tarah se fridge (150W × 24h = 3.6 units), LED bulbs (10W × 6h = 0.06 units), etc. Yeh method aapko dikhata hai ki sabse zyada load kaun le raha hai.' },
      { type: 'heading', text: 'Bill Estimate ka Formula' },
      { type: 'text', text: 'Monthly bill estimate = (monthly units × per unit rate) + fixed charges + duty/GST. Agar aapke area mein slab rates hain (e.g., 0-100 units ₹3, 101-200 ₹4), toh aap slab-wise calculate karen. Is tool mein aap average rate daal kar ek quick estimate le sakte ho.' },
      { type: 'heading', text: 'Budget Planning' },
      { type: 'text', text: 'Agar aapko pata hai ke aapka bill ₹3000 aata hai, toh aap apne budget mein usse set kar sakte ho. Agar aapko lagta hai bill zyada aa raha hai, toh apne high wattage appliances (AC, geyser, microwave) ko kam chalane ki planning karein.' },
      { type: 'summary', text: 'Aaj se hi apni meter readings track karo aur is calculator se monthly estimate banao. 1-2 mahine mein aapko patterns nazar aayenge aur aap behtar planning kar sakte ho.' },
    ],
  },
  {
    id: 'solar-panel-roi-explained',
    title: 'Solar panel ROI explained',
    slug: 'solar-panel-roi-explained',
    category: 'solar',
    emoji: '☀️',
    coverColor: '#fff3e0',
    accentColor: '#f59e0b',
    readMin: 9,
    date: '2025-03-02',
    tags: ['solar', 'roi', 'investment', 'renewable', 'energy'],
    summary: 'Solar system ka ROI kaise nikalte hain, payback period kya hota hai, aur kis tarah se aap apni investment recover kar sakte hain.',
    toolLink: { path:'/tools/solar-roi', label:'☀️ Solar ROI Calculator', desc:'Solar system ka payback aur savings nikalno' },
    content: [
      { type: 'intro', text: 'Solar panels lagana ek bada decision hai — aur sahi ROI samajhna zaroori hai. Yahan hum aapko batayenge ki system size, sunlight hours, electricity tariff, aur inflation kaise milke aapke payback period ko define karte hain.' },
      { type: 'heading', text: 'Solar generation ka formula' },
      { type: 'text', text: 'Solar generation per day = system size (kW) × average sun hours. Agar aap 4kW system lete ho aur daily 5 ghante sun milta hai, toh 20 kWh per day generate hoga. Monthly generation = 20 × 30 = 600 kWh.' },
      { type: 'heading', text: 'Payback period nikalna' },
      { type: 'text', text: 'Payback = total investment ÷ annual savings. Agar system ₹2 lakh ka hai aur annual saving ₹30,000 hai, toh payback 6.6 saal. Iske baad jo energy aap generate karenge, woh mostly free hoti hai.' },
      { type: 'heading', text: 'Rate inflation ka impact' },
      { type: 'text', text: 'Electricity rate har saal badhta hai — 4-6% typical. Aapki savings bhi iske saath badh jayegi. Isliye high inflation environment mein solar ka ROI faster hota hai.' },
      { type: 'heading', text: 'Maintenance aur warranty' },
      { type: 'text', text: 'Panels ki lifetime 25+ saal hoti hai. Inverter ki warranty 5-10 saal. Maintenance mein cleaning aur regular checks aate hain. Agar annually ₹2000 maintenance karein, toh overall ROI thoda adjust hota hai.' },
      { type: 'summary', text: 'Solar ROI understand karne ka best tareeka hai apne numbers likh lena — system cost, expected generation, electricity rate. Phir tools se calculate karke comparison karo. Aaj se ek smart choice banayein!' },
    ],
  },
  {
    id: 'best-inverter-battery-capacity-for-homes',
    title: 'Best inverter battery capacity for homes',
    slug: 'best-inverter-battery-capacity-for-homes',
    category: 'power',
    emoji: '🔋',
    coverColor: '#e0f7fa',
    accentColor: '#0c831f',
    readMin: 8,
    date: '2025-03-03',
    tags: ['inverter', 'battery', 'backup', 'electricity', 'home'],
    summary: 'Apne ghar ke liye sahi inverter aur battery capacity kaise choose karein — load, backup hours, battery voltage, aur efficiency ke saath.',
    toolLink: { path:'/tools/inverter-load-planner', label:'🔋 Inverter Load Planner', desc:'Appliances ke basis pe inverter size aur battery Ah calculate karo' },
    content: [
      { type: 'intro', text: 'Power cut aati hai toh sabse pareshani hoti hai: fans band, fridge band, lights, sab. Inverter + battery system se aap yeh problem solve kar sakte hain — lekin size galat ho to faayda kam aur nuksan zyada ho sakta hai. Is article mein hum sahi capacity decide karna sikhenge.' },
      { type: 'heading', text: 'Appliance load kaise calculate karein' },
      { type: 'text', text: 'Har appliance ka wattage check karo (e.g., fan 75W, TV 120W, fridge 150W). Fir uske running hours dal ke kWh nikalo. Ye total load aapko inverter ke VA rating choose karne mein help karega.' },
      { type: 'heading', text: 'Inverter VA vs battery Ah' },
      { type: 'text', text: 'Inverter VA (apparent power) aur battery Ah (energy storage) alag cheezein hain. VA decide karta hai ki kitna load inverter ek saath chala sakta hai; Ah batata hai ki kitni der tak chal sakta hai. Dono ko sahi se match karna important hai.' },
      { type: 'heading', text: 'Backup hours decide karna' },
      { type: 'text', text: 'Agar aap 4 ghante backup chahte hain, toh battery Ah us hisab se calculate karo. Agar aap 1 kW load chala rahe ho, 4 ghante ke liye 4 kWh chahiye. 12V battery ke liye 4 kWh = 333 Ah (assuming 85% efficiency).' },
      { type: 'summary', text: 'Sahi inverter + battery combination se aap safe aur comfortable backup pa sakte hain. Ye tool aapko basic sizing dega — final selection ke liye electrician se confirm karwa lein.' },
    ],
  },
  {
    id: 'understanding-wire-size-for-house-wiring',
    title: 'Understanding wire size for house wiring',
    slug: 'understanding-wire-size-for-house-wiring',
    category: 'electricity',
    emoji: '🔌',
    coverColor: '#e0f7fa',
    accentColor: '#0ea5e9',
    readMin: 8,
    date: '2025-03-04',
    tags: ['wire size', 'house wiring', 'voltage drop', 'electrical safety'],
    summary: 'Cable ka size kaise choose karein? Voltage drop, current rating, aur safety standards ke saath user-friendly guide.',
    toolLink: { path:'/tools/wire-size-calculator', label:'🔌 Wire Size Calculator', desc:'Load aur distance ke hisab se recommended wire size dekho' },
    content: [
      { type: 'intro', text: 'Ghar ki wiring mein sahi wire size use karna safety ke liye zaroori hai. Choti wire se current jyada jayega, wire garam hogi, aur fire ka risk badhta hai. Is article mein hum simple language mein wire sizing concept samjhenge.' },
      { type: 'heading', text: 'Voltage drop kya hota hai?' },
      { type: 'text', text: 'Voltage drop hota hai jab current wire ke through flow karta hai aur resistance ki wajah se voltage kam ho jati hai. Zyadatar 3-5% voltage drop acceptable mana jata hai. High drop se appliances dim chalti hain aur motor load badh jata hai.' },
      { type: 'heading', text: 'Copper vs Aluminium' },
      { type: 'text', text: 'Copper zyada conductive hota hai — matlab same current ke liye chhota wire chal sakta hai. Aluminium sasta hota hai lekin size 1.5x ya 2x bada hona chahiye. Is guide mein hum dono comparisons dekhenge.' },
      { type: 'heading', text: 'Common wire sizes in India' },
      { type: 'text', text: 'Lighting circuits ke liye 1.5 mm², power circuits ke liye 2.5 mm², AC/pump ke liye 4-6 mm², aur main supply ke liye 10-16 mm² commonly use hota hai. Hamesha wire ka current rating dekh kar choose karein.' },
      { type: 'summary', text: 'Wire size decision mein safety pe focus karo — kharcha important hai, lekin fire safety aur long term reliability zyada important hai. Certified electrician se confirm karwa lena best hai.' },
    ],
  },
  {
    id: 'how-to-calculate-percentage',
    title: 'Percentage Kaise Calculate Karte Hain? Marks, Discount, GST Sab Ke Liye',
    slug: 'how-to-calculate-percentage',
    category: 'tools',
    emoji: '📊',
    coverColor: '#e0f7fa',
    accentColor: '#0891b2',
    readMin: 5,
    date: '2025-03-01',
    tags: ['percentage', 'marks', 'discount', 'calculation', 'math'],
    summary: 'Percentage nikalna sabse zaroori math skill hai. Marks, discount, profit, tax — sab jagah kaam aati hai. Easy tricks sikhein.',
    toolLink: { path:'/tools/percentage-calculator', label:'📊 Percentage Calculator', desc:'Instantly % calculate karo' },
    content: [
      { type:'intro', text:'Percentage ek aisi skill hai jo rozana kaam aati hai — dukaan pe discount, exam mein marks, bank mein interest, salary increment. Lekin calculator ke bina mental math mushkil lagti hai. Yeh article mein woh tricks hain jo aap phone ke bina bhi kaam mein la sako.' },
      { type:'heading', text:'Basic Formula — Percentage Nikalna' },
      { type:'text', text:'Percentage = (Part ÷ Total) × 100. Example: 450 marks out of 600 = (450 ÷ 600) × 100 = 75%. Iska ulta: 75% of 600 = (75 ÷ 100) × 600 = 450. Yeh do formulas yaad kar lo — baaki sab isi se nikalta hai.' },
      { type:'tip', text:'🧮 Mental Math Shortcut: 10% nikalna easy hai — last digit hatao. ₹1400 ka 10% = ₹140. 5% = 10% ka aadha = ₹70. 15% = 10% + 5% = ₹210.' },
      { type:'heading', text:'Discount Percentage Kaise Calculate Karein' },
      { type:'text', text:'MRP ₹500, Sale price ₹350. Discount = ₹150. Discount % = (150 ÷ 500) × 100 = 30%. Sale pe hamesha real discount % check karo — "70% off" wali deals mein often MRP hi inflated hoti hai. Original price Google pe check karo.' },
      { type:'heading', text:'Marks Percentage — Sahi Formula' },
      { type:'text', text:'Total marks = sab subjects ke marks add karo. Maximum marks = sab subjects ke max marks add karo. Percentage = (Total Marks ÷ Maximum Marks) × 100. Board exam mein best of 5 subjects wala rule hota hai — 6th subject worst result drop ho jaata hai.' },
      { type:'heading', text:'Percentage Increase/Decrease' },
      { type:'text', text:'Salary ₹25,000 se ₹28,000 hui: Increase = ₹3000. % Increase = (3000 ÷ 25000) × 100 = 12% increment. Petrol ₹100 se ₹95 hua: % Decrease = (5 ÷ 100) × 100 = 5% reduction. Yeh formula loan rate change, price hike — sab mein use hota hai.' },
      { type:'summary', text:'Percentage ka ek baar formula solid ho jaaye toh zindagi mein koi bhi calculation mushkil nahi lagti. Neeche Percentage Calculator try karo — instant result!' },
    ],
  },
  {
    id: 'home-loan-guide-india',
    title: 'Home Loan Kaise Lein? Pehli Baar Ghar Khareedne Waalon Ke Liye Poori Guide',
    slug: 'home-loan-guide-india',
    category: 'business',
    emoji: '🏠',
    coverColor: '#fff3e0',
    accentColor: '#e65100',
    readMin: 9,
    date: '2025-03-05',
    tags: ['home loan', 'housing loan', 'bank loan', 'ghar', 'property'],
    summary: 'Home loan lena mushkil nahi agar sahi information ho. Bank kaunsa choose karein, EMI kitni ho, documents kya chahiye — sab ek jagah.',
    toolLink: { path:'/tools/emi-calculator', label:'🏦 Home Loan EMI Calculate Karo', desc:'Apni monthly EMI aur total cost nikalo' },
    content: [
      { type:'intro', text:'Ghar khareedna zindagi ka sabse bada financial decision hai. Ek galat choice 20 saal tak mahenge padti hai. Lekin sahi information ke saath aap best deal le sakte hain — aur lakho rupe bacha sakte hain.' },
      { type:'heading', text:'Pehle Apni Eligibility Check Karo' },
      { type:'text', text:'Bank generally income ka 60 times loan deta hai. Monthly income ₹40,000 hai toh ₹24 lakh ka loan milega (40,000 × 60). EMI income ka 40-50% se zyada nahi honi chahiye. CIBIL score 750+ hona chahiye — yeh free mein check karo CIBIL ya Experian pe.' },
      { type:'tip', text:'📊 Rule of Thumb: ₹10 lakh ke home loan pe 20 saal mein roughly ₹8,700/month EMI aati hai (8.5% rate pe). Isse calculate karo kitna loan afford kar sakte hain.' },
      { type:'heading', text:'Kaun Sa Bank Choose Karein?' },
      { type:'text', text:'SBI: Sabse kam rate — 8.50% se, government ka trust. HDFC/ICICI: Fast processing, 7-10 din mein disbursement. LIC Housing: Senior citizens ke liye best. Bajaj Housing Finance: Flexible EMI options. Hamesha 3-4 banks mein apply karo aur compare karo — 0.5% rate difference ₹3-5 lakh ka fark padta hai 20 saal mein.' },
      { type:'heading', text:'Documents Checklist' },
      { type:'text', text:'Identity proof: Aadhaar, PAN. Address proof: Electricity bill, Ration card. Income proof: 3 mahine ki salary slips, 2 saal ka ITR. Bank statement: 6 mahine ka. Property documents: Sale deed, approved plan, NOC. Self-employed: Business registration, GST returns, P&L statement.' },
      { type:'heading', text:'Down Payment — Kitna Bacha Ke Rakho' },
      { type:'text', text:'Bank maximum 80-90% loan deta hai. ₹50 lakh property pe ₹5-10 lakh khud lagane padte hain. Plus registration charges 5-7% alag. Plus interiors, shifting etc. Total ₹8-15 lakh cash ready hona chahiye. Bina emergency fund ke ghar mat lo — job jane pe EMI bounce nahi honi chahiye.' },
      { type:'heading', text:'Floating vs Fixed Rate' },
      { type:'text', text:'Floating rate: RBI ke hisaab se upar neeche hoti hai. Abhi 8.5% hai — historically zyada hogi 10 saal mein bhi. Fixed rate: 2-3% zyada hoti hai lekin guaranteed. 20 saal ke loan mein floating better hota hai — average mein save hota hai. 2-3 saal ke liye fixed consider karo.' },
      { type:'heading', text:'PMAY Subsidy — Free ₹2.67 Lakh' },
      { type:'text', text:'Pehli baar ghar kharid rahe hain? PMAY (Pradhan Mantri Awas Yojana) scheme check karo. Income ₹6 lakh tak — ₹2.67 lakh subsidy. ₹6-12 lakh — ₹2.35 lakh subsidy. ₹12-18 lakh — ₹2.30 lakh subsidy. Bank mein apply karte waqt PMAY form bhi bharein.' },
      { type:'summary', text:'Home loan lena ek long journey hai — hurry mat karo. Sahi planning se aap sabse best deal pa sakte hain. EMI Calculator se apna budget aaj hi check karo!' },
    ],
  },
  {
    id: 'small-business-accounting-tips',
    title: 'Chote Business Ka Hisaab Kitaab Kaise Rakhen? Simple Accounting Guide',
    slug: 'small-business-accounting-tips',
    category: 'business',
    emoji: '📒',
    coverColor: '#e8f5e9',
    accentColor: '#0c831f',
    readMin: 7,
    date: '2025-03-10',
    tags: ['accounting', 'hisaab', 'business', 'bookkeeping', 'dukaan'],
    summary: 'Dukaan ka hisaab rakhnaa zaroori hai. Kaunse tools use karein, daily records kaise likhein, tax ke liye kya tayari karein.',
    toolLink: { path:'/tools/gst-calculator', label:'🧾 Free Invoice Generator', desc:'Professional invoice bnao' },
    content: [
      { type:'intro', text:'Bahut se dukandaar sochte hain — "Hisaab to dimag mein hai." Lekin jab ITR bharna ho, GST return file karni ho, ya bank loan apply karna ho — tab pata chalta hai ki records kitne zaroori hain. Aaj se hi simple system shuru karo.' },
      { type:'heading', text:'Daily Hisaab — Ek Notebook Kafi Hai' },
      { type:'text', text:'Rozana likho: Total sales (cash + UPI + credit). Total purchases/expenses. Remaining stock (agar fast-moving items hain). Ye 3 numbers — 5 minute ka kaam — aapko month end mein poora picture denge. Simple notebook ya free apps like Khatabook/OkCredit.' },
      { type:'tip', text:'📱 App Suggestion: Khatabook app bilkul free hai, Hindi mein hai, aur credit (udhaar) track karna bahut aasaan hai. 1 crore+ dukandaar use karte hain.' },
      { type:'heading', text:'Cash vs Accrual — Kaunsa Method Use Karein' },
      { type:'text', text:'Cash method: Paisa aaya — income. Paisa gaya — expense. Chote business ke liye yeh perfect hai. Accrual method: Bill hua — income. Billed hua — expense. Isse CA help karta hai. Small dukaan ke liye cash method shuru mein kafi hai.' },
      { type:'heading', text:'GST ke Liye Records' },
      { type:'text', text:'GST registered hain toh: Har invoice ki copy rakho — 6 saal tak. Purchase bills bhi rakho — ITC claim ke liye. Monthly sales register banao. Electronic records best hain — Google Sheets ya Tally Lite. Lost invoice = lost ITC = extra tax.' },
      { type:'heading', text:'Monthly Profit Kaise Nikalen' },
      { type:'text', text:'Monthly Profit = Total Sales – (Purchases + Rent + Salary + Bijli + Other expenses). Yeh simple P&L statement hai. Isko har mahine banana zaroori hai — sirf aise pata chalega ki business grow ho raha hai ya nahi. 6 mahine continuously loss — changes zaruri hain.' },
      { type:'summary', text:'Accounting boring lagti hai lekin business ki backbone hai. Aaj se sirf daily sales track karna shuru karo — baaki aata jaayega. Free invoice banao neeche!' },
    ],
  },
  {
    id: 'upi-qr-code-business',
    title: 'Apni Dukaan Ke Liye UPI QR Code Kaise Banayein? Free mein',
    slug: 'upi-qr-code-business',
    category: 'tools',
    emoji: '📱',
    coverColor: '#e8f5e9',
    accentColor: '#0c831f',
    readMin: 4,
    date: '2025-03-12',
    tags: ['upi', 'qr code', 'gpay', 'phonepe', 'digital payment', 'dukaan'],
    summary: 'Dukaan mein digital payment ke liye UPI QR code zaroor lagao. Free mein banao aur print karke counter pe rakho.',
    toolLink: { path:'/tools/qr-code-generator', label:'📱 Free QR Code Generator', desc:'Apna UPI QR code banao' },
    content: [
      { type:'intro', text:'Cash khatam ho gayi, ATM door hai — customer chala jaata hai. UPI QR code hota toh sale nahi jaati. Aaj India mein 70% se zyada transactions digital hain — aur QR code banane mein 2 minute lagte hain. Chalo karte hain.' },
      { type:'heading', text:'UPI QR Code Ke Fayde' },
      { type:'text', text:'Chhutta paisa ki problem khatam. Raat mein bhi payment aata hai. Transaction record automatic — hisaab aasaan. Customer trust badhta hai — professional lagta hai. No transaction fee (below ₹2000 pe). MDR (Merchant Discount Rate) bhi 0% hai merchant ke liye.' },
      { type:'heading', text:'Konsa QR Use Karein — GPay, PhonePe ya Paytm?' },
      { type:'text', text:'Sabse best — BHIM UPI QR: Har app se payment aata hai. GPay QR: Only GPay se aata. PhonePe QR: Only PhonePe se. Paytm QR: Paytm wallets aur UPI dono. Recommendation: BHIM UPI ya Paytm Business QR banao — zyada customers se payment aayega.' },
      { type:'tip', text:'💡 Pro Tip: QR code A4 sheet pe print karo aur laminate karo — ₹20 mein dukaan pe ek baar lag jaata hai. Counter pe, baahar door pe, aur delivery bag pe bhi lagao.' },
      { type:'heading', text:'QR Code Se Payment Kaise Track Karein' },
      { type:'text', text:'PhonePe Business ya Paytm Business app download karo. Har transaction pe notification aata hai. Monthly report download karo — automatically hisaab hota hai. Bank statement se daily reconcile karo. Disputed transactions pe 24 hours mein complain karo.' },
      { type:'summary', text:'2 minute mein QR code banao aur aaj se digital payments lena shuru karo. Neeche free QR Generator use karo!' },
    ],
  },
  {
    id: 'seo-blog-kaise-likhe',
    title: 'SEO Blog Kaise Likhein? Google Pe Page 1 Par Aane Ka Formula',
    slug: 'seo-blog-kaise-likhe',
    category: 'tools',
    emoji: '🔍',
    coverColor: '#fff3e0',
    accentColor: '#d97706',
    readMin: 8,
    date: '2025-03-15',
    tags: ['seo', 'blog', 'google', 'traffic', 'content writing'],
    summary: 'Google pe rank karne ke liye blog likhna ek skill hai. Title, keywords, structure, internal links — sab ke baare mein jaanein.',
    toolLink: { path:'/tools/word-counter', label:'📝 Word Counter', desc:'Article word count check karo' },
    content: [
      { type:'intro', text:'Aap achha likhte ho lekin Google pe koi nahi aata — kyunki Google ko bhi samjhana padta hai ki aapne kya likha hai. SEO (Search Engine Optimization) matlab Google ke rules ke hisaab se likhna — taaki aapka article page 1 pe aaye.' },
      { type:'heading', text:'Keyword Research — Sab Se Pehle' },
      { type:'text', text:'Woh likhein jo log actually search karte hain. Google Search mein apna topic type karo aur "suggest" dekho — woh sab real searches hain. "People also ask" section check karo. Free tools: Google Keyword Planner, Ubersuggest. Long-tail keywords target karo — "gst calculator" nahi, "gst calculator India 2025 free" likhein.' },
      { type:'tip', text:'🎯 Winning Formula: Low competition + reasonable search volume keyword = aasaan ranking. Naya blog hai toh 500-2000 searches/month wale keywords target karo.' },
      { type:'heading', text:'Title (H1) — Most Important Element' },
      { type:'text', text:'Title mein main keyword hona chahiye — preferably shuru mein. 50-60 characters se zyada mat likhein. Number use karo — "10 Tips" ya "2025 Guide" zyada clicks laata hai. Emotional words: "Complete", "Proven", "Free", "Easy" — CTR badhate hain.' },
      { type:'heading', text:'Content Structure — Scannable Banao' },
      { type:'text', text:'H2 headings use karo — har 200-300 words pe. Bullet points aur numbered lists. Short paragraphs — mobile pe padha jaata hai. Bold important words. Internal links — apne dusre articles se link karo. Images mein alt text dalo. Minimum 800 words hone chahiye — 1500+ words zyada better rank karta hai.' },
      { type:'heading', text:'On-Page SEO Checklist' },
      { type:'text', text:'Keyword title mein: ✅. Keyword first 100 words mein: ✅. Meta description mein keyword: ✅. URL mein keyword: ✅ (example: /blog/gst-kaise-calculate-karein). Image alt text: ✅. Internal links 2-3: ✅. External links 1-2 (authoritative sites): ✅. Article word count 800+: ✅.' },
      { type:'summary', text:'SEO ek slow process hai — 3-6 mahine mein results dikhte hain. Consistent likhte jao, quality rakho — Google zaroor reward karta hai. Word Counter se apna article check karo!' },
    ],
  },
  {
    id: 'fd-vs-sip-comparison',
    title: 'FD vs SIP — Kahan Invest Karna Chahiye? 2025 Complete Comparison',
    slug: 'fd-vs-sip-comparison',
    category: 'budget',
    emoji: '💹',
    coverColor: '#e3f2fd',
    accentColor: '#1565c0',
    readMin: 8,
    date: '2025-03-18',
    tags: ['fd', 'sip', 'investment', 'mutual fund', 'savings', 'interest'],
    summary: 'FD safe hai, SIP mein zyada return hai — dono mein se kaunsa better hai? Numbers ke saath honest comparison.',
    toolLink: { path:'/tools/loan-interest-calculator', label:'💰 Interest Calculator', desc:'FD ka interest calculate karo' },
    content: [
      { type:'intro', text:'India mein investors ke beech yeh sabse bada debate hai — FD mein paisa surakshit rehta hai ya SIP mein zyada return milta hai? Dono ke apne fayde aur nuksan hain. Numbers ke saath honest comparison karte hain.' },
      { type:'heading', text:'FD — Fixed Deposit ke Fayde' },
      { type:'text', text:'Guaranteed return — 6.5% to 7.5% (2025 mein). Capital guaranteed — DICGC insured ₹5 lakh tak. Fixed income — retirement ke liye perfect. Tax saver FD — 5 saal ki FD pe 80C benefit. Senior citizens ko 0.5% extra. Koi market risk nahi.' },
      { type:'heading', text:'SIP — Systematic Investment Plan ke Fayde' },
      { type:'text', text:'Historical return: Nifty 50 index — 12-15% average over 10+ years. Inflation-beating: 7% FD mein 7% inflation mein real return = 0. Compounding: ₹5000/month × 15 years × 12% = ₹25 lakh+ (total investment ₹9 lakh). Flexibility: Kabhi bhi zyada/kam kar sakte ho.' },
      { type:'tip', text:'📊 Real Comparison: ₹1 lakh FD @ 7% = 10 saal mein ₹1.97 lakh. ₹1 lakh SIP/lumpsum @ 12% = 10 saal mein ₹3.11 lakh. Fark = ₹1.14 lakh sirf ek lakh pe!' },
      { type:'heading', text:'SIP Ke Risks' },
      { type:'text', text:'Market pe depend karta hai — 2008, 2020 mein -40-50% bhi hua. Short term (1-2 saal) mein loss ho sakta hai. Discipline chahiye — SIP band karna badi galti hoti hai. Koi guarantee nahi — returns vary karte hain. Beginners ke liye nervewracking ho sakta hai.' },
      { type:'heading', text:'Toh Kya Karein?' },
      { type:'text', text:'3-6 mahine emergency fund: FD mein rakho. Short term goals (1-3 saal): FD ya debt funds. Long term goals (5+ saal): SIP in index/equity funds. Retirement corpus: Mix of both. Senior citizens ya fixed income chahiye: FD better. Young hai, 10+ saal invest karoge: SIP much better.' },
      { type:'summary', text:'FD aur SIP dono ki jagah hai — goal ke hisaab se choose karo. Neeche Interest Calculator se FD return calculate karo aur decide karo!' },
    ],
  },
  {
    id: 'digital-marketing-local-business',
    title: 'Local Dukaan Ko Online Promote Kaise Karein? Budget-Friendly Digital Marketing',
    slug: 'digital-marketing-local-business',
    category: 'business',
    emoji: '📢',
    coverColor: '#fce4ec',
    accentColor: '#c2185b',
    readMin: 7,
    date: '2025-03-20',
    tags: ['digital marketing', 'local business', 'instagram', 'google', 'promotion'],
    summary: 'Chhoti dukaan ko bade budget ke bina online popular banao. WhatsApp, Instagram, Google Business — free tools ka poora use.',
    toolLink: { path:'/tools/qr-code-generator', label:'📱 QR Code Generator', desc:'Marketing ke liye QR code banao' },
    content: [
      { type:'intro', text:'Aapki dukaan ka swaad achha hai, service acchi hai — lekin log jante hi nahi. Problem yeh nahi ki aap market nahi karte. Problem yeh hai ki aap wahan nahi hain jahan log dekhte hain. 2025 mein woh jagah hai — phone ki screen.' },
      { type:'heading', text:'Google Business Profile — Sabse Pehle Yeh Karo (Free)' },
      { type:'text', text:'business.google.com pe jaao aur apni dukaan register karo. Yeh bilkul free hai. Fayde: Google Maps pe aayegi dukaan. "Near me" searches mein dikhegi. Reviews — word of mouth digital. Opening hours, photos, contact — sab ek jagah. 1 ghante ka kaam — permanent free marketing.' },
      { type:'tip', text:'⭐ Reviews Magic: Khush customer se turant bolein "Google pe review dedo". 10+ positive reviews se local ranking dramatically improve hoti hai. Negative review pe professionally respond karo — log dekhte hain.' },
      { type:'heading', text:'WhatsApp Business — Free Marketing Channel' },
      { type:'text', text:'WhatsApp Business app install karo. Business profile complete karo. Catalog mein products/services add karo. Broadcast list banao — regular customers ko offers bhejo. Status pe daily: new stock, offers, photos. Auto-reply: "Namaste! Aapka message mila. Jaldi reply karenge." Free aur direct — 90%+ open rate.' },
      { type:'heading', text:'Instagram — Visual Dukaan' },
      { type:'text', text:'Food, fashion, home decor, beauty — Instagram pe bahut kaam karta hai. Roz ek post — product photo natural light mein. Reels zyada reach deti hai — 15-30 second short video. Local hashtags use karo: #haldwani #uttarakhand #localbusiness. Consistency key hai — 30 din lagaataar post karo toh followers badhne lagte hain.' },
      { type:'heading', text:'Paid Ads — Kab Zaruri Hai?' },
      { type:'text', text:'Organic se shuru karo — 3-6 mahine karo. Phir Facebook/Instagram ads try karo — ₹100-200/day se shuru hoti hai. Hyperlocal targeting: 5 km radius, specific age group. Event pe ads: Diwali, Eid, seasons. ROI track karo — ₹100 ad spend se kitna business aaya?' },
      { type:'summary', text:'Digital marketing mein paisa kam, consistency zyada zaroori hai. Aaj se Google Business Profile aur WhatsApp Business setup karo — results 2-3 mahine mein dikhenege. QR Code generator se marketing material banao!' },
    ],
  },
  {
    id: 'savings-tips-middle-class-india',
    title: 'Middle Class Family Ke Liye 15 Best Savings Tips — 2025 India',
    slug: 'savings-tips-middle-class-india',
    category: 'budget',
    emoji: '💰',
    coverColor: '#fff3e0',
    accentColor: '#b45309',
    readMin: 7,
    date: '2025-03-22',
    tags: ['savings', 'middle class', 'tips', 'family', 'paise bachao'],
    summary: 'Salary se guzaara karna mushkil hai? Yeh 15 practical tips middle class Indian families ke liye bilkul sahi hain. Choti choti changes se badi savings hoti hain.',
    toolLink: { path:'/tools/savings-calculator', label:'💵 Budget Planner', desc:'Apna monthly budget banao' },
    content: [
      { type:'intro', text:'Middle class India ki sabse badi problem hai — kafi kamate hain lekin savings nahi hoti. EMI hai, school fees hai, ghar ka kharcha hai. End of month mein zero balance. Yeh article mein woh 15 tips hain jo actually kaam karti hain — theory nahi, practical.' },
      { type:'heading', text:'1. Pehle Save, Phir Kharch' },
      { type:'text', text:'Yeh sabse important rule hai. Salary aate hi pehle 10-20% savings account mein transfer karo — auto debit set karo. Bache paise se kharch karo. Zyaatar log ulta karte hain aur end mein kuch nahi bachta.' },
      { type:'tip', text:'💡 Trick: Salary account aur savings account alag bank mein rakho — aise withdrawal mushkil hogi aur saving protect rahegi.' },
      { type:'heading', text:'2. SIP se Shuru Karo — Sirf ₹500 Se' },
      { type:'text', text:'Mutual fund SIP sirf ₹500 per month se shuru hoti hai. 10 saal mein ₹500/month ka 12% return pe approximately ₹1.15 lakh hota hai. Jaldi shuru karo — time hi sabse bada investment hai.' },
      { type:'heading', text:'3. Grocery Mein 30% Bachao' },
      { type:'text', text:'Grocery ka list pehle banao — bina list ke mat jao. Local vegetable market use karo (supermarket se 20-30% sasta). Bulk items like dal, chawal, oil monthly kharido — ₹200-500 bachenge. Branded se unbranded mein shift karo jahan quality same ho.' },
      { type:'heading', text:'4. EMI Ka Jaal' },
      { type:'text', text:'Mobile phone ko EMI pe mat kharido jab tak zaroori na ho. ₹20,000 ka phone 24 months ke liye EMI pe ₹25,000+ padta hai. Ek saal pehle se plan karo aur cash mein kharido.' },
      { type:'tip', text:'📊 Rule: Total EMI income ke 40% se zyada kabhi mat lene do. Ghar + car + personal loan sab milakar.' },
      { type:'heading', text:'5. Bijli Bill ₹300+ Bachao Har Mahine' },
      { type:'text', text:'LED bulbs lagao — ₹150/month bachat. AC 24 degree pe rakho — ₹200/month bachat. Geyser timer pe lagao — ₹100/month bachat. Fridge ki back coil clean karo — ₹80/month bachat. Total ₹500+ per month sirf bijli mein.' },
      { type:'heading', text:'6. Insurance — Zaroori Hai Lekin Smart Lo' },
      { type:'text', text:'Term insurance lo — endowment nahi. 1 crore ka term insurance sirf ₹8,000-12,000 per year mein milta hai. Health insurance family ke liye ₹15,000-25,000 per year mein ₹5-10 lakh cover deta hai. Traditional policies (endowment, money-back) bohot mehnge aur kam return wale hote hain.' },
      { type:'heading', text:'7. Weekend Meal Prep' },
      { type:'text', text:'Bahar khaana monthly budget ka bada hissa lata hai. Sunday ko agle hafte ka khaana plan karo aur ingredients kharido. Lunch ghar se le jao — ₹80-150 per day bachenge. Ek mahine mein ₹2,000-4,000 ki savings.' },
      { type:'heading', text:'8. Subscriptions Review Karo' },
      { type:'text', text:'Netflix, Amazon, Hotstar, Spotify, YouTube Premium — kitne use karte ho? List banao aur jo 2+ mahine se nahi dekha unhe band karo. Aksar ₹500-1000/month waste hota hai unused subscriptions pe.' },
      { type:'heading', text:'9. Emergency Fund — Non-Negotiable' },
      { type:'text', text:'3-6 mahine ke monthly kharch ke barabar emergency fund rakho. Liquid fund ya savings account mein — FD nahi. Job gayi ya medical emergency — yahi fund kaam aata hai. Bina is fund ke koi investment mat karo.' },
      { type:'heading', text:'10. Children ke Liye Sukanya/PPF' },
      { type:'text', text:'Beti hai? Sukanya Samriddhi Yojana mein invest karo — 8.2% tax-free return milta hai. Ladke ke liye PPF — 7.1% aur Section 80C benefit. Both are Government backed — risk zero.' },
      { type:'tip', text:'🎓 Education Planning: Agar bachcha 5 saal ka hai, uski graduation mein 13 saal hain. Aaj se ₹3,000/month SIP start karo — ₹12-15 lakh mil sakte hain.' },
      { type:'heading', text:'11. Second Hand Kharido' },
      { type:'text', text:'Books, furniture, bicycles, gym equipment, kids toys — yeh sab second hand mein 50-70% saste milte hain. OLX aur local Facebook groups check karo. Kids ke clothes grow karte bachche jaldi out of fit ho jaate hain — second hand perfectly fine hai.' },
      { type:'heading', text:'12. Reward Points Use Karo' },
      { type:'text', text:'Credit card reward points, grocery store loyalty points — yeh use karo. Aksar ₹5,000-10,000 worth points expire ho jaate hain. Monthly check karo aur redeem karo — cash back, vouchers, air miles.' },
      { type:'heading', text:'13. DIY Repairs Sikhao' },
      { type:'text', text:'Basic ghar ki repairs — tap ka washer badalna, switch repair, wall painting — YouTube tutorials se seekho. Mechanic/plumber ko ₹200-500 dene ke bajay ₹50 mein khud karo. Skill build karo.' },
      { type:'heading', text:'14. Petrol Budget Set Karo' },
      { type:'text', text:'Petrol pe monthly limit rakho. Unnecessary trips avoid karo. Multiple kaam ek hi nikalne mein karo. Public transport ya cycling jahan possible ho. Ride sharing use karo long distances ke liye.' },
      { type:'heading', text:'15. Annual Insurance/Maintenance Expenses Ke Liye Sinking Fund' },
      { type:'text', text:'Car insurance, health checkup, home maintenance — yeh sab annual aate hain. Inhe 12 se divide karo aur har mahine alag account mein daalo. Jab bill aaye toh kharch already prepared rahega — credit card nahi lagana padega.' },
      { type:'summary', text:'In 15 tips mein se sirf 5 bhi consistently apply karo — ₹3,000-8,000 per month savings guarantee hai. Neeche Budget Planner se apna plan banao!' },
    ],
  },
  {
    id: 'income-tax-guide-salaried',
    title: 'Naukri Waalon Ke Liye Income Tax Guide — Section 80C Se ITR Tak',
    slug: 'income-tax-guide-salaried',
    category: 'business',
    emoji: '📋',
    coverColor: '#e3f2fd',
    accentColor: '#1565c0',
    readMin: 9,
    date: '2025-03-25',
    tags: ['income tax', 'itr', '80c', 'salaried', 'tax saving'],
    summary: 'Salary wale log tax kaise bachayein — 80C, HRA, medical, home loan deductions. ITR file karna kab zaroori hai aur kaise karein — beginner-friendly guide.',
    toolLink: { path:'/tools/percentage-calculator', label:'📊 Percentage Calculator', desc:'Tax percentage calculate karo' },
    content: [
      { type:'intro', text:'Har saal February-March mein investment proof submit karne ka time aata hai aur bahut se log confuse ho jaate hain. Tax kya hota hai, kaise bachayein, ITR file zaruri hai ya nahi — sab sawaalon ka jawab yahan hai. Simple language mein, bina kisi technical jargon ke.' },
      { type:'heading', text:'Tax Kab Lagta Hai? Basic Slabs' },
      { type:'text', text:'New Tax Regime 2024-25 ke hisab se: ₹3 lakh tak — koi tax nahi. ₹3-7 lakh — 5% tax. ₹7-10 lakh — 10% tax. ₹10-12 lakh — 15% tax. ₹12-15 lakh — 20% tax. ₹15 lakh+ — 30% tax. ₹7 lakh tak ke liye 87A rebate milti hai — tax zero ho sakta hai.' },
      { type:'tip', text:'💡 Old vs New Regime: Agar aapke paas home loan, HRA, 80C investments hain toh Old Regime better ho sakta hai. Dono calculate karo phir choose karo.' },
      { type:'heading', text:'Section 80C — ₹1.5 Lakh Tak Deduction' },
      { type:'text', text:'Ye old regime mein available hai. PPF, ELSS Mutual Fund, LIC premium, home loan principal, Sukanya Samriddhi, NSC, 5-year FD, children tuition fees — in sab mein ₹1.5 lakh invest karne pe taxable income ₹1.5 lakh kam ho jaati hai.' },
      { type:'heading', text:'HRA — House Rent Allowance' },
      { type:'text', text:'Agar aap rent pe rehte hain aur salary mein HRA milta hai toh yeh deduction milti hai. Minimum of: Actual HRA received, Actual rent paid minus 10% of salary, 50% of salary (metro city) ya 40% (non-metro). Rent receipts ya rent agreement zaroori hai.' },
      { type:'heading', text:'Section 80D — Health Insurance' },
      { type:'text', text:'Self + family ke liye ₹25,000 health insurance premium pe deduction. Parents ke liye aur ₹25,000 (senior citizen parents ke liye ₹50,000). Total maximum: ₹75,000 deduction.' },
      { type:'heading', text:'Home Loan Tax Benefits' },
      { type:'text', text:'Section 80C: Principal repayment ₹1.5 lakh limit mein. Section 24(b): Interest payment pe ₹2 lakh deduction (self-occupied property). First time buyer ke liye Section 80EEA mein ₹1.5 lakh extra deduction available hai.' },
      { type:'heading', text:'ITR File Karna Kab Zaroori Hai?' },
      { type:'text', text:'Annual income ₹2.5 lakh se zyada ho. Tax refund lena ho. Home loan ya visa apply karna ho. Foreign income ho. Business income ho. Deadline: July 31 (salaried employees). Late filing: ₹5,000 penalty (December tak) + interest.' },
      { type:'heading', text:'ITR Kaise File Karein?' },
      { type:'text', text:'incometax.gov.in pe jaao. Login karein (PAN + password). Form 26AS aur AIS check karein — employer ne TDS kata ya nahi. Form 16 employer se lo. ITR-1 (simple salaried) ya ITR-2 use karo. Pre-filled data verify karo aur submit karo.' },
      { type:'tip', text:'📋 Documents Ready Rakho: Form 16, Bank statements, Rent receipts, Insurance premium receipts, Home loan certificate, 80C investment proofs.' },
      { type:'heading', text:'Common Mistakes Jo Log Karte Hain' },
      { type:'text', text:'1. Investment proof submit karna bhool jaana — last minute rush. 2. Old vs New regime calculate kiye bina choose karna. 3. HRA claim karna bina rent receipt ke. 4. ITR file na karna even when income below limit — refund milega nahi. 5. Form 26AS se mismatch — TDS entry galat hona.' },
      { type:'summary', text:'Tax planning early shuru karo — April se hi. Ek CA se ek baar consult karo — ₹1,000-2,000 mein poora setup ho jaata hai. Tax bachana legal hai — iska poora fayda uthao!' },
    ],
  },
  {
    id: 'mutual-fund-beginners-guide',
    title: 'Mutual Fund Mein Invest Kaise Karein? Beginners Ke Liye Zero to SIP Guide',
    slug: 'mutual-fund-beginners-guide',
    category: 'budget',
    emoji: '📈',
    coverColor: '#e8f5e9',
    accentColor: '#0c831f',
    readMin: 8,
    date: '2025-03-28',
    tags: ['mutual fund', 'sip', 'investment', 'stock market', 'beginners'],
    summary: 'Mutual fund kya hai, kaise kaam karta hai, kahan se shuru karein — yeh beginners guide aapko zero se SIP start karne mein help karegi.',
    toolLink: { path:'/tools/loan-interest-calculator', label:'💰 Return Calculator', desc:'Investment return estimate karo' },
    content: [
      { type:'intro', text:'Bahut log sochte hain ki mutual fund sirf rich logon ke liye hai ya stock market bahut risky hai. Dono baatein galat hain. Sirf ₹500 se shuru kar sakte hain aur index funds ke through stock market ka best return le sakte hain — bina research ke.' },
      { type:'heading', text:'Mutual Fund Kya Hai?' },
      { type:'text', text:'Mutual fund ek aisi jagah hai jahan hazaron logon ka paisa ikatha hota hai aur ek professional fund manager usse stocks, bonds mein invest karta hai. Aap ek baar mein 100+ companies mein invest karte hain — risk divide ho jaata hai.' },
      { type:'heading', text:'SIP Kya Hai?' },
      { type:'text', text:'SIP (Systematic Investment Plan) matlab har mahine ek fixed amount automatically invest karna. ₹500 se shuru kar sakte hain. Auto-debit se paisa seedha account se jaata hai. Long term mein compounding ka jaadu kaam karta hai.' },
      { type:'tip', text:'🎯 Power of Compounding: ₹5,000/month, 15 saal, 12% return = ₹25 lakh+ (total investment sirf ₹9 lakh). Baaki ₹16 lakh growth se aaya!' },
      { type:'heading', text:'Kaunse Mutual Fund Choose Karein?' },
      { type:'text', text:'Beginners ke liye: Index Fund (Nifty 50 ya Sensex) — sabse safe aur consistent. Large Cap Fund — stable companies. Flexi Cap Fund — flexible allocation. Avoid karo: Small cap, sectoral funds — zyada risk, beginners ke liye nahi.' },
      { type:'heading', text:'Kahan Se Start Karein?' },
      { type:'text', text:'Zerodha Coin, Groww, Paytm Money, ET Money — sab free apps hain. PAN card aur bank account se KYC karo (10 minutes). Fund choose karo. SIP amount aur date set karo. Auto-debit activate karo.' },
      { type:'heading', text:'Direct vs Regular Plan' },
      { type:'text', text:'Direct Plan: Koi commission nahi — returns zyada. Regular Plan: Agent ke through — commission lagta hai. Hamesha Direct Plan lo — 1-1.5% zyada return milta hai jo 20 saal mein lakho ka fark padta hai.' },
      { type:'heading', text:'Tax on Mutual Funds' },
      { type:'text', text:'Equity funds: 1 saal se zyada hold karo — 10% LTCG tax (₹1 lakh above). 1 saal se kam — 15% STCG tax. Debt funds: Income tax slab ke hisab se tax lagta hai.' },
      { type:'heading', text:'Common Mistakes' },
      { type:'text', text:'1. SIP band kar dena market girne pe — yahi sabse badi galti hai. 2. Too many funds — 2-3 funds kafi hain. 4. Past returns dekh ke choose karna — future guarantee nahi. 5. Emergency fund ke bina invest karna — zaroori fund pehle.' },
      { type:'summary', text:'Aaj hi ₹500 ki SIP shuru karo — kal ka intezaar mat karo. Time hi sabse powerful investment hai. 20 saal baad khud ko shukriya bologe!' },
    ],
  },
  {
    id: 'freelancing-income-india',
    title: 'Freelancing Se Paise Kaise Kamayein? India Mein Ghar Se Kaam Ka Complete Guide',
    slug: 'freelancing-income-india',
    category: 'business',
    emoji: '💻',
    coverColor: '#f0fdf4',
    accentColor: '#0c831f',
    readMin: 8,
    date: '2025-04-01',
    tags: ['freelancing', 'work from home', 'online income', 'ghar se kaam', 'extra income'],
    summary: 'Freelancing se ₹10,000 se ₹1 lakh+ per month kama sakte hain ghar baithe. Kaunsa skill sikhein, kahan find karein clients — poora roadmap.',
    toolLink: { path:'/tools/profit-margin-calculator', label:'📈 Income Calculator', desc:'Freelancing income aur profit calculate karo' },
    content: [
      { type:'intro', text:'Freelancing matlab apni skills se kaam karna — kisi ek company ke liye nahi, alag alag clients ke liye. Internet ke through poori duniya se kaam mil sakta hai. Ek teacher, designer, writer, developer, accountant — sabke liye opportunities hain. Aur best part — ghar se, apne time pe.' },
      { type:'heading', text:'Kaunsi Skills Kaam Aati Hain?' },
      { type:'text', text:'Content writing (English/Hindi): ₹1-5 per word. Graphic design: ₹500-5000 per project. Web development: ₹10,000-1,00,000 per project. Digital marketing: ₹5,000-30,000 per month. Data entry: ₹150-300 per hour. Virtual assistant: ₹200-500 per hour. Video editing: ₹2,000-20,000 per video.' },
      { type:'tip', text:'🎯 Golden Advice: Ek skill ko bahut achha seekho. Jack of all trades nahi, master of one bano — zyada paise milenge.' },
      { type:'heading', text:'Kahan Milega Kaam?' },
      { type:'text', text:'Upwork.com — sabse bada platform, international clients. Fiverr.com — gigs based, easy to start. Freelancer.com — projects aur contests. Toptal.com — premium clients, high pay. India specific: Internshala, WorkNHire, Truelancer.' },
      { type:'heading', text:'Profile Kaise Banayein?' },
      { type:'text', text:'Professional photo (serious, clean background). Clear headline: "Hindi Content Writer | 3+ Years Experience". Skills clearly listed. Portfolio — 3-5 best work samples. Rate clearly mentioned — na zyada na kam. Reviews maango first clients se — offer free ya discounted karo.' },
      { type:'heading', text:'Pehla Client Kaise Milega?' },
      { type:'text', text:'LinkedIn pe apni profile update karo. Local businesses ko approach karo — website content, social media management. Friends aur family network mein batao. Small rate pe start karo — reputation build karo. Fiverr pe gig banao — organic clients aate hain.' },
      { type:'heading', text:'Income aur Tax' },
      { type:'text', text:'Freelancing income business income hoti hai — ITR-3 ya ITR-4 file karo. GST: ₹20 lakh se zyada annual turnover pe zaroori. Expenses claim kar sakte ho: internet, laptop, electricity, office space (portion). Advance tax bhar sakte ho quarterly.' },
      { type:'heading', text:'Payment Receive Kaise Karein?' },
      { type:'text', text:'India ke clients: UPI, bank transfer directly. International clients: PayPal, Wise (TransferWise), Payoneer — bank mein transfer karo. Payoneer sabse popular hai Indian freelancers mein.' },
      { type:'heading', text:'Scale Kaise Karein?' },
      { type:'text', text:'Regular clients banao — ek baar nahi, long term relationship. Rates badhate jao as experience grows. Outsource karo — team banao. Productize karo — templates, courses, digital products.' },
      { type:'summary', text:'Freelancing ek journey hai — pehle 3 mahine slow hote hain, phir momentum aata hai. Consistency rakho aur skills improve karte jao. Success guaranteed hai!' },
    ],
  },
  {
    id: 'adsense-approval-tips',
    title: 'Google AdSense Approval Jaldi Kaise Milega? 2025 Complete Checklist',
    slug: 'adsense-approval-tips',
    category: 'tools',
    emoji: '💰',
    coverColor: '#fff8e1',
    accentColor: '#f57f17',
    readMin: 6,
    date: '2025-04-05',
    tags: ['adsense', 'google ads', 'blog monetize', 'approval', 'website'],
    summary: 'Google AdSense ka approval 2025 mein kaafi strict ho gaya hai. Yeh checklist follow karo — rejection avoid karo aur jaldi approval pao.',
    toolLink: { path:'/tools/word-counter', label:'📝 Word Counter', desc:'Article word count check karo' },
    content: [
      { type:'intro', text:'Google AdSense se paise kamaana sabka sapna hai lekin bahut log rejection face karte hain. Rejection ke common reasons hain — thin content, policy violation, ya insufficient content. Yeh article mein woh sab hain jo Google actually dekhta hai.' },
      { type:'heading', text:'1. Content — Sabse Important' },
      { type:'text', text:'Minimum 20-30 quality articles chahiye. Har article minimum 800-1500 words ka. Unique content — copied nahi. Helpful aur informative — sirf filler nahi. Hindi ya English — dono accepted hain. Update karte raho — stale content bad signal hai.' },
      { type:'tip', text:'⚠️ Warning: 3 weeks purani nai site pe approve nahi hota. Pehle 3-6 mahine content build karo, traffic aane do, phir apply karo.' },
      { type:'heading', text:'2. Required Pages — Without These No Approval' },
      { type:'text', text:'Privacy Policy: AdSense data use ke baare mein clearly mention karo. About Us: Team ya author ke baare mein genuine information. Contact Us: Real email ya contact form. Terms of Service: Basic usage terms. Yeh pages professional lagni chahiye — basic templates se kaam nahi chalega.' },
      { type:'heading', text:'3. Technical Requirements' },
      { type:'text', text:'Custom domain zaroori hai — .blogspot ya .wordpress.com pe approval nahi milta. SSL (HTTPS) — security certificate hona chahiye. Mobile friendly design. Fast loading — 3 seconds se kam. Broken links nahi hone chahiye.' },
      { type:'heading', text:'4. Traffic — Zaruri Hai Ya Nahi?' },
      { type:'text', text:'Google officially traffic requirement nahi batata. Lekin practically 100-500 daily visitors hone chahiye. Organic traffic best hai — direct ya social bhi theek hai. Bot traffic ya fake traffic — instant permanent ban.' },
      { type:'heading', text:'5. Content Policy — Jo Nahi Hona Chahiye' },
      { type:'text', text:'Adult content. Copyrighted content. Hate speech ya violence. Misleading information. Drug, gambling related. Excessive ads from other networks. Fake news ya clickbait. Yeh sab Google ki policy violate karte hain — rejection guarantee.' },
      { type:'heading', text:'6. AdSense Application Process' },
      { type:'text', text:'adsense.google.com pe account create karo. Website URL add karo. Payment information fill karo. Verification code website pe lagao. Review ka wait karo — 1 saal se 2 hafte lag sakte hain. Approval ke baad ads.txt file add karo.' },
      { type:'heading', text:'7. After Approval — Do Aur Don\'t' },
      { type:'text', text:'Do: Content regularly update karo. Ads placement optimize karo. Performance monitor karo. Invalid click se bachao. Don\'t: Khud apne ads pe click mat karo. Family/friends ko click mat karwao. Bot traffic mat lo. Too many ads mat lagao.' },
      { type:'summary', text:'AdSense approval ek process hai — shortcut nahi. Quality content, genuine traffic, proper setup — yeh tino hain toh approval zaroor milega. Patient raho!' },
    ],
  },
  {
    id: 'haldwani-top-places-guide',
    title: 'Haldwani Mein Ghumne Ki Jagahein — Local Tourist Guide 2025',
    slug: 'haldwani-top-places-guide',
    category: 'tools',
    emoji: '🏔️',
    coverColor: '#e0f2fe',
    accentColor: '#0284c7',
    readMin: 6,
    date: '2025-04-10',
    tags: ['haldwani', 'uttarakhand', 'tourism', 'travel', 'places'],
    summary: 'Haldwani aur aas paas ke top places — Nainital, Corbett, Bhimtal, Mukteshwar. Weekend trip planning ke liye complete guide.',
    toolLink: { path: '/tools', label: '🛠️ Free Tools', desc: 'Travel ke liye calculators' },
    content: [
      { type: 'intro', text: 'Haldwani — Kumaon ka pravesh dwar. Yahan se Nainital, Jim Corbett, Bhimtal, Ranikhet — sab kuch bahut nazdeek hai. Agar aap Haldwani mein rehte hain ya yahan aane ka plan hai, toh yeh guide aapke liye hai.' },
      { type: 'heading', text: '1. Nainital — Sabse Popular Hill Station' },
      { type: 'text', text: 'Haldwani se sirf 35 km — 1 ghante ki drive. Nainital lake pe boating, Mall Road pe shopping, Snow View Point se nazara. Best time: March-June aur October-November. Tip: Weekdays mein jaao — weekend pe bahut bheed hoti hai aur parking mushkil hoti hai.' },
      { type: 'tip', text: '💡 Budget Tip: Nainital lake pe government boating sirf ₹80/person — private boats ₹300+ lete hain. Rope car bhi try karo — ₹80 mein Snow View tak.' },
      { type: 'heading', text: '2. Jim Corbett National Park' },
      { type: 'text', text: 'Haldwani se 65 km — Ramnagar ke paas. Tiger reserve — India ka oldest national park. Jeep safari ₹2,500-4,000 per jeep (6 log). Best time: November se June (monsoon mein park band rehta hai). Dhikala zone sabse popular — advance booking zaroor karo.' },
      { type: 'heading', text: '3. Bhimtal Lake' },
      { type: 'text', text: 'Haldwani se 26 km — Nainital se 10 km aage. Nainital se kam bheed, zyada shanti. Lake mein ek chhota island hai — boat se jaate hain. Aquarium bhi hai — bachon ke liye fun. Bhimeshwar Mahadev mandir bhi nearby hai.' },
      { type: 'heading', text: '4. Mukteshwar Dham' },
      { type: 'text', text: 'Haldwani se 72 km — 2,286 meter ki uchai pe. Himalayan view bahut majestic hai clear days pe. Chauli Ki Jaali — famous viewpoint. Apple orchards mein walk. IVRI (Indian Veterinary Research Institute) campus bhi visit kar sakte hain.' },
      { type: 'heading', text: '5. Haldwani Mein Hi — Local Spots' },
      { type: 'text', text: 'Gaula River bank — shaam ko bahut sundar. Sheetla Devi Mandir — purana mandir, navratri mein bahut bheed. Phool Chatti — thoda bahar, peaceful spot. Kathgodam Railway Station — historical station, pahadi train ki shuruwat yahan se. Haldwani market — sabzi mandi, Bhotia Bazar, wholesale market.' },
      { type: 'heading', text: 'Kab Jaayein — Best Time' },
      { type: 'text', text: 'Summer (April-June): Best time — na zyada garmi, na sardi. Monsoon (July-Sept): Landslide risk, roads tricky — avoid. Winter (Oct-Feb): Snow dekhhni hai toh Mukteshwar/Nainital jaao — Haldwani mein sirf thodi thandi hoti hai. Holi: Kumaoni holi — bahut unique, zaroor experience karo.' },
      { type: 'summary', text: 'Haldwani ek perfect base camp hai poore Kumaon explore karne ke liye. Weekend pe nikal jao — pehad ki hawa sab thak mitaati hai!' },
    ]
  },
  {
    id: 'jio-airtel-vi-best-recharge-2025',
    title: 'Jio vs Airtel vs Vi — Kaun Sa Recharge Plan Best Hai? 2025 Comparison',
    slug: 'jio-airtel-vi-best-recharge-2025',
    category: 'budget',
    emoji: '📱',
    coverColor: '#fef3c7',
    accentColor: '#d97706',
    readMin: 5,
    date: '2025-04-15',
    tags: ['jio', 'airtel', 'vi', 'recharge', 'mobile plan', '5g'],
    summary: 'Teen telecom companies ke plans ka honest comparison — data, validity, calling, 5G. Apne use ke hisaab se best plan choose karo.',
    toolLink: { path: '/tools/savings-calculator', label: '💰 Savings Calculator', desc: 'Monthly mobile kharch plan karo' },
    content: [
      { type: 'intro', text: 'Recharge karte waqt hamesha confusion — \"Jio wala better hai ya Airtel?\" Ya phir Vi ka offer dekha aur socha lena chahiye. Aaj teen companies ke plans honestly compare karte hain — sirf facts, koi propaganda nahi.' },
      { type: 'heading', text: 'Budget Plans — ₹200 Tak' },
      { type: 'text', text: 'Jio: ₹189 — 28 din, 2GB/day data, unlimited calling. Airtel: ₹199 — 28 din, 2GB/day, unlimited calling + 100 SMS. Vi: ₹199 — 28 din, 2GB/day, unlimited calling. Winner: Airtel (SMS bonus), close second Jio. Vi third.' },
      { type: 'tip', text: '💡 Trick: Jio ka ₹149 plan hai 24 din ka — aur 1GB/day. Student ya light user ke liye perfect. Annual total ₹2,200 tak savings ho sakti hai.' },
      { type: 'heading', text: 'Mid Range — ₹300-500' },
      { type: 'text', text: 'Jio: ₹299 — 28 din, 2GB/day + Jio apps free. Airtel: ₹349 — 28 din, 2.5GB/day + Disney+ Hotstar free (worth ₹150/month!). Vi: ₹299 — 28 din, 2GB/day + Weekend data rollover. Winner: Airtel ₹349 — Hotstar value consider karo toh best deal.' },
      { type: 'heading', text: 'Annual Plans — Sabse Zyada Savings' },
      { type: 'text', text: 'Jio: ₹2,999 — 365 din, 2.5GB/day. Airtel: ₹3,599 — 365 din, 2GB/day + Hotstar. Vi: ₹2,899 — 365 din, 2GB/day. Annual plan monthly se 15-20% sasta padta hai. Jio ki value per rupee best hai annual plan mein.' },
      { type: 'heading', text: 'Network Quality — Kaun Accha Hai?' },
      { type: 'text', text: 'Haldwani/Uttarakhand mein: Jio — sabse wide coverage, pahadon mein bhi signal. Airtel — cities mein best speed, 4G/5G strong. Vi — cities mein theek, rural mein weak. Heavy data user: Airtel best speed. Budget + coverage: Jio best value. Vi: Agar pehle se number hai toh rakho, warna switch karo.' },
      { type: 'heading', text: '5G — Kab Aayega?' },
      { type: 'text', text: '2025 tak Haldwani mein Jio aur Airtel dono 5G roll out ho raha hai. 5G plans same price mein milte hain — 5G phone chahiye. OnePlus Nord, Redmi Note series, Samsung A series — ₹15,000-25,000 mein 5G milta hai. 5G mein speeds 100-500 Mbps tak possible hai vs 4G ki 10-50 Mbps.' },
      { type: 'summary', text: 'Best deal: Airtel ₹349 (Hotstar chahiye) ya Jio annual ₹2,999 (sirf data + calling). Vi tabhi rakho jab number portability mushkil ho. Smart choose karo!' },
    ]
  },
  {
    id: 'ghar-renovation-budget-guide',
    title: 'Ghar Ka Renovation ₹50,000 Mein Kaise Karein? Complete Budget Guide',
    slug: 'ghar-renovation-budget-guide',
    category: 'budget',
    emoji: '🏠',
    coverColor: '#fce7f3',
    accentColor: '#be185d',
    readMin: 7,
    date: '2025-04-20',
    tags: ['ghar', 'renovation', 'interior', 'painting', 'budget home'],
    summary: 'Poora renovation ka sapna sirf ₹50,000 mein — plumber, electrician, painting, tiles, furniture. Kaise possible hai? Yahan complete plan hai.',
    toolLink: { path: '/tools/savings-calculator', label: '💰 Savings Calculator', desc: 'Renovation budget plan karo' },
    content: [
      { type: 'intro', text: '\"Ghar theek karwana hai lekin paise kahan hain?\" Yeh problem bahut logon ki hai. Lekin smart planning se ₹50,000 mein bhi ghar ko fresh aur naya feel kara sakte hain. Yahan step by step plan hai.' },
      { type: 'heading', text: 'Priority — Kya Pehle Karo?' },
      { type: 'text', text: 'Renovation mein pehle zaroori cheezein theek karo: Leakage/seepage (baad mein zyada kharcha hoga), Electrical wiring (safety ke liye), Plumbing issues. Phir cosmetic: Painting, flooring, furniture. Luxury last: New bathroom fittings, modular kitchen.' },
      { type: 'heading', text: '₹50,000 Budget Breakdown' },
      { type: 'text', text: 'Painting — ₹15,000 (2BHK ka andar aur bahar). Electrical fixes — ₹5,000 (switches, wiring, fan). Plumbing — ₹4,000 (taps, washers, pipe repairs). Flooring repair — ₹8,000 (tiles, grout). Furniture polish/repair — ₹5,000. Small furniture (shelf, stool) — ₹8,000. Miscellaneous — ₹5,000. Total: ₹50,000.' },
      { type: 'tip', text: '🎨 Painting Hack: Wall texture paint ki jagah simple plastic emulsion use karo — ₹3,000 mein 2BHK ho jaata hai. Texture ₹10,000+ lagta hai. Painter se direct deal karo, contractor ke through nahi — 30% save hoga.' },
      { type: 'heading', text: 'DIY Se Paise Bachao' },
      { type: 'text', text: 'Khud kar sakte ho: Wall patching/putty, Simple painting (roller se easy hai), Curtain rods lagana, Shelf assembly (IKEA style). YouTube tutorials bahut helpful hain. Ek weekend mein ₹5,000-8,000 bachaa sakte ho labor cost mein.' },
      { type: 'heading', text: 'Sasta Material Kahan Milega?' },
      { type: 'text', text: 'Haldwani mein: Govind Nagar market — electrical items saste. Bhotia Bazar — wholesale mein sab kuch. Old Bazaar — second hand furniture, excellent condition. Online (Amazon/Flipkart): Lights, fans, curtains — 40-60% saste. Tiles: Direct factory se kharido — Kashipur, Moradabad nearby hain.' },
      { type: 'heading', text: 'Loan Ya EMI Zaruri Hai?' },
      { type: 'text', text: '₹50,000 ke liye loan mat lo — interest mein ₹8,000-12,000 extra dena padega. Ek baar mein poora mat karo — room by room karo. Har mahine ₹8,000-10,000 bacha ke 5-6 mahine mein pura renovation ho sakta hai. Holi ya Diwali pe painter aur contractor rates kam karte hain — negotiate karo.' },
      { type: 'summary', text: 'Smart planning aur thodi mehnat se ₹50,000 mein ghar bilkul naya lag sakta hai. Shuru karo painting se — sab kuch badal jaata hai ek naye paint se!' },
    ]
  },
  {
    id: 'uttarakhand-government-yojana-2025',
    title: 'Uttarakhand Government Yojana 2025 — Kisaan, Mahila, Yuva Sabke Liye',
    slug: 'uttarakhand-government-yojana-2025',
    category: 'business',
    emoji: '🏛️',
    coverColor: '#dcfce7',
    accentColor: '#15803d',
    readMin: 8,
    date: '2025-04-25',
    tags: ['uttarakhand', 'government scheme', 'yojana', 'subsidy', 'kisaan', 'mahila'],
    summary: 'Uttarakhand ke government schemes jo aapke kaam aa sakti hain — farming subsidy, mahila loan, yuva startup, solar scheme. Eligibility aur apply karne ka tarika.',
    toolLink: { path: '/tools', label: '🛠️ Free Tools', desc: 'Business tools free mein' },
    content: [
      { type: 'intro', text: 'Uttarakhand sarkar har saal naye schemes laati hai — lekin zyaatar log unke baare mein jaante nahi. Kuch schemes itni achhi hain ki ₹50,000 se ₹5 lakh tak seedha fayda mil sakta hai. Yahan 2025 ki sabse important schemes hain.' },
      { type: 'heading', text: '1. Mukhyamantri Swarozgar Yojana' },
      { type: 'text', text: 'Target: Unemployed youth (18-40 years). Loan: ₹1 lakh to ₹25 lakh. Subsidy: 25% (SC/ST ke liye 35%). Repayment: 5-7 saal. Business: Manufacturing, service, trading. Apply: Nainital Bank ya State Bank branches mein DIC certificate ke saath. Document: Aadhaar, education certificate, business plan.' },
      { type: 'tip', text: '📋 Tip: DIC (District Industries Centre) se pehle approval lo — bank mein seed money 50% faster milta hai. Haldwani DIC office: Nainital Road pe hai.' },
      { type: 'heading', text: '2. Veer Chandra Singh Garhwali Tourism Yojana' },
      { type: 'text', text: 'Tourism business ke liye: Hotel, homestay, taxi, adventure sports. Loan: ₹50,000 to ₹10 lakh. Subsidy: 20-25%. Homestay sabse easy hai start karne ke liye — ₹1-2 lakh investment pe ₹15,000-30,000/month kama sakte hain. Registration Uttarakhand Tourism mein zaroori hai.' },
      { type: 'heading', text: '3. Mahila Udyam Protsahan Yojana' },
      { type: 'text', text: 'Sirf mahilaon ke liye: Self-help groups ya individual. Loan: ₹10,000 to ₹1 lakh (collateral-free). Interest: Sirf 4% (subsidized). Business: Sewing, pickle/papad, beauty parlour, tuition, handicraft. Haldwani mein KVIB (Khadi and Village Industries Board) office se contact karo.' },
      { type: 'heading', text: '4. PM Kusum Yojana — Solar Pump' },
      { type: 'text', text: 'Kisaanon ke liye solar pump. 60% subsidy — sirf 40% pay karna. 3HP, 5HP, 7.5HP pump options. Apply: Agriculture department office mein ya PM Kusum portal pe. Bijli ki jagah solar — mahine mein ₹2,000-5,000 ki bijli bachat. Uttarakhand mein abhi tak bahut kam log le chuke hain — aaj hi apply karo.' },
      { type: 'heading', text: '5. Atal Awas Yojana — Ghar Banao' },
      { type: 'text', text: 'BPL families ke liye: ₹1,30,000 grant ghar banane ke liye. Urban areas mein PMAY: ₹1.5 lakh subsidy. Rural mein PMAY-G: ₹1.2-1.3 lakh. Eligibility: Pakka ghar nahi hona chahiye. Documents: BPL card, Aadhaar, land papers. Gram Sabha ke through apply karo.' },
      { type: 'heading', text: 'Kahan Se Apply Karein?' },
      { type: 'text', text: 'District office: Nainital/Haldwani collectorate mein. Online: UK government ki site — uk.gov.in. Kaushal Vikas: Skill training + stipend. Common Service Centre (CSC): Village panchayat mein — free mein form bharte hain. Fake agents se saadhaan — government schemes ka koi agent commission nahi leta.' },
      { type: 'summary', text: 'Government schemes ka poora fayda uthaao — yeh aapka haq hai. Sahi information aur thodi mehnat se business start ya ghar banana zyada mushkil nahi. Aaj hi DIC ya bank se contact karo!' },
    ]
  },
  {
    id: 'passive-income-ideas-india-2025',
    title: 'Passive Income Ke 10 Ideas — Ghar Baith Ke Paise Kaise Kamayein 2025 Mein',
    slug: 'passive-income-ideas-india-2025',
    category: 'business',
    emoji: '💸',
    coverColor: '#eff6ff',
    accentColor: '#1d4ed8',
    readMin: 7,
    date: '2025-04-30',
    tags: ['passive income', 'online earning', 'investment', 'ghar se kaam', 'extra income'],
    summary: 'Ek kaam karo, baar baar paise aate rahein. Yeh 10 passive income ideas India mein actually kaam karte hain — realistic expectations ke saath.',
    toolLink: { path: '/tools/profit-calculator', label: '📊 Profit Calculator', desc: 'Income calculate karo' },
    content: [
      { type: 'intro', text: 'Passive income ka matlab yeh nahi ki bina kaam kiye paise aayenge. Matlab hai — ek baar karo, phir thoda kam effort pe income aati rahe. Yeh 10 ideas India mein actually work karte hain — jinhe aap part-time ya full-time kar sakte hain.' },
      { type: 'heading', text: '1. YouTube Channel' },
      { type: 'text', text: 'Topic: Jo aapko aata ho — cooking, farming, repair, education, local news. 1,000 subscribers + 4,000 watch hours ke baad monetization. Income: ₹1,000-50,000+/month (views pe depend). Hindi channels pe RPM (revenue per 1000 views): ₹30-150. Consistent content 6-12 mahine — phir income aane lagti hai.' },
      { type: 'tip', text: '📱 Local advantage: \"Haldwani\" ya \"Kumaon\" wale topics pe kam competition hai — Google aur YouTube pe jaldi rank karte hain local content.' },
      { type: 'heading', text: '2. Blog / Website Se AdSense' },
      { type: 'text', text: 'Hindi blog banao — WordPress ya Blogger pe free mein shuru hota hai. Topics: Local tips, recipes, government schemes, how-to guides. 3-6 mahine consistent likhne ke baad Google traffic aata hai. AdSense approval ke baad ₹3,000-30,000/month possible hai good traffic pe. Almenso jaisi site se seekho!' },
      { type: 'heading', text: '3. Digital Products Becho' },
      { type: 'text', text: 'Ek baar banao, baar baar becho. Examples: Excel templates (GST invoice, budget tracker), Ebooks (\"Haldwani Business Guide\"), Online courses (apni skill sikhao), Printables (calendar, planner). Platforms: Gumroad, Instamojo (India), Amazon KDP (books). ₹99-999 per product, aur hundreds of customers.' },
      { type: 'heading', text: '4. Rental Income' },
      { type: 'text', text: 'Ghar hai toh: PG chalao — Haldwani mein students aur working professionals ka demand hai. Room rent karo. Oyo/Airbnb pe register karo. Kuch nahi hai toh: Parking space rent karo, Storage space rent karo. Machinery rent karo (tractor, construction equipment).' },
      { type: 'heading', text: '5. Stock Market Dividends' },
      { type: 'text', text: '₹1-5 lakh invest karo dividend-paying stocks mein: Coal India, Power Grid, ONGC — 5-7% annual dividend. ₹2 lakh invest karke ₹10,000-14,000/year dividend aata hai. Stock price pe profit alag. Long term mein best passive income — demat account free mein Zerodha pe banaao.' },
      { type: 'heading', text: '6. Affiliate Marketing' },
      { type: 'text', text: 'Amazon, Flipkart, Meesho ke affiliate links share karo. Koi bhi product aapke link se khareedein — commission milti hai (1-10%). Blog, YouTube, WhatsApp groups pe share karo. No investment required. Kisi achhe product ka review likho aur link daalo — passive income shuru.' },
      { type: 'heading', text: '7. Fixed Deposit + Debt Mutual Fund' },
      { type: 'text', text: '₹5 lakh ki FD @ 7.5% = ₹37,500/year = ₹3,125/month. Bina kuch kiye! Senior citizens ₹10 lakh FD pe ₹75,000-80,000/year kama sakte hain. Debt mutual funds FD se 1-2% zyada return pe tax-efficient hain.' },
      { type: 'heading', text: '8. Coaching/Tuition — Scalable Banao' },
      { type: 'text', text: 'Pehle in-person padhaao. Phir recorded video classes banao — ek baar record karo, hazaron students ko becho. Udemy, Unacademy, YouTube pe upload karo. ₹299-1999 per course — 100 students = ₹30,000-2,00,000. Teacher, CA, doctor — sab ka knowledge monetize ho sakta hai.' },
      { type: 'heading', text: '9. Print-on-Demand' },
      { type: 'text', text: 'T-shirts, mugs, phone covers pe apna design — company print karke customer ko bhejti hai. Redbubble, Printify pe free mein start karo. Har sale pe ₹100-400 commission. No inventory, no upfront cost. Local themes: Uttarakhand ke pahad, local festivals — niche market hai.' },
      { type: 'heading', text: '10. Vending Machine Ya ATM' },
      { type: 'text', text: 'Thoda investment: ₹50,000-2,00,000. School, hospital, bus stand pe vending machine lagao — permission leke. ATM franchise: White label ATM — company lagaati hai aur aapko per transaction income milti hai. Haldwani mein bus stand, markets pe demand hai.' },
      { type: 'summary', text: 'Passive income ek raat mein nahi aati — 6-18 mahine consistency chahiye. Lekin ek baar setup ho jaaye toh sote waqt bhi kamaai hoti hai! Profit Calculator se estimate karo aur shuru ho jao.' },
    ]
  },
]

const CATEGORIES = [
  { id: 'all',      label: 'Sab',      emoji: '📋' },
  { id: 'bijli',    label: 'Bijli',    emoji: '⚡' },
  { id: 'business', label: 'Business', emoji: '🏪' },
  { id: 'budget',   label: 'Budget',   emoji: '💵' },
  { id: 'tools',    label: 'Tools',    emoji: '🛠️' },
]

function getReadingProgress() {
  try { return JSON.parse(localStorage.getItem('almenso_blog_read') || '[]') } catch { return [] }
}
function markRead(slug) {
  const r = getReadingProgress()
  if (!r.includes(slug)) { r.push(slug); localStorage.setItem('almenso_blog_read', JSON.stringify(r)) }
}

// ── Blog List Page ────────────────────────────────────────────
function BlogList({ articles }) {
  const navigate   = useNavigate()
  const { settings } = useSettings()
  const [cat,    setCat]    = useState('all')
  const [search, setSearch] = useState('')
  const readList = getReadingProgress()

  const filtered = useMemo(() => {
    let list = articles
    if (cat !== 'all') list = list.filter(a => a.category === cat)
    if (search) list = list.filter(a =>
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.summary.toLowerCase().includes(search.toLowerCase()) ||
      (a.tags || []).some(t => t.includes(search.toLowerCase()))
    )
    return list
  }, [articles, cat, search])

  const featured = filtered[0]
  const rest = filtered.slice(1)

  return (
    <div className="blog-page">
      {/* Hero */}
      <div className="bl-hero">
        <div className="bl-hero-eyebrow">📝 ALMENSO BLOG</div>
        <h1 className="bl-hero-title">Useful Jankari,<br/>Bilkul Free!</h1>
        <p className="bl-hero-sub">Business tips · Bijli bachat · Budget planning · Aur bahut kuch</p>
        <div className="bl-stats-row">
          <span>📚 {articles.length} Articles</span>
          <span>·</span>
          <span>✅ {readList.length} Padhe</span>
          <span>·</span>
          <span>🆓 100% Free</span>
        </div>
      </div>

      <AdSlot slot="top" style={{ margin:'0 14px 4px' }} />

      {/* Search */}
      <div className="bl-search-wrap">
        <input className="bl-search" placeholder="🔍 Article search karo..."
          value={search} onChange={e => setSearch(e.target.value)} />
      </div>

      {/* Category tabs */}
      <div className="bl-cats">
        {CATEGORIES.map(c => (
          <button key={c.id} className={`bl-cat ${cat===c.id?'active':''}`}
            onClick={() => setCat(c.id)}>
            {c.emoji} {c.label}
          </button>
        ))}
      </div>

      <div className="bl-body">

        {/* Featured article */}
        {featured && (
          <div className="bl-featured" onClick={() => navigate(`/blog/${featured.slug}`)}
            style={{ background: featured.coverColor, borderColor: featured.accentColor }}>
            <div className="blf-badge" style={{ background: featured.accentColor }}>
              {featured.emoji} Featured
            </div>
            <div className="blf-title">{featured.title}</div>
            <div className="blf-summary">{featured.summary}</div>
            <div className="blf-meta">
              <span>⏱️ {featured.readMin} min read</span>
              <span>·</span>
              <span>{new Date(featured.date).toLocaleDateString('hi-IN', { day:'numeric', month:'long', year:'numeric' })}</span>
              {readList.includes(featured.slug) && <span className="blf-read-badge">✅ Padha</span>}
            </div>
            <div className="blf-cta" style={{ color: featured.accentColor }}>
              Poora padhein →
            </div>
          </div>
        )}

        <AdSlot slot="mid" style={{ margin:'4px 0' }} />

        {/* Article grid */}
        <div className="bl-grid">
          {rest.map((article, i) => (
            <React.Fragment key={article.id}>
              <div className="bl-card" onClick={() => navigate(`/blog/${article.slug}`)}>
                <div className="blc-emoji-wrap" style={{ background: article.coverColor }}>
                  <span className="blc-emoji">{article.emoji}</span>
                </div>
                <div className="blc-body">
                  <div className="blc-cat" style={{ color: article.accentColor }}>
                    {CATEGORIES.find(c => c.id === article.category)?.label || article.category}
                  </div>
                  <div className="blc-title">{article.title}</div>
                  <div className="blc-summary">{article.summary}</div>
                  <div className="blc-meta">
                    <span>⏱️ {article.readMin} min</span>
                    {readList.includes(article.slug) && <span className="blc-read">✅ Padha</span>}
                  </div>
                </div>
              </div>
              {i === 2 && <AdSlot slot="mid" style={{ gridColumn:'1/-1', margin:'4px 0' }} />}
            </React.Fragment>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="bl-empty">
            🔍 Koi article nahi mila — kuch aur search karo
          </div>
        )}

        <AdSlot slot="bottom" style={{ margin:'4px 0 20px' }} />
      </div>
    </div>
  )
}

// ── Single Article Page ───────────────────────────────────────
function BlogArticle({ articles }) {
  const { slug } = useParams()
  const navigate  = useNavigate()
  const { settings } = useSettings()

  const article = articles.find(a => a.slug === slug)

  const [scrollPct, setScrollPct] = React.useState(0)

  React.useEffect(() => {
    if (article) markRead(article.slug)
    window.scrollTo(0, 0)
  }, [slug])

  React.useEffect(() => {
    const onScroll = () => {
      const el  = document.documentElement
      const pct = (el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100
      setScrollPct(Math.min(100, Math.max(0, pct)))
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!article) return (
    <div className="blog-page">
      <div style={{ padding:'60px 20px', textAlign:'center' }}>
        <div style={{ fontSize:'3rem', marginBottom:12 }}>🔍</div>
        <div style={{ fontWeight:800, fontSize:'1.1rem', marginBottom:8 }}>Article nahi mila</div>
        <button className="bl-back-btn" onClick={() => navigate('/blog')}>← Blog pe wapas jao</button>
      </div>
    </div>
  )

  const related = articles.filter(a => a.category === article.category && a.slug !== slug).slice(0, 2)

  return (
    <div className="blog-page">

      {/* Dynamic SEO — Google aur AdSense ke liye zaroori */}
      <SEOHead
        title={article.title}
        description={article.summary}
        keywords={(article.tags || []).join(', ')}
      />

      {/* Reading Progress Bar */}
      <div style={{ position:'fixed', top:0, left:0, height:3, width:`${scrollPct}%`,
        background:'linear-gradient(90deg,#0c831f,#22c55e)', zIndex:9999,
        transition:'width 0.1s', borderRadius:'0 99px 99px 0' }} />

      {/* Article hero */}
      <div className="ba-hero" style={{ background: article.coverColor }}>
        <button className="ba-back" onClick={() => navigate('/blog')}>← Blog</button>
        <div className="ba-emoji">{article.emoji}</div>
        <div className="ba-cat" style={{ color: article.accentColor }}>
          {CATEGORIES.find(c => c.id === article.category)?.label}
        </div>
        <h1 className="ba-title">{article.title}</h1>
        <div className="ba-meta">
          <span>⏱️ {article.readMin} min read</span>
          <span>·</span>
          <span>{new Date(article.date).toLocaleDateString('hi-IN', { day:'numeric', month:'long', year:'numeric' })}</span>
          <span>·</span>
          <span>✍️ {settings.storeName || 'Almenso'}</span>
        </div>
      </div>

      <AdSlot slot="top" style={{ margin:'0 14px 4px' }} />

      {/* Tags */}
      <div className="ba-tags">
        {(article.tags||[]).map(t => (
          <span key={t} className="ba-tag">#{t}</span>
        ))}
      </div>

      {/* Table of Contents */}
      {article.content && Array.isArray(article.content) && article.content.filter(b=>b.type==='heading').length > 2 && (
        <div style={{ margin:'0 14px 12px', background:'#f8fafc', border:'1.5px solid #e2e8f0', borderRadius:12, padding:'14px' }}>
          <div style={{ fontWeight:900, fontSize:'0.82rem', marginBottom:10, color:'#374151' }}>📋 Is Article Mein</div>
          <ol style={{ margin:0, padding:'0 0 0 18px', display:'flex', flexDirection:'column', gap:5 }}>
            {article.content.filter(b=>b.type==='heading').map((b,i) => (
              <li key={i} style={{ fontSize:'0.78rem', color:'#0c831f', fontWeight:600, lineHeight:1.4 }}>{b.text}</li>
            ))}
          </ol>
        </div>
      )}

      {/* Article content */}
      <div className="ba-content">
        {typeof article.content === 'string' ? (
          <div className="bac-html-content"
            dangerouslySetInnerHTML={{ __html: article.content }} />
        ) : Array.isArray(article.content) ? article.content.map((block, i) => {
          if (block.type === 'intro')   return <p  key={i} className="bac-intro">{block.text}</p>
          if (block.type === 'heading') return <h2 key={i} className="bac-h2" style={{ color: article.accentColor }}>{block.text}</h2>
          if (block.type === 'text')    return <p  key={i} className="bac-text">{block.text}</p>
          if (block.type === 'tip')     return (
            <div key={i} className="bac-tip" style={{ borderColor: article.accentColor, background: article.coverColor }}>
              {block.text}
            </div>
          )
          if (block.type === 'summary') return (
            <div key={i} className="bac-summary">
              <div className="bacs-text">{block.text}</div>
            </div>
          )
          return null
        }) : null}
      </div>

      {/* Author Section — AdSense trust signal */}
      <div style={{ margin:'4px 14px', background:'#f0fdf4', border:'1.5px solid #86efac', borderRadius:14, padding:'14px', display:'flex', alignItems:'center', gap:12 }}>
        <div style={{ width:44, height:44, borderRadius:'50%', background:'linear-gradient(135deg,#0c831f,#16a34a)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.4rem', flexShrink:0 }}>
          ✍️
        </div>
        <div>
          <div style={{ fontWeight:900, fontSize:'0.85rem', color:'#1a1a1a' }}>Almenso Team</div>
          <div style={{ fontSize:'0.72rem', color:'#666', lineHeight:1.4 }}>Haldwani ke local business experts · Finance aur digital tools mein specialization</div>
        </div>
      </div>

      {/* Tool CTA — Tools se connect */}
      {article.toolLink && (
        <div className="ba-tool-cta" style={{ borderColor: article.accentColor }}
          onClick={() => navigate(article.toolLink.path)}>
          <div className="batc-left">
            <div className="batc-label" style={{ color: article.accentColor }}>🛠️ Free Tool</div>
            <div className="batc-name">{article.toolLink.label}</div>
            <div className="batc-desc">{article.toolLink.desc}</div>
          </div>
          <div className="batc-arrow" style={{ background: article.accentColor }}>→</div>
        </div>
      )}

      <AdSlot slot="mid" style={{ margin:'0 14px 4px' }} />

      {/* Share */}
      <div className="ba-share">
        <div className="bas-title">📤 Dosto Ko Share Karo</div>
        <div className="bas-btns">
          <button className="bas-btn wa" onClick={() => {
            const text = `${article.title}\n\n${article.summary}\n\n${window.location.origin}/blog/${article.slug}`
            window.open('https://wa.me/?text=' + encodeURIComponent(text), '_blank')
          }}>💬 WhatsApp</button>
          <button className="bas-btn copy" onClick={() => {
            navigator.clipboard.writeText(window.location.origin + '/blog/' + article.slug)
            alert('Link copy ho gaya!')
          }}>🔗 Link Copy</button>
        </div>
      </div>

      {/* Related articles */}
      {related.length > 0 && (
        <div className="ba-related">
          <div className="bar-title">📚 Yeh Bhi Padhein</div>
          {related.map(r => (
            <div key={r.id} className="bar-card" onClick={() => { navigate(`/blog/${r.slug}`); window.scrollTo(0,0) }}>
              <span className="bar-emoji" style={{ background: r.coverColor }}>{r.emoji}</span>
              <div>
                <div className="bar-name">{r.title}</div>
                <div className="bar-min">⏱️ {r.readMin} min read</div>
              </div>
            </div>
          ))}
        </div>
      )}

      <AdSlot slot="mid" style={{ margin:'0 14px 4px' }} />

      {/* Affiliate Products — contextual based on article topic */}
      <div style={{ margin:'0 14px 8px' }}>
        {(() => {
          const cat = article.category === 'bijli' || article.category === 'solar' ? 'electrical'
            : article.category === 'business' ? 'finance'
            : article.category === 'health' ? 'health'
            : article.category === 'tech' ? 'tech'
            : 'general'
          return <RelatedProducts category={cat} limit={3} />
        })()}
      </div>

      {/* Related Tools Grid — from InterlinkedWidget */}
      <div style={{ margin:'0 14px 8px' }}>
        <RelatedToolsGrid toolPath={ARTICLE_TOOL_MAP[article.slug] || '/tools'} />
      </div>

      <AdSlot slot="bottom" style={{ margin:'0 14px 20px' }} />

    </div>
  )
}

// ── Main Export — Route handler ───────────────────────────────
export default function BlogPage() {
  const { settings } = useSettings()
  const { slug } = useParams()

  // Admin se add kiye articles + default articles merge
  const adminArticles = settings?.blogArticles || []
  const allArticles = [
    ...adminArticles,
    ...DEFAULT_ARTICLES.filter(d => !adminArticles.find(a => a.slug === d.slug))
  ].sort((a, b) => new Date(b.date) - new Date(a.date))

  if (slug) return <BlogArticle articles={allArticles} />
  return <BlogList articles={allArticles} />
}
