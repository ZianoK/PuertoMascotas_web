"use client";

import { useState, useEffect } from "react";
import { getOrders, updateOrderStatus, Order } from "@/lib/api";

const STATUS_OPTIONS = [
  { value: "pendiente", label: "Pendiente", color: "bg-amber-100 text-amber-800" },
  { value: "confirmado", label: "Confirmado", color: "bg-blue-100 text-blue-800" },
  { value: "enviado", label: "Enviado", color: "bg-violet-100 text-violet-800" },
  { value: "entregado", label: "Entregado", color: "bg-emerald-100 text-emerald-800" },
  { value: "cancelado", label: "Cancelado", color: "bg-red-100 text-red-800" },
];

function getStatusStyle(status: string) {
  return STATUS_OPTIONS.find((s) => s.value === status) || STATUS_OPTIONS[0];
}

function getPaymentLabel(method: string) {
  switch (method) {
    case "mercado_pago": return "Mercado Pago";
    case "transferencia": return "Transferencia";
    case "efectivo": return "Efectivo";
    default: return method;
  }
}

export default function AdminPedidosPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const data = await getOrders();
      setOrders(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleStatusChange = async (orderId: number, newStatus: string) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      loadOrders();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="max-w-5xl space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Pedidos</h2>
        <p className="text-gray-600">Gestion de pedidos de clientes</p>
      </div>

      {loading ? (
        <p className="text-gray-500">Cargando pedidos...</p>
      ) : orders.length === 0 ? (
        <div className="bg-white p-10 rounded-xl border border-gray-200 text-center">
          <p className="text-gray-500">No hay pedidos todavia.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {orders.map((order) => {
            const statusStyle = getStatusStyle(order.status);
            const isExpanded = expandedId === order.id;

            return (
              <div key={order.id} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                {/* Header row */}
                <div
                  className="p-4 md:p-5 flex flex-col md:flex-row md:items-center gap-3 cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => setExpandedId(isExpanded ? null : order.id)}
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <span className="text-sm font-bold text-gray-800">#{order.id}</span>
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusStyle.color}`}>
                      {statusStyle.label}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>{order.customer_name}</span>
                    <span className="font-semibold text-gray-800">${order.total.toLocaleString("es-AR")}</span>
                    <span className="text-xs">{getPaymentLabel(order.payment_method)}</span>
                    <span className="text-xs text-gray-400">
                      {new Date(order.created_at).toLocaleDateString("es-AR", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" })}
                    </span>
                    <svg className={`w-4 h-4 transition-transform ${isExpanded ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m19 9-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                {/* Expanded detail */}
                {isExpanded && (
                  <div className="border-t border-gray-100 p-4 md:p-5 bg-gray-50/50">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Products */}
                      <div>
                        <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Productos</h4>
                        <div className="space-y-1.5">
                          {order.items.map((item) => (
                            <div key={item.id} className="flex justify-between text-sm">
                              <span className="text-gray-600">{item.product.name} x{item.quantity}</span>
                              <span className="font-medium text-gray-800">${(item.unit_price * item.quantity).toLocaleString("es-AR")}</span>
                            </div>
                          ))}
                          <div className="flex justify-between text-sm pt-2 border-t border-gray-200 mt-2">
                            <span className="font-bold text-gray-800">Total</span>
                            <span className="font-bold text-gray-800">${order.total.toLocaleString("es-AR")}</span>
                          </div>
                        </div>
                      </div>

                      {/* Client info */}
                      <div>
                        <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Cliente</h4>
                        <div className="text-sm text-gray-600 space-y-1">
                          <p><span className="font-medium">Nombre:</span> {order.customer_name}</p>
                          <p><span className="font-medium">Telefono:</span> {order.customer_phone}</p>
                          <p><span className="font-medium">Direccion:</span> {order.customer_address}</p>
                          <p><span className="font-medium">Pago:</span> {getPaymentLabel(order.payment_method)}</p>
                          {order.notes && <p><span className="font-medium">Notas:</span> {order.notes}</p>}
                        </div>

                        {/* Status changer */}
                        <div className="mt-4">
                          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Cambiar estado</h4>
                          <div className="flex flex-wrap gap-1.5">
                            {STATUS_OPTIONS.map((opt) => (
                              <button
                                key={opt.value}
                                onClick={() => handleStatusChange(order.id, opt.value)}
                                className={`text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all ${
                                  order.status === opt.value
                                    ? `${opt.color} border-transparent`
                                    : "border-gray-200 text-gray-500 hover:bg-gray-100"
                                }`}
                              >
                                {opt.label}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* WhatsApp link */}
                        <a
                          href={`https://wa.me/${order.customer_phone.replace(/\D/g, "")}?text=Hola ${order.customer_name}! Tu pedido %23${order.id} `}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-3 inline-flex items-center space-x-1.5 text-xs font-semibold text-green-600 hover:text-green-800 transition-colors"
                        >
                          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                          </svg>
                          <span>Enviar WhatsApp</span>
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
