"use client";

import Link from "next/link";
import { Product } from "@/lib/api";
import { useCartStore } from "@/lib/cartStore";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (product.stock > 0) {
      addItem({
        product_id: product.id,
        name: product.name,
        price: product.price,
        image_url: product.image_url,
      });
    }
  };

  const isNew = () => {
    const createdDate = new Date(product.created_at);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24));
    return diffDays <= 7;
  };

  return (
    <Link href={`/productos/${product.id}`}>
      <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all overflow-hidden h-full flex flex-col group relative">
        {/* Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
          {isNew() && (
            <span className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">
              Nuevo
            </span>
          )}
          {product.stock === 0 && (
            <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
              Sin stock
            </span>
          )}
        </div>

        {/* Imagen */}
        <div className="h-52 bg-gray-50 flex items-center justify-center overflow-hidden p-4 relative">
          {product.image_url ? (
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
            />
          ) : (
            <div className="text-gray-300 text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-20 h-20 mx-auto mb-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                />
              </svg>
              <span className="text-sm">Sin imagen</span>
            </div>
          )}
        </div>

        {/* Contenido */}
        <div className="p-4 flex-1 flex flex-col">
          <h3 className="font-bold text-base md:text-lg text-textDark mb-2 line-clamp-2 min-h-[3rem]">
            {product.name}
          </h3>

          <div className="mt-auto">
            <div className="mb-3">
              <span className="text-2xl font-bold text-primary">
                ${product.price.toLocaleString("es-AR")}
              </span>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className={`w-full py-2.5 rounded-lg font-bold transition-all text-sm ${
                product.stock === 0
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-primary text-white hover:bg-primary-dark hover:scale-105"
              }`}
            >
              {product.stock === 0 ? "Sin stock" : "Agregar al carrito"}
            </button>

            {product.stock > 0 && product.stock < 10 && (
              <p className="text-xs text-secondary mt-2 text-center font-medium">
                ¡Últimas {product.stock} unidades!
              </p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
