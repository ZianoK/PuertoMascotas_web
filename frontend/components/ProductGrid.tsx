"use client";

import { useState, useMemo } from "react";
import { Product, Category } from "@/lib/api";
import ProductCard from "./ProductCard";
import { ArrowUpDown } from "lucide-react";

type SortOption = "default" | "price-asc" | "price-desc" | "name-asc" | "name-desc" | "stock-desc";

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "default", label: "Relevancia" },
  { value: "price-asc", label: "Menor precio" },
  { value: "price-desc", label: "Mayor precio" },
  { value: "name-asc", label: "A - Z" },
  { value: "name-desc", label: "Z - A" },
  { value: "stock-desc", label: "Disponibilidad" },
];

function sortProducts(products: Product[], sort: SortOption): Product[] {
  const sorted = [...products];
  switch (sort) {
    case "price-asc":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-desc":
      return sorted.sort((a, b) => b.price - a.price);
    case "name-asc":
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case "name-desc":
      return sorted.sort((a, b) => b.name.localeCompare(a.name));
    case "stock-desc":
      return sorted.sort((a, b) => b.stock - a.stock);
    default:
      return sorted;
  }
}

interface ProductGridProps {
  products: Product[];
  grouped?: { category: Category; products: Product[] }[];
}

export default function ProductGrid({ products, grouped }: ProductGridProps) {
  const [sort, setSort] = useState<SortOption>("default");

  const sortedProducts = useMemo(() => sortProducts(products, sort), [products, sort]);

  const sortedGrouped = useMemo(() => {
    if (!grouped) return undefined;
    return grouped.map((g) => ({
      ...g,
      products: sortProducts(g.products, sort),
    }));
  }, [grouped, sort]);

  const showGrouped = !!sortedGrouped && sort === "default";

  return (
    <>
      {/* Sort bar */}
      <div className="flex items-center justify-between mb-6">
        <div />
        <div className="flex items-center gap-2">
          <ArrowUpDown className="w-3.5 h-3.5 text-cloud-400" />
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOption)}
            className="text-sm font-medium text-textDark bg-white border border-cloud-200/60 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {showGrouped && sortedGrouped ? (
        <div className="space-y-12">
          {sortedGrouped.map((group) => (
            <section key={group.category.id} id={group.category.slug}>
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-textDark">
                    {group.category.name}
                  </h2>
                  <p className="text-textSecondary text-xs mt-0.5">
                    {group.products.length} producto{group.products.length !== 1 ? "s" : ""}
                  </p>
                </div>
                <a
                  href={`/productos?category=${group.category.slug}`}
                  className="text-primary text-sm font-semibold hover:underline"
                >
                  Ver todos
                </a>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {group.products.map((product, index) => (
                  <div key={product.id} className="fade-in-up" style={{ animationDelay: `${index * 0.04}s` }}>
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {sortedProducts.map((product, index) => (
            <div key={product.id} className="fade-in-up" style={{ animationDelay: `${index * 0.04}s` }}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}
    </>
  );
}
