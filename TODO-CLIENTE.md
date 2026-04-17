# TODO — Pendientes del Cliente

Este documento lista todas las tareas que el cliente (Puerto Mascotas) debe completar antes del lanzamiento.

---

## 1. Branding e Identidad Visual

### Logo
- [ ] Proveer logo oficial de Puerto Mascotas
- [ ] Formatos: PNG transparente, SVG (preferible)
- [ ] Dimensiones sugeridas: 200x200px mínimo
- **Dónde se usa:** Navbar, Footer, meta tags

### Imágenes de productos
- [ ] Fotografías de todos los productos del catálogo
- [ ] Formato: JPG o PNG
- [ ] Tamaño sugerido: 800x800px (cuadradas)
- [ ] Fondo: preferiblemente blanco o neutro
- **Cantidad estimada:** según catálogo final

### Paleta de colores (opcional)
La paleta actual es:
- Primary: `#2D7D46` (verde naturaleza)
- Secondary: `#F5A623` (naranja cálido)

Si querés cambiar los colores, avisanos antes del deploy.

---

## 2. Contenido del Catálogo

### Categorías
Las categorías actuales son:
1. Perros - Alimento
2. Perros - Premios
3. Gatos - Alimento
4. Gatos - Premios
5. Veterinaria - Consultas
6. Veterinaria - Tratamientos

- [ ] Confirmar si estas categorías son correctas
- [ ] Agregar/modificar categorías según necesidad

### Productos
Por cada producto, necesitamos:
- [ ] Nombre completo
- [ ] Descripción detallada (ingredientes, beneficios, etc.)
- [ ] Precio de venta (público)
- [ ] Costo (opcional, para el admin)
- [ ] Stock disponible
- [ ] Categoría asignada
- [ ] Imagen del producto

**Formato sugerido:** Excel o Google Sheets con estas columnas.

---

## 3. Datos de Contacto y Pago

### WhatsApp
- [ ] Número de WhatsApp para contacto con clientes
- **Formato:** 5492614XXXXXX (con código de país y área)
- **Dónde se usa:** Footer, Home, Confirmación de pedido

### Datos bancarios (para transferencias)
- [ ] CBU
- [ ] Alias
- [ ] Titular de la cuenta
- [ ] Banco
- **Dónde se usa:** Página de confirmación de pedido

### Mercado Pago
- [ ] Cuenta de Mercado Pago configurada
- [ ] Access Token (para integración futura en Fase 2)

**Nota:** En Fase 1, el link de MP se envía manualmente por WhatsApp.

---

## 4. Información Legal y Comercial

### Datos del negocio
- [ ] Nombre legal/comercial completo
- [ ] CUIT/CUIL (si aplica)
- [ ] Dirección física del negocio

### Políticas (opcional, recomendado)
- [ ] Política de devoluciones
- [ ] Términos y condiciones
- [ ] Política de privacidad

Estas políticas pueden agregarse como páginas estáticas en Fase 2.

---

## 5. Configuración de Envíos

- [ ] Zonas de entrega (barrios, ciudades)
- [ ] Costos de envío (fijo, por zona, gratis a partir de X monto)
- [ ] Tiempos de entrega estimados

**Actualmente:** El sistema dice "a coordinar" — la coordinación se hace por WhatsApp.

---

## 6. Configuración de Cuentas para Deploy

### Vercel (Frontend)
- [ ] Crear cuenta en https://vercel.com (gratis)
- [ ] Conectar con GitHub (recomendado)
- [ ] Compartir acceso con el equipo de Soluway (si es necesario)

### Render (Backend)
- [ ] Crear cuenta en https://render.com (plan gratuito disponible)
- [ ] Conectar con GitHub (recomendado)
- [ ] Compartir acceso con el equipo de Soluway (si es necesario)

---

## 7. Repositorio Git

- [ ] Crear repositorio privado en GitHub
- [ ] Agregar colaboradores (equipo Soluway)
- [ ] Proveer URL del repositorio

**Estructura sugerida:**
```
puerto-mascotas-web/
├── backend/
├── frontend/
├── README.md
└── .gitignore (ya incluido en cada carpeta)
```

---

## 8. Pruebas Antes del Lanzamiento

### Pedido de prueba
- [ ] Hacer un pedido completo de prueba
- [ ] Verificar que llegue la notificación por WhatsApp (manual en Fase 1)
- [ ] Confirmar que la info del pedido sea correcta
- [ ] Probar los 3 métodos de pago

### Navegación mobile
- [ ] Probar desde celular (mayoría de usuarios)
- [ ] Verificar que todo se vea bien
- [ ] Probar agregar al carrito, checkout completo

### Verificar info de contacto
- [ ] Número de WhatsApp funciona correctamente
- [ ] Link de WhatsApp abre la app/web
- [ ] Datos de transferencia son correctos

---

## 9. Contenido de Redes Sociales (opcional)

Si Puerto Mascotas tiene redes sociales:
- [ ] Link a Instagram
- [ ] Link a Facebook
- [ ] Link a otras redes

Estos links pueden agregarse en el Footer fácilmente.

---

## 10. Capacitación (proporcionada por Soluway)

Cuando esté listo el panel admin (Fase 2):
- [ ] Capacitación en gestión de productos
- [ ] Capacitación en gestión de pedidos
- [ ] Capacitación en configuración general

---

## Prioridad de Tareas

### Crítico (sin esto no se puede lanzar):
1. Catálogo de productos completo (nombre, precio, stock, categoría)
2. Número de WhatsApp real
3. Datos bancarios para transferencias
4. Imágenes de productos (al menos placeholders temporales)

### Importante (mejora mucho la experiencia):
5. Logo oficial
6. Configuración de zonas y costos de envío
7. Cuentas de Vercel y Render configuradas

### Puede esperar (se puede agregar después):
8. Políticas legales
9. Links a redes sociales
10. Ajustes de colores/branding

---

## Formato de Entrega

Toda esta información puede enviarse por:
- Email a: [TODO: email de Soluway]
- Google Drive (carpeta compartida)
- WhatsApp (para consultas rápidas)

**Sugerencia:** Crear un Google Sheet con el catálogo y un Google Drive con las imágenes.

---

## Contacto

Equipo Soluway — [TODO: agregar datos de contacto]
