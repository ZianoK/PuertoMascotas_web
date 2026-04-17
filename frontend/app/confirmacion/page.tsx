"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { getOrder, Order } from "@/lib/api";

export default function ConfirmacionPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("id");

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "5492614000000";

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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <p className="text-xl text-gray-600">Cargando pedido...</p>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <p className="text-xl text-red-600">{error || "Pedido no encontrado"}</p>
        <Link
          href="/"
          className="inline-block mt-6 text-primary hover:underline"
        >
          Volver al inicio
        </Link>
      </div>
    );
  }

  const getPaymentInstructions = () => {
    switch (order.payment_method) {
      case "mercado_pago":
        return "Te enviamos el link de pago por WhatsApp";
      case "transferencia":
        return (
          <div>
            <p className="font-medium mb-2">Datos para transferencia:</p>
            <p className="text-sm">
              <strong>TODO:</strong> CBU/Alias a definir por el cliente
            </p>
            <p className="text-sm text-gray-600 mt-2">
              Una vez realizada la transferencia, envianos el comprobante por WhatsApp
            </p>
          </div>
        );
      case "efectivo":
        return "Pagás al recibir el pedido";
      default:
        return "Método de pago: " + order.payment_method;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header de confirmación */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center mb-8">
        <div className="text-6xl mb-4">🎉</div>
        <h1 className="text-3xl font-bold text-green-800 mb-2">
          ¡Pedido recibido!
        </h1>
        <p className="text-green-700">
          Número de pedido: <span className="font-bold">#{order.id}</span>
        </p>
      </div>

      {/* Resumen del pedido */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-bold mb-4 text-textDark">Resumen del pedido</h2>

        <div className="space-y-3 mb-6">
          {order.items.map((item) => (
            <div key={item.id} className="flex justify-between">
              <span className="text-gray-600">
                {item.product.name} x{item.quantity}
              </span>
              <span className="font-semibold">
                ${(item.unit_price * item.quantity).toLocaleString("es-AR")}
              </span>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-200 pt-4">
          <div className="flex justify-between mb-4">
            <span className="text-xl font-bold text-textDark">Total</span>
            <span className="text-xl font-bold text-primary">
              ${order.total.toLocaleString("es-AR")}
            </span>
          </div>
        </div>
      </div>

      {/* Datos de entrega */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-bold mb-4 text-textDark">Datos de entrega</h2>
        <div className="space-y-2 text-gray-700">
          <p>
            <strong>Nombre:</strong> {order.customer_name}
          </p>
          <p>
            <strong>Teléfono:</strong> {order.customer_phone}
          </p>
          <p>
            <strong>Dirección:</strong> {order.customer_address}
          </p>
          {order.notes && (
            <p>
              <strong>Notas:</strong> {order.notes}
            </p>
          )}
        </div>
      </div>

      {/* Instrucciones de pago */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-bold mb-4 text-blue-900">
          Método de pago: {order.payment_method.replace("_", " ")}
        </h2>
        <div className="text-blue-800">{getPaymentInstructions()}</div>
      </div>

      {/* Próximos pasos */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-bold mb-4 text-textDark">Próximos pasos</h2>
        <ol className="list-decimal list-inside space-y-2 text-gray-700">
          <li>Nos ponemos en contacto a la brevedad por WhatsApp</li>
          <li>Coordinamos fecha y horario de entrega</li>
          <li>Recibís tu pedido en la puerta de tu casa</li>
        </ol>
      </div>

      {/* CTA WhatsApp */}
      <div className="text-center">
        <a
          href={`https://wa.me/${whatsappNumber}?text=Hola! Hice el pedido #${order.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-2 bg-green-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            className="w-6 h-6"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
          </svg>
          <span>Contactarnos por WhatsApp</span>
        </a>

        <div className="mt-6">
          <Link href="/" className="text-primary hover:underline">
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}
