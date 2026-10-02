"use client";

import React, { useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";
import AnimatedCard from "@/src/components/ui/AnimatedCard";

interface FoodItem {
  id: number;
  name: string;
  price: number;
  category: string;
}

interface CartItem extends FoodItem {
  quantity: number;
}

export default function CustomerPublicMenu() {
  const params = useParams();
  const searchParams = useSearchParams();

  const slug = params.slug as string;
  const initialTable = searchParams.get("table") || ""; // URL tracking fallback placeholder target

  // State Management Hooks for Customer & Table Node Inputs
  const [customerName, setCustomerName] = useState("");
  const [tableNumber, setTableNumber] = useState(initialTable);

  const menuItems: FoodItem[] = [
    { id: 101, name: "Premium Mutton Kacchi", price: 380, category: "Mains" },
    { id: 102, name: "Special Morog Polao", price: 290, category: "Mains" },
    { id: 103, name: "Shahi Borhani", price: 80, category: "Beverages" },
    { id: 104, name: "Jali Kabab", price: 60, category: "Sides" },
  ];

  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: FoodItem) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i,
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    toast.success(`${item.name} added to cart! 🛒`, { duration: 1500 });
  };

  const calculateTotal = () =>
    cart.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);

  // Core Submission Link Dispatch Pipeline
  const handlePlaceOrderSubmit = () => {
    if (cart.length === 0) {
      toast.error("Your shopping cart workspace is currently empty!");
      return;
    }

    // 🚨 Table Input Validation Guardrails
    if (!tableNumber.trim()) {
      toast.error("Please enter your Table Number to dispatch order data!", {
        icon: "⚠️",
      });
      return;
    }

    if (!customerName.trim()) {
      toast.error("Please specify Customer Name for kitchen node alignment!", {
        icon: "👤",
      });
      return;
    }

    // Server actions data submission tracking animation loop processing trigger mock response status
    toast.promise(new Promise((resolve) => setTimeout(resolve, 2000)), {
      loading: `Transmitting payload for Table ${tableNumber} to kitchen node...`,
      success: `Order successfully queued for ${customerName}! 🍽️🔥`,
      error: "Data relay validation failure.",
    });

    // Flushes local framework state variables context details
    setCart([]);
    setCustomerName("");
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-24">
      {/* Top Navigation Headers Info Layout */}
      <header className="bg-white border-b sticky top-0 z-40 p-4 shadow-sm flex justify-between items-center">
        <div>
          <h1 className="text-xl font-black text-indigo-900 tracking-tight capitalize">
            {slug ? slug.replace("-", " ") : "BiteFlow Network Node"}
          </h1>
          <p className="text-xs text-slate-500 font-bold">
            🍽️ Active Dynamic Menu Console
          </p>
        </div>
        <div className="bg-indigo-100 text-indigo-900 px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider shadow-inner">
          🛒 {cart.reduce((sum, item) => sum + item.quantity, 0)} Items Selected
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-4 grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
        {/* Left Side: Product Grid Display Menu Listings */}
        <div className="md:col-span-2 space-y-4">
          <h2 className="text-lg font-black text-slate-800 tracking-wide uppercase mb-2">
            Explore Culinary Menu
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {menuItems.map((food) => (
              <AnimatedCard key={food.id}>
                <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow flex flex-col justify-between h-40">
                  <div>
                    <span className="text-[10px] bg-slate-100 text-slate-500 font-bold px-2 py-0.5 rounded-full uppercase tracking-widest">
                      {food.category}
                    </span>
                    <h3 className="font-bold text-base text-slate-800 mt-1 line-clamp-1">
                      {food.name}
                    </h3>
                    <p className="text-indigo-600 font-black text-base mt-1">
                      ৳ {food.price} BDT
                    </p>
                  </div>
                  <button
                    onClick={() => addToCart(food)}
                    className="w-full py-2 bg-indigo-50 border border-indigo-200 text-indigo-700 font-bold rounded-lg text-xs hover:bg-indigo-600 hover:text-white transition-all shadow-sm"
                  >
                    + Add Selection
                  </button>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>

        {/* Right Side: Order Summary Checkout Actions With Inputs Box Container Layout */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm h-fit sticky top-24 space-y-4">
          <h2 className="text-base font-black border-b pb-2 tracking-wide text-slate-800 uppercase">
            Live Review Summary
          </h2>

          {/* Dynamic Table & Customer Inputs Matrix Area */}
          <div className="space-y-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
            <div>
              <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500 mb-1">
                Table Node Number *
              </label>
              <input
                type="text"
                value={tableNumber}
                onChange={(e) => setTableNumber(e.target.value)}
                placeholder="e.g., Table 05"
                className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500 mb-1">
                Your Full Name *
              </label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="e.g., Anik Rahman"
                className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Food items display validation layer list */}
          {cart.length === 0 ? (
            <p className="text-slate-400 text-xs italic py-4 text-center">
              No active food entries chosen yet.
            </p>
          ) : (
            <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
              {cart.map((cartItem) => (
                <div
                  key={cartItem.id}
                  className="flex justify-between items-center text-xs border-b border-slate-100 pb-2"
                >
                  <div className="max-w-[75%]">
                    <p className="font-bold text-slate-700 truncate">
                      {cartItem.name}
                    </p>
                    <span className="text-[10px] text-slate-400">
                      ৳{cartItem.price} x {cartItem.quantity}
                    </span>
                  </div>
                  <span className="font-black text-slate-900">
                    ৳ {cartItem.price * cartItem.quantity}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Pricing Billing Details Calculation Matrices Block Segment */}
          <div className="border-t pt-3 space-y-2">
            <div className="flex justify-between text-sm font-black text-slate-900 mb-2">
              <span>Estimated Total:</span>
              <span className="text-indigo-600">৳ {calculateTotal()} BDT</span>
            </div>
            <button
              onClick={handlePlaceOrderSubmit}
              disabled={cart.length === 0}
              className={`w-full py-3 rounded-xl text-xs font-black tracking-wider uppercase shadow-md transition-all ${
                cart.length === 0
                  ? "bg-slate-200 text-slate-400 cursor-not-allowed shadow-none"
                  : "bg-indigo-600 text-white hover:bg-indigo-700 active:scale-95"
              }`}
            >
              🚀 Transmit Active Order
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
