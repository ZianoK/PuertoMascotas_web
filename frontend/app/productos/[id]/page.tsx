"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getProduct, Product } from "@/lib/api";
import { useCartStore } from "@/lib/cartStore";

export default function ProductoDetallePage() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        const id = Number(params.id);
        const data = await getProduct(id);
        setProduct(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error al cargar el producto");
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [params.id]);

  const handleAddToCart = () => {
    if (!product) return;

    for (let i = 0; i < quantity; i++) {
      addItem({
        product_id: product.id,
        name: product.name,
        price: product.price,
        image_url: product.image_url,
      });
    }

    router.push("/carrito");
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-200 rounded-xl aspect-square shimmer"></div>
          <div className="space-y-4">
            <div className="bg-gray-200 rounded h-8 w-32 shimmer"></div>
            <div className="bg-gray-200 rounded h-12 w-3/4 shimmer"></div>
            <div className="bg-gray-200 rounded h-24 shimmer"></div>
            <div className="bg-gray-200 rounded h-16 w-48 shimmer"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="text-6xl mb-4">😞</div>
        <h1 className="text-2xl font-bold text-textDark mb-2">
          {error || "Producto no encontrado"}
        </h1>
        <button
          onClick={() => router.back()}
          className="mt-4 text-primary hover:underline font-medium"
        >
          ← Volver atrás
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => router.back()}
          className="text-primary hover:text-primary-dark mb-6 flex items-center space-x-2 font-medium transition-colors group"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5 group-hover:-translate-x-1 transition-transform"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          <span>Volver</span>
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Imagen */}
          <div className="bg-white rounded-xl overflow-hidden shadow-md">
            <div className="aspect-square flex items-center justify-center p-8 bg-gray-50">
              {product.image_url ? (
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="text-gray-300 text-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-32 h-32 mx-auto mb-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                    />
                  </svg>
                  <span className="text-lg">Sin imagen</span>
                </div>
              )}
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col">
            <div className="mb-4">
              <span className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-bold">
                {product.category.name}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-textDark leading-tight">
              {product.name}
            </h1>

            <p className="text-textSecondary mb-6 text-lg leading-relaxed">
              {product.description || "Sin descripción disponible."}
            </p>

            <div className="bg-primary/5 rounded-xl p-6 mb-6">
              <p className="text-4xl md:text-5xl font-bold text-primary mb-2">
                ${product.price.toLocaleString("es-AR")}
              </p>
              <p className="text-sm text-textSecondary">
                {product.stock > 0 ? (
                  <>
                    Stock disponible: <span className="font-bold text-primary">{product.stock} unidades</span>
                  </>
                ) : (
                  <span className="text-red-500 font-bold">Sin stock disponible</span>
                )}
              </p>
            </div>

            {/* Selector de cantidad */}
            {product.stock > 0 && (
              <div className="mb-6">
                <label className="block text-sm font-bold text-textDark mb-3">
                  Cantidad
                </label>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="bg-white border-2 border-border text-textDark px-5 py-3 rounded-lg hover:border-primary hover:text-primary transition-colors font-bold"
                  >
                    -
                  </button>
                  <span className="text-2xl font-bold w-16 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="bg-white border-2 border-border text-textDark px-5 py-3 rounded-lg hover:border-primary hover:text-primary transition-colors font-bold"
                  >
                    +
                  </button>
                </div>
              </div>
            )}

            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
                product.stock === 0
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-secondary text-white hover:bg-secondary-dark hover:scale-105 shadow-md"
              }`}
            >
              {product.stock === 0 ? "Sin stock" : "Agregar al carrito"}
            </button>

            {product.stock > 0 && product.stock < 10 && (
              <p className="text-sm text-secondary mt-4 text-center font-bold">
                ⚠️ ¡Últimas {product.stock} unidades disponibles!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
