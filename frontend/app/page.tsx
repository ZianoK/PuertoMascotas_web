"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getProducts, getCategories, Product, Category } from "@/lib/api";
import { getCategoryStyle } from "@/lib/category-icons";
import ProductCard from "@/components/ProductCard";
import HeroCarousel from "@/components/HeroCarousel";
import {
  ShoppingBag,
  Truck,
  Home,
  ArrowRight,
  MessageCircle,
  HeartPulse,
  Stethoscope,
  ShieldCheck,
} from "lucide-react";

export default function HomePage() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "TODO_NUMERO";
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [products, cats] = await Promise.all([
          getProducts(),
          getCategories(),
        ]);
        setFeaturedProducts(products.slice(0, 8));
        setCategories(cats.filter((c) => c.product_count > 0));
      } catch (error) {
        console.error("Error cargando datos:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const steps = [
    {
      icon: <ShoppingBag className="w-6 h-6" strokeWidth={1.8} />,
      title: "Elegi tus productos",
      desc: "Navega nuestro catalogo y arma tu pedido de forma simple y rapida.",
      step: "01",
    },
    {
      icon: <Truck className="w-6 h-6" strokeWidth={1.8} />,
      title: "Coordinamos la entrega",
      desc: "Te contactamos por WhatsApp para confirmar horario y zona de entrega.",
      step: "02",
    },
    {
      icon: <Home className="w-6 h-6" strokeWidth={1.8} />,
      title: "Recibis en tu casa",
      desc: "Sin salir de tu hogar, sin filas y sin complicaciones.",
      step: "03",
    },
  ];

  return (
    <div>
      {/* Hero */}
      <HeroCarousel />

      {/* Categories */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">Categorias</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-textDark tracking-tight">
            Que estas buscando?
          </h2>
        </div>

        <div className={`grid grid-cols-2 md:grid-cols-3 ${categories.length <= 3 ? "lg:grid-cols-4" : "lg:grid-cols-5"} gap-4`}>
          {categories.map((category) => {
            const style = getCategoryStyle(category.slug);
            const Icon = style.icon;
            return (
              <Link
                key={category.slug}
                href={`/productos?category=${category.slug}`}
                className="group relative bg-white rounded-2xl border border-cloud-200/80 p-6 text-center hover:border-primary/20 hover:shadow-glass-lg transition-all duration-300 flex flex-col items-center hover:-translate-y-1"
              >
                <div className={`w-14 h-14 rounded-2xl ${style.lightColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-6 h-6" strokeWidth={1.8} />
                </div>
                <h3 className="text-xs md:text-sm font-bold text-textDark leading-tight">
                  {category.name}
                </h3>
                <span className="text-[10px] text-textSecondary mt-1">
                  {category.product_count} producto{category.product_count !== 1 ? "s" : ""}
                </span>
              </Link>
            );
          })}

          {/* Veterinaria - card fija */}
          <Link
            href="/veterinaria"
            className="group relative bg-white rounded-2xl border border-emerald-200/80 p-6 text-center hover:border-emerald-400/40 hover:shadow-glass-lg transition-all duration-300 flex flex-col items-center hover:-translate-y-1"
          >
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <Stethoscope className="w-6 h-6" strokeWidth={1.8} />
            </div>
            <h3 className="text-xs md:text-sm font-bold text-textDark leading-tight">
              Veterinaria
            </h3>
            <span className="text-[10px] text-emerald-600 mt-1 font-medium">
              Consultas a domicilio
            </span>
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-cloud-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-14">
            <div>
              <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">Lo mas vendido</p>
              <h2 className="text-3xl md:text-4xl font-extrabold text-textDark tracking-tight">
                Productos destacados
              </h2>
            </div>
            <Link
              href="/productos"
              className="hidden md:inline-flex items-center space-x-1.5 text-primary font-semibold text-sm hover:underline mt-4 md:mt-0"
            >
              <span>Ver todos</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl h-80 shimmer border border-cloud-200/60"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {featuredProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="fade-in-up"
                  style={{ animationDelay: `${index * 0.06}s` }}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-12 md:hidden">
            <Link
              href="/productos"
              className="inline-flex items-center space-x-2 bg-textDark text-white px-8 py-3.5 rounded-xl font-bold hover:bg-textDark/90 transition-all text-sm"
            >
              <span>Ver todos los productos</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">Proceso</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-textDark tracking-tight">
              Como funciona?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((item, i) => (
              <div
                key={item.step}
                className="fade-in-up relative group"
                style={{ animationDelay: `${i * 0.12}s` }}
              >
                <div className="bg-white rounded-2xl border border-cloud-200/80 p-8 h-full hover:shadow-glass-lg hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
                  <span className="absolute -top-2 -right-1 text-[80px] font-black text-cloud-100/80 leading-none select-none">
                    {item.step}
                  </span>
                  <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-5">
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-textDark">{item.title}</h3>
                  <p className="text-textSecondary text-sm leading-relaxed">{item.desc}</p>
                </div>
                {/* Connector line */}
                {i < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 border-t-2 border-dashed border-cloud-200 z-10"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Veterinaria */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brandDarkest via-brandDark to-primary-900"></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px]"></div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full px-4 py-1.5 mb-6">
                <HeartPulse className="w-4 h-4 text-primary-300" />
                <span className="text-white/80 text-sm font-medium">Servicio profesional</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold mb-5 text-white tracking-tight leading-tight">
                Veterinaria a domicilio en Mendoza
              </h2>
              <p className="text-lg text-white/50 mb-8 leading-relaxed">
                Consultas, vacunas y tratamientos sin que tu mascota se estrese con el viaje. Atendemos con cuidado y profesionalismo.
              </p>
              <Link
                href="/productos?category=veterinaria-consultas"
                className="inline-flex items-center space-x-2 bg-white text-brandDark px-7 py-3.5 rounded-xl font-bold hover:shadow-float hover:-translate-y-0.5 transition-all text-sm"
              >
                <Stethoscope className="w-4 h-4" />
                <span>Agendar consulta</span>
              </Link>
            </div>
            <div className="hidden md:flex justify-center">
              <div className="relative">
                <div className="w-64 h-64 lg:w-80 lg:h-80 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                  <div className="w-48 h-48 lg:w-60 lg:h-60 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                    <HeartPulse className="w-20 h-20 lg:w-24 lg:h-24 text-primary-300/60" strokeWidth={1} />
                  </div>
                </div>
                <div className="absolute -top-2 -right-2 w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/10">
                  <Stethoscope className="w-5 h-5 text-primary-300" />
                </div>
                <div className="absolute -bottom-2 -left-2 w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/10">
                  <ShieldCheck className="w-5 h-5 text-emerald-300" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp CTA */}
      <section className="py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl border border-cloud-200/80 p-10 md:p-16 text-center relative overflow-hidden shadow-glass">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-px bg-gradient-to-r from-transparent via-whatsapp/40 to-transparent"></div>
            <div className="w-16 h-16 bg-whatsapp/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <MessageCircle className="w-7 h-7 text-whatsapp" strokeWidth={1.8} />
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-3 text-textDark tracking-tight">
              Tenes dudas?
            </h2>
            <p className="text-lg text-textSecondary mb-8 max-w-md mx-auto">
              Escribinos por WhatsApp y te respondemos al instante
            </p>
            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2.5 bg-whatsapp text-white px-8 py-4 rounded-xl font-bold hover:bg-whatsapp/90 transition-all hover:-translate-y-0.5 hover:shadow-float text-base"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              <span>Contactar por WhatsApp</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
