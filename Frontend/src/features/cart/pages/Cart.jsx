import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router";
import useCart from "../hooks/useCart";
import { ShoppingBag, Trash2, Plus, Minus, ArrowLeft, Loader2, Package } from "lucide-react";

const Cart = () => {
  const { handleGetCart, handleUpdateCartItem, handleRemoveCartItem } = useCart();
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    handleGetCart();
  }, []);

  const items = cart?.items || [];
  const loading = cart?.loading;

  // Calculate Subtotal
  const subtotal = items.reduce((acc, item) => {
    const price = item.price?.amount || item.product?.price?.amount || 0;
    return acc + price * item.quantity;
  }, 0);

  const currency = items[0]?.price?.currency || "USD";

  if (loading && items.length === 0) {
    return (
      <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center">
        <Loader2 size={32} className="animate-spin text-black dark:text-white" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white pt-24 pb-32">
      <div className="max-w-5xl mx-auto px-6 space-y-10">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-black/10 dark:border-white/10 pb-6">
          <div>
            <Link
              to="/"
              className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white transition-colors mb-2"
            >
              <ArrowLeft size={14} /> Back to Catalog
            </Link>
            <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight flex items-center gap-3">
              <ShoppingBag size={28} /> Your Cart
            </h1>
          </div>
          <span className="text-[10px] font-black tracking-[0.2em] uppercase text-black/40 dark:text-white/40 border border-black/10 dark:border-white/10 px-3 py-1.5 rounded-full">
            {items.length} {items.length === 1 ? "Item" : "Items"}
          </span>
        </div>

        {/* Empty State */}
        {items.length === 0 ? (
          <div className="text-center py-20 space-y-6">
            <div className="w-20 h-20 mx-auto rounded-3xl bg-black/5 dark:bg-white/5 flex items-center justify-center border border-black/5 dark:border-white/5">
              <ShoppingBag size={32} className="text-black/20 dark:text-white/20" />
            </div>
            <div className="space-y-2">
              <h2 className="text-lg font-black uppercase tracking-tight">Your cart is empty</h2>
              <p className="text-xs text-black/50 dark:text-white/50 font-medium">
                Looks like you haven't added anything to your cart yet.
              </p>
            </div>
            <Link
              to="/"
              className="inline-block text-xs font-black uppercase tracking-wider bg-black dark:bg-white text-white dark:text-black px-6 py-4 rounded-2xl shadow-lg hover:opacity-85 transition"
            >
              Explore Catalog
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
            
            {/* Items List */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => {
                const product = item.product || {};
                const variants = product.variants || [];
                const selectedVariant = variants.find((v) => v._id === item.variant) || {};
                const imageUrl = product.images?.[0]?.url;
                const itemPrice = item.price?.amount || 0;

                return (
                  <div
                    key={item._id}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-3xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5"
                  >
                    {/* Product Image & Info */}
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-20 rounded-2xl bg-black/5 dark:bg-white/5 overflow-hidden flex-shrink-0 flex items-center justify-center border border-black/5 dark:border-white/5">
                        {imageUrl ? (
                          <img src={imageUrl} alt={product.name} className="w-full h-full object-cover" />
                        ) : (
                          <Package size={24} className="text-black/20 dark:text-white/20" />
                        )}
                      </div>
                      <div className="space-y-1">
                        <span className="text-[9px] font-black tracking-widest uppercase text-black/40 dark:text-white/40 block">
                          {product.brand}
                        </span>
                        <h3 className="text-sm font-black uppercase tracking-tight">{product.name}</h3>
                        
                        {/* Variant specs if available */}
                        {selectedVariant._id && (
                          <div className="text-[10px] font-bold text-black/60 dark:text-white/60 space-x-1">
                            <span>{selectedVariant.color}</span>
                            <span>•</span>
                            <span>{selectedVariant.ram} RAM</span>
                            <span>•</span>
                            <span>{selectedVariant.storage}</span>
                          </div>
                        )}
                        <div className="text-xs font-black text-emerald-500 pt-1">
                          {currency} {itemPrice}
                        </div>
                      </div>
                    </div>

                    {/* Quantity controls & Delete */}
                    <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4 pt-2 sm:pt-0 border-t sm:border-t-0 border-black/5 dark:border-white/5">
                      <div className="flex items-center gap-2 bg-black/5 dark:bg-white/5 p-1.5 rounded-xl border border-black/5 dark:border-white/5">
                        <button
                          type="button"
                          onClick={() => handleUpdateCartItem(item._id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="p-1 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 disabled:opacity-30 transition"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="text-xs font-black w-6 text-center">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => handleUpdateCartItem(item._id, item.quantity + 1)}
                          className="p-1 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 transition"
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleRemoveCartItem(item._id)}
                        className="p-2.5 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500/20 transition"
                        title="Remove item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Order Summary Card */}
            <div className="p-6 rounded-3xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 space-y-6">
              <h3 className="text-sm font-black uppercase tracking-wider border-b border-black/10 dark:border-white/10 pb-4">
                Order Summary
              </h3>

              <div className="space-y-3 text-xs font-bold">
                <div className="flex justify-between text-black/60 dark:text-white/60">
                  <span>Subtotal</span>
                  <span>{currency} {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-black/60 dark:text-white/60">
                  <span>Shipping</span>
                  <span className="text-emerald-500 uppercase tracking-wider text-[10px]">Free</span>
                </div>
              </div>

              <div className="pt-4 border-t border-black/10 dark:border-white/10 flex justify-between items-center">
                <span className="text-xs font-black uppercase tracking-wider">Total</span>
                <span className="text-2xl font-black text-emerald-500">
                  {currency} {subtotal.toFixed(2)}
                </span>
              </div>

              <button
                type="button"
                className="w-full bg-black dark:bg-white text-white dark:text-black font-black uppercase tracking-wider text-sm py-4 rounded-2xl hover:opacity-85 transition shadow-lg"
                onClick={() => alert("Proceeding to checkout...")}
              >
                Proceed to Checkout
              </button>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;