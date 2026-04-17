import { getProducts, getCategories } from "@/lib/api";
import ProductCard from "@/components/ProductCard";
import CategoryFilter from "@/components/CategoryFilter";

interface ProductosPageProps {
  searchParams: { category?: string; search?: string };
}

export default async function ProductosPage({ searchParams }: ProductosPageProps) {
  const categorySlug = searchParams.category;
  const search = searchParams.search;

  const [products, categories] = await Promise.all([
    getProducts(categorySlug, search),
    getCategories(),
  ]);

  const selectedCategory = categories.find((cat) => cat.slug === categorySlug);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Título */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-textDark mb-2">
            {selectedCategory ? selectedCategory.name : "Todos los productos"}
          </h1>
          <p className="text-textSecondary">
            {products.length} producto{products.length !== 1 ? "s" : ""} encontrado
            {products.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Filtro de categorías */}
        <CategoryFilter categories={categories} selectedSlug={categorySlug} />

        {/* Grid de productos */}
        {products.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl shadow-md">
            <div className="text-6xl mb-4">📦</div>
            <h2 className="text-2xl font-bold text-textDark mb-2">
              No se encontraron productos
            </h2>
            <p className="text-textSecondary mb-6">
              {categorySlug
                ? "Probá con otra categoría"
                : search
                ? "Probá con otra búsqueda"
                : "No hay productos disponibles en este momento"}
            </p>
            {categorySlug && (
              <a
                href="/productos"
                className="inline-block bg-primary text-white px-6 py-2.5 rounded-lg font-bold hover:bg-primary-dark transition-colors"
              >
                Ver todos los productos
              </a>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <div
                key={product.id}
                className="fade-in-up"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
