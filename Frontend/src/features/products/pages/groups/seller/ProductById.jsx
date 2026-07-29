import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import useProduct from "../../../hooks/useProduct.js";
import {
  Package,
  ArrowLeft,
  Layers,
  Loader2,
  Check,
  ShoppingBag,
  Cpu,
  Monitor,
  HardDrive,
  Shield,
  Truck,
  Headphones,
  Star,
  Zap,
} from "lucide-react";

const ProductById = () => {
  const { id } = useParams();
  const { handleGetProductById } = useProduct();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await handleGetProductById(id);
        // Supports data coming directly or wrapped inside an object
        setProduct(data?.product || data);
      } catch (err) {
        console.error("Failed to fetch product details", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-[#080b14] flex items-center justify-center">
        <Loader2 size={36} className="animate-spin text-violet-600 dark:text-violet-400" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-[#080b14] text-gray-900 dark:text-white pt-32 px-6 text-center space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-violet-100 dark:bg-violet-500/10 flex items-center justify-center mx-auto">
          <Package size={32} className="text-violet-600 dark:text-violet-400" />
        </div>
        <h2 className="text-xl font-black">Product not found</h2>
        <p className="text-sm text-gray-400 max-w-sm mx-auto">
          The laptop you are looking for might have been removed or is temporarily unavailable.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider bg-gradient-to-r from-violet-600 to-blue-600 text-white px-6 py-3.5 rounded-xl shadow-lg shadow-violet-500/20"
        >
          <ArrowLeft size={14} /> Back to Catalog
        </Link>
      </div>
    );
  }

  const primaryImage = product.images?.[0]?.url || "";
  const variants = product.variants || [];
  const selectedVariant = variants[selectedVariantIndex] || null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#080b14] text-gray-900 dark:text-white pt-28 pb-32">
      <div className="max-w-7xl mx-auto px-6 space-y-10">
        
        {/* Navigation / Header */}
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="group flex items-center gap-2 text-xs font-black uppercase tracking-wider text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to Catalog
          </Link>
          <span className="text-[10px] font-black tracking-[0.2em] uppercase text-violet-600 dark:text-violet-400 bg-violet-100 dark:bg-violet-500/10 border border-violet-200 dark:border-violet-500/20 px-3.5 py-1.5 rounded-full">
            Product Detail
          </span>
        </div>

        {/* Main Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Image Gallery Column (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative w-full aspect-[16/10] rounded-3xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-[#141929] dark:to-[#1a2035] overflow-hidden border border-gray-200 dark:border-white/[0.08] shadow-2xl flex items-center justify-center">
              {primaryImage ? (
                <img src={primaryImage} alt={product.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              ) : (
                <Package size={64} className="text-gray-300 dark:text-white/10" />
              )}
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="flex items-center gap-1 text-[10px] font-black uppercase tracking-wider bg-violet-600 text-white px-3 py-1 rounded-full shadow-lg">
                  <Zap size={10} /> Verified Spec
                </span>
              </div>
            </div>

            {/* Thumbnail preview strip if multiple images exist */}
            {product.images?.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <div key={idx} className="w-20 h-20 rounded-xl overflow-hidden border border-gray-200 dark:border-white/[0.08] bg-gray-100 dark:bg-white/[0.04] shrink-0 cursor-pointer">
                    <img src={img.url} alt="" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            )}

            {/* Trust Badges Bar */}
            <div className="grid grid-cols-3 gap-3 pt-4">
              <div className="flex items-center gap-3 p-4 bg-white dark:bg-[#0f1422] border border-gray-200 dark:border-white/[0.06] rounded-2xl">
                <Truck size={18} className="text-violet-500 shrink-0" />
                <div>
                  <p className="text-xs font-black">Free Shipping</p>
                  <p className="text-[10px] text-gray-400">Fast delivery</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-white dark:bg-[#0f1422] border border-gray-200 dark:border-white/[0.06] rounded-2xl">
                <Shield size={18} className="text-blue-500 shrink-0" />
                <div>
                  <p className="text-xs font-black">2-Year Warranty</p>
                  <p className="text-[10px] text-gray-400">Full coverage</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-white dark:bg-[#0f1422] border border-gray-200 dark:border-white/[0.06] rounded-2xl">
                <Headphones size={18} className="text-emerald-500 shrink-0" />
                <div>
                  <p className="text-xs font-black">24/7 Support</p>
                  <p className="text-[10px] text-gray-400">Expert help</p>
                </div>
              </div>
            </div>
          </div>

          {/* Details & Variants Selection Column (5 cols) */}
          <div className="lg:col-span-5 space-y-8 bg-white dark:bg-[#0f1422] border border-gray-200 dark:border-white/[0.06] p-8 rounded-3xl shadow-xl">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black tracking-[0.2em] uppercase text-violet-500 dark:text-violet-400">
                  {product.brand || "LaptopLux"}
                </span>
                <div className="flex items-center gap-1 text-xs font-bold text-gray-500">
                  <Star size={13} className="text-amber-400 fill-amber-400" /> 4.8 (124 reviews)
                </div>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
                {product.name}
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-medium leading-relaxed">
                {product.description || "High-performance laptop engineered for modern workloads, seamless multitasking, and immersive entertainment."}
              </p>
            </div>

            {/* Hardware Specifications */}
            <div className="space-y-3">
              <span className="text-[10px] font-black tracking-[0.15em] uppercase text-gray-400">Hardware Specifications</span>
              <div className="grid grid-cols-2 gap-3 text-xs font-bold bg-gray-50 dark:bg-white/[0.02] p-4 rounded-2xl border border-gray-200 dark:border-white/[0.06]">
                <div><span className="text-gray-400 text-[10px] block uppercase">Processor</span> {product.processor || "N/A"}</div>
                <div><span className="text-gray-400 text-[10px] block uppercase">Graphics</span> {product.graphics || "N/A"}</div>
                <div><span className="text-gray-400 text-[10px] block uppercase">Display</span> {product.display || "N/A"}</div>
                <div><span className="text-gray-400 text-[10px] block uppercase">OS</span> {product.operatingSystem || "N/A"}</div>
              </div>
            </div>

            {/* Variants Selector */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black tracking-[0.15em] uppercase text-gray-400">Select Configuration</span>
                {variants.length > 0 && (
                  <span className="text-[10px] text-gray-400 flex items-center gap-1">
                    <Layers size={11} /> {variants.length} options available
                  </span>
                )}
              </div>
              
              {variants.length === 0 ? (
                <p className="text-xs text-gray-400 font-bold">No variants available for this product.</p>
              ) : (
                <div className="grid grid-cols-1 gap-2.5 max-h-60 overflow-y-auto pr-1">
                  {variants.map((variant, index) => {
                    const isSelected = selectedVariantIndex === index;
                    return (
                      <button
                        key={variant._id || index}
                        type="button"
                        onClick={() => setSelectedVariantIndex(index)}
                        className={`text-left p-3.5 rounded-2xl border transition-all flex flex-col justify-between gap-2 ${
                          isSelected
                            ? "border-violet-500 bg-violet-50 dark:bg-violet-500/10 shadow-md shadow-violet-500/10"
                            : "border-gray-200 dark:border-white/[0.06] bg-gray-50 dark:bg-white/[0.02] hover:border-violet-300 dark:hover:border-violet-500/30"
                        }`}
                      >
                        <div className="flex justify-between items-center w-full">
                          <span className="text-[10px] font-black uppercase tracking-wider text-violet-600 dark:text-violet-400">
                            {variant.color || "Standard"}
                          </span>
                          {isSelected && <Check size={14} className="text-violet-600 dark:text-violet-400" />}
                        </div>

                        <div className="font-black text-xs space-x-2 text-gray-700 dark:text-gray-300">
                          <span>{variant.ram} RAM</span>
                          <span>•</span>
                          <span>{variant.storage}</span>
                        </div>

                        <div className="text-xs font-black text-emerald-600 dark:text-emerald-400 pt-2 border-t border-gray-200 dark:border-white/[0.06] flex justify-between items-center">
                          <span>{variant.price?.currency || "₹"} {variant.price?.amount?.toLocaleString("en-IN")}</span>
                          <span className="text-[10px] text-gray-400 font-bold">{variant.stock} in stock</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Checkout / Purchase Action */}
            {selectedVariant && (
              <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-white/[0.06]">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-[10px] font-black tracking-wider uppercase text-gray-400 block">Total Price</span>
                    <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
                      {selectedVariant.price?.currency || "₹"} {selectedVariant.price?.amount?.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-black tracking-wider uppercase text-gray-400 block">Availability</span>
                    <span className="text-xs font-black uppercase text-gray-800 dark:text-white">
                      {selectedVariant.stock > 0 ? `${selectedVariant.stock} units ready` : "Out of Stock"}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  disabled={selectedVariant.stock <= 0}
                  className="w-full bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 text-white font-black uppercase tracking-wider text-xs py-4 rounded-2xl flex justify-center items-center gap-2 shadow-xl shadow-violet-500/25 active:scale-98 transition-all disabled:opacity-50"
                >
                  <ShoppingBag size={16} /> Add to Cart
                </button>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};

export default ProductById;