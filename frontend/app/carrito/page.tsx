"use client";

import { useCartStore } from "@/lib/cartStore";
import Link from "next/link";

export default function CarritoPage() {
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const getTotal = useCartStore((state) => state.getTotal());

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="max-w-md mx-auto px-4 text-center">
          <div className="text-8xl mb-6">🛒</div>
          <h1 className="text-3xl font-bold mb-4 text-textDark">Tu carrito está vacío</h1>
          <p className="text-textSecondary mb-8 text-lg">
            Agregá productos para comenzar tu pedido
          </p>
          <Link
            href="/productos"
            className="inline-block bg-primary text-white px-8 py-3 rounded-xl font-bold hover:bg-primary-dark transition-all hover:scale-105"
          >
            Ver productos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-textDark">
          Carrito de compras
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Lista de items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item, index) => (
              <div
                key={item.product_id}
                className="bg-white rounded-xl shadow-md p-4 md:p-6 flex items-center space-x-4 fade-in-up"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {/* Imagen */}
                <div className="w-20 h-20 md:w-24 md:h-24 bg-gray-50 rounded-lg flex items-center justify-center flex-shrink-0 p-2">
                  {item.image_url ? (
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-10 h-10 text-gray-300"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                      />
                    </svg>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-base md:text-lg text-textDark truncate">
                    {item.name}
                  </h3>
                  <p className="text-primary font-bold text-lg">
                    ${item.price.toLocaleString("es-AR")}
                  </p>
                  <p className="text-sm text-textSecondary">
                    Subtotal: ${(item.price * item.quantity).toLocaleString("es-AR")}
                  </p>
                </div>

                {/* Cantidad */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => updateQuantity(item.product_id, item.quantity - 1)}
                    className="bg-gray-100 text-textDark w-8 h-8 rounded-lg hover:bg-primary hover:text-white transition-colors font-bold"
                  >
                    -
                  </button>
                  <span className="text-lg font-bold w-8 text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
                    className="bg-gray-100 text-textDark w-8 h-8 rounded-lg hover:bg-primary hover:text-white transition-colors font-bold"
                  >
                    +
                  </button>
                </div>

                {/* Eliminar */}
                <button
                  onClick={() => removeItem(item.product_id)}
                  className="text-red-500 hover:text-red-700 transition-colors p-2"
                  aria-label="Eliminar producto"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>

          {/* Resumen */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-6 text-textDark">Resumen del pedido</h2>

              <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                <div className="flex justify-between">
                  <span className="text-textSecondary">Subtotal</span>
                  <span className="font-bold text-textDark">
                    ${getTotal.toLocaleString("es-AR")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-textSecondary">Envío</span>
                  <span className="text-sm text-textSecondary">A coordinar</span>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex justify-between mb-6">
                  <span className="text-xl font-bold text-textDark">Total</span>
                  <span className="text-2xl font-bold text-primary">
                    ${getTotal.toLocaleString("es-AR")}
                  </span>
                </div>

                <Link
                  href="/checkout"
                  className="block w-full bg-secondary text-white text-center px-8 py-4 rounded-xl font-bold hover:bg-secondary-dark transition-all hover:scale-105 shadow-md"
                >
                  Ir al checkout
                </Link>
              </div>

              <div className="bg-primary/5 rounded-lg p-4">
                <p className="text-xs text-textSecondary text-center leading-relaxed">
                  📦 Coordinamos la entrega y el método de pago después de confirmar el pedido
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
