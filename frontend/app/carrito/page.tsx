"use client";

import { useCartStore } from "@/lib/cartStore";
import { checkStock, StockCheckResult } from "@/lib/api";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ShoppingBag, Minus, Plus, Trash2, ArrowRight, Package, ImageOff, AlertTriangle, Truck } from "lucide-react";

const SHIPPING_COST = 2500;

export default function CarritoPage() {
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const getTotal = useCartStore((state) => state.getTotal());

  const [stockIssues, setStockIssues] = useState<Map<number, StockCheckResult>>(new Map());
  const [checking, setChecking] = useState(false);

  // Verificar stock al cargar y al cambiar items
  useEffect(() => {
    if (items.length === 0) return;
    const verify = async () => {
      setChecking(true);
      try {
        const results = await checkStock(items.map((i) => ({ product_id: i.product_id, quantity: i.quantity })));
        const issues = new Map<number, StockCheckResult>();
        for (const r of results) {
          if (!r.available) issues.set(r.product_id, r);
        }
        setStockIssues(issues);
      } catch {
        // silently fail
      } finally {
        setChecking(false);
      }
    };
    verify();
  }, [items]);

  const subtotal = getTotal;
  const total = subtotal + SHIPPING_COST;
  const hasStockIssues = stockIssues.size > 0;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="max-w-sm mx-auto px-4 text-center">
          <div className="w-20 h-20 bg-cloud-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-8 h-8 text-cloud-400" strokeWidth={1.5} />
          </div>
          <h1 className="text-2xl font-extrabold mb-3 text-textDark tracking-tight">Tu carrito esta vacio</h1>
          <p className="text-textSecondary mb-8 text-sm">
            Agrega productos para comenzar tu pedido
          </p>
          <Link
            href="/productos"
            className="inline-flex items-center space-x-2 bg-textDark text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-textDark/90 transition-all"
          >
            <span>Ver productos</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8">
          <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-2">Tu pedido</p>
          <h1 className="text-3xl md:text-4xl font-extrabold text-textDark tracking-tight">
            Carrito de compras
          </h1>
        </div>

        {hasStockIssues && (
          <div className="bg-amber-50 border border-amber-200 text-amber-800 px-4 py-3 rounded-xl mb-6 flex items-start space-x-2 text-sm">
            <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>Algunos productos superan el stock disponible. Ajusta las cantidades para continuar.</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Items */}
          <div className="lg:col-span-2 space-y-3">
            {items.map((item, index) => {
              const issue = stockIssues.get(item.product_id);
              return (
                <div
                  key={item.product_id}
                  className={`bg-white rounded-xl border p-4 md:p-5 flex items-center space-x-4 fade-in-up ${
                    issue ? "border-amber-300 bg-amber-50/30" : "border-cloud-200/60"
                  }`}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-cloud-50 rounded-lg flex items-center justify-center shrink-0 p-2">
                    {item.image_url ? (
                      <img src={item.image_url} alt={item.name} className="w-full h-full object-contain" />
                    ) : (
                      <ImageOff className="w-8 h-8 text-cloud-300" strokeWidth={1} />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm text-textDark truncate">{item.name}</h3>
                    <p className="text-textDark font-bold text-base">${item.price.toLocaleString("es-AR")}</p>
                    {issue && (
                      <p className="text-xs text-amber-600 font-medium mt-0.5">
                        Stock disponible: {issue.stock}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center space-x-1.5">
                    <button
                      onClick={() => updateQuantity(item.product_id, item.quantity - 1)}
                      className="w-8 h-8 rounded-lg bg-cloud-50 border border-cloud-200/60 flex items-center justify-center hover:bg-cloud-100 transition-colors"
                    >
                      <Minus className="w-3.5 h-3.5 text-textDark" />
                    </button>
                    <span className={`text-sm font-bold w-8 text-center ${issue ? "text-amber-600" : "text-textDark"}`}>
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
                      className="w-8 h-8 rounded-lg bg-cloud-50 border border-cloud-200/60 flex items-center justify-center hover:bg-cloud-100 transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5 text-textDark" />
                    </button>
                  </div>

                  <button
                    onClick={() => removeItem(item.product_id)}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-cloud-400 hover:text-red-500 hover:bg-red-50 transition-all"
                    aria-label="Eliminar producto"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              );
            })}
          </div>

          {/* Receipt / Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-cloud-200/60 p-6 sticky top-28">
              <h2 className="text-base font-bold mb-5 text-textDark">Resumen del pedido</h2>

              {/* Itemized receipt */}
              <div className="space-y-2 mb-4 pb-4 border-b border-cloud-100">
                {items.map((item) => (
                  <div key={item.product_id} className="flex justify-between text-xs">
                    <span className="text-textSecondary truncate max-w-[55%]">
                      {item.name} <span className="text-cloud-400">x{item.quantity}</span>
                    </span>
                    <span className="font-medium text-textDark">
                      ${(item.price * item.quantity).toLocaleString("es-AR")}
                    </span>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="space-y-2.5 mb-5 pb-5 border-b border-cloud-100">
                <div className="flex justify-between text-sm">
                  <span className="text-textSecondary">Subtotal ({items.reduce((s, i) => s + i.quantity, 0)} productos)</span>
                  <span className="font-semibold text-textDark">${subtotal.toLocaleString("es-AR")}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-textSecondary flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5" />
                    Envio
                  </span>
                  <span className="font-semibold text-textDark">${SHIPPING_COST.toLocaleString("es-AR")}</span>
                </div>
              </div>

              <div className="flex justify-between mb-6">
                <span className="text-base font-bold text-textDark">Total</span>
                <span className="text-xl font-extrabold text-textDark">${total.toLocaleString("es-AR")}</span>
              </div>

              <Link
                href={hasStockIssues ? "#" : "/checkout"}
                onClick={(e) => hasStockIssues && e.preventDefault()}
                className={`flex items-center justify-center space-x-2 w-full px-6 py-3.5 rounded-xl font-bold text-sm transition-all ${
                  hasStockIssues
                    ? "bg-cloud-200 text-cloud-400 cursor-not-allowed"
                    : "bg-primary text-white hover:bg-primary-dark"
                }`}
              >
                <span>Comprar</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              {hasStockIssues && (
                <p className="text-[11px] text-amber-600 mt-3 text-center font-medium">
                  Ajusta las cantidades marcadas para continuar
                </p>
              )}

              <div className="mt-4 bg-cloud-50 rounded-lg p-3 flex items-start space-x-2">
                <Package className="w-4 h-4 text-cloud-400 mt-0.5 shrink-0" />
                <p className="text-[11px] text-textSecondary leading-relaxed">
                  Envio a todo el Gran Mendoza. Te contactamos por WhatsApp para coordinar la entrega.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
