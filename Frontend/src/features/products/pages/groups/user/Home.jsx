import React, { useEffect } from "react";
import useProduct from "../../../hooks/useProduct";
import { useSelector } from "react-redux";
import { Package, ArrowUpRight, Layers } from "lucide-react";
import { Link, useNavigate } from "react-router";

const Home = () => {
  const { handleUserProducts } = useProduct();
  const productState = useSelector((state) => state.product);
  const products = productState?.products || [];
  const navigate = useNavigate();

  useEffect(() => {
    handleUserProducts();
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white pt-24 pb-32">
      <div className="max-w-6xl mx-auto px-6 space-y-12">
        
        {/* Hero / Header Section */}
        <div className="border-b border-black/10 dark:border-white/10 pb-8 space-y-2">
          <span className="text-[10px] font-black tracking-[0.2em] uppercase text-black/40 dark:text-white/40">
            Marketplace Catalog
          </span>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight">
            Explore<br />Hardware
          </h1>
        </div>

        {/* Products Grid */}
        {products.length === 0 ? (
          <div className="text-center py-24 bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 rounded-3xl space-y-3">
            <Package size={36} className="mx-auto text-black/20 dark:text-white/20" />
            <div className="space-y-1">
              <p className="text-sm font-bold">No products available</p>
              <p className="text-xs text-black/40 dark:text-white/40">Check back later for new inventory listings.</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => {
              const primaryImage = product.images?.[0]?.url || "";
              const variants = product.variants || [];

              // Find lowest price among variants if available
              const prices = variants.map((v) => v.price?.amount).filter(Boolean);
              const minPrice = prices.length > 0 ? Math.min(...prices) : null;
              const currency = variants[0]?.price?.currency || "USD";

              return (
                <div
                onClick={()=>navigate(`/product/${product._id}`)}
                  key={product._id}
                  className="bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 rounded-3xl p-6 flex flex-col justify-between gap-6 hover:border-black/20 dark:hover:border-white/20 transition-all group"
                >
                  <div className="space-y-4">
                    {/* Thumbnail */}
                    <div className="w-full h-48 rounded-2xl bg-black/5 dark:bg-white/5 overflow-hidden flex items-center justify-center border border-black/5 dark:border-white/5">
                      {primaryImage ? (
                        <img src={primaryImage} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                      ) : (
                        <Package size={32} className="text-black/20 dark:text-white/20" />
                      )}
                    </div>

                    {/* Meta & Title */}
                    <div className="space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="text-[9px] font-black tracking-[0.2em] uppercase text-black/40 dark:text-white/40">{product.brand}</span>
                        {minPrice !== null && (
                          <span className="text-xs font-black text-emerald-500">
                            From {currency} {minPrice}
                          </span>
                        )}
                      </div>
                      <h3 className="text-xl font-black uppercase tracking-tight truncate">{product.name}</h3>
                      <p className="text-xs text-black/60 dark:text-white/60 line-clamp-2 font-medium">
                        {product.description}
                      </p>
                    </div>

                    {/* Core Specs */}
                    <div className="grid grid-cols-2 gap-2 text-[10px] font-bold text-black/60 dark:text-white/60 bg-white dark:bg-black/40 p-3 rounded-2xl border border-black/5 dark:border-white/5">
                      <div><strong className="text-black dark:text-white">CPU:</strong> {product.processor || "N/A"}</div>
                      <div><strong className="text-black dark:text-white">GPU:</strong> {product.graphics || "N/A"}</div>
                    </div>
                  </div>

                  {/* Footer / Variants count / Action */}
                  <div className="flex items-center justify-between pt-4 border-t border-black/5 dark:border-white/5">
                    <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-black/40 dark:text-white/40">
                      <Layers size={14} /> {variants.length} {variants.length === 1 ? 'Variant' : 'Variants'} available
                    </div>

                    <Link
                      className="flex items-center gap-1 text-xs font-black uppercase tracking-wider bg-black dark:bg-white text-white dark:text-black px-4 py-2.5 rounded-xl hover:opacity-80 transition"
                    >
                      View <ArrowUpRight size={14} />
                    </Link>
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
};

export default Home;