import React, { useState, useEffect, Suspense, lazy } from "react";
import {
  HashRouter,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { SettingsProvider } from "./context/SettingsContext";
import { ThemeProvider } from "./context/ThemeContext";
import { LanguageProvider } from "./context/LanguageContext";
import ErrorBoundary from "./components/ErrorBoundary";
import "./styles/index.css";
import "./styles/App.css";

// ── Critical — always loaded (above the fold) ─────────────────
import HomePage from "./pages/HomePage";
import TopNav from "./components/TopNav";
import MobileNav from "./components/MobileNav";
import Footer from "./components/Footer";

// ── Deferred — load after main content ───────────────────────
const PWAInstallPrompt = lazy(() => import("./components/PWAInstallPrompt"));
const WhatsAppButton = lazy(() => import("./components/WhatsAppButton"));
const CookieConsent = lazy(() => import("./components/CookieConsent"));
const DownloadAppModal = lazy(() => import("./components/DownloadAppModal"));
const ScrollToTop = lazy(() => import("./components/ScrollToTop"));

// ── Core Pages ────────────────────────────────────────────────
const ToolsPage = lazy(() => import("./pages/ToolsPage"));
const BlogPage = lazy(() => import("./pages/BlogPage"));
const ArticlePage = lazy(() => import("./pages/ArticlePage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const PrivacyPage = lazy(() => import("./pages/PrivacyPolicy"));
const TermsPage = lazy(() => import("./pages/TermsPage"));
const DisclaimerPage = lazy(() => import("./pages/DisclaimerPage"));
const AdminPage = lazy(() => import("./pages/AdminPage"));
const AnalyticsDashboard = lazy(() => import("./pages/AnalyticsDashboard"));

// ── Service & Lead Pages ──────────────────────────────────────
const ElectricianPage = lazy(() => import("./pages/ElectricianPageV2"));
const SolarPage = lazy(() => import("./pages/SolarPage"));
const InteriorPage = lazy(() => import("./pages/InteriorPage"));
const ProductsPage = lazy(() => import("./pages/ProductsPage"));
const ServicesPage = lazy(() => import("./pages/ServicesPage"));

// ── Templates (tools) ─────────────────────────────────────────
const ResumeTemplate = lazy(() => import("./pages/templates/ResumeTemplate"));
const InstagramBioTemplate = lazy(
  () => import("./pages/templates/InstagramBioTemplate"),
);
const YouTubeDescriptionTemplate = lazy(
  () => import("./pages/templates/YouTubeDescriptionTemplate"),
);

// ── Calculators ───────────────────────────────────────────────
const CalculatorsPage = lazy(
  () => import("./pages/tools/calculators/Calculators"),
);
const CalculatorRouter = lazy(
  () => import("./pages/tools/calculators/CalculatorRouter"),
);
const GSTCalculator = lazy(
  () => import("./pages/tools/calculators/GSTCalculator"),
);
const EMICalculator = lazy(
  () => import("./pages/tools/calculators/EMICalculator"),
);
const DiscountCalculator = lazy(
  () => import("./pages/tools/calculators/DiscountCalculator"),
);
const InterestCalculator = lazy(
  () => import("./pages/tools/calculators/InterestCalculator"),
);
const LoanCalculator = lazy(
  () => import("./pages/tools/calculators/LoanCalculator"),
);
const ProfitMarginCalculator = lazy(
  () => import("./pages/tools/calculators/ProfitMarginCalculator"),
);
const PercentageIncreaseCalculator = lazy(
  () => import("./pages/tools/calculators/PercentageIncreaseCalculator"),
);
const PercentageDecreaseCalculator = lazy(
  () => import("./pages/tools/calculators/PercentageDecreaseCalculator"),
);
const SimpleInterestCalculator = lazy(
  () => import("./pages/tools/calculators/SimpleInterestCalculator"),
);
const CompoundInterestCalculator = lazy(
  () => import("./pages/tools/calculators/CompoundInterestCalculator"),
);
const SalaryCalculator = lazy(
  () => import("./pages/tools/calculators/SalaryCalculator"),
);
const TipCalculator = lazy(
  () => import("./pages/tools/calculators/TipCalculator"),
);
const UnitPriceCalculator = lazy(
  () => import("./pages/tools/calculators/UnitPriceCalculator"),
);
const BMICalculator = lazy(
  () => import("./pages/tools/calculators/BMICalculator"),
);
const BMRCalculator = lazy(
  () => import("./pages/tools/calculators/BMRCalculator"),
);
const IdealWeightCalculator = lazy(
  () => import("./pages/tools/calculators/IdealWeightCalculator"),
);
const AgeDifferenceCalculator = lazy(
  () => import("./pages/tools/calculators/AgeDifferenceCalculator"),
);
const DateDurationCalculator = lazy(
  () => import("./pages/tools/calculators/DateDurationCalculator"),
);
const TimeDurationCalculator = lazy(
  () => import("./pages/tools/calculators/TimeDurationCalculator"),
);
const WorkHoursCalculator = lazy(
  () => import("./pages/tools/calculators/WorkHoursCalculator"),
);
const SpeedCalculator = lazy(
  () => import("./pages/tools/calculators/SpeedCalculator"),
);
const DistanceCalculator = lazy(
  () => import("./pages/tools/calculators/DistanceCalculator"),
);
const FuelCostCalculator = lazy(
  () => import("./pages/tools/calculators/FuelCostCalculator"),
);
const AgeCalculator = lazy(
  () => import("./pages/tools/calculators/AgeCalculator"),
);
const PercentageCalculator = lazy(
  () => import("./pages/tools/calculators/PercentageCalculator"),
);
const ProfitCalculator = lazy(
  () => import("./pages/tools/calculators/ProfitCalculator"),
);
const ROICalculator = lazy(
  () => import("./pages/tools/calculators/ROICalculator"),
);
const BreakEvenCalculator = lazy(
  () => import("./pages/tools/calculators/BreakEvenCalculator"),
);
const CommissionCalculator = lazy(
  () => import("./pages/tools/calculators/CommissionCalculator"),
);
const MarkupCalculator = lazy(
  () => import("./pages/tools/calculators/MarkupCalculator"),
);
const MarginCalculator = lazy(
  () => import("./pages/tools/calculators/MarginCalculator"),
);
const SavingsCalculator = lazy(
  () => import("./pages/tools/calculators/SavingsCalculator"),
);
const InvestmentReturnCalculator = lazy(
  () => import("./pages/tools/calculators/InvestmentReturnCalculator"),
);
const LoanInterestCalculator = lazy(
  () => import("./pages/tools/calculators/LoanInterestCalculator"),
);
const CreditCardInterestCalculator = lazy(
  () => import("./pages/tools/calculators/CreditCardInterestCalculator"),
);
const PercentageDifferenceCalculator = lazy(
  () => import("./pages/tools/calculators/PercentageDifferenceCalculator"),
);
const PercentageChangeCalculator = lazy(
  () => import("./pages/tools/calculators/PercentageChangeCalculator"),
);
const AverageCalculator = lazy(
  () => import("./pages/tools/calculators/AverageCalculator"),
);
const RatioCalculator = lazy(
  () => import("./pages/tools/calculators/RatioCalculator"),
);
const FractionCalculator = lazy(
  () => import("./pages/tools/calculators/FractionCalculator"),
);
const SquareRootCalculator = lazy(
  () => import("./pages/tools/calculators/SquareRootCalculator"),
);
const CubeCalculator = lazy(
  () => import("./pages/tools/calculators/CubeCalculator"),
);
const RandomNumberGenerator = lazy(
  () => import("./pages/tools/calculators/RandomNumberGenerator"),
);
const ScientificCalculator = lazy(
  () => import("./pages/tools/calculators/ScientificCalculator"),
);
const BinaryConverter = lazy(
  () => import("./pages/tools/calculators/BinaryConverter"),
);
const ConcreteCalculator = lazy(
  () => import("./pages/tools/calculators/ConcreteCalculator"),
);
const PaintCalculator = lazy(
  () => import("./pages/tools/calculators/PaintCalculator"),
);
const TileCalculator = lazy(
  () => import("./pages/tools/calculators/TileCalculator"),
);
const FlooringCalculator = lazy(
  () => import("./pages/tools/calculators/FlooringCalculator"),
);
const BrickCalculator = lazy(
  () => import("./pages/tools/calculators/BrickCalculator"),
);
const AsphaltCalculator = lazy(
  () => import("./pages/tools/calculators/AsphaltCalculator"),
);
const RoofingCalculator = lazy(
  () => import("./pages/tools/calculators/RoofingCalculator"),
);
const StairCalculator = lazy(
  () => import("./pages/tools/calculators/StairCalculator"),
);
const GravelCalculator = lazy(
  () => import("./pages/tools/calculators/GravelCalculator"),
);
const SandCalculator = lazy(
  () => import("./pages/tools/calculators/SandCalculator"),
);
const PowerConsumptionCalculator = lazy(
  () => import("./pages/tools/calculators/PowerConsumptionCalculator"),
);
const VoltageDropCalculator = lazy(
  () => import("./pages/tools/calculators/VoltageDropCalculator"),
);
const BatteryBackupCalculator = lazy(
  () => import("./pages/tools/calculators/BatteryBackupCalculator"),
);
const SolarPanelCalculator = lazy(
  () => import("./pages/tools/calculators/SolarPanelCalculator"),
);
const ElectricityBillCalculator = lazy(
  () => import("./pages/tools/calculators/ElectricityBillCalculator"),
);
const ElectricityCostCalculator = lazy(
  () => import("./pages/tools/calculators/ElectricityCostCalculator"),
);

// ── Converters ────────────────────────────────────────────────
const LengthConverterTool = lazy(
  () => import("./pages/tools/converters/LengthConverter"),
);
const WeightConverterTool = lazy(
  () => import("./pages/tools/converters/WeightConverter"),
);
const TemperatureConverterTool = lazy(
  () => import("./pages/tools/converters/TemperatureConverter"),
);
const AreaConverterTool = lazy(
  () => import("./pages/tools/converters/AreaConverter"),
);
const VolumeConverterTool = lazy(
  () => import("./pages/tools/converters/VolumeConverter"),
);
const SpeedConverterTool = lazy(
  () => import("./pages/tools/converters/SpeedConverter"),
);
const TimeConverterTool = lazy(
  () => import("./pages/tools/converters/TimeConverter"),
);
const DataStorageConverterTool = lazy(
  () => import("./pages/tools/converters/DataStorageConverter"),
);
const PressureConverterTool = lazy(
  () => import("./pages/tools/converters/PressureConverter"),
);
const EnergyConverterTool = lazy(
  () => import("./pages/tools/converters/EnergyConverter"),
);
const PowerConverterTool = lazy(
  () => import("./pages/tools/converters/PowerConverter"),
);
const AngleConverterTool = lazy(
  () => import("./pages/tools/converters/AngleConverter"),
);
const CurrencyConverterTool = lazy(
  () => import("./pages/tools/converters/CurrencyConverter"),
);
const FuelEfficiencyConverterTool = lazy(
  () => import("./pages/tools/converters/FuelEfficiencyConverter"),
);
const DensityConverterTool = lazy(
  () => import("./pages/tools/converters/DensityConverter"),
);

// ── Image Tools ───────────────────────────────────────────────
const ImageCompressor = lazy(() => import("./pages/tools/ImageCompressor"));
const ImageResizer = lazy(() => import("./pages/tools/ImageResizer"));
const ImageFormatConverter = lazy(
  () => import("./pages/tools/ImageFormatConverter"),
);
const ImageCropper = lazy(
  () => import("./pages/tools/image-tools/ImageCropper"),
);
const ImageConverter = lazy(
  () => import("./pages/tools/image-tools/ImageConverter"),
);
const BackgroundRemover = lazy(
  () => import("./pages/tools/image-tools/BackgroundRemover"),
);
const ImageRotator = lazy(
  () => import("./pages/tools/image-tools/ImageRotator"),
);
const ImageFlipper = lazy(
  () => import("./pages/tools/image-tools/ImageFlipper"),
);
const ImageWatermark = lazy(
  () => import("./pages/tools/image-tools/ImageWatermark"),
);
const ImageBlurTool = lazy(
  () => import("./pages/tools/image-tools/ImageBlurTool"),
);
const ImageSharpenTool = lazy(
  () => import("./pages/tools/image-tools/ImageSharpenTool"),
);
const ImageBrightnessAdjuster = lazy(
  () => import("./pages/tools/image-tools/ImageBrightnessAdjuster"),
);
const ImageContrastAdjuster = lazy(
  () => import("./pages/tools/image-tools/ImageContrastAdjuster"),
);
const ImageSaturationTool = lazy(
  () => import("./pages/tools/image-tools/ImageSaturationTool"),
);
const ImageGrayscaleConverter = lazy(
  () => import("./pages/tools/image-tools/ImageGrayscaleConverter"),
);
const ImageBorderTool = lazy(
  () => import("./pages/tools/image-tools/ImageBorderTool"),
);
const ImageCollageMaker = lazy(
  () => import("./pages/tools/image-tools/ImageCollageMaker"),
);
const ScreenshotToImageConverter = lazy(
  () => import("./pages/tools/image-tools/ScreenshotToImageConverter"),
);
const Base64ImageEncoder = lazy(
  () => import("./pages/tools/image-tools/Base64ImageEncoder"),
);
const Base64ImageDecoder = lazy(
  () => import("./pages/tools/image-tools/Base64ImageDecoder"),
);
const ImageMetadataViewer = lazy(
  () => import("./pages/tools/image-tools/ImageMetadataViewer"),
);

// ── Text Tools ────────────────────────────────────────────────
const WordCounter = lazy(() => import("./pages/tools/text-tools/WordCounter"));
const CharacterCounter = lazy(
  () => import("./pages/tools/text-tools/CharacterCounter"),
);
const SentenceCounter = lazy(
  () => import("./pages/tools/text-tools/SentenceCounter"),
);
const ParagraphCounter = lazy(
  () => import("./pages/tools/text-tools/ParagraphCounter"),
);
const TextCaseConverter = lazy(
  () => import("./pages/tools/text-tools/TextCaseConverter"),
);
const UppercaseConverter = lazy(
  () => import("./pages/tools/text-tools/UppercaseConverter"),
);
const LowercaseConverter = lazy(
  () => import("./pages/tools/text-tools/LowercaseConverter"),
);
const TitleCaseConverter = lazy(
  () => import("./pages/tools/text-tools/TitleCaseConverter"),
);
const CapitalizeText = lazy(
  () => import("./pages/tools/text-tools/CapitalizeText"),
);
const TextReverser = lazy(
  () => import("./pages/tools/text-tools/TextReverser"),
);
const RemoveDuplicateLines = lazy(
  () => import("./pages/tools/text-tools/RemoveDuplicateLines"),
);
const RemoveExtraSpaces = lazy(
  () => import("./pages/tools/text-tools/RemoveExtraSpaces"),
);
const TextSorter = lazy(() => import("./pages/tools/text-tools/TextSorter"));
const RandomTextGenerator = lazy(
  () => import("./pages/tools/text-tools/RandomTextGenerator"),
);
const TextToSlugConverter = lazy(
  () => import("./pages/tools/text-tools/TextToSlugConverter"),
);
const TextToHTMLConverter = lazy(
  () => import("./pages/tools/text-tools/TextToHTMLConverter"),
);
const HTMLToTextConverter = lazy(
  () => import("./pages/tools/text-tools/HTMLToTextConverter"),
);
const TextDiffChecker = lazy(
  () => import("./pages/tools/text-tools/TextDiffChecker"),
);
const LineCounter = lazy(() => import("./pages/tools/text-tools/LineCounter"));
const LoremIpsumGenerator = lazy(
  () => import("./pages/tools/text-tools/LoremIpsumGenerator"),
);

// ── Generators ────────────────────────────────────────────────
const AIPromptGenerator = lazy(() => import("./pages/tools/AIPromptGenerator"));
const ContentIdeaGenerator = lazy(
  () => import("./pages/tools/ContentIdeaGenerator"),
);
const YouTubeTitleGenerator = lazy(
  () => import("./pages/tools/YouTubeTitleGenerator"),
);
const YouTubeThumbnailExtractor = lazy(
  () => import("./pages/tools/YouTubeThumbnailExtractor"),
);
const InstagramCaptionGenerator = lazy(
  () => import("./pages/tools/InstagramCaptionGenerator"),
);
const HashtagGenerator = lazy(() => import("./pages/tools/HashtagGenerator"));
const PasswordGenerator = lazy(() => import("./pages/tools/PasswordGenerator"));
const UsernameGenerator = lazy(
  () => import("./pages/tools/generators/UsernameGenerator"),
);
const BusinessNameGenerator = lazy(
  () => import("./pages/tools/generators/BusinessNameGenerator"),
);
const DomainNameGenerator = lazy(
  () => import("./pages/tools/generators/DomainNameGenerator"),
);
const YouTubeDescriptionGenerator = lazy(
  () => import("./pages/tools/generators/YouTubeDescriptionGenerator"),
);
const InstagramBioGenerator = lazy(
  () => import("./pages/tools/generators/InstagramBioGenerator"),
);
const RandomNameGenerator = lazy(
  () => import("./pages/tools/generators/RandomNameGenerator"),
);
const RandomPasswordGenerator = lazy(
  () => import("./pages/tools/generators/RandomPasswordGenerator"),
);
const FakeAddressGenerator = lazy(
  () => import("./pages/tools/generators/FakeAddressGenerator"),
);
const FakeEmailGenerator = lazy(
  () => import("./pages/tools/generators/FakeEmailGenerator"),
);
const ColorPaletteGenerator = lazy(
  () => import("./pages/tools/generators/ColorPaletteGenerator"),
);
const GradientGenerator = lazy(
  () => import("./pages/tools/generators/GradientGenerator"),
);
const SlugGenerator = lazy(
  () => import("./pages/tools/generators/SlugGenerator"),
);

// ── Other Tools ───────────────────────────────────────────────
const ElectricityBillAnalyzer = lazy(
  () => import("./pages/tools/ElectricityBillAnalyzer"),
);
const InverterLoadPlanner = lazy(
  () => import("./pages/tools/InverterLoadPlanner"),
);
const SolarROICalculator = lazy(
  () => import("./pages/tools/SolarROICalculator"),
);
const PowerConsumptionPlanner = lazy(
  () => import("./pages/tools/PowerConsumptionPlanner"),
);
const WireSizeCalculator = lazy(
  () => import("./pages/tools/WireSizeCalculator"),
);
const AppliancePowerCalc = lazy(
  () => import("./pages/tools/AppliancePowerConsumptionCalculator"),
);
const WebsitePerformanceAnalyzer = lazy(
  () => import("./pages/tools/WebsitePerformanceAnalyzer"),
);
const UnitConverter = lazy(() => import("./pages/tools/UnitConverter"));
const OtherTools = lazy(() => import("./pages/tools/OtherTools"));
const ToolsDirectory = lazy(() => import("./pages/ToolsDirectory"));

// ── Admin path ────────────────────────────────────────────────
function getAdminPath() {
  try {
    const saved = localStorage.getItem("almenso_admin_path");
    return saved || "ab43d21a8";
  } catch (e) {
    // localStorage might not be available in some envs
    return "ab43d21a8";
  }
}

// ── Page Loader ───────────────────────────────────────────────
function PageLoader() {
  return (
    <div className="page-loader">
      <div className="pl-spinner" />
      <div className="pl-text">Loading...</div>
    </div>
  );
}

// ── 404 ──────────────────────────────────────────────────────
function NotFound() {
  const nav = useNavigate();
  return (
    <div
      style={{
        minHeight: "70vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        textAlign: "center",
      }}
    >
      <div style={{ fontSize: "4rem", marginBottom: 16 }}>🔍</div>
      <h1 style={{ fontSize: "1.8rem", fontWeight: 900, marginBottom: 8 }}>
        404 — Page Nahi Mila
      </h1>
      <p
        style={{
          color: "#64748b",
          marginBottom: 24,
          maxWidth: 340,
          lineHeight: 1.7,
        }}
      >
        Yeh page exist nahi karta. Ghabrao mat — home pe wapas chalo!
      </p>
      <button
        onClick={() => nav("/")}
        style={{
          background: "#0f8a1f",
          color: "#fff",
          border: "none",
          padding: "12px 28px",
          borderRadius: 99,
          fontWeight: 800,
          fontSize: "0.9rem",
          cursor: "pointer",
        }}
      >
        🏠 Home Pe Jao
      </button>
      <div
        style={{
          marginTop: 28,
          display: "flex",
          gap: 12,
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {[
          ["🛠️ Tools", "/tools"],
          ["⚡ Electrician", "/electrician-haldwani"],
          ["☀️ Solar", "/solar-solutions"],
          ["📝 Blog", "/blog"],
        ].map(([l, h]) => (
          <a
            key={h}
            href={h}
            style={{
              padding: "7px 16px",
              borderRadius: 99,
              background: "#fff",
              border: "1.5px solid #e2e8f0",
              color: "#334155",
              fontSize: "0.8rem",
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            {l}
          </a>
        ))}
      </div>
    </div>
  );
}

function OtherToolWrapper({ name }) {
  return <OtherTools toolName={name} />;
}

// ── Layout ────────────────────────────────────────────────────
function Layout() {
  const adminPath = getAdminPath();
  const location = useLocation();
  const isAdmin =
    location.pathname.startsWith("/" + adminPath) ||
    location.pathname.startsWith("/admin-panel");
  const isAdminSubdomain = window.location.hostname.startsWith("admin.");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    // GA4 — track page view on every route change (SPA)
    if (typeof window.__ga_track === "function") {
      window.__ga_track(location.pathname, document.title);
    }
  }, [location.pathname]);

  if (isAdmin || isAdminSubdomain) {
    return (
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path={`/${adminPath}`} element={<AdminPage />} />
          <Route path="/admin-panel" element={<AdminPage />} />
          <Route path="/" element={<AdminPage />} />
          <Route path="*" element={<AdminPage />} />
        </Routes>
      </Suspense>
    );
  }

  return (
    <div className="app-root">
      <TopNav />
      <main className="main-content">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* ── Core ── */}
            <Route path="/" element={<HomePage />} />
            <Route path="/tools" element={<ToolsPage />} />
            <Route path="/tools/calculators" element={<CalculatorsPage />} />
            <Route path="/tools/:calculator" element={<CalculatorRouter />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogPage />} />
            <Route path="/article/:slug" element={<ArticlePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/privacy-policy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/disclaimer" element={<DisclaimerPage />} />
            <Route path="/tools-directory" element={<ToolsDirectory />} />

            {/* ── Services ── */}
            <Route path="/electrician-haldwani" element={<ElectricianPage />} />
            <Route path="/solar-solutions" element={<SolarPage />} />
            <Route path="/interior-design" element={<InteriorPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/services" element={<ServicesPage />} />

            {/* ── Templates ── */}
            <Route
              path="/templates/resume-template"
              element={<ResumeTemplate />}
            />
            <Route
              path="/templates/instagram-bio-template"
              element={<InstagramBioTemplate />}
            />
            <Route
              path="/templates/youtube-description-template"
              element={<YouTubeDescriptionTemplate />}
            />

            {/* ── Bijli / Electricity Tools ── */}
            <Route path="/tools/bijli" element={<ElectricityBillAnalyzer />} />
            <Route
              path="/tools/electricity-bill-analyzer"
              element={<ElectricityBillAnalyzer />}
            />
            <Route
              path="/tools/inverter-load-planner"
              element={<InverterLoadPlanner />}
            />
            <Route path="/tools/solar-roi" element={<SolarROICalculator />} />
            <Route
              path="/tools/power-consumption-planner"
              element={<PowerConsumptionPlanner />}
            />
            <Route
              path="/tools/wire-size-calculator"
              element={<WireSizeCalculator />}
            />
            <Route
              path="/tools/appliance-power-calculator"
              element={<AppliancePowerCalc />}
            />

            {/* ── Calculators ── */}
            <Route path="/tools/gst-calculator" element={<GSTCalculator />} />
            <Route path="/tools/emi-calculator" element={<EMICalculator />} />
            <Route path="/tools/loan-calculator" element={<LoanCalculator />} />
            <Route
              path="/tools/discount-calculator"
              element={<DiscountCalculator />}
            />
            <Route
              path="/tools/interest-calculator"
              element={<InterestCalculator />}
            />
            <Route
              path="/tools/profit-margin-calculator"
              element={<ProfitMarginCalculator />}
            />
            <Route
              path="/tools/percentage-increase-calculator"
              element={<PercentageIncreaseCalculator />}
            />
            <Route
              path="/tools/percentage-decrease-calculator"
              element={<PercentageDecreaseCalculator />}
            />
            <Route
              path="/tools/simple-interest-calculator"
              element={<SimpleInterestCalculator />}
            />
            <Route
              path="/tools/compound-interest-calculator"
              element={<CompoundInterestCalculator />}
            />
            <Route
              path="/tools/salary-calculator"
              element={<SalaryCalculator />}
            />
            <Route path="/tools/tip-calculator" element={<TipCalculator />} />
            <Route
              path="/tools/unit-price-calculator"
              element={<UnitPriceCalculator />}
            />
            <Route path="/tools/bmi-calculator" element={<BMICalculator />} />
            <Route path="/tools/bmr-calculator" element={<BMRCalculator />} />
            <Route
              path="/tools/ideal-weight-calculator"
              element={<IdealWeightCalculator />}
            />
            <Route path="/tools/age-calculator" element={<AgeCalculator />} />
            <Route
              path="/tools/age-difference-calculator"
              element={<AgeDifferenceCalculator />}
            />
            <Route
              path="/tools/date-duration-calculator"
              element={<DateDurationCalculator />}
            />
            <Route
              path="/tools/time-duration-calculator"
              element={<TimeDurationCalculator />}
            />
            <Route
              path="/tools/work-hours-calculator"
              element={<WorkHoursCalculator />}
            />
            <Route
              path="/tools/speed-calculator"
              element={<SpeedCalculator />}
            />
            <Route
              path="/tools/distance-calculator"
              element={<DistanceCalculator />}
            />
            <Route
              path="/tools/fuel-cost-calculator"
              element={<FuelCostCalculator />}
            />
            <Route
              path="/tools/percentage-calculator"
              element={<PercentageCalculator />}
            />
            <Route
              path="/tools/profit-calculator"
              element={<ProfitCalculator />}
            />
            <Route path="/tools/roi-calculator" element={<ROICalculator />} />
            <Route
              path="/tools/break-even-calculator"
              element={<BreakEvenCalculator />}
            />
            <Route
              path="/tools/commission-calculator"
              element={<CommissionCalculator />}
            />
            <Route
              path="/tools/markup-calculator"
              element={<MarkupCalculator />}
            />
            <Route
              path="/tools/margin-calculator"
              element={<MarginCalculator />}
            />
            <Route
              path="/tools/savings-calculator"
              element={<SavingsCalculator />}
            />
            <Route
              path="/tools/investment-return-calculator"
              element={<InvestmentReturnCalculator />}
            />
            <Route
              path="/tools/loan-interest-calculator"
              element={<LoanInterestCalculator />}
            />
            <Route
              path="/tools/credit-card-interest-calculator"
              element={<CreditCardInterestCalculator />}
            />
            <Route
              path="/tools/percentage-difference-calculator"
              element={<PercentageDifferenceCalculator />}
            />
            <Route
              path="/tools/percentage-change-calculator"
              element={<PercentageChangeCalculator />}
            />
            <Route
              path="/tools/average-calculator"
              element={<AverageCalculator />}
            />
            <Route
              path="/tools/ratio-calculator"
              element={<RatioCalculator />}
            />
            <Route
              path="/tools/fraction-calculator"
              element={<FractionCalculator />}
            />
            <Route
              path="/tools/square-root-calculator"
              element={<SquareRootCalculator />}
            />
            <Route path="/tools/cube-calculator" element={<CubeCalculator />} />
            <Route
              path="/tools/random-number-generator"
              element={<RandomNumberGenerator />}
            />
            <Route
              path="/tools/scientific-calculator"
              element={<ScientificCalculator />}
            />
            <Route
              path="/tools/binary-converter"
              element={<BinaryConverter />}
            />
            <Route
              path="/tools/electricity-cost-calculator"
              element={<ElectricityCostCalculator />}
            />
            <Route
              path="/tools/power-consumption-calculator"
              element={<PowerConsumptionCalculator />}
            />
            <Route
              path="/tools/voltage-drop-calculator"
              element={<VoltageDropCalculator />}
            />
            <Route
              path="/tools/battery-backup-calculator"
              element={<BatteryBackupCalculator />}
            />
            <Route
              path="/tools/solar-panel-calculator"
              element={<SolarPanelCalculator />}
            />
            <Route
              path="/tools/electricity-bill-calculator"
              element={<ElectricityBillCalculator />}
            />
            <Route
              path="/tools/concrete-calculator"
              element={<ConcreteCalculator />}
            />
            <Route
              path="/tools/paint-calculator"
              element={<PaintCalculator />}
            />
            <Route path="/tools/tile-calculator" element={<TileCalculator />} />
            <Route
              path="/tools/flooring-calculator"
              element={<FlooringCalculator />}
            />
            <Route
              path="/tools/brick-calculator"
              element={<BrickCalculator />}
            />
            <Route
              path="/tools/asphalt-calculator"
              element={<AsphaltCalculator />}
            />
            <Route
              path="/tools/roofing-calculator"
              element={<RoofingCalculator />}
            />
            <Route
              path="/tools/stair-calculator"
              element={<StairCalculator />}
            />
            <Route
              path="/tools/gravel-calculator"
              element={<GravelCalculator />}
            />
            <Route path="/tools/sand-calculator" element={<SandCalculator />} />

            {/* ── Converters ── */}
            <Route
              path="/tools/length-converter"
              element={<LengthConverterTool />}
            />
            <Route
              path="/tools/weight-converter"
              element={<WeightConverterTool />}
            />
            <Route
              path="/tools/temperature-converter"
              element={<TemperatureConverterTool />}
            />
            <Route
              path="/tools/area-converter"
              element={<AreaConverterTool />}
            />
            <Route
              path="/tools/volume-converter"
              element={<VolumeConverterTool />}
            />
            <Route
              path="/tools/speed-converter"
              element={<SpeedConverterTool />}
            />
            <Route
              path="/tools/time-converter"
              element={<TimeConverterTool />}
            />
            <Route
              path="/tools/data-storage-converter"
              element={<DataStorageConverterTool />}
            />
            <Route
              path="/tools/pressure-converter"
              element={<PressureConverterTool />}
            />
            <Route
              path="/tools/energy-converter"
              element={<EnergyConverterTool />}
            />
            <Route
              path="/tools/power-converter"
              element={<PowerConverterTool />}
            />
            <Route
              path="/tools/angle-converter"
              element={<AngleConverterTool />}
            />
            <Route
              path="/tools/currency-converter"
              element={<CurrencyConverterTool />}
            />
            <Route
              path="/tools/fuel-efficiency-converter"
              element={<FuelEfficiencyConverterTool />}
            />
            <Route
              path="/tools/density-converter"
              element={<DensityConverterTool />}
            />
            <Route path="/tools/unit-converter" element={<UnitConverter />} />

            {/* ── Image Tools ── */}
            <Route
              path="/tools/image-compressor"
              element={<ImageCompressor />}
            />
            <Route path="/tools/image-resizer" element={<ImageResizer />} />
            <Route
              path="/tools/image-format-converter"
              element={<ImageFormatConverter />}
            />
            <Route path="/tools/image-cropper" element={<ImageCropper />} />
            <Route path="/tools/image-converter" element={<ImageConverter />} />
            <Route
              path="/tools/background-remover"
              element={<BackgroundRemover />}
            />
            <Route path="/tools/image-rotator" element={<ImageRotator />} />
            <Route path="/tools/image-flipper" element={<ImageFlipper />} />
            <Route path="/tools/image-watermark" element={<ImageWatermark />} />
            <Route path="/tools/image-blur" element={<ImageBlurTool />} />
            <Route path="/tools/image-sharpen" element={<ImageSharpenTool />} />
            <Route
              path="/tools/image-brightness"
              element={<ImageBrightnessAdjuster />}
            />
            <Route
              path="/tools/image-contrast"
              element={<ImageContrastAdjuster />}
            />
            <Route
              path="/tools/image-saturation"
              element={<ImageSaturationTool />}
            />
            <Route
              path="/tools/image-grayscale"
              element={<ImageGrayscaleConverter />}
            />
            <Route path="/tools/image-border" element={<ImageBorderTool />} />
            <Route
              path="/tools/image-collage"
              element={<ImageCollageMaker />}
            />
            <Route
              path="/tools/screenshot-to-image"
              element={<ScreenshotToImageConverter />}
            />
            <Route
              path="/tools/base64-image-encoder"
              element={<Base64ImageEncoder />}
            />
            <Route
              path="/tools/base64-image-decoder"
              element={<Base64ImageDecoder />}
            />
            <Route
              path="/tools/image-metadata-viewer"
              element={<ImageMetadataViewer />}
            />

            {/* ── Text Tools ── */}
            <Route path="/tools/word-counter" element={<WordCounter />} />
            <Route
              path="/tools/character-counter"
              element={<CharacterCounter />}
            />
            <Route
              path="/tools/sentence-counter"
              element={<SentenceCounter />}
            />
            <Route
              path="/tools/paragraph-counter"
              element={<ParagraphCounter />}
            />
            <Route
              path="/tools/text-case-converter"
              element={<TextCaseConverter />}
            />
            <Route
              path="/tools/uppercase-converter"
              element={<UppercaseConverter />}
            />
            <Route
              path="/tools/lowercase-converter"
              element={<LowercaseConverter />}
            />
            <Route
              path="/tools/title-case-converter"
              element={<TitleCaseConverter />}
            />
            <Route path="/tools/capitalize-text" element={<CapitalizeText />} />
            <Route path="/tools/text-reverser" element={<TextReverser />} />
            <Route
              path="/tools/remove-duplicate-lines"
              element={<RemoveDuplicateLines />}
            />
            <Route
              path="/tools/remove-extra-spaces"
              element={<RemoveExtraSpaces />}
            />
            <Route path="/tools/text-sorter" element={<TextSorter />} />
            <Route
              path="/tools/random-text-generator"
              element={<RandomTextGenerator />}
            />
            <Route
              path="/tools/text-to-slug-converter"
              element={<TextToSlugConverter />}
            />
            <Route
              path="/tools/text-to-html-converter"
              element={<TextToHTMLConverter />}
            />
            <Route
              path="/tools/html-to-text-converter"
              element={<HTMLToTextConverter />}
            />
            <Route
              path="/tools/text-diff-checker"
              element={<TextDiffChecker />}
            />
            <Route path="/tools/line-counter" element={<LineCounter />} />
            <Route
              path="/tools/lorem-ipsum-generator"
              element={<LoremIpsumGenerator />}
            />

            {/* ── Generators ── */}
            <Route
              path="/tools/ai-prompt-generator"
              element={<AIPromptGenerator />}
            />
            <Route
              path="/tools/content-idea-generator"
              element={<ContentIdeaGenerator />}
            />
            <Route
              path="/tools/youtube-title-generator"
              element={<YouTubeTitleGenerator />}
            />
            <Route
              path="/tools/youtube-thumbnail-extractor"
              element={<YouTubeThumbnailExtractor />}
            />
            <Route
              path="/tools/instagram-caption-generator"
              element={<InstagramCaptionGenerator />}
            />
            <Route
              path="/tools/hashtag-generator"
              element={<HashtagGenerator />}
            />
            <Route
              path="/tools/password-generator"
              element={<PasswordGenerator />}
            />
            <Route
              path="/tools/username-generator"
              element={<UsernameGenerator />}
            />
            <Route
              path="/tools/business-name-generator"
              element={<BusinessNameGenerator />}
            />
            <Route
              path="/tools/domain-name-generator"
              element={<DomainNameGenerator />}
            />
            <Route
              path="/tools/youtube-description-generator"
              element={<YouTubeDescriptionGenerator />}
            />
            <Route
              path="/tools/instagram-bio-generator"
              element={<InstagramBioGenerator />}
            />
            <Route
              path="/tools/random-name-generator"
              element={<RandomNameGenerator />}
            />
            <Route
              path="/tools/random-password-generator"
              element={<RandomPasswordGenerator />}
            />
            <Route
              path="/tools/fake-address-generator"
              element={<FakeAddressGenerator />}
            />
            <Route
              path="/tools/fake-email-generator"
              element={<FakeEmailGenerator />}
            />
            <Route
              path="/tools/color-palette-generator"
              element={<ColorPaletteGenerator />}
            />
            <Route
              path="/tools/gradient-generator"
              element={<GradientGenerator />}
            />
            <Route path="/tools/slug-generator" element={<SlugGenerator />} />
            <Route
              path="/tools/qr-code-generator"
              element={<OtherToolWrapper name="QRCodeGenerator" />}
            />
            <Route
              path="/tools/website-performance-analyzer"
              element={<WebsitePerformanceAnalyzer />}
            />

            {/* ── Admin ── */}
            <Route path="/admin-analytics" element={<AnalyticsDashboard />} />
            <Route path={`/${adminPath}`} element={<AdminPage />} />
            <Route path="/admin-panel" element={<AdminPage />} />

            {/* ── 404 ── */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <MobileNav />
      {/* Deferred — no fallback needed, these are floating UI */}
      <Suspense fallback={null}>
        <WhatsAppButton />
        <PWAInstallPrompt />
        <CookieConsent />
        <DownloadAppModal />
        <ScrollToTop />
      </Suspense>
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <SettingsProvider>
          <LanguageProvider>
            <HashRouter>
              <Layout />
            </HashRouter>
          </LanguageProvider>
        </SettingsProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
