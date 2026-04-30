"use client";

import Link from "next/link";
import { MapPin, Clock } from "lucide-react";

export default function Footer() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "2613420309";

  return (
    <footer className="bg-brandDarkest text-cloud-400 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <img src="/logo.png" className="w-8 h-8 rounded-full object-cover" alt="Puerto Mascotas" />
              <h3 className="text-base font-bold text-white">Puerto Mascotas</h3>
            </div>
            <p className="text-sm text-cloud-500 leading-relaxed mb-5">
              Alimentos de calidad y atencion veterinaria a domicilio en Mendoza.
            </p>
            <div className="flex space-x-2">
              <a href="#" aria-label="TikTok" className="w-8 h-8 bg-white/[0.05] border border-white/[0.08] rounded-lg flex items-center justify-center hover:bg-white/10 transition-all">
                <svg className="w-3.5 h-3.5 text-cloud-400" fill="currentColor" viewBox="0 0 448 512">
                  <path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z"/>
                </svg>
              </a>
              <a href="https://www.instagram.com/puertomascotasmendoza/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-8 h-8 bg-white/[0.05] border border-white/[0.08] rounded-lg flex items-center justify-center hover:bg-white/10 transition-all">
                <svg className="w-3.5 h-3.5 text-cloud-400" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-xs font-bold text-white/50 uppercase tracking-widest mb-4">Navegacion</h3>
            <ul className="space-y-2.5">
              <li><Link href="/" className="text-sm text-cloud-500 hover:text-white transition-colors">Inicio</Link></li>
              <li><Link href="/productos" className="text-sm text-cloud-500 hover:text-white transition-colors">Productos</Link></li>
              <li><Link href="/productos?category=veterinaria-consultas" className="text-sm text-cloud-500 hover:text-white transition-colors">Veterinaria</Link></li>
              <li><Link href="/carrito" className="text-sm text-cloud-500 hover:text-white transition-colors">Mi carrito</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-xs font-bold text-white/50 uppercase tracking-widest mb-4">Categorias</h3>
            <ul className="space-y-2.5">
              <li><Link href="/productos?category=perros-alimento" className="text-sm text-cloud-500 hover:text-white transition-colors">Perros - Alimento</Link></li>
              <li><Link href="/productos?category=perros-premios" className="text-sm text-cloud-500 hover:text-white transition-colors">Perros - Premios</Link></li>
              <li><Link href="/productos?category=gatos-alimento" className="text-sm text-cloud-500 hover:text-white transition-colors">Gatos - Alimento</Link></li>
              <li><Link href="/productos?category=gatos-premios" className="text-sm text-cloud-500 hover:text-white transition-colors">Gatos - Premios</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-bold text-white/50 uppercase tracking-widest mb-4">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-primary-400 mt-0.5 shrink-0" strokeWidth={1.8} />
                <span className="text-sm text-cloud-500">Mendoza, Argentina</span>
              </li>
              <li className="flex items-start space-x-2.5">
                <Clock className="w-4 h-4 text-primary-400 mt-0.5 shrink-0" strokeWidth={1.8} />
                <div className="text-sm text-cloud-500">
                  <p>Lunes a Sabado</p>
                  <p className="text-cloud-500/60">8:00 a 19:00 hs</p>
                </div>
              </li>
              <li className="mt-4">
                <a
                  href={`https://wa.me/${whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 bg-whatsapp/10 border border-whatsapp/20 text-whatsapp px-3.5 py-2 rounded-lg hover:bg-whatsapp/20 transition-all text-sm font-medium"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  <span>WhatsApp</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/[0.06] pt-8 flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
          <p className="text-xs text-cloud-500/50">&copy; {new Date().getFullYear()} Puerto Mascotas. Todos los derechos reservados.</p>
          <p className="text-xs text-cloud-500/50">
            Desarrollado por{" "}
            <a href="https://soluway.com.ar" target="_blank" rel="noopener noreferrer" className="text-primary-400/80 hover:text-primary-300 transition-colors">
              Soluway
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
