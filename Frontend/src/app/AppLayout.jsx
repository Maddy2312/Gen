import React, { useState, useEffect, useRef } from "react";
import { Outlet, Link, useNavigate, useLocation } from "react-router";
import { useSelector } from "react-redux";
import {
  Laptop,
  ShoppingCart,
  Sun,
  Moon,
  Menu,
  X,
  Search,
  User,
  ChevronDown,
  Zap,
  Shield,
  Headphones,
  LogOut,
} from "lucide-react";

/* ─── Dark-mode hook ─── */
const useDarkMode = () => {
  const [dark, setDark] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme");
      if (saved) return saved === "dark";
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return true;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return [dark, setDark];
};

/* ─── Nav links ─── */
const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Laptops", to: "/laptops" },
  { label: "Deals", to: "/deals" },
  { label: "Brands", to: "/brands" },
  { label: "Support", to: "/support" },
];

const AppLayout = () => {
  const [dark, setDark] = useDarkMode();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const searchRef = useRef(null);
  const userMenuRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((state) => state.auth.user);

  /* scroll detection */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* close menus on route change */
  useEffect(() => {
    setMobileOpen(false);
    setSearchOpen(false);
    setUserMenuOpen(false);
  }, [location.pathname]);

  /* close user menu on outside click */
  useEffect(() => {
    const handler = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /* focus search input when opened */
  useEffect(() => {
    if (searchOpen && searchRef.current) {
      setTimeout(() => searchRef.current?.focus(), 100);
    }
  }, [searchOpen]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-[#0a0a0a] text-gray-900 dark:text-white transition-colors duration-300">
      {/* ── Announcement Banner ── */}
      <div className="bg-black text-white text-center text-xs font-semibold py-2 px-4 tracking-wide">
        🚀 Free Express Shipping on orders above ₹50,000 &nbsp;|&nbsp; Use code{" "}
        <span className="bg-white/20 px-2 py-0.5 rounded-full font-black border border-white/20">
          TECHPRO
        </span>{" "}
        for 10% off
      </div>

      {/* ── Navbar ── */}
      <nav
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/90 dark:bg-[#0a0a0a]/95 backdrop-blur-xl shadow-lg shadow-black/10 dark:shadow-black/60 border-b border-zinc-200/70 dark:border-white/[0.06]"
            : "bg-white dark:bg-[#0a0a0a] border-b border-zinc-200 dark:border-white/[0.06]"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-2.5 group shrink-0"
              aria-label="LaptopLux Home"
            >
              <div className="w-9 h-9 rounded-xl bg-black dark:bg-white flex items-center justify-center shadow-lg shadow-black/30 dark:shadow-white/10 group-hover:scale-105 transition-all duration-300">
                <Laptop size={18} className="text-white dark:text-black" />
              </div>
              <span className="text-xl font-black tracking-tight text-gray-900 dark:text-white">
                Laptop
                <span className="text-black dark:text-white opacity-40">
                  Lux
                </span>
              </span>
            </Link>

            {/* Desktop Nav Links */}
            <ul className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map((link) => {
                const isActive = location.pathname === link.to;
                return (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className={`relative px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${
                        isActive
                          ? "text-black dark:text-white bg-zinc-100 dark:bg-white/[0.08]"
                          : "text-zinc-500 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/[0.06]"
                      }`}
                    >
                      {link.label}
                      {isActive && (
                        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-0.5 bg-black dark:bg-white rounded-full" />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* Right Actions */}
            <div className="flex items-center gap-1.5">
              {/* Search Button */}
              <button
                id="nav-search-btn"
                onClick={() => setSearchOpen(!searchOpen)}
                className="w-9 h-9 flex items-center justify-center rounded-xl text-zinc-500 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/[0.07] transition-all duration-200"
                aria-label="Search"
              >
                <Search size={18} />
              </button>

              {/* Dark Mode Toggle */}
              <button
                id="dark-mode-toggle"
                onClick={() => setDark(!dark)}
                className="w-9 h-9 flex items-center justify-center rounded-xl text-zinc-500 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/[0.07] transition-all duration-200 relative overflow-hidden"
                aria-label="Toggle dark mode"
              >
                <div
                  className={`absolute inset-0 flex items-center justify-center transition-transform duration-300 ${
                    dark ? "translate-y-0" : "-translate-y-8"
                  }`}
                >
                  <Moon size={17} />
                </div>
                <div
                  className={`absolute inset-0 flex items-center justify-center transition-transform duration-300 ${
                    dark ? "translate-y-8" : "translate-y-0"
                  }`}
                >
                  <Sun size={17} />
                </div>
              </button>

              {/* Cart */}
              <button
                id="nav-cart-btn"
                onClick={() => navigate("/cart")}
                className="w-9 h-9 flex items-center justify-center rounded-xl text-zinc-500 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/[0.07] transition-all duration-200 relative"
                aria-label="Cart"
              >
                <ShoppingCart size={18} />
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-black dark:bg-white text-white dark:text-black text-[9px] font-black rounded-full flex items-center justify-center">
                  3
                </span>
              </button>

              {/* User Menu */}
              <div className="relative hidden md:block" ref={userMenuRef}>
                <button
                  id="nav-user-btn"
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    userMenuOpen
                      ? "bg-zinc-100 dark:bg-white/[0.09] text-gray-900 dark:text-white"
                      : "text-zinc-600 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/[0.07]"
                  }`}
                >
                  <div className="w-7 h-7 rounded-lg bg-black dark:bg-white flex items-center justify-center">
                    <User size={14} className="text-white dark:text-black" />
                  </div>
                  <span className="max-w-[80px] truncate">
                    {user?.name?.split(" ")[0] || "Account"}
                  </span>
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-200 ${
                      userMenuOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Dropdown */}
                {userMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-52 bg-white dark:bg-[#111111] border border-zinc-200 dark:border-white/[0.08] rounded-2xl shadow-xl shadow-black/10 dark:shadow-black/60 overflow-hidden animate-[slideDown_0.15s_ease-out]">
                    {user ? (
                      <>
                        <div className="px-4 py-3 border-b border-zinc-100 dark:border-white/[0.06]">
                          <p className="text-xs text-zinc-500 dark:text-zinc-400">
                            Signed in as
                          </p>
                          <p className="text-sm font-bold truncate">
                            {user.name}
                          </p>
                        </div>
                        <div className="p-1.5 space-y-0.5">
                          <Link
                            to="/profile"
                            className="flex items-center gap-3 px-3 py-2.5 text-sm text-zinc-700 dark:text-zinc-300 hover:text-gray-900 dark:hover:text-white hover:bg-zinc-50 dark:hover:bg-white/[0.05] rounded-xl transition-colors"
                          >
                            <User size={15} /> My Profile
                          </Link>
                          <Link
                            to="/orders"
                            className="flex items-center gap-3 px-3 py-2.5 text-sm text-zinc-700 dark:text-zinc-300 hover:text-gray-900 dark:hover:text-white hover:bg-zinc-50 dark:hover:bg-white/[0.05] rounded-xl transition-colors"
                          >
                            <ShoppingCart size={15} /> My Orders
                          </Link>
                          {user.role === "seller" && (
                            <Link
                              to="/seller/dashboard"
                              className="flex items-center gap-3 px-3 py-2.5 text-sm text-zinc-700 dark:text-zinc-300 hover:text-gray-900 dark:hover:text-white hover:bg-zinc-50 dark:hover:bg-white/[0.05] rounded-xl transition-colors"
                            >
                              <Zap size={15} /> Seller Dashboard
                            </Link>
                          )}
                          <button className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-colors">
                            <LogOut size={15} /> Sign Out
                          </button>
                        </div>
                      </>
                    ) : (
                      <div className="p-1.5 space-y-0.5">
                        <Link
                          to="/login"
                          className="flex items-center justify-center gap-2 mx-1 my-1 px-4 py-2.5 text-sm font-semibold bg-black dark:bg-white text-white dark:text-black rounded-xl hover:opacity-80 transition-opacity"
                        >
                          Sign In
                        </Link>
                        <Link
                          to="/register"
                          className="flex items-center justify-center gap-2 mx-1 my-1 px-4 py-2.5 text-sm font-semibold border border-zinc-200 dark:border-white/[0.1] text-zinc-700 dark:text-zinc-300 rounded-xl hover:bg-zinc-50 dark:hover:bg-white/[0.04] transition-colors"
                        >
                          Create Account
                        </Link>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Mobile menu toggle */}
              <button
                id="nav-mobile-menu-btn"
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden w-9 h-9 flex items-center justify-center rounded-xl text-zinc-500 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/[0.07] transition-all duration-200"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </div>

        {/* ── Search Bar Overlay ── */}
        <div
          className={`overflow-hidden transition-all duration-300 ${
            searchOpen ? "max-h-20 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-3">
            <form onSubmit={handleSearch} className="relative">
              <Search
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400"
              />
              <input
                ref={searchRef}
                type="text"
                id="nav-search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search laptops, brands, specs..."
                className="w-full pl-10 pr-4 py-2.5 bg-zinc-100 dark:bg-white/[0.06] border border-zinc-200 dark:border-white/[0.08] rounded-xl text-sm text-gray-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20 focus:border-black dark:focus:border-white/40 transition-all"
              />
              <kbd className="absolute right-3.5 top-1/2 -translate-y-1/2 px-2 py-0.5 text-[10px] text-zinc-400 bg-zinc-200 dark:bg-white/[0.08] rounded-md font-mono">
                Enter
              </kbd>
            </form>
          </div>
        </div>

        {/* ── Mobile Menu ── */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            mobileOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-4 space-y-1 border-t border-zinc-100 dark:border-white/[0.05] pt-3">
            {NAV_LINKS.map((link) => {
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`flex items-center px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                    isActive
                      ? "bg-zinc-100 dark:bg-white/[0.08] text-black dark:text-white"
                      : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-white/[0.05] hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="pt-2 border-t border-zinc-100 dark:border-white/[0.05] flex gap-2">
              <Link
                to="/login"
                className="flex-1 text-center py-2.5 text-sm font-semibold bg-black dark:bg-white text-white dark:text-black rounded-xl hover:opacity-80 transition-opacity"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="flex-1 text-center py-2.5 text-sm font-semibold border border-zinc-200 dark:border-white/[0.1] text-zinc-700 dark:text-zinc-300 rounded-xl hover:bg-zinc-50 dark:hover:bg-white/[0.04] transition-colors"
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* ── Page Content ── */}
      <Outlet />

      {/* ── Footer ── */}
      <footer className="bg-white dark:bg-[#0a0a0a] border-t border-zinc-200 dark:border-white/[0.05] mt-20">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
            {/* Brand */}
            <div className="space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-black dark:bg-white flex items-center justify-center shadow-lg">
                  <Laptop size={18} className="text-white dark:text-black" />
                </div>
                <span className="text-xl font-black">
                  Laptop<span className="opacity-40">Lux</span>
                </span>
              </div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                Premium laptops for creators, gamers, and professionals. Curated
                with care, shipped with speed.
              </p>
              <div className="flex gap-3">
                {[Zap, Shield, Headphones].map((Icon, i) => (
                  <div
                    key={i}
                    className="w-9 h-9 rounded-xl bg-zinc-100 dark:bg-white/[0.04] border border-zinc-200 dark:border-white/[0.06] flex items-center justify-center text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white hover:border-zinc-400 dark:hover:border-white/30 hover:bg-zinc-200 dark:hover:bg-white/[0.08] transition-all cursor-pointer"
                  >
                    <Icon size={16} />
                  </div>
                ))}
              </div>
            </div>

            {/* Links */}
            {[
              {
                title: "Shop",
                links: [
                  "Gaming Laptops",
                  "Ultrabooks",
                  "Workstations",
                  "Budget Picks",
                ],
              },
              {
                title: "Support",
                links: ["Track Order", "Returns", "Warranty", "Contact Us"],
              },
              {
                title: "Company",
                links: ["About Us", "Careers", "Press", "Privacy Policy"],
              },
            ].map((col) => (
              <div key={col.title}>
                <h4 className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white mb-4">
                  {col.title}
                </h4>
                <ul className="space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l}>
                      <Link
                        to="#"
                        className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors"
                      >
                        {l}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-zinc-200 dark:border-white/[0.05] gap-4">
            <p className="text-xs text-zinc-400">
              © 2025 LaptopLux. All rights reserved.
            </p>
            <p className="text-xs text-zinc-400">
              Crafted with ❤️ for tech enthusiasts worldwide
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AppLayout;
