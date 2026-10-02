"use client";

import React from "react";
import { toast } from "react-hot-toast";

export default function SuperDashboardMetrics() {
  const triggerSystemPurgeAlert = () => {
    toast.error(
      "System configuration actions are restricted to super-admin authority context.",
      {
        style: {
          border: "1px solid #ef4444",
          padding: "16px",
          color: "#ef4444",
          background: "#fef2f2",
        },
      },
    );
  };

  const metricsData = [
    { title: "Total Operating Restaurants", count: "142 Active" },
    { title: "Monthly Recurring Revenue", count: "$8,450 USD" },
    { title: "Active DB Connections", count: "Neon Pool Stable" },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-8">
      <div className="max-w-5xl mx-auto">
        <header className="border-b border-slate-800 pb-4 mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-black tracking-wide text-indigo-400">
              BiteFlow Super Operator
            </h1>
            <p className="text-slate-400 text-sm">
              System core cloud telemetry statistics routing node.
            </p>
          </div>
          <button
            onClick={triggerSystemPurgeAlert}
            className="px-4 py-2 bg-rose-600 rounded-lg text-sm font-bold hover:bg-rose-700 transition"
          >
            Emergency Lockdown
          </button>
        </header>

        {/* Dynamic Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {metricsData.map((item, idx) => (
            <div
              key={idx}
              className="bg-slate-800 border border-slate-700 p-6 rounded-xl shadow-md"
            >
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                {item.title}
              </span>
              <p className="text-2xl font-black text-white mt-2">
                {item.count}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
