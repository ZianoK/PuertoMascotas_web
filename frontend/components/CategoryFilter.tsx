"use client";

import { Category } from "@/lib/api";
import Link from "next/link";

interface CategoryFilterProps {
  categories: Category[];
  selectedSlug?: string;
}

export default function CategoryFilter({ categories, selectedSlug }: CategoryFilterProps) {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 mb-6 overflow-x-auto">
      <div className="flex gap-2 min-w-max md:flex-wrap md:min-w-0">
        <Link
          href="/productos"
          className={`px-5 py-2.5 rounded-full font-bold transition-all whitespace-nowrap ${
            !selectedSlug
              ? "bg-primary text-white shadow-md"
              : "bg-gray-100 text-textSecondary hover:bg-gray-200"
          }`}
        >
          Todos
        </Link>
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/productos?category=${category.slug}`}
            className={`px-5 py-2.5 rounded-full font-bold transition-all whitespace-nowrap ${
              selectedSlug === category.slug
                ? "bg-primary text-white shadow-md"
                : "bg-gray-100 text-textSecondary hover:bg-gray-200"
            }`}
          >
            {category.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
