import Link from "next/link";
import React from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex bg-gray-50 min-h-screen">
      {/* Sidebar minimalista */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col hide-on-mobile">
        <div className="p-6 flex items-center gap-4 border-b border-gray-100">
          <img
            src="/logo.png"
            alt="Logo Puerto Mascotas"
            className="w-12 h-12 rounded-full object-cover shadow-sm border border-gray-200"
          />
          <div>
            <h2 className="font-bold text-gray-800">Puerto Mascotas</h2>
            <p className="text-xs text-gray-500">Panel Admin</p>
          </div>
        </div>

        <nav className="flex-1 p-4 flex flex-col gap-2">
          <Link
            href="/admin"
            className="p-3 text-gray-700 hover:bg-primary/5 hover:text-primary rounded-lg transition-colors font-medium"
          >
            Dashboard
          </Link>
          <Link
            href="/admin/catalogo"
            className="p-3 text-gray-700 hover:bg-primary/5 hover:text-primary rounded-lg transition-colors font-medium"
          >
            Catálogo / Excel
          </Link>
          <Link
            href="/admin/banners"
            className="p-3 text-gray-700 hover:bg-primary/5 hover:text-primary rounded-lg transition-colors font-medium"
          >
            Banners / Hero
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        <header className="bg-white border-b border-gray-200 p-4 flex justify-between items-center px-8">
          <h1 className="text-xl font-semibold text-gray-800">Administración</h1>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-600">Admin</span>
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold">
              A
            </div>
          </div>
        </header>
        <div className="p-8 flex-1 overflow-auto">{children}</div>
      </main>
    </div>
  );
}
