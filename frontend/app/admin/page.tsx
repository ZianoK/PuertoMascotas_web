export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Bienvenido al Panel</h2>
      <p className="text-gray-600">
        Desde aquí podés gestionar tu catálogo. Usá el menú lateral para
        navegar. En un futuro, acá verás métricas, ventas y estadísticas clave.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="font-semibold text-gray-500 mb-2">Ventas del mes</h3>
          <p className="text-3xl font-bold text-gray-800">$0.00</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="font-semibold text-gray-500 mb-2">Pedidos</h3>
          <p className="text-3xl font-bold text-gray-800">0</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="font-semibold text-gray-500 mb-2">Productos Activos</h3>
          <p className="text-3xl font-bold text-gray-800">-</p>
        </div>
      </div>
    </div>
  );
}
