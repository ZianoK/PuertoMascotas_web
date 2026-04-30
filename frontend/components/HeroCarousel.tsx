"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useEffect, useState, useCallback } from "react";
import { getBanners, Banner } from "@/lib/api";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

export default function HeroCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 5000, stopOnInteraction: true })]);
  const [banners, setBanners] = useState<Banner[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "2613420309";
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const data = await getBanners();
        setBanners(data);
      } catch (e) {
        console.error("Error fetching banners:", e);
      }
    };
    fetchBanners();
  }, []);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi, onSelect]);

  return (
    <div className="relative overflow-hidden group" ref={emblaRef}>
      <div className="flex touch-pan-y">

        {/* Main Hero */}
        <div className="relative flex-[0_0_100%] min-w-0 h-[500px] md:h-[560px] lg:h-[640px] overflow-hidden flex items-center">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#3a1555] via-brandDarkest to-brandDark"></div>

          {/* Subtle grid */}
          <div className="absolute inset-0 opacity-[0.04]" style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)",
            backgroundSize: "32px 32px"
          }}></div>

          {/* Ambient glow */}
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/8 rounded-full blur-[150px]"></div>
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px]"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 items-center">
              {/* Text */}
              <div className="text-center md:text-left">
                <div className="inline-flex items-center space-x-2 bg-white/[0.06] backdrop-blur-md border border-white/[0.08] rounded-full px-4 py-1.5 mb-8">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400"></span>
                  </span>
                  <span className="text-white/70 text-xs font-medium tracking-wide uppercase">Entregas activas en Mendoza</span>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold text-white mb-6 leading-[1.08] tracking-tight">
                  Todo para tu
                  <br />
                  mascota, directo
                  <br />
                  <span className="text-primary-300">a tu casa</span>
                </h1>

                <p className="text-base md:text-lg mb-10 text-white/40 max-w-md font-medium leading-relaxed">
                  Alimentos premium y veterinaria a domicilio. Calidad garantizada para quienes mas queres.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                  <Link
                    href="/productos"
                    className="bg-white text-brandDarkest px-7 py-3.5 rounded-xl font-bold hover:shadow-float transition-all hover:-translate-y-0.5 inline-flex items-center justify-center text-sm group/btn"
                  >
                    Ver productos
                    <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-0.5 transition-transform" />
                  </Link>
                  <a
                    href={`https://wa.me/${whatsappNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-white/[0.12] bg-white/[0.04] backdrop-blur-sm text-white/80 px-7 py-3.5 rounded-xl font-semibold hover:bg-white/[0.08] hover:text-white transition-all inline-flex items-center justify-center text-sm"
                  >
                    <svg className="w-4 h-4 mr-2 opacity-70" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                    Pedir por WhatsApp
                  </a>
                </div>
              </div>

              {/* Image with organic blob background */}
              <div className="hidden md:flex justify-center items-center relative">
                <div className="relative w-[400px] h-[400px] lg:w-[500px] lg:h-[500px]">
                  {/* Organic blob shapes */}
                  <div className="absolute inset-0 bg-white/[0.08]" style={{ borderRadius: "60% 40% 55% 45% / 50% 60% 40% 50%" }}></div>
                  <div className="absolute inset-3 bg-white/[0.06]" style={{ borderRadius: "55% 45% 50% 50% / 45% 55% 45% 55%" }}></div>
                  <div className="absolute inset-8 bg-white shadow-[0_0_80px_rgba(255,255,255,0.15)]" style={{ borderRadius: "50% 42% 55% 45% / 48% 55% 42% 52%" }}></div>

                  {/* Dog image */}
                  <img
                    src="/perro_salchicha.png"
                    alt="Perro feliz recibiendo su alimento a domicilio"
                    className="absolute inset-0 w-full h-full object-contain z-10 drop-shadow-[0_10px_40px_rgba(0,0,0,0.3)] scale-100"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Banners */}
        {banners.map(b => (
          <div key={b.id} className="relative flex-[0_0_100%] min-w-0 h-[500px] md:h-[560px] lg:h-[640px] bg-transparent flex items-center justify-center overflow-hidden">
            <img src={`${apiUrl}${b.image_url}`} alt={b.title || "Banner Puerto Mascotas"} className="absolute inset-0 w-full h-full object-cover" />
          </div>
        ))}
      </div>

      {/* Controls */}
      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 backdrop-blur-sm text-white w-11 h-11 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all z-20 border border-white/10"
        onClick={() => emblaApi?.scrollPrev()}
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 backdrop-blur-sm text-white w-11 h-11 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all z-20 border border-white/10"
        onClick={() => emblaApi?.scrollNext()}
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-20">
        {[...Array(1 + banners.length)].map((_, i) => (
          <button
            key={i}
            className={`rounded-full transition-all duration-300 ${
              i === selectedIndex
                ? "bg-white w-8 h-2"
                : "bg-white/25 w-2 h-2 hover:bg-white/50"
            }`}
            onClick={() => emblaApi?.scrollTo(i)}
            aria-label={`Ir al banner ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
