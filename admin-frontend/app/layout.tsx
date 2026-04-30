import "./globals.css";
import React from "react";
import AdminShell from "@/lib/AdminShell";

export const metadata = {
  title: "Puerto Mascotas | Admin",
  description: "Panel de administración de Puerto Mascotas",
  icons: { icon: "/logo.png" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <AdminShell>{children}</AdminShell>
      </body>
    </html>
  );
}
