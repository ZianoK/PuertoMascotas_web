"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useEffect, useState, useCallback } from "react";
import { getBanners, Banner } from "@/lib/api";
import Link from "next/link";

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
        
        {/* Slide 1: Default Hero Mejorado con Perro Expandido y fondo blanco */}
        <div className="relative flex-[0_0_100%] min-w-0 h-[450px] md:h-[500px] lg:h-[600px] bg-gradient-to-r from-brandDarkest to-brandDark text-white overflow-hidden flex items-center">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTEwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-10"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center h-full">
              {/* Texto */}
              <div className="text-center md:text-left fade-in-up md:pr-4">
                <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 leading-tight drop-shadow-md">
                  Todo para tu mascota,
                  <br />
                  en la puerta de tu casa
                </h1>
                <p className="text-xl md:text-2xl mb-8 text-white/90 font-medium">
                  Alimentos premium · Veterinaria a domicilio · Mendoza
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                  <Link
                    href="/productos"
                    className="bg-white text-primary px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-all hover:scale-105 inline-flex items-center justify-center shadow-lg"
                  >
                    Ver productos →
                  </Link>
                  <a
                    href={`https://wa.me/${whatsappNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-2 border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-white hover:text-primary transition-all inline-flex items-center justify-center shadow-lg"
                  >
                    Pedir por WhatsApp
                  </a>
                </div>
              </div>

              {/* Imagen Perro Ampliado con Círculo Blanco */}
              <div className="hidden md:flex justify-center items-center relative h-[380px] lg:h-[500px] w-full z-10 transition-transform hover:scale-105 duration-700">
                {/* SVG Blob Blanco puro de fondo, bien deforme */}
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] lg:w-[550px] lg:h-[550px] fill-white opacity-90 transition-transform duration-700 group-hover:scale-105" style={{ zIndex: 0 }}>
                  <path d="M37.8,-68C48.2,-61.7,55.3,-49.2,63.1,-37.2C70.9,-25.2,79.5,-13.6,80.7,-0.9C81.9,11.8,75.7,25.6,68.2,38.2C60.7,50.8,51.8,62.2,40.4,70.5C29,78.8,15.1,84,-0.4,84.7C-16,85.4,-32,81.6,-45.3,73.4C-58.7,65.2,-69.3,52.6,-77.2,38.6C-85.1,24.6,-90.3,9.2,-89.1,-5.5C-87.9,-20.2,-80.3,-34.2,-71.1,-46.6C-61.9,-59,-51,-69.8,-38.4,-75.4C-25.8,-81,-12.9,-81.4,-0.1,-81.3C12.8,-81.2,27.3,-74.3,37.8,-68Z" transform="translate(100 100)" />
                </svg>
                
                <img 
                  src="/perro_salchicha.png" 
                  alt="Perro feliz que recibe su alimento" 
                  className="object-contain h-full w-full drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative z-10 scale-110 mt-6"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Banners from admin */}
        {banners.map(b => (
           <div key={b.id} className="relative flex-[0_0_100%] min-w-0 h-[450px] md:h-[500px] lg:h-[600px] bg-transparent flex items-center justify-center overflow-hidden">
             <img src={`${apiUrl}${b.image_url}`} alt={b.title || "Banner Puerto Mascotas"} className="absolute inset-0 w-full h-full object-cover" />
           </div>
        ))}

      </div>

      {/* Controles y Navegación (visible on hover) */}
       <button 
         className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/60 text-white w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20"
         onClick={() => emblaApi?.scrollPrev()}
       >
         ←
       </button>
       <button 
         className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/60 text-white w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20"
         onClick={() => emblaApi?.scrollNext()}
       >
         →
       </button>

      {/* Indicadores Inferiores */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-3 z-20">
        {[...Array(1 + banners.length)].map((_, i) => (
          <button
            key={i}
            className={`w-3.5 h-3.5 rounded-full transition-all shadow-md ${
              i === selectedIndex ? "bg-white scale-125" : "bg-white/40 hover:bg-white/80"
            }`}
            onClick={() => emblaApi?.scrollTo(i)}
            aria-label={`Ir al banner ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
