"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import AuthGuard from "./AuthGuard";

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_name");
    router.push("/login");
  };

  // Login page: no sidebar
  if (pathname === "/login") {
    return <AuthGuard>{children}</AuthGuard>;
  }

  const navItems = [
    { href: "/", label: "Dashboard" },
    { href: "/catalogo", label: "Catalogo / Excel" },
    { href: "/pedidos", label: "Pedidos" },
    { href: "/banners", label: "Banners / Hero" },
  ];

  return (
    <AuthGuard>
      <div className="flex bg-gray-50 min-h-screen">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 flex flex-col shrink-0 hidden md:flex">
          <div className="p-6 flex items-center gap-4 border-b border-gray-100">
            <img src="/logo.png" alt="Logo" className="w-12 h-12 rounded-full object-cover shadow-sm border border-gray-200" />
            <div>
              <h2 className="font-bold text-gray-800">Puerto Mascotas</h2>
              <p className="text-xs text-gray-500">Panel Admin</p>
            </div>
          </div>

          <nav className="flex-1 p-4 flex flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`p-3 rounded-lg transition-colors font-medium text-sm ${
                  pathname === item.href
                    ? "bg-primary/10 text-primary"
                    : "text-gray-700 hover:bg-primary/5 hover:text-primary"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="p-4 border-t border-gray-100 space-y-2">
            <a
              href="http://localhost:3000"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-xs text-gray-400 hover:text-primary transition-colors"
            >
              Ver tienda →
            </a>
            <button
              onClick={handleLogout}
              className="block text-xs text-red-400 hover:text-red-600 transition-colors"
            >
              Cerrar sesion
            </button>
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 flex flex-col min-w-0">
          <header className="bg-white border-b border-gray-200 p-4 flex justify-between items-center px-8">
            <h1 className="text-xl font-semibold text-gray-800">Administracion</h1>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-600">Admin</span>
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm">A</div>
            </div>
          </header>
          <div className="p-8 flex-1 overflow-auto">{children}</div>
        </main>
      </div>
    </AuthGuard>
  );
}
