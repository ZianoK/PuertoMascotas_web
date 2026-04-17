"use client";

import React, { useState, useEffect } from "react";
import { getAdminProducts, deleteProduct, applyProductDiscount, AdminProduct } from "@/lib/api";

export default function AdminCatalogoPage() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  const loadProducts = async () => {
    try {
      setLoadingProducts(true);
      const data = await getAdminProducts();
      setProducts(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingProducts(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleDelete = async (id: number) => {
    if (confirm("¿Estás seguro de que querés borrar este producto?")) {
      await deleteProduct(id);
      loadProducts();
    }
  };

  const handleDiscount = async (id: number, currentPrice: number) => {
    const newVal = prompt(`Precio actual: $${currentPrice}. Ingresá el nuevo precio promocional (el actual quedará tachado):`);
    if (newVal && !isNaN(parseFloat(newVal))) {
      await applyProductDiscount(id, parseFloat(newVal));
      loadProducts();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setMessage(null);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setLoading(true);
    setMessage(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      // Usar variable de entorno o localhost
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      
      const response = await fetch(`${apiUrl}/admin/products/upload`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({
          type: "success",
          text: `¡Catálogo actualizado! Productos creados: ${data.products_created}, Actualizados: ${data.products_updated}`,
        });
        setFile(null);
        loadProducts(); // Recargar la tabla
      } else {
        setMessage({
          type: "error",
          text: `Error: ${data.detail || "Error desconocido al procesar Excel"}`,
        });
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: "Error de conexión con el servidor. Revisá si el backend está corriendo.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Carga del Catálogo</h2>
        <p className="text-gray-600">
          Subí tu archivo Excel (.xlsx) para actualizar los productos dinámicamente.
        </p>
      </div>

      <div className="bg-white p-6 md:p-10 rounded-xl border border-gray-200 shadow-sm">
        <label className="block text-sm font-medium text-gray-700 mb-4">
          Archivo Excel (.xlsx o .xls)
        </label>
        
        <div className="max-w-xl mx-auto border-2 border-dashed border-gray-300 rounded-lg px-6 py-10 flex flex-col items-center justify-center text-center bg-gray-50 hover:bg-gray-100 transition-colors">
          <svg className="w-12 h-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
          </svg>
          
          <div className="text-sm text-gray-600 mb-2">
            <label htmlFor="file-upload" className="font-medium text-primary hover:text-primary-dark cursor-pointer">
              <span>Seleccioná un archivo</span>
              <input id="file-upload" name="file-upload" type="file" className="sr-only" accept=".xlsx, .xls" onChange={handleFileChange} />
            </label>
            <p className="pl-1">o arrastralo hasta acá</p>
          </div>
          
          {file && (
            <p className="text-sm font-semibold text-green-600 mt-2">
              Archivo seleccionado: {file.name}
            </p>
          )}
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={handleUpload}
            disabled={!file || loading}
            className={`px-6 py-2 rounded-lg font-medium text-white transition-all ${
              !file || loading ? "bg-gray-400 cursor-not-allowed" : "bg-primary hover:bg-primary-light shadow-md"
            }`}
          >
            {loading ? "Procesando..." : "Cargar Excel"}
          </button>
        </div>

        {message && (
          <div className={`mt-6 p-4 rounded-lg relative ${message.type === "success" ? "bg-green-50 text-green-800 border border-green-200" : "bg-red-50 text-red-800 border border-red-200"}`}>
            <h4 className="font-semibold mb-1">{message.type === "success" ? "¡Éxito!" : "Atención"}</h4>
            <p className="text-sm">{message.text}</p>
          </div>
        )}
      </div>

      <div className="bg-primary/5 p-6 rounded-xl border border-primary/20">
        <h3 className="font-semibold text-primary mb-2">💡 Instrucciones del formato</h3>
        <p className="text-sm text-primary-dark">
          El archivo Excel debe respetar TU formato (el que me pasaste en la captura):<br /><br />
          <strong>Col 1:</strong> Código<br />
          <strong>Col 2:</strong> Categoría (creará categorías nuevas si no existen)<br />
          <strong>Col 3:</strong> Marca / Línea<br />
          <strong>Col 4:</strong> Producto (Descripción y Presentación)<br />
          <strong>Col 5:</strong> Precio Ref. (ej: $16.771,11)<br />
          <strong>Col 6:</strong> Stock<br />
        </p>
      </div>

      {/* Product Table */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm mt-8 overflow-hidden">
        <h3 className="font-semibold text-gray-800 mb-4 text-lg">Catálogo Actual</h3>
        {loadingProducts ? (
          <p className="text-gray-500">Cargando productos...</p>
        ) : products.length === 0 ? (
          <p className="text-gray-500">No hay productos cargados todavía.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="py-3 px-4 font-semibold text-gray-600">Categoría</th>
                  <th className="py-3 px-4 font-semibold text-gray-600">Nombre</th>
                  <th className="py-3 px-4 font-semibold text-gray-600">Precio</th>
                  <th className="py-3 px-4 font-semibold text-gray-600 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {products.map(p => (
                  <tr key={p.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4 text-sm text-gray-600">{p.category}</td>
                    <td className="py-3 px-4 font-medium text-gray-800">{p.name}</td>
                    <td className="py-3 px-4">
                      {p.original_price ? (
                        <div className="flex flex-col">
                          <span className="text-sm text-gray-400 line-through">${p.original_price.toLocaleString("es-AR")}</span>
                          <span className="text-green-600 font-bold">${p.price.toLocaleString("es-AR")}</span>
                        </div>
                      ) : (
                        <span className="font-medium text-gray-800">${p.price.toLocaleString("es-AR")}</span>
                      )}
                    </td>
                    <td className="py-3 px-4 flex gap-2 justify-end">
                       <button onClick={() => handleDiscount(p.id, p.price)} className="px-3 py-1.5 bg-brandDark text-white rounded hover:bg-primary text-xs font-semibold transition-colors">
                         🛒 Descuento
                       </button>
                       <button onClick={() => handleDelete(p.id)} className="px-3 py-1.5 bg-red-100 text-red-700 rounded hover:bg-red-200 text-xs font-semibold transition-colors">
                         🗑️ Borrar
                       </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
