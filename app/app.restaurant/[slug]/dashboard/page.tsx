"use client";

import React from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { toast } from "react-hot-toast";
import AnimatedCard from "@/src/components/ui/AnimatedCard";

export default function TenantDashboard() {
  const params = useParams();
  const slug = params.slug as string; // URL theke sub-domain ba text identity split kore dynamic tracking context out kore

  const triggerCloudSync = () => {
    toast.success(
      `Cloud database synchronized for ${slug.toUpperCase()} Node! ⚡`,
      {
        icon: "✨",
      },
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Hub Banner layout banner details controller */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-indigo-950 text-white p-6 rounded-2xl shadow-xl mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold capitalize tracking-tight">
              {slug ? slug.replace("-", " ") : "Loading Workspace..."} Hub
            </h1>
            <p className="text-indigo-200 text-sm">
              BiteFlow Engine Multi-Tenant Workspace Active Node.
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              href={`/app.restaurant/${slug}/orders`}
              className="px-4 py-2 bg-indigo-600 rounded-lg text-sm font-semibold hover:bg-indigo-700 transition"
            >
              Open Live Kitchen
            </Link>
            <button
              onClick={triggerCloudSync}
              className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-sm font-semibold hover:bg-white/20 transition"
            >
              Sync Matrix Data
            </button>
          </div>
        </div>

        {/* Dynamic Analytics Overview Cards metrics row info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[
            { title: "Today's Counter Orders", val: "48 Orders" },
            { title: "Gross Daily Revenue", val: "৳ 24,500 BDT" },
            { title: "Occupied Food Tables", val: "7/12 Active" },
          ].map((item, index) => (
            <AnimatedCard key={index}>
              <div className="p-6 bg-white border border-slate-200 shadow-sm rounded-xl">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  {item.title}
                </span>
                <p className="text-3xl font-black text-slate-800 tracking-tight">
                  {item.val}
                </p>
              </div>
            </AnimatedCard>
          ))}
        </div>
      </div>
    </div>
  );
}
