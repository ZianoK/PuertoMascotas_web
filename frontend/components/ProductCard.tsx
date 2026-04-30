"use client";

import Link from "next/link";
import { Product } from "@/lib/api";
import { useCartStore } from "@/lib/cartStore";
import { ShoppingCart, ImageOff, AlertTriangle, Plus, Minus, Trash2 } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const cartItems = useCartStore((state) => state.items);

  const cartQty = cartItems.find((i) => i.product_id === product.id)?.quantity || 0;
  const inCart = cartQty > 0;
  const canAdd = product.stock > 0 && cartQty < product.stock;

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!canAdd) return;
    addItem({
      product_id: product.id,
      name: product.name,
      price: product.price,
      image_url: product.image_url,
    });
  };

  const handleIncrement = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (canAdd) {
      updateQuantity(product.id, cartQty + 1);
    }
  };

  const handleDecrement = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (cartQty > 1) {
      updateQuantity(product.id, cartQty - 1);
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    removeItem(product.id);
  };

  const isNew = () => {
    const createdDate = new Date(product.created_at);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24));
    return diffDays <= 7;
  };

  const hasDiscount = product.original_price && product.original_price > product.price;

  return (
    <Link href={`/productos/${product.id}`}>
      <div className="bg-white rounded-2xl border border-cloud-200/60 hover:border-cloud-300/80 hover:shadow-lg transition-all duration-300 overflow-hidden h-full flex flex-col group relative">
        {/* Badges */}
        <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5">
          {hasDiscount && (
            <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider">
              Descuento
            </span>
          )}
          {isNew() && !hasDiscount && product.stock > 0 && (
            <span className="bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider">
              Nuevo
            </span>
          )}
          {product.stock === 0 && (
            <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider">
              Agotado
            </span>
          )}
        </div>

        {/* Cart quantity badge */}
        {inCart && (
          <div className="absolute top-3 right-3 z-10 bg-primary text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
            {cartQty}
          </div>
        )}

        {/* Image */}
        <div className={`h-52 bg-cloud-50 flex items-center justify-center overflow-hidden p-6 ${product.stock === 0 ? "opacity-50" : ""}`}>
          {product.image_url ? (
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="text-cloud-300 flex flex-col items-center">
              <ImageOff className="w-12 h-12 mb-1" strokeWidth={1} />
              <span className="text-xs">Sin imagen</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5 flex-1 flex flex-col border-t border-cloud-100">
          <h3 className="font-semibold text-sm text-textDark mb-3 line-clamp-2 min-h-[2.5rem] leading-snug">
            {product.name}
          </h3>

          <div className="mt-auto">
            {hasDiscount ? (
              <div className="mb-3">
                <span className="text-sm text-cloud-400 line-through">
                  ${product.original_price!.toLocaleString("es-AR")}
                </span>
                <p className="text-2xl font-extrabold text-red-600 tracking-tight">
                  ${product.price.toLocaleString("es-AR")}
                </p>
              </div>
            ) : (
              <p className="text-2xl font-extrabold text-textDark mb-3 tracking-tight">
                ${product.price.toLocaleString("es-AR")}
              </p>
            )}

            {/* Cart controls */}
            {product.stock === 0 ? (
              <button
                disabled
                className="w-full py-2.5 rounded-lg font-semibold text-sm flex items-center justify-center space-x-2 bg-cloud-100 text-cloud-400 cursor-not-allowed"
              >
                <AlertTriangle className="w-4 h-4" />
                <span>Sin stock</span>
              </button>
            ) : inCart ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={handleRemove}
                  className="w-9 h-10 rounded-lg bg-red-50 border border-red-200/60 flex items-center justify-center hover:bg-red-100 transition-colors"
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </button>
                <div className="flex-1 flex items-center justify-center bg-cloud-50 border border-cloud-200/60 rounded-lg h-10">
                  <button
                    onClick={handleDecrement}
                    disabled={cartQty <= 1}
                    className="w-9 h-full flex items-center justify-center hover:bg-cloud-100 transition-colors rounded-l-lg disabled:opacity-30"
                  >
                    <Minus className="w-3.5 h-3.5 text-textDark" />
                  </button>
                  <span className="text-sm font-bold text-textDark w-8 text-center">{cartQty}</span>
                  <button
                    onClick={handleIncrement}
                    disabled={!canAdd}
                    className="w-9 h-full flex items-center justify-center hover:bg-cloud-100 transition-colors rounded-r-lg disabled:opacity-30"
                  >
                    <Plus className="w-3.5 h-3.5 text-textDark" />
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={handleAdd}
                className="w-full py-2.5 rounded-lg font-semibold transition-all text-sm flex items-center justify-center space-x-2 bg-textDark text-white hover:bg-textDark/90 active:scale-[0.98]"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Agregar al carrito</span>
              </button>
            )}

            {product.stock > 0 && product.stock <= 10 && (
              <p className="text-[11px] text-amber-600 mt-2 text-center font-semibold">
                {product.stock === 1 ? "Ultima unidad" : `Quedan ${product.stock} unidades`}
              </p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
