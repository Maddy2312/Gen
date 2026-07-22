import React, { useEffect } from "react";
import useProduct from "../../../hooks/useProduct";
import { useSelector } from "react-redux";
import { Package, Plus, Trash2, Loader2, ArrowUpRight, ShieldCheck } from "lucide-react";
import { Link } from "react-router";

const SellerDashboard = () => {
  const { handleSellerProducts, deleteProduct } = useProduct();
  const sellerProducts = useSelector((state) => state.product.sellerProducts);
  const [loadingId, setLoadingId] = React.useState(null);

  useEffect(() => {
    handleSellerProducts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setLoadingId(id);
      await deleteProduct(id);
      await handleSellerProducts();
      setLoadingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white pt-24 pb-32">
      <div className="max-w-6xl mx-auto px-6 space-y-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-black/10 dark:border-white/10 pb-8">
          <div>
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-black/40 dark:text-white/40 mb-2">
              <ShieldCheck size={14} className="text-emerald-500" /> Authorized Seller Panel
            </div>
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight">
              Seller<br />Dashboard
            </h1>
          </div>

          <Link
            to="/admin/create-product"
            className="flex items-center justify-center gap-2 bg-black dark:bg-white text-white dark:text-black text-xs font-black uppercase tracking-wider px-6 py-4 rounded-2xl hover:opacity-80 transition shadow-lg shrink-0"
          >
            <Plus size={16} /> Add New Product
          </Link>
        </div>

        {/* Stats / Overview Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 rounded-3xl p-6 space-y-1">
            <span className="text-[10px] font-black tracking-[0.15em] uppercase text-black/40 dark:text-white/40">Total Listings</span>
            <div className="text-3xl font-black tracking-tight">{sellerProducts?.length || 0}</div>
          </div>
          <div className="bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 rounded-3xl p-6 space-y-1">
            <span className="text-[10px] font-black tracking-[0.15em] uppercase text-black/40 dark:text-white/40">Active Status</span>
            <div className="text-3xl font-black tracking-tight text-emerald-500">Live</div>
          </div>
          <div className="bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 rounded-3xl p-6 space-y-1">
            <span className="text-[10px] font-black tracking-[0.15em] uppercase text-black/40 dark:text-white/40">Account Grade</span>
            <div className="text-3xl font-black tracking-tight uppercase">Verified</div>
          </div>
        </div>

        {/* Product List Section */}
        <div className="space-y-6">
          <h2 className="text-xl font-black uppercase tracking-tight">Inventory Items</h2>

          {!sellerProducts || sellerProducts.length === 0 ? (
            <div className="text-center py-20 bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 rounded-3xl space-y-4">
              <Package size={36} className="mx-auto text-black/20 dark:text-white/20" />
              <div className="space-y-1">
                <p className="text-sm font-bold">No products found</p>
                <p className="text-xs text-black/40 dark:text-white/40">Get started by creating your first product listing.</p>
              </div>
              <Link
                to="/admin/create-product"
                className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider bg-black dark:bg-white text-white dark:text-black px-5 py-3 rounded-xl transition"
              >
                Create Product <ArrowUpRight size={14} />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sellerProducts.map((product) => {
                const primaryImage = product.images?.[0]?.url || "";
                return (
                  <div
                    key={product._id}
                    className="bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 rounded-3xl p-6 flex flex-col justify-between gap-6 hover:border-black/20 dark:hover:border-white/20 transition-all"
                  >
                    <div className="flex gap-4 items-start">
                      {/* Product Thumbnail */}
                      <div className="w-20 h-20 rounded-2xl bg-black/5 dark:bg-white/5 overflow-hidden shrink-0 flex items-center justify-center">
                        {primaryImage ? (
                          <img src={primaryImage} alt={product.name} className="w-full h-full object-cover" />
                        ) : (
                          <Package size={24} className="text-black/30 dark:text-white/30" />
                        )}
                      </div>

                      {/* Product Details */}
                      <div className="space-y-1 flex-1 min-w-0">
                        <span className="text-[9px] font-black tracking-[0.2em] uppercase text-black/40 dark:text-white/40">{product.brand}</span>
                        <h3 className="text-lg font-black uppercase tracking-tight truncate">{product.name}</h3>
                        <p className="text-xs text-black/60 dark:text-white/60 line-clamp-2 font-medium">
                          {product.description}
                        </p>
                      </div>
                    </div>

                    {/* Specs Tags */}
                    <div className="grid grid-cols-2 gap-2 text-[10px] font-bold text-black/60 dark:text-white/60 bg-white dark:bg-black/40 p-3 rounded-2xl border border-black/5 dark:border-white/5">
                      <div><strong className="text-black dark:text-white">CPU:</strong> {product.processor || "N/A"}</div>
                      <div><strong className="text-black dark:text-white">GPU:</strong> {product.graphics || "N/A"}</div>
                      <div><strong className="text-black dark:text-white">Display:</strong> {product.display || "N/A"}</div>
                      <div><strong className="text-black dark:text-white">OS:</strong> {product.operatingSystem || "N/A"}</div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-2 border-t border-black/5 dark:border-white/5">
                      <span className="text-[10px] font-bold text-black/40 dark:text-white/40">
                        Added: {new Date(product.createdAt).toLocaleDateString()}
                      </span>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleDelete(product._id)}
                          disabled={loadingId === product._id}
                          className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-red-500 bg-red-50 dark:bg-red-950/30 px-4 py-2.5 rounded-xl hover:opacity-80 transition disabled:opacity-50"
                        >
                          {loadingId === product._id ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                          Delete
                        </button>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default SellerDashboard;