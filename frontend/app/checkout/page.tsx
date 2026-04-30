"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/lib/cartStore";
import { createOrder, checkStock } from "@/lib/api";
import { CreditCard, Banknote, Landmark, Loader2, AlertCircle, ShieldCheck, Truck } from "lucide-react";
import Link from "next/link";

const SHIPPING_COST = 2500;

export default function CheckoutPage() {
  const router = useRouter();
  const items = useCartStore((state) => state.items);
  const getTotal = useCartStore((state) => state.getTotal());
  const clearCart = useCartStore((state) => state.clearCart);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stockError, setStockError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState({
    customer_name: "",
    customer_phone: "",
    customer_address: "",
    payment_method: "mercado_pago",
    notes: "",
  });

  // Verificar stock al entrar
  useEffect(() => {
    if (items.length === 0) return;
    const verify = async () => {
      try {
        const results = await checkStock(items.map((i) => ({ product_id: i.product_id, quantity: i.quantity })));
        const unavailable = results.filter((r) => !r.available);
        if (unavailable.length > 0) {
          setStockError(
            `Stock insuficiente: ${unavailable.map((u) => `${u.name} (disponible: ${u.stock})`).join(", ")}`
          );
        }
      } catch {}
    };
    verify();
  }, [items]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (fieldErrors[e.target.name]) {
      setFieldErrors({ ...fieldErrors, [e.target.name]: "" });
    }
  };

  const validate = () => {
    const errors: Record<string, string> = {};
    if (!formData.customer_name.trim()) errors.customer_name = "Ingresa tu nombre";
    if (!formData.customer_phone.trim()) errors.customer_phone = "Ingresa tu telefono";
    if (!formData.customer_address.trim()) errors.customer_address = "Ingresa tu direccion";
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validate()) return;
    if (items.length === 0) { setError("El carrito esta vacio"); return; }
    if (stockError) { setError("Hay problemas de stock. Volve al carrito para ajustar."); return; }

    setLoading(true);

    try {
      const orderData = {
        ...formData,
        items: items.map((item) => ({
          product_id: item.product_id,
          quantity: item.quantity,
          unit_price: item.price,
        })),
      };

      const order = await createOrder(orderData);
      clearCart();

      // Si es Mercado Pago y tenemos el link de pago, redirigir ahí
      if (order.payment_method === "mercado_pago" && order.mp_init_point) {
        window.location.href = order.mp_init_point;
      } else {
        router.push(`/confirmacion?id=${order.id}`);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al crear el pedido");
    } finally {
      setLoading(false);
    }
  };

  const subtotal = getTotal;
  const total = subtotal + SHIPPING_COST;

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="text-2xl font-extrabold mb-3 text-textDark">No hay productos en el carrito</h1>
        <p className="text-textSecondary text-sm mb-6">Agrega productos antes de hacer el pedido</p>
        <Link href="/productos" className="inline-block bg-primary text-white px-6 py-3 rounded-xl font-bold text-sm">
          Ver productos
        </Link>
      </div>
    );
  }

  const paymentOptions = [
    { value: "mercado_pago", label: "Mercado Pago", icon: <CreditCard className="w-4 h-4" /> },
    { value: "transferencia", label: "Transferencia", icon: <Landmark className="w-4 h-4" /> },
    { value: "efectivo", label: "Efectivo", icon: <Banknote className="w-4 h-4" /> },
  ];

  const inputClass = (field: string) =>
    `w-full px-4 py-2.5 bg-white border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all text-sm ${
      fieldErrors[field] ? "border-red-300 bg-red-50/30" : "border-cloud-200"
    }`;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-2">Checkout</p>
        <h1 className="text-3xl font-extrabold text-textDark tracking-tight">Completar pedido</h1>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6 flex items-center space-x-2 text-sm">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {stockError && (
        <div className="bg-amber-50 border border-amber-200 text-amber-700 px-4 py-3 rounded-xl mb-6 flex items-start space-x-2 text-sm">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">Problema de stock</p>
            <p>{stockError}</p>
            <Link href="/carrito" className="text-primary font-semibold hover:underline mt-1 inline-block">
              Volver al carrito
            </Link>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
        {/* Form */}
        <div className="md:col-span-3">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="customer_name" className="block text-xs font-semibold text-textDark uppercase tracking-wider mb-1.5">
                Nombre completo
              </label>
              <input type="text" id="customer_name" name="customer_name" required value={formData.customer_name} onChange={handleChange} className={inputClass("customer_name")} />
              {fieldErrors.customer_name && <p className="text-red-500 text-xs mt-1">{fieldErrors.customer_name}</p>}
            </div>

            <div>
              <label htmlFor="customer_phone" className="block text-xs font-semibold text-textDark uppercase tracking-wider mb-1.5">
                Telefono (WhatsApp)
              </label>
              <input type="tel" id="customer_phone" name="customer_phone" required value={formData.customer_phone} onChange={handleChange} placeholder="2614000000" className={`${inputClass("customer_phone")} placeholder:text-cloud-400`} />
              {fieldErrors.customer_phone && <p className="text-red-500 text-xs mt-1">{fieldErrors.customer_phone}</p>}
            </div>

            <div>
              <label htmlFor="customer_address" className="block text-xs font-semibold text-textDark uppercase tracking-wider mb-1.5">
                Direccion de entrega
              </label>
              <textarea id="customer_address" name="customer_address" required value={formData.customer_address} onChange={handleChange} rows={3} placeholder="Calle, numero, barrio, ciudad" className={`${inputClass("customer_address")} placeholder:text-cloud-400 resize-none`} />
              {fieldErrors.customer_address && <p className="text-red-500 text-xs mt-1">{fieldErrors.customer_address}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-textDark uppercase tracking-wider mb-2">
                Metodo de pago
              </label>
              <div className="grid grid-cols-3 gap-2">
                {paymentOptions.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setFormData({ ...formData, payment_method: opt.value })}
                    className={`flex flex-col items-center space-y-1.5 px-3 py-3 rounded-lg border text-xs font-semibold transition-all ${
                      formData.payment_method === opt.value
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-cloud-200 text-cloud-500 hover:border-cloud-300"
                    }`}
                  >
                    {opt.icon}
                    <span>{opt.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="notes" className="block text-xs font-semibold text-textDark uppercase tracking-wider mb-1.5">
                Notas adicionales <span className="text-cloud-400 normal-case">(opcional)</span>
              </label>
              <textarea id="notes" name="notes" value={formData.notes} onChange={handleChange} rows={2} placeholder="Informacion adicional para la entrega" className="w-full px-4 py-2.5 bg-white border border-cloud-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all text-sm placeholder:text-cloud-400 resize-none" />
            </div>

            <button
              type="submit"
              disabled={loading || !!stockError}
              className="w-full bg-primary text-white px-6 py-3.5 rounded-xl font-bold text-sm hover:bg-primary-dark transition-all disabled:bg-cloud-200 disabled:text-cloud-400 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Procesando...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Confirmar compra  -  ${total.toLocaleString("es-AR")}</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Receipt */}
        <div className="md:col-span-2">
          <div className="bg-white rounded-xl border border-cloud-200/60 p-5 sticky top-28">
            <h2 className="text-sm font-bold text-textDark mb-4">Tu recibo</h2>

            {/* Items */}
            <div className="space-y-2 mb-4 pb-4 border-b border-dashed border-cloud-200">
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

            {/* Subtotals */}
            <div className="space-y-2 mb-4 pb-4 border-b border-cloud-100">
              <div className="flex justify-between text-sm">
                <span className="text-textSecondary">Subtotal</span>
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

            {/* Total */}
            <div className="flex justify-between">
              <span className="text-base font-bold text-textDark">Total a pagar</span>
              <span className="text-xl font-extrabold text-textDark">
                ${total.toLocaleString("es-AR")}
              </span>
            </div>

            <p className="text-[11px] text-textSecondary mt-4 leading-relaxed">
              Al confirmar, nos pondremos en contacto por WhatsApp para coordinar la entrega y el pago.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
