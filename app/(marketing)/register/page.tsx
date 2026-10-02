"use client";

import React, { useState } from "react";
import { toast } from "react-hot-toast";

export default function RestaurantRegister() {
  const [restaurantName, setRestaurantName] = useState("");
  const [ownerEmail, setOwnerEmail] = useState("");

  const handleRegistrationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!restaurantName || !ownerEmail) {
      toast.error("Please fill up all required fields.");
      return;
    }
    // Static response action simulation
    toast.promise(new Promise((resolve) => setTimeout(resolve, 1500)), {
      loading: "Creating workspace environment...",
      success: `Workspace for ${restaurantName} initiated! 🎉`,
      error: "Execution failure.",
    });
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
      <div className="bg-white border p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-slate-800 text-center mb-2">
          Register Workspace
        </h2>
        <p className="text-slate-500 text-sm text-center mb-6">
          Launch your restaurant operation cloud node in minutes.
        </p>

        <form onSubmit={handleRegistrationSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              Restaurant Name
            </label>
            <input
              type="text"
              value={restaurantName}
              onChange={(e) => setRestaurantName(e.target.value)}
              placeholder="e.g., Kacchi Bhai"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              Owner Corporate Email
            </label>
            <input
              type="email"
              value={ownerEmail}
              onChange={(e) => setOwnerEmail(e.target.value)}
              placeholder="name@restaurant.com"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition"
          >
            Create owne Resturent
          </button>
        </form>
      </div>
    </div>
  );
}
