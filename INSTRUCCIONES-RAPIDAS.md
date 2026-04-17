# Instrucciones Rápidas de Ejecución

## Probar el sistema en 3 pasos

### 1. Backend (Terminal 1)

```bash
cd backend
python -m venv venv
venv\Scripts\activate       # Windows
pip install -r requirements.txt
uvicorn main:app --reload
```

Esperá a ver: `Application startup complete.`

Luego abrí en el navegador: **http://localhost:8000/docs** para ver la API.

---

### 2. Frontend (Terminal 2)

```bash
cd frontend
npm install
npm run dev
```

Esperá a ver: `Ready in X ms`

Luego abrí en el navegador: **http://localhost:3000**

---

### 3. Probar el flujo completo

1. **Home** → hacé clic en "Ver productos"
2. **Catálogo** → vas a ver productos de ejemplo (inactivos por defecto)
3. Para probar el flujo, **primero activá productos desde la API**:
   - Abrí http://localhost:8000/docs
   - Buscá `PUT /api/products/{id}` (cuando lo agregues en el admin)
   - O modificá directo la base de datos: `puerto_mascotas.db`

**Flujo de compra:**
- Navegá productos → Agregá al carrito → Carrito → Checkout → Confirmación

---

## Datos iniciales

Al iniciar el backend por primera vez se crean:
- 6 categorías
- 18 productos de ejemplo (price=0, active=false)

Estos productos son plantillas — el cliente debe completarlos.

---

## Siguiente paso: Admin Panel

En la Fase 2 vas a poder:
- Activar/desactivar productos
- Editar precios y stock
- Ver y gestionar pedidos
- Subir imágenes

Por ahora, para probar el sistema, podés editar la base de datos SQLite directamente:

```bash
cd backend
sqlite3 puerto_mascotas.db
```

```sql
-- Activar todos los productos para pruebas
UPDATE products SET active = 1, price = 5000, stock = 10;

-- Ver categorías
SELECT * FROM categories;

-- Ver productos
SELECT * FROM products;
```

---

## Problemas Comunes

**Backend no arranca:**
- Verificá que Python 3.11+ esté instalado: `python --version`
- Verificá que el venv esté activado (debe aparecer `(venv)` en el prompt)

**Frontend no arranca:**
- Verificá que Node.js esté instalado: `node --version`
- Borrá `node_modules` y `package-lock.json`, volvé a hacer `npm install`

**Frontend no se conecta al backend:**
- Verificá que el backend esté corriendo en http://localhost:8000
- Verificá que `frontend/.env.local` tenga `NEXT_PUBLIC_API_URL=http://localhost:8000`

**CORS errors:**
- El backend ya tiene CORS configurado para localhost:3000
- Si cambiaste el puerto del frontend, actualizá `FRONTEND_URL` en `backend/.env`

---

## Variables de Entorno (crear estos archivos)

**`backend/.env`** (opcional en local, usa defaults):
```
DATABASE_URL=sqlite:///./puerto_mascotas.db
FRONTEND_URL=http://localhost:3000
ENVIRONMENT=development
```

**`frontend/.env.local`** (necesario):
```
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_WHATSAPP_NUMBER=5492614000000
```

---

## Contacto

Cualquier duda con la implementación, contactar al equipo de Soluway.
