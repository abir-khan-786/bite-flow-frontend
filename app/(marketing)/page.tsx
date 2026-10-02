"use client";

import React from "react";
import Link from "next/link";
import { toast } from "react-hot-toast";
import AnimatedCard from "@/src/components/ui/AnimatedCard";

export default function SaaSLandingPage() {
  const showWelcomeToast = () => {
    toast.success("Welcome to BiteFlow SaaS Platform! 🚀", {
      icon: "🍽️",
    });
  };

  const pricingPlans = [
    {
      name: "Starter Plan",
      price: "$29/mo",
      features: ["1 Restaurant", "QR Menu Generation", "Basic Orders Tracking"],
    },
    {
      name: "Pro Fleet Plan",
      price: "$79/mo",
      features: [
        "Unlimited Multi-branch",
        "Advanced Inventory",
        "Realtime Sales Analytics",
      ],
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 p-8 flex flex-col items-center justify-center">
      {/* Hero Section */}
      <div className="text-center max-w-2xl mb-12">
        <h1 className="text-5xl font-black tracking-tight text-indigo-600 mb-4">
          BiteFlow SaaS Engine
        </h1>
        <p className="text-lg text-slate-600 mb-6">
          The ultimate multi-tenant cloud operating ecosystem for scaling
          restaurant workflows globally.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/register"
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow font-medium hover:bg-indigo-700 transition"
          >
            Get Started (Register)
          </Link>
          <button
            onClick={showWelcomeToast}
            className="px-6 py-3 bg-white border border-slate-300 rounded-lg shadow font-medium hover:bg-slate-100 transition"
          >
            Try Demo Trigger
          </button>
        </div>
      </div>

      {/* Pricing Grid Layout with Animated Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
        {pricingPlans.map((plan, index) => (
          <AnimatedCard key={index}>
            <div className="p-6 border border-slate-200 rounded-2xl bg-white shadow-sm flex flex-col justify-between h-full">
              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">
                  {plan.name}
                </h3>
                <p className="text-3xl font-black text-indigo-600 mb-4">
                  {plan.price}
                </p>
                <ul className="space-y-2 mb-6">
                  {plan.features.map((feat, i) => (
                    <li
                      key={i}
                      className="text-slate-600 text-sm flex items-center gap-2"
                    >
                      ✅ {feat}
                    </li>
                  ))}
                </ul>
              </div>
              <Link
                href="/register"
                className="w-full text-center py-2 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition"
              >
                Subscribe Setup
              </Link>
            </div>
          </AnimatedCard>
        ))}
      </div>
    </main>
  );
}
