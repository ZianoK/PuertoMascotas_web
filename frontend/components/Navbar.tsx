"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCartStore } from "@/lib/cartStore";
import { useEffect, useState } from "react";
import { ShoppingBag, Search, Menu, X, Truck, Clock } from "lucide-react";

export default function Navbar() {
  const itemCount = useCartStore((state) => state.getItemCount());
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category");
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      router.push(`/productos?search=${encodeURIComponent(searchQuery.trim())}`);
      setMobileMenuOpen(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Inicio", path: "/", categoryPrefix: null },
    { href: "/productos", label: "Perros", path: "/productos", categoryPrefix: "perros" },
    { href: "/productos?category=gatos-alimento", label: "Gatos", path: "/productos", categoryPrefix: "gatos" },
    { href: "/productos?category=veterinaria-consultas", label: "Veterinaria", path: "/productos", categoryPrefix: "veterinaria" },
  ];

  const isActive = (link: typeof navLinks[0]) => {
    if (link.path === "/") return pathname === "/";
    if (pathname !== link.path) return false;
    if (link.categoryPrefix === "perros") {
      return !currentCategory || currentCategory.startsWith("perros");
    }
    return !!currentCategory?.startsWith(link.categoryPrefix ?? "");
  };

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "shadow-lg shadow-black/[0.04]" : ""}`}>
      {/* Top bar */}
      <div className="hidden md:block bg-brandDarkest text-white/70 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-8">
            <div className="flex items-center space-x-1.5">
              <Truck className="w-3 h-3" />
              <span className="font-medium">Envio al gran Mendoza</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <Clock className="w-3 h-3" />
              <span className="font-medium">Lunes a Sabado 8 a 19hs</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className={`transition-all duration-300 border-b ${scrolled ? "bg-white/80 backdrop-blur-xl border-cloud-200/50" : "bg-white border-cloud-200/30"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2.5 shrink-0">
              <img src="/logo.png" className="w-8 h-8 rounded-full object-cover" alt="Puerto Mascotas" />
              <span className="text-lg font-extrabold text-textDark tracking-tight">
                Puerto <span className="text-primary">Mascotas</span>
              </span>
            </Link>

            {/* Search - center */}
            <div className="hidden md:block flex-1 max-w-sm mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cloud-400" />
                <input
                  type="text"
                  placeholder="Buscar productos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleSearch}
                  className="w-full pl-9 pr-4 py-2 bg-cloud-50 border border-cloud-200/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 focus:bg-white transition-all text-sm placeholder:text-cloud-400"
                />
              </div>
            </div>

            {/* Right controls */}
            <div className="flex items-center space-x-2">
              {/* Desktop icons */}
              <a
                href="https://www.instagram.com/puertomascotasmendoza/"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:flex w-9 h-9 items-center justify-center rounded-lg text-cloud-400 hover:text-primary hover:bg-primary/5 transition-all"
                aria-label="Instagram"
              >
                <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>

              <div className="hidden md:block w-px h-5 bg-cloud-200 mx-1"></div>

              <Link
                href="/carrito"
                className="relative flex w-9 h-9 items-center justify-center rounded-lg text-cloud-500 hover:text-primary hover:bg-primary/5 transition-all"
                aria-label="Carrito"
              >
                <ShoppingBag className="w-[18px] h-[18px]" strokeWidth={1.8} />
                {itemCount > 0 && (
                  <span className="absolute top-0.5 right-0.5 bg-primary text-white text-[9px] font-bold rounded-full min-w-[16px] h-4 flex items-center justify-center px-1 leading-none">
                    {itemCount}
                  </span>
                )}
              </Link>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden flex w-9 h-9 items-center justify-center rounded-lg text-cloud-500 hover:text-primary hover:bg-primary/5 transition-all"
                aria-label="Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Category nav */}
      <div className={`bg-white border-b border-cloud-100 transition-all ${mobileMenuOpen ? "" : "hidden md:block"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Mobile search */}
          <div className="md:hidden py-3 border-b border-cloud-100">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cloud-400" />
              <input
                type="text"
                placeholder="Buscar productos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearch}
                className="w-full pl-9 pr-4 py-2 bg-cloud-50 border border-cloud-200/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm placeholder:text-cloud-400"
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:space-x-1 overflow-x-auto py-1 scrollbar-hide">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`whitespace-nowrap text-sm font-medium px-4 py-2.5 rounded-lg transition-all ${
                  isActive(link)
                    ? "text-primary bg-primary/[0.06]"
                    : "text-cloud-500 hover:text-textDark hover:bg-cloud-50"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </nav>
  );
}
