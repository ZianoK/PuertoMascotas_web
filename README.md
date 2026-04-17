# Puerto Mascotas — Sistema Web

Tienda online y backend API para venta de alimentos para mascotas y servicios de veterinaria a domicilio en Mendoza.

---

## Stack Tecnológico

**Backend:**
- FastAPI (Python)
- SQLite + SQLAlchemy
- Pydantic

**Frontend:**
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Zustand (state management)

**Deploy:**
- Backend → Render
- Frontend → Vercel

---

## Estructura del Proyecto

```
PuertoMascotas/
├── backend/
│   ├── main.py              ← Punto de entrada FastAPI
│   ├── database.py          ← Configuración SQLite
│   ├── models.py            ← Modelos SQLAlchemy
│   ├── schemas.py           ← Schemas Pydantic
│   ├── routers/
│   │   ├── products.py
│   │   ├── categories.py
│   │   └── orders.py
│   ├── requirements.txt
│   ├── env.example          ← Template de variables de entorno
│   └── gitignore
│
└── frontend/
    ├── app/                 ← App Router de Next.js
    │   ├── page.tsx         ← Home
    │   ├── productos/
    │   ├── carrito/
    │   ├── checkout/
    │   └── confirmacion/
    ├── components/          ← Componentes reutilizables
    ├── lib/
    │   ├── api.ts           ← Cliente API
    │   └── cartStore.ts     ← Store Zustand
    ├── package.json
    ├── env.local.example
    └── gitignore
```

---

## Instalación y Ejecución Local

### Backend (FastAPI)

```bash
cd backend

# Crear entorno virtual
python -m venv venv
source venv/bin/activate  # En Windows: venv\Scripts\activate

# Instalar dependencias
pip install -r requirements.txt

# Copiar .env de ejemplo y configurar (opcional en local)
cp env.example .env

# Ejecutar servidor
uvicorn main:app --reload
```

El backend estará corriendo en `http://localhost:8000`

- Documentación automática: `http://localhost:8000/docs`
- Alternativa ReDoc: `http://localhost:8000/redoc`

**Seed automático:** Al iniciar, si la base de datos está vacía, se crean categorías y productos de ejemplo.

---

### Frontend (Next.js)

```bash
cd frontend

# Instalar dependencias
npm install

# Copiar .env de ejemplo y configurar
cp env.local.example .env.local

# Ejecutar en desarrollo
npm run dev
```

El frontend estará corriendo en `http://localhost:3000`

**Importante:** El frontend espera que el backend esté corriendo en `http://localhost:8000` (configurable en `.env.local`)

---

## Variables de Entorno

### Backend (`backend/.env`)

```
DATABASE_URL=sqlite:///./puerto_mascotas.db
FRONTEND_URL=http://localhost:3000
ENVIRONMENT=development
```

### Frontend (`frontend/.env.local`)

```
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_WHATSAPP_NUMBER=5492614000000
```

**TODO:** El número de WhatsApp es placeholder — reemplazar con el número real del cliente.

---

## Endpoints del Backend

### Categorías
- `GET /api/categories` — Lista de categorías activas

### Productos
- `GET /api/products` — Lista de productos activos (query params: `category_slug`, `search`)
- `GET /api/products/{id}` — Detalle de producto

### Pedidos
- `POST /api/orders` — Crear pedido
- `GET /api/orders/{id}` — Detalle de pedido

---

## Funcionalidades Implementadas (Fase 1)

✅ Catálogo de productos con filtros por categoría
✅ Carrito de compras (persistente en localStorage)
✅ Checkout con formulario de pedido
✅ Confirmación de pedido con instrucciones de pago
✅ Backend API con validación de stock
✅ Seed automático de categorías y productos de ejemplo
✅ Diseño mobile-first con Tailwind CSS
✅ Integración WhatsApp para contacto

---

## Pendientes (Próximas Fases)

❌ Panel administrativo (gestión de productos, pedidos, categorías)
❌ Integración real con Mercado Pago (actualmente solo link manual)
❌ Sistema de notificaciones automáticas por WhatsApp/Email
❌ Carga de imágenes reales de productos
❌ Sistema de usuarios y autenticación
❌ Dashboard de métricas y reportes

---

## Datos de Prueba

Al iniciar el backend por primera vez, se crean automáticamente:

- **6 categorías**: Perros/Gatos (Alimento y Premios), Veterinaria (Consultas y Tratamientos)
- **18 productos de ejemplo** (3 por categoría, marcados como inactivos con precio $0)

Estos productos sirven como plantilla — el cliente debe completar los datos reales y marcarlos como activos.

---

## Deploy

### Backend (Render)
1. Crear nuevo Web Service en Render
2. Conectar repositorio
3. Build command: `pip install -r backend/requirements.txt`
4. Start command: `uvicorn backend.main:app --host 0.0.0.0 --port $PORT`
5. Configurar variables de entorno (DATABASE_URL, FRONTEND_URL)

### Frontend (Vercel)
1. Importar proyecto en Vercel
2. Root directory: `frontend`
3. Framework preset: Next.js
4. Configurar variables de entorno (NEXT_PUBLIC_API_URL, NEXT_PUBLIC_WHATSAPP_NUMBER)
5. Deploy automático en cada push a main

---

## Notas para el Cliente

**TODO pendientes del cliente:**
- [ ] Logo de Puerto Mascotas (reemplazar placeholder "PM" en Navbar)
- [ ] Imágenes reales de productos
- [ ] Completar datos de productos (nombre, descripción, precio, stock)
- [ ] Número de WhatsApp real (actualizar en .env.local)
- [ ] Datos de transferencia bancaria (CBU/Alias) para página de confirmación
- [ ] Definir costos de envío (actualmente "a coordinar")

**Archivos marcados con `TODO:`:**
- `frontend/components/Footer.tsx` — número de WhatsApp placeholder
- `frontend/app/confirmacion/page.tsx` — datos de transferencia bancaria
- `frontend/env.local.example` — número de WhatsApp placeholder

---

## Soporte

Para consultas sobre el sistema, contactar al equipo de Soluway.
