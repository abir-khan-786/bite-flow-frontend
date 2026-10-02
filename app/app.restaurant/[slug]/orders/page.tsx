"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { toast } from "react-hot-toast";

interface OrderSchema {
  id: string;
  table: string;
  items: string;
  total: number;
  status: "PENDING" | "PREPARING" | "SERVED";
}

export default function TenantLiveOrders() {
  const params = useParams();
  const slug = params.slug as string;

  // React local storage array parameters flow mockup
  const [orders, setOrders] = useState<OrderSchema[]>([
    {
      id: "BF-4011",
      table: "Table 04",
      items: "Premium Kacchi x2, Borhani x1",
      total: 820,
      status: "PENDING",
    },
    {
      id: "BF-4012",
      table: "Table 02",
      items: "Morog Polao x1, Jali Kabab x2",
      total: 420,
      status: "PREPARING",
    },
    {
      id: "BF-4013",
      table: "Table 11",
      items: "Chicken Biryani x3, Diet Coke x3",
      total: 1120,
      status: "SERVED",
    },
  ]);

  // Status mutation logic interface system validation
  const advanceOrderStatus = (id: string, currentStatus: string) => {
    let nextStatus: "PENDING" | "PREPARING" | "SERVED" = "SERVED";
    if (currentStatus === "PENDING") nextStatus = "PREPARING";
    if (currentStatus === "PREPARING") nextStatus = "SERVED";

    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status: nextStatus } : o)),
    );

    toast.success(`Order ${id} shifted to pipeline state: ${nextStatus}! 🎯`, {
      style: { background: "#0f172a", color: "#f8fafc" },
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 capitalize">
            Live Kitchen Tracker
          </h1>
          <p className="text-slate-500 text-sm">
            Managing data streams for tenant station:{" "}
            <span className="font-bold text-indigo-600 uppercase">{slug}</span>
          </p>
        </div>

        {/* Data Tables Framework layout presentation mapping logic */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-600 uppercase text-xs tracking-wider border-b border-slate-200">
                  <th className="p-4 font-bold">Order ID</th>
                  <th className="p-4 font-bold">Table Source</th>
                  <th className="p-4 font-bold">Food Specifications</th>
                  <th className="p-4 font-bold">Billing Total</th>
                  <th className="p-4 font-bold">Status Pipeline</th>
                  <th className="p-4 font-bold text-right">
                    Operation Execution
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-sm">
                {orders.map((order) => (
                  <tr
                    key={order.id}
                    className="hover:bg-slate-50/70 transition-colors"
                  >
                    <td className="p-4 font-mono font-bold text-indigo-600">
                      {order.id}
                    </td>
                    <td className="p-4 font-medium text-slate-700">
                      {order.table}
                    </td>
                    <td className="p-4 text-slate-600 max-w-xs truncate">
                      {order.items}
                    </td>
                    <td className="p-4 font-bold">৳ {order.total}</td>
                    <td className="p-4">
                      <span
                        className={`px-2.5 py-1 text-xs font-black rounded-full tracking-wide ${
                          order.status === "PENDING"
                            ? "bg-amber-100 text-amber-800"
                            : order.status === "PREPARING"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-emerald-100 text-emerald-800"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      {order.status !== "SERVED" ? (
                        <button
                          onClick={() =>
                            advanceOrderStatus(order.id, order.status)
                          }
                          className="px-3 py-1.5 bg-slate-900 text-white rounded-md text-xs font-semibold hover:bg-slate-800 transition"
                        >
                          {order.status === "PENDING"
                            ? "Accept & Prepare"
                            : "Mark as Served"}
                        </button>
                      ) : (
                        <span className="text-slate-400 text-xs font-semibold italic">
                          Dispatched
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
