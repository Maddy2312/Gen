import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Layers, Plus, ArrowLeft, Loader2 } from "lucide-react";
import useProduct from "../../../hooks/useProduct.js";

const CreateProductVariant = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { handleCreateVariant } = useProduct();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    ram: "",
    storage: "",
    color: "",
    priceAmount: "",
    priceCurrency: "USD",
    stock: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const payload = {
        ram: formData.ram,
        storage: formData.storage,
        color: formData.color,
        priceAmount: Number(formData.priceAmount),
        priceCurrency: formData.priceCurrency,
        stock: Number(formData.stock),
      };

      const res = await handleCreateVariant(payload, id);
      if (res?.success) {
        navigate(`/seller/dashboard/${id}`);
      } else {
        setError(res?.message || "Failed to create variant");
      }
    } catch (err) {
      setError(err?.response?.data?.message || err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white pt-24 pb-32">
      <div className="max-w-2xl mx-auto px-6 space-y-8">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white transition-colors"
          >
            <ArrowLeft size={14} /> Back
          </button>
          <span className="text-[9px] font-black tracking-[0.2em] uppercase text-black/30 dark:text-white/30 border border-black/10 dark:border-white/10 px-3 py-1.5 rounded-full">
            Inventory Expansion
          </span>
        </div>

        <div>
          <span className="text-[10px] font-black tracking-[0.2em] uppercase text-black/30 dark:text-white/30">Specification Option</span>
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight mt-1">
            Add Product<br />Variant
          </h1>
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-950/30 border border-red-500/20 text-red-500 p-4 rounded-2xl text-xs font-bold">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 rounded-3xl p-6 sm:p-8 space-y-6">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-[10px] font-black tracking-[0.15em] uppercase text-black/40 dark:text-white/40">RAM</label>
                <input
                  type="text"
                  name="ram"
                  required
                  placeholder="e.g. 16GB"
                  value={formData.ram}
                  onChange={handleChange}
                  className="w-full bg-white dark:bg-black border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 text-xs font-bold outline-none focus:border-black dark:focus:border-white transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black tracking-[0.15em] uppercase text-black/40 dark:text-white/40">Storage</label>
                <input
                  type="text"
                  name="storage"
                  required
                  placeholder="e.g. 512GB SSD"
                  value={formData.storage}
                  onChange={handleChange}
                  className="w-full bg-white dark:bg-black border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 text-xs font-bold outline-none focus:border-black dark:focus:border-white transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-[10px] font-black tracking-[0.15em] uppercase text-black/40 dark:text-white/40">Color</label>
                <input
                  type="text"
                  name="color"
                  required
                  placeholder="e.g. Space Gray"
                  value={formData.color}
                  onChange={handleChange}
                  className="w-full bg-white dark:bg-black border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 text-xs font-bold outline-none focus:border-black dark:focus:border-white transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black tracking-[0.15em] uppercase text-black/40 dark:text-white/40">Stock Quantity</label>
                <input
                  type="number"
                  name="stock"
                  placeholder="e.g. 25"
                  value={formData.stock}
                  onChange={handleChange}
                  className="w-full bg-white dark:bg-black border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 text-xs font-bold outline-none focus:border-black dark:focus:border-white transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-[10px] font-black tracking-[0.15em] uppercase text-black/40 dark:text-white/40">Price Amount</label>
                <input
                  type="number"
                  name="priceAmount"
                  required
                  placeholder="e.g. 1299"
                  value={formData.priceAmount}
                  onChange={handleChange}
                  className="w-full bg-white dark:bg-black border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 text-xs font-bold outline-none focus:border-black dark:focus:border-white transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black tracking-[0.15em] uppercase text-black/40 dark:text-white/40">Currency</label>
                <select
                  name="priceCurrency"
                  value={formData.priceCurrency}
                  onChange={handleChange}
                  className="w-full bg-white dark:bg-black border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 text-xs font-bold outline-none focus:border-black dark:focus:border-white transition-colors"
                >
                  <option value="USD">USD</option>
                  <option value="INR">INR</option>
                  <option value="EUR">EUR</option>
                </select>
              </div>
            </div>

          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black dark:bg-white text-white dark:text-black font-black uppercase tracking-wider text-sm py-4 rounded-2xl flex justify-center items-center gap-2 hover:bg-zinc-800 dark:hover:bg-zinc-100 transition shadow-lg disabled:opacity-50"
          >
            {loading ? <Loader2 size={16} className="animate-spin" /> : <Layers size={16} />}
            {loading ? "Adding Variant..." : "Create Variant"}
          </button>
        </form>

      </div>
    </div>
  );
};

export default CreateProductVariant;