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
} from "lucide-react";
import useCart from "../../../../cart/hooks/useCart.js";

const ProductById = () => {
  const { id } = useParams();
  const { handleGetProductById } = useProduct();
  const { handleAddToCart } = useCart();
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
      <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center">
        <Loader2
          size={32}
          className="animate-spin text-black dark:text-white"
        />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white pt-24 px-6 text-center space-y-4">
        <p className="text-sm font-bold">Product not found.</p>
        <Link
          to="/"
          className="inline-block text-xs font-black uppercase tracking-wider bg-black dark:bg-white text-white dark:text-black px-5 py-3 rounded-xl"
        >
          Back to Catalog
        </Link>
      </div>
    );
  }

  const primaryImage = product.images?.[0]?.url || "";
  const variants = product.variants || [];
  const selectedVariant = variants[selectedVariantIndex] || null;

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white pt-24 pb-32">
      <div className="max-w-6xl mx-auto px-6 space-y-12">
        {/* Navigation / Header */}
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white transition-colors"
          >
            <ArrowLeft size={14} /> Back to Catalog
          </Link>
          <span className="text-[9px] font-black tracking-[0.2em] uppercase text-black/30 dark:text-white/30 border border-black/10 dark:border-white/10 px-3 py-1.5 rounded-full">
            Product Detail
          </span>
        </div>

        {/* Main Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Image Gallery Column */}
          <div className="space-y-4">
            <div className="w-full h-96 rounded-3xl bg-black/5 dark:bg-white/5 overflow-hidden border border-black/5 dark:border-white/5 flex items-center justify-center">
              {primaryImage ? (
                <img
                  src={primaryImage}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <Package
                  size={48}
                  className="text-black/20 dark:text-white/20"
                />
              )}
            </div>
          </div>

          {/* Details & Variants Selection Column */}
          <div className="space-y-8">
            <div className="space-y-3">
              <span className="text-[10px] font-black tracking-[0.2em] uppercase text-black/40 dark:text-white/40">
                {product.brand}
              </span>
              <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight">
                {product.name}
              </h1>
              <p className="text-xs text-black/60 dark:text-white/60 font-medium leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Hardware Specifications */}
            <div className="space-y-3">
              <span className="text-[10px] font-black tracking-[0.15em] uppercase text-black/40 dark:text-white/40">
                Specifications
              </span>
              <div className="grid grid-cols-2 gap-3 text-xs font-bold bg-black/[0.02] dark:bg-white/[0.02] p-4 rounded-2xl border border-black/5 dark:border-white/5">
                <div>
                  <span className="text-black/40 dark:text-white/40 text-[10px] block uppercase">
                    Processor
                  </span>{" "}
                  {product.processor || "N/A"}
                </div>
                <div>
                  <span className="text-black/40 dark:text-white/40 text-[10px] block uppercase">
                    Graphics
                  </span>{" "}
                  {product.graphics || "N/A"}
                </div>
                <div>
                  <span className="text-black/40 dark:text-white/40 text-[10px] block uppercase">
                    Display
                  </span>{" "}
                  {product.display || "N/A"}
                </div>
                <div>
                  <span className="text-black/40 dark:text-white/40 text-[10px] block uppercase">
                    OS
                  </span>{" "}
                  {product.operatingSystem || "N/A"}
                </div>
              </div>
            </div>

            {/* Variants Selector */}
            <div className="space-y-4">
              <span className="text-[10px] font-black tracking-[0.15em] uppercase text-black/40 dark:text-white/40">
                Select Configuration
              </span>

              {variants.length === 0 ? (
                <p className="text-xs text-black/40 dark:text-white/40 font-bold">
                  No variants available for this product.
                </p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {variants.map((variant, index) => {
                    const isSelected = selectedVariantIndex === index;
                    return (
                      <button
                        key={variant._id || index}
                        type="button"
                        onClick={() => setSelectedVariantIndex(index)}
                        className={`text-left p-4 rounded-2xl border transition-all flex flex-col justify-between gap-3 ${
                          isSelected
                            ? "border-black dark:border-white bg-black/5 dark:bg-white/5 shadow-md"
                            : "border-black/5 dark:border-white/5 bg-black/[0.02] dark:bg-white/[0.02] hover:border-black/20 dark:hover:border-white/20"
                        }`}
                      >
                        <div className="flex justify-between items-center w-full">
                          <span className="text-[10px] font-black uppercase tracking-wider text-black/40 dark:text-white/40">
                            {variant.color}
                          </span>
                          {isSelected && (
                            <Check
                              size={14}
                              className="text-black dark:text-white"
                            />
                          )}
                        </div>

                        <div className="font-black text-xs space-x-2">
                          <span>{variant.ram} RAM</span>
                          <span>•</span>
                          <span>{variant.storage}</span>
                        </div>

                        <div className="text-sm font-black text-emerald-500 pt-2 border-t border-black/5 dark:border-white/5 flex justify-between items-center">
                          <span>
                            {variant.price?.currency || "USD"}{" "}
                            {variant.price?.amount}
                          </span>
                          <span className="text-[10px] text-black/40 dark:text-white/40 font-bold">
                            {variant.stock} in stock
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Checkout / Purchase Action */}
            {selectedVariant && (
              <div className="space-y-3 pt-4 border-t border-black/10 dark:border-white/10">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-[10px] font-black tracking-wider uppercase text-black/40 dark:text-white/40 block">
                      Total Price
                    </span>
                    <span className="text-3xl font-black text-emerald-500">
                      {selectedVariant.price?.currency || "USD"}{" "}
                      {selectedVariant.price?.amount}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-black tracking-wider uppercase text-black/40 dark:text-white/40 block">
                      Availability
                    </span>
                    <span className="text-xs font-black uppercase text-black dark:text-white">
                      {selectedVariant.stock > 0
                        ? `${selectedVariant.stock} units ready`
                        : "Out of Stock"}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  disabled={selectedVariant.stock <= 0}
                  className="w-full bg-black dark:bg-white text-white dark:text-black font-black uppercase tracking-wider text-sm py-4 rounded-2xl flex justify-center items-center gap-2 hover:opacity-85 transition shadow-lg disabled:opacity-50"
                  onClick={() =>
                    handleAddToCart(product._id, selectedVariant._id)
                  }
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
