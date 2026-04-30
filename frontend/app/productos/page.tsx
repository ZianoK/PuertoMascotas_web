import { getProducts, getCategories, Product, Category } from "@/lib/api";
import CategoryFilter from "@/components/CategoryFilter";
import ProductGrid from "@/components/ProductGrid";

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

  // Agrupar productos por categoría cuando se muestran todos
  const showGrouped = !categorySlug && !search && products.length > 0;
  let grouped: { category: Category; products: Product[] }[] | undefined;

  if (showGrouped) {
    const catMap = new Map<number, Product[]>();
    for (const product of products) {
      const catId = product.category_id;
      if (!catMap.has(catId)) catMap.set(catId, []);
      catMap.get(catId)!.push(product);
    }
    grouped = [];
    for (const cat of categories) {
      const prods = catMap.get(cat.id);
      if (prods && prods.length > 0) {
        grouped.push({ category: cat, products: prods });
      }
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="mb-8">
          <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-2">Catalogo</p>
          <h1 className="text-3xl md:text-4xl font-extrabold text-textDark tracking-tight mb-1">
            {selectedCategory ? selectedCategory.name : "Todos los productos"}
          </h1>
          <p className="text-textSecondary text-sm">
            {products.length} producto{products.length !== 1 ? "s" : ""} encontrado{products.length !== 1 ? "s" : ""}
          </p>
        </div>

        <CategoryFilter categories={categories} selectedSlug={categorySlug} />

        {products.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-cloud-200/60">
            <div className="w-16 h-16 bg-cloud-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-7 h-7 text-cloud-400" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-textDark mb-2">No se encontraron productos</h2>
            <p className="text-textSecondary text-sm mb-6">
              {categorySlug
                ? "Proba con otra categoria"
                : search
                ? "Proba con otra busqueda"
                : "No hay productos disponibles en este momento"}
            </p>
            {categorySlug && (
              <a
                href="/productos"
                className="inline-block bg-textDark text-white px-6 py-2.5 rounded-lg font-semibold text-sm hover:bg-textDark/90 transition-colors"
              >
                Ver todos los productos
              </a>
            )}
          </div>
        ) : (
          <ProductGrid products={products} grouped={grouped} />
        )}
      </div>
    </div>
  );
}
