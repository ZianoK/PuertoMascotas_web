"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { getOrder, Order } from "@/lib/api";
import { CheckCircle2, ArrowRight, Loader2, MapPin, Phone, User, CreditCard, Landmark, Banknote, Truck, Receipt, Copy, Check } from "lucide-react";

const SHIPPING_COST = 2500;

export default function ConfirmacionPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("id");
  const mpStatus = searchParams.get("status");         // "approved" | "pending" | "rejected" — viene de MP
  const pagoParam = searchParams.get("pago");          // "pendiente" — back_url de pending

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "5492614000000";

  // Estado del pago de MP (si viene del redirect)
  const mpAprobado = mpStatus === "approved";
  const mpPendiente = mpStatus === "pending" || pagoParam === "pendiente";
  const mpRechazado = mpStatus === "rejected" || mpStatus === "cancelled";

  useEffect(() => {
    const loadOrder = async () => {
      if (!orderId) {
        setError("ID de pedido no encontrado");
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const data = await getOrder(Number(orderId));
        setOrder(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error al cargar el pedido");
      } finally {
        setLoading(false);
      }
    };
    loadOrder();
  }, [orderId]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-primary mr-2" />
        <span className="text-textSecondary">Cargando pedido...</span>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <p className="text-red-600 mb-4">{error || "Pedido no encontrado"}</p>
        <Link href="/" className="text-primary hover:underline text-sm font-medium">Volver al inicio</Link>
      </div>
    );
  }

  const getPaymentLabel = () => {
    switch (order.payment_method) {
      case "mercado_pago": return "Mercado Pago";
      case "transferencia": return "Transferencia bancaria";
      case "efectivo": return "Efectivo al recibir";
      default: return order.payment_method;
    }
  };

  const getPaymentIcon = () => {
    switch (order.payment_method) {
      case "mercado_pago": return <CreditCard className="w-4 h-4" />;
      case "transferencia": return <Landmark className="w-4 h-4" />;
      case "efectivo": return <Banknote className="w-4 h-4" />;
      default: return <CreditCard className="w-4 h-4" />;
    }
  };

  // TODO: reemplazar con el CBU real del cliente antes de producción
  const CBU = process.env.NEXT_PUBLIC_CBU || "0000000000000000000000";
  const CBU_ALIAS = process.env.NEXT_PUBLIC_CBU_ALIAS || "PUERTO.MASCOTAS";

  const handleCopyCBU = () => {
    navigator.clipboard.writeText(CBU);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const subtotal = order.items.reduce((sum, item) => sum + item.unit_price * item.quantity, 0);
  const total = subtotal + SHIPPING_COST;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Alerta si el pago de MP fue rechazado */}
      {mpRechazado && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6 text-sm">
          <p className="font-semibold">El pago no fue aprobado.</p>
          <p>Tu pedido quedó registrado. Podés intentar pagar de nuevo o elegir otro método.</p>
        </div>
      )}

      {/* Alerta si el pago está pendiente en MP */}
      {mpPendiente && !mpRechazado && (
        <div className="bg-amber-50 border border-amber-200 text-amber-700 px-4 py-3 rounded-xl mb-6 text-sm">
          <p className="font-semibold">Pago pendiente de acreditación.</p>
          <p>Te avisaremos por WhatsApp cuando se confirme.</p>
        </div>
      )}

      {/* Success header */}
      <div className="text-center mb-10">
        <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5 ${mpRechazado ? "bg-red-100" : "bg-emerald-100"}`}>
          <CheckCircle2 className={`w-8 h-8 ${mpRechazado ? "text-red-500" : "text-emerald-600"}`} />
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-textDark tracking-tight mb-2">
          {mpRechazado ? "Pedido registrado" : mpAprobado ? "Pago aprobado!" : "Pedido confirmado!"}
        </h1>
        <p className="text-textSecondary text-sm">
          Pedido <span className="font-bold text-textDark">#{order.id}</span> registrado correctamente
        </p>
      </div>

      {/* Receipt */}
      <div className="bg-white rounded-xl border border-cloud-200/60 p-6 mb-4">
        <div className="flex items-center space-x-2 mb-4">
          <Receipt className="w-4 h-4 text-primary" />
          <h2 className="text-sm font-bold text-textDark">Recibo</h2>
        </div>

        {/* Items */}
        <div className="space-y-2 mb-4 pb-4 border-b border-dashed border-cloud-200">
          {order.items.map((item) => (
            <div key={item.id} className="flex justify-between text-sm">
              <span className="text-textSecondary">
                {item.product.name} <span className="text-cloud-400">x{item.quantity}</span>
              </span>
              <span className="font-medium text-textDark">${(item.unit_price * item.quantity).toLocaleString("es-AR")}</span>
            </div>
          ))}
        </div>

        {/* Totals */}
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

        <div className="flex justify-between">
          <span className="text-base font-bold text-textDark">Total</span>
          <span className="text-xl font-extrabold text-textDark">${total.toLocaleString("es-AR")}</span>
        </div>
      </div>

      {/* Payment instructions */}
      <div className="bg-white rounded-xl border border-cloud-200/60 p-6 mb-4">
        <div className="flex items-center space-x-2 mb-4">
          {getPaymentIcon()}
          <h2 className="text-sm font-bold text-textDark">Pago: {getPaymentLabel()}</h2>
        </div>

        {order.payment_method === "transferencia" && (
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 space-y-2">
            <p className="text-sm text-blue-800 font-medium">Datos para transferencia:</p>
            <div className="text-sm text-blue-700 space-y-1">
              <p><span className="font-semibold">Titular:</span> Puerto Mascotas</p>
              <p><span className="font-semibold">CBU:</span> {CBU}</p>
              <p><span className="font-semibold">Alias:</span> {CBU_ALIAS}</p>
              <p><span className="font-semibold">Monto:</span> ${total.toLocaleString("es-AR")}</p>
            </div>
            <button
              onClick={handleCopyCBU}
              className="mt-2 inline-flex items-center space-x-1.5 text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "Copiado!" : "Copiar CBU"}</span>
            </button>
          </div>
        )}

        {order.payment_method === "mercado_pago" && (
          <div className="bg-sky-50 border border-sky-100 rounded-lg p-4">
            <p className="text-sm text-sky-800">
              Te enviaremos el <span className="font-semibold">link de pago de Mercado Pago</span> por WhatsApp
              con el monto total de <span className="font-bold">${total.toLocaleString("es-AR")}</span>.
            </p>
          </div>
        )}

        {order.payment_method === "efectivo" && (
          <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-4">
            <p className="text-sm text-emerald-800">
              Abona <span className="font-bold">${total.toLocaleString("es-AR")}</span> en efectivo al momento de recibir tu pedido.
              Tene el monto justo para agilizar la entrega.
            </p>
          </div>
        )}
      </div>

      {/* Delivery info */}
      <div className="bg-white rounded-xl border border-cloud-200/60 p-6 mb-4">
        <h2 className="text-sm font-bold text-textDark mb-4">Datos de entrega</h2>
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <User className="w-4 h-4 text-cloud-400 mt-0.5 shrink-0" strokeWidth={1.8} />
            <span className="text-sm text-textSecondary">{order.customer_name}</span>
          </div>
          <div className="flex items-start space-x-3">
            <Phone className="w-4 h-4 text-cloud-400 mt-0.5 shrink-0" strokeWidth={1.8} />
            <span className="text-sm text-textSecondary">{order.customer_phone}</span>
          </div>
          <div className="flex items-start space-x-3">
            <MapPin className="w-4 h-4 text-cloud-400 mt-0.5 shrink-0" strokeWidth={1.8} />
            <span className="text-sm text-textSecondary">{order.customer_address}</span>
          </div>
        </div>
      </div>

      {/* Next steps */}
      <div className="bg-primary/5 border border-primary/10 rounded-xl p-6 mb-8">
        <h2 className="text-sm font-bold text-textDark mb-3">Proximos pasos</h2>
        <ol className="space-y-2 text-sm text-textSecondary">
          <li className="flex items-start space-x-2">
            <span className="bg-primary text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5">1</span>
            <span>Nos ponemos en contacto por WhatsApp</span>
          </li>
          <li className="flex items-start space-x-2">
            <span className="bg-primary text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5">2</span>
            <span>Coordinamos fecha y horario de entrega</span>
          </li>
          <li className="flex items-start space-x-2">
            <span className="bg-primary text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5">3</span>
            <span>Recibis tu pedido en la puerta de tu casa</span>
          </li>
        </ol>
      </div>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <a
          href={`https://wa.me/${whatsappNumber}?text=Hola! Hice el pedido %23${order.id} por $${total.toLocaleString("es-AR")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center space-x-2 bg-whatsapp text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-whatsapp/90 transition-all"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
          </svg>
          <span>Contactar por WhatsApp</span>
        </a>
        <Link
          href="/"
          className="inline-flex items-center justify-center space-x-2 bg-cloud-100 text-textDark px-6 py-3 rounded-xl font-semibold text-sm hover:bg-cloud-200 transition-all"
        >
          <span>Volver al inicio</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
