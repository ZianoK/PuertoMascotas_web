"use client";

import { Category } from "@/lib/api";
import Link from "next/link";

interface CategoryFilterProps {
  categories: Category[];
  selectedSlug?: string;
}

export default function CategoryFilter({ categories, selectedSlug }: CategoryFilterProps) {
  return (
    <div className="bg-white rounded-xl border border-cloud-200/60 p-3 mb-6 overflow-x-auto">
      <div className="flex gap-1.5 min-w-max md:flex-wrap md:min-w-0">
        <Link
          href="/productos"
          className={`px-4 py-2 rounded-lg font-semibold transition-all whitespace-nowrap text-sm ${
            !selectedSlug
              ? "bg-textDark text-white"
              : "text-cloud-500 hover:bg-cloud-50 hover:text-textDark"
          }`}
        >
          Todos
        </Link>
        {categories.filter((c) => c.product_count > 0).map((category) => (
          <Link
            key={category.id}
            href={`/productos?category=${category.slug}`}
            className={`px-4 py-2 rounded-lg font-semibold transition-all whitespace-nowrap text-sm ${
              selectedSlug === category.slug
                ? "bg-textDark text-white"
                : "text-cloud-500 hover:bg-cloud-50 hover:text-textDark"
            }`}
          >
            {category.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
