import { Stethoscope, Clock, MapPin, Phone, MessageCircle } from "lucide-react";

export default function VeterinariaPage() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "2613420309";

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
            <Stethoscope className="w-7 h-7 text-emerald-600" strokeWidth={1.8} />
          </div>
          <p className="text-emerald-600 font-semibold text-sm uppercase tracking-widest mb-3">Servicio profesional</p>
          <h1 className="text-3xl md:text-4xl font-extrabold text-textDark tracking-tight mb-3">
            Veterinaria a domicilio
          </h1>
          <p className="text-textSecondary max-w-lg mx-auto">
            Atendemos a tu mascota en la comodidad de tu hogar. Consultas, vacunas y tratamientos sin estres.
          </p>
        </div>

        {/* Info cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <div className="bg-white rounded-xl border border-cloud-200/60 p-5 text-center">
            <Clock className="w-5 h-5 text-emerald-600 mx-auto mb-2" />
            <h3 className="font-bold text-sm text-textDark mb-1">Horarios</h3>
            <p className="text-xs text-textSecondary">Lunes a Sabado, 8 a 19hs</p>
          </div>
          <div className="bg-white rounded-xl border border-cloud-200/60 p-5 text-center">
            <MapPin className="w-5 h-5 text-emerald-600 mx-auto mb-2" />
            <h3 className="font-bold text-sm text-textDark mb-1">Cobertura</h3>
            <p className="text-xs text-textSecondary">Gran Mendoza</p>
          </div>
          <div className="bg-white rounded-xl border border-cloud-200/60 p-5 text-center">
            <Phone className="w-5 h-5 text-emerald-600 mx-auto mb-2" />
            <h3 className="font-bold text-sm text-textDark mb-1">Turnos</h3>
            <p className="text-xs text-textSecondary">Por WhatsApp</p>
          </div>
        </div>

        {/* Placeholder for services - will be configurable from admin */}
        <div className="bg-white rounded-2xl border border-cloud-200/60 p-8 text-center mb-8">
          <h2 className="text-lg font-bold text-textDark mb-2">Servicios disponibles</h2>
          <p className="text-textSecondary text-sm mb-6">
            Proximamente vas a poder ver todos nuestros servicios veterinarios aca. Por ahora, consultanos por WhatsApp.
          </p>
          <a
            href={`https://wa.me/${whatsappNumber}?text=Hola! Quiero consultar por los servicios de veterinaria a domicilio`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-emerald-700 transition-all"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Consultar por WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}
