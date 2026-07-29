import React, { useEffect, useState } from "react";
import useProduct from "../../../hooks/useProduct";
import { useSelector } from "react-redux";
import {
  Package,
  Plus,
  Trash2,
  Loader2,
  ArrowUpRight,
  ShieldCheck,
  Cpu,
  Monitor,
  Calendar,
  Layers,
  ChevronRight,
} from "lucide-react";
import { Link, useNavigate } from "react-router";

const SellerDashboard = () => {
  const { handleSellerProducts, deleteProduct } = useProduct();
  const sellerProducts = useSelector((state) => state.product.sellerProducts);
  const [loadingId, setLoadingId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    handleSellerProducts();
  }, []);

  const handleDelete = async (e, id) => {
    e.stopPropagation(); // Prevent card navigation on click
    if (window.confirm("Are you sure you want to delete this product?")) {
      setLoadingId(id);
      await deleteProduct(id);
      await handleSellerProducts();
      setLoadingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#080b14] text-gray-900 dark:text-white pt-28 pb-32">
      <div className="max-w-7xl mx-auto px-6 space-y-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-gray-200 dark:border-white/[0.08] pb-8">
          <div>
            <div className="inline-flex items-center gap-2 bg-emerald-100 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/25 text-emerald-700 dark:text-emerald-400 px-3.5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-3">
              <ShieldCheck size={14} /> Authorized Seller Panel
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight">
              Seller Dashboard
            </h1>
          </div>

          <Link
            to="/seller/create-product"
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 text-white text-xs font-black uppercase tracking-wider px-6 py-4 rounded-2xl shadow-xl shadow-violet-500/25 active:scale-95 transition-all shrink-0"
          >
            <Plus size={16} /> Add New Product
          </Link>
        </div>

        {/* Stats / Overview Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="bg-white dark:bg-[#0f1422] border border-gray-200 dark:border-white/[0.06] rounded-3xl p-6 space-y-1 shadow-lg shadow-black/[0.02]">
            <span className="text-[10px] font-black tracking-[0.15em] uppercase text-gray-400">Total Listings</span>
            <div className="text-3xl font-black tracking-tight text-violet-600 dark:text-violet-400">
              {sellerProducts?.length || 0}
            </div>
          </div>
          <div className="bg-white dark:bg-[#0f1422] border border-gray-200 dark:border-white/[0.06] rounded-3xl p-6 space-y-1 shadow-lg shadow-black/[0.02]">
            <span className="text-[10px] font-black tracking-[0.15em] uppercase text-gray-400">Active Status</span>
            <div className="text-3xl font-black tracking-tight text-emerald-500 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" /> Live
            </div>
          </div>
          <div className="bg-white dark:bg-[#0f1422] border border-gray-200 dark:border-white/[0.06] rounded-3xl p-6 space-y-1 shadow-lg shadow-black/[0.02]">
            <span className="text-[10px] font-black tracking-[0.15em] uppercase text-gray-400">Account Grade</span>
            <div className="text-3xl font-black tracking-tight uppercase text-blue-500">Verified</div>
          </div>
        </div>

        {/* Product List Section */}
        <div className="space-y-6">
          <h2 className="text-xl font-black uppercase tracking-tight">Inventory Items</h2>

          {!sellerProducts || sellerProducts.length === 0 ? (
            <div className="text-center py-24 bg-white dark:bg-[#0f1422] border border-gray-200 dark:border-white/[0.06] rounded-3xl space-y-4 shadow-xl">
              <div className="w-20 h-20 rounded-full bg-gray-100 dark:bg-white/[0.04] border border-gray-200 dark:border-white/[0.06] flex items-center justify-center mx-auto">
                <Package size={36} className="text-gray-300 dark:text-white/20" />
              </div>
              <div className="space-y-1">
                <p className="text-base font-black">No products found</p>
                <p className="text-xs text-gray-400">Get started by creating your first product listing.</p>
              </div>
              <Link
                to="/seller/create-product"
                className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider bg-violet-600 hover:bg-violet-500 text-white px-6 py-3 rounded-xl transition shadow-lg shadow-violet-500/20"
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
                    onClick={() => navigate(`/seller/dashboard/${product._id}`)}
                    className="group cursor-pointer bg-white dark:bg-[#0f1422] border border-gray-200 dark:border-white/[0.06] rounded-3xl p-6 flex flex-col justify-between gap-6 hover:border-violet-300 dark:hover:border-violet-500/40 hover:shadow-xl hover:shadow-violet-500/5 transition-all duration-300"
                  >
                    <div className="flex gap-4 items-start">
                      {/* Product Thumbnail */}
                      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-[#141929] dark:to-[#1a2035] overflow-hidden shrink-0 flex items-center justify-center border border-gray-200 dark:border-white/[0.06]">
                        {primaryImage ? (
                          <img src={primaryImage} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        ) : (
                          <Package size={24} className="text-gray-300 dark:text-white/20" />
                        )}
                      </div>

                      {/* Product Details */}
                      <div className="space-y-1.5 flex-1 min-w-0">
                        <span className="text-[10px] font-black tracking-[0.2em] uppercase text-violet-600 dark:text-violet-400">
                          {product.brand || "Brand"}
                        </span>
                        <h3 className="text-lg font-black tracking-tight truncate group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                          {product.name}
                        </h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 font-medium">
                          {product.description || "No description provided."}
                        </p>
                      </div>
                    </div>

                    {/* Specs Tags */}
                    <div className="grid grid-cols-2 gap-2 text-[10px] font-bold text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-white/[0.02] p-3.5 rounded-2xl border border-gray-200 dark:border-white/[0.06]">
                      <div className="flex items-center gap-1.5 truncate">
                        <Cpu size={12} className="text-blue-500 shrink-0" />
                        <span className="truncate"><strong className="text-gray-900 dark:text-white">CPU:</strong> {product.processor || "N/A"}</span>
                      </div>
                      <div className="flex items-center gap-1.5 truncate">
                        <Monitor size={12} className="text-violet-500 shrink-0" />
                        <span className="truncate"><strong className="text-gray-900 dark:text-white">GPU:</strong> {product.graphics || "N/A"}</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-white/[0.06]">
                      <span className="text-[10px] font-bold text-gray-400 flex items-center gap-1">
                        <Calendar size={12} /> Added: {new Date(product.createdAt).toLocaleDateString()}
                      </span>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={(e) => handleDelete(e, product._id)}
                          disabled={loadingId === product._id}
                          className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 hover:bg-red-100 dark:hover:bg-red-900/40 px-4 py-2.5 rounded-xl transition disabled:opacity-50"
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