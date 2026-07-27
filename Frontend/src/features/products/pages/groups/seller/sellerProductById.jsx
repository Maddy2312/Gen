import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import useProduct from "../../../hooks/useProduct.js";
import { Package, Plus, Layers, ArrowLeft, Loader2, DollarSign } from "lucide-react";

const SellerProductById = () => {
  const { id } = useParams();
  const { handleGetProductById } = useProduct();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

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
        <Loader2 size={32} className="animate-spin text-black dark:text-white" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white pt-24 px-6 text-center space-y-4">
        <p className="text-sm font-bold">Product not found.</p>
        <Link to="/seller/dashboard" className="inline-block text-xs font-black uppercase tracking-wider bg-black dark:bg-white text-white dark:text-black px-5 py-3 rounded-xl">
          Back to Dashboard
        </Link>
      </div>
    );
  }

  const primaryImage = product.images?.[0]?.url || "";

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white pt-24 pb-32">
      <div className="max-w-5xl mx-auto px-6 space-y-10">
        
        {/* Header / Navigation */}
        <div className="flex items-center justify-between">
          <Link
            to="/seller/dashboard"
            className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white transition-colors"
          >
            <ArrowLeft size={14} /> Back to Dashboard
          </Link>
          <span className="text-[9px] font-black tracking-[0.2em] uppercase text-black/30 dark:text-white/30 border border-black/10 dark:border-white/10 px-3 py-1.5 rounded-full">
            Product Management
          </span>
        </div>

        {/* Product Overview Card */}
        <div className="bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row gap-8 items-start">
          <div className="w-full md:w-48 h-48 rounded-2xl bg-black/5 dark:bg-white/5 overflow-hidden shrink-0 flex items-center justify-center border border-black/5 dark:border-white/5">
            {primaryImage ? (
              <img src={primaryImage} alt={product.name} className="w-full h-full object-cover" />
            ) : (
              <Package size={40} className="text-black/20 dark:text-white/20" />
            )}
          </div>

          <div className="space-y-4 flex-1">
            <div>
              <span className="text-[10px] font-black tracking-[0.2em] uppercase text-black/40 dark:text-white/40">{product.brand}</span>
              <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight mt-1">{product.name}</h1>
              <p className="text-xs text-black/60 dark:text-white/60 font-medium mt-2 leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-[11px] font-bold bg-white dark:bg-black/40 p-4 rounded-2xl border border-black/5 dark:border-white/5">
              <div><strong className="text-black/40 dark:text-white/40 block text-[9px] uppercase tracking-wider">CPU</strong> {product.processor || "N/A"}</div>
              <div><strong className="text-black/40 dark:text-white/40 block text-[9px] uppercase tracking-wider">GPU</strong> {product.graphics || "N/A"}</div>
              <div><strong className="text-black/40 dark:text-white/40 block text-[9px] uppercase tracking-wider">Display</strong> {product.display || "N/A"}</div>
              <div><strong className="text-black/40 dark:text-white/40 block text-[9px] uppercase tracking-wider">OS</strong> {product.operatingSystem || "N/A"}</div>
            </div>
          </div>
        </div>

        {/* Variants Section */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-black tracking-[0.2em] uppercase text-black/40 dark:text-white/40">Configurations</span>
              <h2 className="text-2xl font-black uppercase tracking-tight">Product Variants</h2>
            </div>

            <Link
              to={`/seller/dashboard/${product._id}/create-variant`}
              className="flex items-center justify-center gap-2 bg-black dark:bg-white text-white dark:text-black text-xs font-black uppercase tracking-wider px-5 py-3.5 rounded-2xl hover:opacity-80 transition shadow-lg shrink-0"
            >
              <Plus size={16} /> Add Variant
            </Link>
          </div>

          {!product.variants || product.variants.length === 0 ? (
            <div className="text-center py-16 bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 rounded-3xl space-y-3">
              <Layers size={32} className="mx-auto text-black/20 dark:text-white/20" />
              <div className="space-y-1">
                <p className="text-sm font-bold">No variants added yet</p>
                <p className="text-xs text-black/40 dark:text-white/40">Add options like RAM, storage, color, and pricing for this product.</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {product.variants.map((variant, index) => (
                <div
                  key={variant._id || index}
                  className="bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 rounded-3xl p-6 space-y-4 hover:border-black/20 dark:hover:border-white/20 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-[9px] font-black tracking-[0.2em] uppercase bg-black/5 dark:bg-white/5 px-2.5 py-1 rounded-lg text-black/60 dark:text-white/60">
                        Variant #{index + 1}
                      </span>
                      <span className="text-sm font-black text-emerald-500">
                        {variant.price?.currency || "USD"} {variant.price?.amount}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs font-bold pt-2 border-t border-black/5 dark:border-white/5">
                      <div><span className="text-black/40 dark:text-white/40 text-[10px] block">RAM</span> {variant.ram}</div>
                      <div><span className="text-black/40 dark:text-white/40 text-[10px] block">Storage</span> {variant.storage}</div>
                      <div><span className="text-black/40 dark:text-white/40 text-[10px] block">Color</span> {variant.color}</div>
                      <div><span className="text-black/40 dark:text-white/40 text-[10px] block">Stock</span> {variant.stock} units</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default SellerProductById;