"use client";

import { useEffect, useState } from "react";
import { getAdminProducts, getOrders } from "@/lib/api";

export default function DashboardPage() {
  const [stats, setStats] = useState({ products: 0, orders: 0, revenue: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [products, orders] = await Promise.all([getAdminProducts(), getOrders()]);
        setStats({
          products: products.length,
          orders: orders.length,
          revenue: orders.reduce((sum, o) => sum + o.total, 0),
        });
      } catch {}
      setLoading(false);
    };
    load();
  }, []);

  const cards = [
    { label: "Ventas totales", value: loading ? "..." : `$${stats.revenue.toLocaleString("es-AR")}` },
    { label: "Pedidos", value: loading ? "..." : stats.orders },
    { label: "Productos activos", value: loading ? "..." : stats.products },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((c) => (
          <div key={c.label} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="font-semibold text-gray-500 mb-2 text-sm">{c.label}</h3>
            <p className="text-3xl font-bold text-gray-800">{c.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
