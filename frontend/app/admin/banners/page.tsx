"use client";

import React, { useState, useEffect } from "react";
import { getBanners, uploadBanner, deleteBanner, Banner } from "@/lib/api";

export default function AdminBannersPage() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const loadBanners = async () => {
    try {
      setLoading(true);
      const data = await getBanners();
      setBanners(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBanners();
  }, []);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      try {
        setUploading(true);
        await uploadBanner(e.target.files[0]);
        loadBanners();
      } catch (err) {
        alert("Error al subir el banner.");
      } finally {
        setUploading(false);
        // clean up input
        e.target.value = "";
      }
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("¿Borrar este banner?")) {
      await deleteBanner(id);
      loadBanners();
    }
  };

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Banners del Hero</h2>
        <p className="text-gray-600">
          Subí imágenes que irán rotando en la portada de tu tienda.
        </p>
      </div>

      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Subir Nuevo Banner (.png, .jpg, .webp)
        </label>
        <p className="text-sm text-gray-500 mb-4">
          Medidas recomendadas para mejor calidad: <strong>1920x600 px</strong> (formato rectangular apaisado).
        </p>
        
        <div className="max-w-xl border-2 border-dashed border-gray-300 rounded-lg px-6 py-10 flex flex-col items-center justify-center text-center bg-gray-50 hover:bg-gray-100 transition-colors">
          <svg className="w-12 h-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
          </svg>
          
          <div className="text-sm text-gray-600 mb-2">
            <label htmlFor="banner-upload" className={`font-medium cursor-pointer ${uploading ? 'text-gray-400' : 'text-primary hover:text-primary-dark'}`}>
              <span>{uploading ? 'Subiendo...' : 'Seleccioná una imagen'}</span>
              <input id="banner-upload" name="banner-upload" type="file" className="sr-only" accept=".jpg,.jpeg,.png,.webp" onChange={handleFileChange} disabled={uploading} />
            </label>
            <p className="pl-1">o arrastrala hasta acá</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
         <h3 className="font-semibold text-gray-800 mb-4">Banners Activos ({banners.length})</h3>
         {loading ? (
             <p className="text-sm text-gray-500">Cargando...</p>
         ) : banners.length === 0 ? (
             <p className="text-sm text-gray-500">No hay banners publicados.</p>
         ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {banners.map(b => {
                 const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
                 const imageUrl = `${apiUrl}${b.image_url}`;
                 return (
                 <div key={b.id} className="border border-gray-200 rounded-lg overflow-hidden group relative">
                    <img src={imageUrl} alt="Banner" className="w-full h-40 object-cover" />
                    <div className="p-3 bg-gray-50 flex justify-between items-center border-t border-gray-200">
                       <span className="text-xs text-gray-500 truncate mr-2">{b.title}</span>
                       <button onClick={() => handleDelete(b.id)} className="text-red-500 hover:text-red-700 text-sm font-medium transition-colors">
                          Borrar
                       </button>
                    </div>
                 </div>
               )})}
            </div>
         )}
      </div>
    </div>
  );
}
