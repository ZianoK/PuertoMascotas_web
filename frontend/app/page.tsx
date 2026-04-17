"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getProducts, Product } from "@/lib/api";
import ProductCard from "@/components/ProductCard";
import HeroCarousel from "@/components/HeroCarousel";

export default function HomePage() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "TODO_NUMERO";
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const products = await getProducts();
        setFeaturedProducts(products.slice(0, 8));
      } catch (error) {
        console.error("Error cargando productos:", error);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  // Todos los iconos: Heroicons outline — strokeWidth 1.5, fill none, 24x24
  const categories = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-9 h-9">
          {/* Paw — perros */}
          <circle cx="7" cy="6" r="1.5" fill="currentColor" stroke="none"/>
          <circle cx="17" cy="6" r="1.5" fill="currentColor" stroke="none"/>
          <circle cx="3.5" cy="11" r="1.5" fill="currentColor" stroke="none"/>
          <circle cx="20.5" cy="11" r="1.5" fill="currentColor" stroke="none"/>
          <path d="M12 14c-4.5 0-7 1.8-7 4 0 1.5 1.5 2.5 7 2.5s7-1 7-2.5c0-2.2-2.5-4-7-4z"/>
        </svg>
      ),
      name: "Perros - Alimento", slug: "perros-alimento",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-9 h-9">
          {/* Bone — premios perros */}
          <path d="M8.5 14.5a2.5 2.5 0 01-3.5-3.5L9.5 6.5a2.5 2.5 0 013.5 3.5"/>
          <path d="M14.5 8.5a2.5 2.5 0 013.5 3.5L13.5 16.5a2.5 2.5 0 01-3.5-3.5"/>
          <line x1="9.5" y1="14.5" x2="13.5" y2="10.5"/>
        </svg>
      ),
      name: "Perros - Premios", slug: "perros-premios",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-9 h-9">
          {/* Cat face */}
          <path d="M4 6l3 3M20 6l-3 3"/>
          <path d="M12 20c-4 0-7-3-7-7 0-2 .5-4 2-5.5"/>
          <path d="M12 20c4 0 7-3 7-7 0-2-.5-4-2-5.5"/>
          <path d="M9 13h.01M15 13h.01"/>
          <path d="M10.5 16c.5.5 2.5.5 3 0"/>
        </svg>
      ),
      name: "Gatos - Alimento", slug: "gatos-alimento",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-9 h-9">
          {/* Fish */}
          <path d="M6.5 12c0 0 2.5-5 8-5s8 5 8 5-2.5 5-8 5-8-5-8-5z"/>
          <path d="M2 9l4.5 3-4.5 3"/>
          <circle cx="17" cy="12" r="1" fill="currentColor" stroke="none"/>
        </svg>
      ),
      name: "Gatos - Premios", slug: "gatos-premios",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-9 h-9">
          {/* Cross in circle — veterinaria */}
          <circle cx="12" cy="12" r="9"/>
          <path d="M12 8v8M8 12h8"/>
        </svg>
      ),
      name: "Veterinaria", slug: "veterinaria-consultas",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-9 h-9">
          {/* Shield check — tratamientos */}
          <path d="M12 2l8 3.5V12c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V5.5L12 2z"/>
          <path d="M9 12l2 2 4-4"/>
        </svg>
      ),
      name: "Tratamientos", slug: "veterinaria-tratamientos",
    },
  ];

  return (
    <div>
      {/* Hero Banner Carousel */}
      <HeroCarousel />

      {/* Categorías destacadas */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-textDark">
          ¿Qué estás buscando?
        </h2>
        <p className="text-center text-textSecondary mb-12 text-lg">
          Elegí la categoría que necesitás
        </p>

        {/* Grid horizontal con scroll en mobile */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/productos?category=${category.slug}`}
              className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-xl transition-all hover:scale-105 group flex flex-col items-center"
            >
              <div className="text-primary mb-3 group-hover:scale-110 transition-transform">
                {category.icon}
              </div>
              <h3 className="text-sm md:text-base font-bold text-textDark line-clamp-2">
                {category.name}
              </h3>
            </Link>
          ))}
        </div>
      </section>

      {/* Productos destacados */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-textDark">
              Productos destacados
            </h2>
            <p className="text-textSecondary text-lg">
              Los más elegidos por nuestros clientes
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-gray-200 rounded-xl h-80 shimmer"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {featuredProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-10">
            <Link
              href="/productos"
              className="inline-block bg-primary text-white px-8 py-3 rounded-lg font-bold hover:bg-primary-dark transition-colors"
            >
              Ver todos los productos
            </Link>
          </div>
        </div>
      </section>

      {/* Cómo funciona */}
      <section className="py-16 bg-primary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-textDark">
            ¿Cómo funciona?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center fade-in-up">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-textDark">Elegí tus productos</h3>
              <p className="text-textSecondary">Navegá el catálogo y armá tu pedido</p>
            </div>

            <div className="text-center fade-in-up" style={{ animationDelay: "0.2s" }}>
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-textDark">Coordinamos la entrega</h3>
              <p className="text-textSecondary">Te contactamos para confirmar horario y zona</p>
            </div>

            <div className="text-center fade-in-up" style={{ animationDelay: "0.4s" }}>
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-textDark">Recibís en tu casa</h3>
              <p className="text-textSecondary">Sin salir, sin filas, sin vueltas</p>
            </div>
          </div>
        </div>
      </section>

      {/* Veterinaria a domicilio */}
      <section className="py-16 bg-gradient-to-r from-brandDark to-brandDarkest text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <path d="M4.5 12a7.5 7.5 0 0110.5-6.9"/>
              <path d="M12 4.5A7.5 7.5 0 1112 19.5"/>
              <circle cx="16" cy="16" r="4"/>
              <path d="M16 14v4M14 16h4"/>
            </svg>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Veterinaria a domicilio en Mendoza
          </h2>
          <p className="text-lg text-primary-light mb-8 max-w-2xl mx-auto">
            Consultas, vacunas y tratamientos sin que tu mascota se estrese con el viaje
          </p>
          <Link
            href="/productos?category=veterinaria-consultas"
            className="inline-block bg-primary text-white px-8 py-3 rounded-lg font-bold hover:bg-primary-dark transition-colors"
          >
            Agendar consulta
          </Link>
        </div>
      </section>

      {/* WhatsApp CTA */}
      <section className="py-16 bg-whatsapp/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-textDark">
            ¿Tenés dudas?
          </h2>
          <p className="text-lg text-textSecondary mb-8">
            Escribinos y te respondemos al instante
          </p>
          <a
            href={`https://wa.me/${whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 bg-whatsapp text-white px-8 py-4 rounded-lg font-bold hover:bg-whatsapp/90 transition-all hover:scale-105 text-lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              className="w-6 h-6"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
            <span>Contactar por WhatsApp</span>
          </a>
        </div>
      </section>
    </div>
  );
}
