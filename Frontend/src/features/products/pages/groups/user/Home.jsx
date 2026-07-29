import React, { useEffect, useState, useRef } from "react";
import useProduct from "../../../hooks/useProduct";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router";
import {
  Laptop,
  ArrowRight,
  Star,
  Zap,
  Shield,
  Truck,
  Headphones,
  ChevronRight,
  Cpu,
  MemoryStick,
  HardDrive,
  Monitor,
  Package,
  Layers,
  ArrowUpRight,
  TrendingUp,
  Award,
  CheckCircle,
  Flame,
  SlidersHorizontal,
} from "lucide-react";

/* ── Utility: small animated counter ── */
const AnimatedCounter = ({ target, suffix = "", duration = 1500 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
};

/* ── Static brand logos ── */
const BRANDS = [
  "ASUS",
  "Dell",
  "HP",
  "Lenovo",
  "Apple",
  "MSI",
  "Acer",
  "Samsung",
];

/* ── Category chips ── */
const CATEGORIES = [
  { label: "Gaming", icon: Zap, color: "from-violet-500 to-purple-600" },
  { label: "Ultrabook", icon: Laptop, color: "from-blue-500 to-cyan-500" },
  { label: "Workstation", icon: Monitor, color: "from-orange-500 to-red-500" },
  { label: "Budget", icon: Award, color: "from-green-500 to-emerald-600" },
  { label: "Creator", icon: TrendingUp, color: "from-pink-500 to-rose-600" },
  { label: "Business", icon: Shield, color: "from-gray-500 to-slate-600" },
];

/* ── Trust badges ── */
const TRUST = [
  { icon: Truck, title: "Free Shipping", sub: "On orders above ₹50,000" },
  { icon: Shield, title: "2-Year Warranty", sub: "Full coverage included" },
  { icon: Headphones, title: "24/7 Support", sub: "Expert help anytime" },
  {
    icon: CheckCircle,
    title: "Genuine Products",
    sub: "100% authentic brands",
  },
];

/* ── Product Card ── */
const ProductCard = ({ product, index }) => {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);
  const primaryImage = product.images?.[0]?.url || "";
  const variants = product.variants || [];
  const prices = variants.map((v) => v.price?.amount).filter(Boolean);
  const minPrice = prices.length > 0 ? Math.min(...prices) : null;
  const rating = (4.2 + (index % 3) * 0.2).toFixed(1);

  return (
    <div
      id={`product-card-${product._id}`}
      onClick={() => navigate(`/product/${product._id}`)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group cursor-pointer bg-white dark:bg-[#0f1422] border border-gray-200 dark:border-white/[0.06] rounded-2xl overflow-hidden hover:border-violet-300 dark:hover:border-violet-500/40 hover:shadow-xl hover:shadow-violet-500/10 dark:hover:shadow-violet-500/10 transition-all duration-300"
      style={{
        animationDelay: `${index * 60}ms`,
      }}
    >
      {/* Image area */}
      <div className="relative w-full h-52 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-[#141929] dark:to-[#1a2035] overflow-hidden">
        {primaryImage ? (
          <img
            src={primaryImage}
            alt={product.name}
            className={`w-full h-full object-cover transition-transform duration-700 ${
              hovered ? "scale-110" : "scale-100"
            }`}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Laptop
              size={56}
              className="text-gray-300 dark:text-white/10 group-hover:text-violet-400/30 transition-colors duration-300"
            />
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {index % 4 === 0 && (
            <span className="flex items-center gap-1 text-[10px] font-black uppercase tracking-wider bg-violet-600 text-white px-2.5 py-1 rounded-full shadow-lg">
              <Flame size={10} /> Hot
            </span>
          )}
          {index % 5 === 1 && (
            <span className="flex items-center gap-1 text-[10px] font-black uppercase tracking-wider bg-emerald-500 text-white px-2.5 py-1 rounded-full shadow-lg">
              New
            </span>
          )}
          {minPrice && (
            <span className="text-[10px] font-black uppercase tracking-wider bg-orange-500 text-white px-2.5 py-1 rounded-full shadow-lg">
              Save 15%
            </span>
          )}
        </div>

        {/* Quick action overlay */}
        <div
          className={`absolute inset-0 bg-black/60 flex items-center justify-center transition-opacity duration-300 ${
            hovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <button className="flex items-center gap-2 bg-white dark:bg-[#0f1422] text-gray-900 dark:text-white text-xs font-black uppercase tracking-wider px-5 py-2.5 rounded-xl hover:bg-violet-600 hover:text-white dark:hover:bg-violet-600 transition-all duration-200 shadow-2xl">
            <ArrowUpRight size={14} /> Quick View
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 space-y-3">
        {/* Brand + Rating */}
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-black tracking-[0.18em] uppercase text-violet-500 dark:text-violet-400">
            {product.brand || "LaptopLux"}
          </span>
          <div className="flex items-center gap-1">
            <Star size={11} className="text-amber-400 fill-amber-400" />
            <span className="text-[11px] font-bold text-gray-600 dark:text-gray-400">
              {rating}
            </span>
          </div>
        </div>

        {/* Name */}
        <h3 className="text-base font-black text-gray-900 dark:text-white leading-snug line-clamp-2 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors duration-200">
          {product.name}
        </h3>

        {/* Specs */}
        {(product.processor || product.graphics) && (
          <div className="flex flex-wrap gap-1.5">
            {product.processor && (
              <span className="flex items-center gap-1 text-[10px] bg-gray-100 dark:bg-white/[0.04] border border-gray-200 dark:border-white/[0.06] text-gray-600 dark:text-gray-400 px-2.5 py-1 rounded-lg font-semibold">
                <Cpu size={10} className="text-blue-500" />
                {product.processor.length > 18
                  ? product.processor.slice(0, 18) + "…"
                  : product.processor}
              </span>
            )}
            {product.graphics && (
              <span className="flex items-center gap-1 text-[10px] bg-gray-100 dark:bg-white/[0.04] border border-gray-200 dark:border-white/[0.06] text-gray-600 dark:text-gray-400 px-2.5 py-1 rounded-lg font-semibold">
                <Monitor size={10} className="text-violet-500" />
                {product.graphics.length > 14
                  ? product.graphics.slice(0, 14) + "…"
                  : product.graphics}
              </span>
            )}
          </div>
        )}

        {/* Price + Variants */}
        <div className="flex items-center justify-between pt-1">
          <div>
            {minPrice ? (
              <>
                <span className="text-lg font-black text-gray-900 dark:text-white">
                  ₹{minPrice.toLocaleString("en-IN")}
                </span>
                <span className="ml-2 text-xs text-gray-400 line-through">
                  ₹{Math.round(minPrice * 1.15).toLocaleString("en-IN")}
                </span>
              </>
            ) : (
              <span className="text-sm text-gray-400">Price on request</span>
            )}
            {variants.length > 0 && (
              <p className="text-[10px] text-gray-400 font-semibold mt-0.5 flex items-center gap-1">
                <Layers size={10} />
                {variants.length} variant{variants.length !== 1 ? "s" : ""}{" "}
                available
              </p>
            )}
          </div>

          <button
            className="flex items-center gap-1.5 text-xs font-black text-white bg-gradient-to-r from-violet-600 to-blue-600 px-4 py-2.5 rounded-xl hover:from-violet-500 hover:to-blue-500 active:scale-95 transition-all duration-200 shadow-lg shadow-violet-500/20"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/product/${product._id}`);
            }}
          >
            View <ArrowRight size={12} />
          </button>
        </div>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════════
    HOME PAGE
══════════════════════════════════════════════════════ */
const Home = () => {
  const { handleUserProducts } = useProduct();
  const productState = useSelector((state) => state.product);
  const products = productState?.products || [];
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("All");
  const [heroLoaded, setHeroLoaded] = useState(false);

  useEffect(() => {
    handleUserProducts();
    setTimeout(() => setHeroLoaded(true), 100);
  }, []);

  return (
    <div className="overflow-x-hidden">
      {/* ══ HERO ══════════════════════════════════════════════ */}
      <section className="relative min-h-[88vh] flex items-center overflow-hidden bg-gradient-to-br from-[#f5f3ff] via-[#eff6ff] to-[#f0fdf4] dark:from-[#080b14] dark:via-[#0c1120] dark:to-[#08101e]">
        {/* Background glow blobs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-violet-400/20 dark:bg-violet-600/10 rounded-full blur-[100px]" />
          <div className="absolute top-20 -right-20 w-[400px] h-[400px] bg-blue-400/20 dark:bg-blue-600/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-cyan-400/10 dark:bg-cyan-600/5 rounded-full blur-[80px]" />
          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.03] dark:opacity-[0.04]"
            style={{
              backgroundImage: `radial-gradient(circle, #6366f1 1px, transparent 1px)`,
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Copy */}
          <div
            className={`space-y-8 transition-all duration-700 ${
              heroLoaded
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-violet-100 dark:bg-violet-500/10 border border-violet-200 dark:border-violet-500/20 text-violet-700 dark:text-violet-400 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest">
              <Flame size={13} className="text-orange-500" />
              Summer Sale — Up to 30% Off
            </div>

            {/* Headline */}
            <div className="space-y-2">
              <h1 className="text-5xl md:text-6xl xl:text-7xl font-black leading-[1.05] tracking-tight text-gray-900 dark:text-white">
                Find Your{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-blue-500 to-cyan-500">
                  Perfect
                </span>
                <br />
                Laptop.
              </h1>
              <p className="text-lg text-gray-500 dark:text-gray-400 max-w-md leading-relaxed">
                From cutting-edge gaming rigs to sleek ultrabooks — discover
                premium laptops engineered for every ambition.
              </p>
            </div>

            {/* CTA */}
            <div className="flex flex-wrap gap-3">
              <button
                id="hero-shop-cta"
                onClick={() =>
                  document
                    .getElementById("products-section")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="group flex items-center gap-2.5 bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 text-white font-bold text-sm px-7 py-3.5 rounded-2xl shadow-xl shadow-violet-500/30 hover:shadow-violet-500/50 active:scale-95 transition-all duration-200"
              >
                Shop Now
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>
              <button
                id="hero-deals-cta"
                onClick={() => navigate("/deals")}
                className="flex items-center gap-2 border border-gray-300 dark:border-white/[0.12] text-gray-700 dark:text-gray-300 hover:border-violet-400 dark:hover:border-violet-500/50 hover:text-violet-600 dark:hover:text-violet-400 font-bold text-sm px-7 py-3.5 rounded-2xl transition-all duration-200 bg-white dark:bg-white/[0.03] hover:bg-violet-50 dark:hover:bg-violet-500/5"
              >
                View Deals
              </button>
            </div>

            {/* Quick stats */}
            <div className="flex flex-wrap gap-6 pt-2">
              {[
                { value: 500, suffix: "+", label: "Products" },
                { value: 50, suffix: "K+", label: "Happy Customers" },
                { value: 8, suffix: "", label: "Premium Brands" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl font-black text-gray-900 dark:text-white">
                    <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-xs text-gray-400 font-semibold mt-0.5">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Floating laptop visual */}
          <div
            className={`relative flex items-center justify-center transition-all duration-1000 delay-200 ${
              heroLoaded
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-12"
            }`}
          >
            {/* Glow disc */}
            <div className="absolute w-72 h-72 bg-violet-500/20 dark:bg-violet-500/15 rounded-full blur-3xl" />

            {/* Main device mockup */}
            <div className="relative z-10 w-full max-w-lg">
              {/* Laptop frame */}
              <div className="relative animate-[float_4s_ease-in-out_infinite]">
                {/* Screen */}
                <div className="bg-gray-900 rounded-2xl shadow-2xl shadow-black/40 overflow-hidden border-4 border-gray-800">
                  <div className="bg-gradient-to-br from-[#0d1117] to-[#161b22] aspect-[16/10] flex flex-col">
                    {/* Browser bar */}
                    <div className="flex items-center gap-1.5 px-3 py-2 border-b border-white/5">
                      {["bg-red-500", "bg-yellow-500", "bg-green-500"].map(
                        (c) => (
                          <div
                            key={c}
                            className={`w-2 h-2 rounded-full ${c} opacity-60`}
                          />
                        ),
                      )}
                      <div className="flex-1 ml-2 bg-white/5 rounded-md h-3" />
                    </div>
                    {/* Screen content */}
                    <div className="flex-1 p-4 space-y-3">
                      <div className="flex gap-2">
                        <div className="w-1/3 h-20 rounded-lg bg-gradient-to-br from-violet-600/30 to-violet-800/30 border border-violet-500/20" />
                        <div className="w-1/3 h-20 rounded-lg bg-gradient-to-br from-blue-600/30 to-blue-800/30 border border-blue-500/20" />
                        <div className="w-1/3 h-20 rounded-lg bg-gradient-to-br from-cyan-600/30 to-cyan-800/30 border border-cyan-500/20" />
                      </div>
                      <div className="space-y-1.5">
                        {[80, 60, 70, 45].map((w, i) => (
                          <div
                            key={i}
                            className="h-2 rounded-full bg-white/5"
                            style={{ width: `${w}%` }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                {/* Base */}
                <div className="h-4 mx-4 bg-gray-700 rounded-b-xl shadow-xl" />
              </div>

              {/* Floating info cards */}
              <div className="absolute -left-8 top-12 bg-white dark:bg-[#0f1422] border border-gray-200 dark:border-white/[0.08] rounded-2xl p-3 shadow-2xl shadow-black/10 dark:shadow-black/50 animate-[float_4s_ease-in-out_infinite_1s] z-20">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-violet-100 dark:bg-violet-500/10 flex items-center justify-center">
                    <Zap
                      size={16}
                      className="text-violet-600 dark:text-violet-400"
                    />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 font-semibold">
                      Performance
                    </p>
                    <p className="text-xs font-black text-gray-900 dark:text-white">
                      Up to RTX 4090
                    </p>
                  </div>
                </div>
              </div>

              <div className="absolute -right-6 bottom-16 bg-white dark:bg-[#0f1422] border border-gray-200 dark:border-white/[0.08] rounded-2xl p-3 shadow-2xl shadow-black/10 dark:shadow-black/50 animate-[float_4s_ease-in-out_infinite_2s] z-20">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-500/10 flex items-center justify-center">
                    <CheckCircle
                      size={16}
                      className="text-emerald-600 dark:text-emerald-400"
                    />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 font-semibold">
                      In Stock
                    </p>
                    <p className="text-xs font-black text-gray-900 dark:text-white">
                      Ships in 24h
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 60L60 50C120 40 240 20 360 15C480 10 600 20 720 25C840 30 960 30 1080 25C1200 20 1320 10 1380 5L1440 0V60H1380C1320 60 1200 60 1080 60C960 60 840 60 720 60C600 60 480 60 360 60C240 60 120 60 60 60H0Z"
              className="fill-gray-50 dark:fill-[#080b14]"
            />
          </svg>
        </div>
      </section>

      {/* ══ BRAND MARQUEE ════════════════════════════════════ */}
      <section className="py-8 bg-gray-50 dark:bg-[#080b14] overflow-hidden">
        <div className="flex items-center gap-6 animate-[marquee_18s_linear_infinite] whitespace-nowrap">
          {[...BRANDS, ...BRANDS, ...BRANDS].map((brand, i) => (
            <span
              key={i}
              className="text-sm font-black tracking-widest uppercase text-gray-300 dark:text-white/20 hover:text-violet-500 dark:hover:text-violet-400 transition-colors cursor-pointer shrink-0 px-6"
            >
              {brand}
            </span>
          ))}
        </div>
      </section>

      {/* ══ TRUST BADGES ─────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {TRUST.map(({ icon: Icon, title, sub }) => (
            <div
              key={title}
              className="flex items-center gap-4 p-5 bg-white dark:bg-[#0f1422] border border-gray-200 dark:border-white/[0.06] rounded-2xl hover:border-violet-300 dark:hover:border-violet-500/30 hover:shadow-lg hover:shadow-violet-500/5 transition-all duration-300 group"
            >
              <div className="w-11 h-11 rounded-xl bg-violet-100 dark:bg-violet-500/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                <Icon
                  size={20}
                  className="text-violet-600 dark:text-violet-400"
                />
              </div>
              <div>
                <p className="text-sm font-black text-gray-900 dark:text-white">
                  {title}
                </p>
                <p className="text-xs text-gray-400">{sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ CATEGORIES ───────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex items-end justify-between mb-6">
          <div>
            <p className="text-xs font-black uppercase tracking-widest text-violet-500 dark:text-violet-400 mb-1">
              Browse By Type
            </p>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white">
              Shop Categories
            </h2>
          </div>
          <Link
            to="/laptops"
            className="hidden md:flex items-center gap-1.5 text-sm font-semibold text-violet-600 dark:text-violet-400 hover:gap-2.5 transition-all"
          >
            See all <ChevronRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {CATEGORIES.map(({ label, icon: Icon, color }) => (
            <button
              key={label}
              id={`category-${label.toLowerCase()}`}
              onClick={() => setActiveCategory(label)}
              className={`group flex flex-col items-center gap-3 p-5 rounded-2xl border transition-all duration-300 ${
                activeCategory === label
                  ? "border-violet-500/50 bg-violet-50 dark:bg-violet-500/10 shadow-lg shadow-violet-500/10"
                  : "border-gray-200 dark:border-white/[0.06] bg-white dark:bg-[#0f1422] hover:border-violet-300 dark:hover:border-violet-500/30 hover:shadow-md hover:shadow-violet-500/5"
              }`}
            >
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
              >
                <Icon size={22} className="text-white" />
              </div>
              <span
                className={`text-xs font-black ${
                  activeCategory === label
                    ? "text-violet-700 dark:text-violet-400"
                    : "text-gray-700 dark:text-gray-300"
                }`}
              >
                {label}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* ══ PRODUCTS GRID ─────────────────────────────────── */}
      <section id="products-section" className="max-w-7xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-xs font-black uppercase tracking-widest text-violet-500 dark:text-violet-400 mb-1">
              Latest Arrivals
            </p>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white">
              Featured Laptops
            </h2>
          </div>

          {/* Category filter pills */}
          <div className="flex items-center gap-2 flex-wrap">
            <SlidersHorizontal size={15} className="text-gray-400 shrink-0" />
            {["All", "Gaming", "Ultrabook", "Workstation"].map((cat) => (
              <button
                key={cat}
                id={`filter-${cat.toLowerCase()}`}
                onClick={() => setActiveCategory(cat)}
                className={`text-xs font-bold px-4 py-2 rounded-xl border transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-violet-600 border-violet-600 text-white shadow-lg shadow-violet-500/20"
                    : "border-gray-200 dark:border-white/[0.08] text-gray-600 dark:text-gray-400 hover:border-violet-300 dark:hover:border-violet-500/40 hover:text-violet-600 dark:hover:text-violet-400 bg-white dark:bg-transparent"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        {products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 space-y-4 bg-white dark:bg-[#0f1422] border border-gray-200 dark:border-white/[0.06] rounded-3xl">
            <div className="w-20 h-20 rounded-full bg-gray-100 dark:bg-white/[0.04] border border-gray-200 dark:border-white/[0.06] flex items-center justify-center">
              <Package size={36} className="text-gray-300 dark:text-white/20" />
            </div>
            <div className="text-center space-y-1">
              <p className="text-base font-black text-gray-900 dark:text-white">
                No laptops found
              </p>
              <p className="text-sm text-gray-400">
                New products are on their way — check back soon!
              </p>
            </div>
            <button
              onClick={() => handleUserProducts()}
              className="flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-colors mt-2"
            >
              <Zap size={13} /> Refresh
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {products.map((product, index) => (
              <ProductCard key={product._id} product={product} index={index} />
            ))}
          </div>
        )}

        {/* Load more */}
        {products.length > 0 && (
          <div className="mt-10 text-center">
            <button
              id="load-more-btn"
              className="inline-flex items-center gap-2.5 border border-gray-200 dark:border-white/[0.08] text-gray-700 dark:text-gray-300 hover:border-violet-400 dark:hover:border-violet-500/50 hover:text-violet-600 dark:hover:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-500/5 font-bold text-sm px-8 py-3.5 rounded-2xl transition-all duration-200"
            >
              Load More <ChevronRight size={16} />
            </button>
          </div>
        )}
      </section>

      {/* ══ STATS BANNER ─────────────────────────────────── */}
      <section className="bg-gradient-to-r from-violet-600 via-blue-600 to-cyan-600 py-16 mt-12 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
              backgroundSize: "30px 30px",
            }}
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
          {[
            { value: 50, suffix: "K+", label: "Happy Customers" },
            { value: 500, suffix: "+", label: "Laptop Models" },
            { value: 8, suffix: "", label: "Premium Brands" },
            { value: 98, suffix: "%", label: "Satisfaction Rate" },
          ].map((stat) => (
            <div key={stat.label} className="space-y-1">
              <div className="text-4xl md:text-5xl font-black">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-sm font-semibold text-white/70">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ══ PROMO BANNER ─────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-gray-900 via-[#0d1117] to-gray-900 dark:from-[#0f1422] dark:via-[#141929] dark:to-[#0f1422] border border-white/[0.06] shadow-2xl p-10 md:p-16">
          {/* Glow */}
          <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-violet-600/20 rounded-full blur-[80px] pointer-events-none" />
          <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-64 h-64 bg-blue-600/20 rounded-full blur-[60px] pointer-events-none" />

          <div className="relative text-center space-y-6 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-violet-500/20 border border-violet-500/30 text-violet-300 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest">
              <Flame size={12} className="text-orange-400" /> Limited Time Offer
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">
              Get{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">
                ₹5,000 OFF
              </span>{" "}
              Your First Order
            </h2>
            <p className="text-gray-400 text-base">
              Sign up now and unlock exclusive member pricing on our full
              catalog of premium laptops.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                id="promo-email-input"
                placeholder="Enter your email address"
                className="flex-1 px-5 py-3.5 bg-white/[0.06] border border-white/[0.1] text-white placeholder-gray-500 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 transition-all"
              />
              <button
                id="promo-subscribe-btn"
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 text-white font-bold text-sm px-7 py-3.5 rounded-2xl shadow-lg shadow-violet-500/30 active:scale-95 transition-all whitespace-nowrap"
              >
                Claim Offer <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
