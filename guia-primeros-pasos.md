# Guía de Primeros Pasos — Puerto Mascotas
**Preparada por Soluway**
**Fecha: 11 de abril de 2026**

---

Esta guía te explica todo lo que necesitás hacer de tu lado para que podamos arrancar el proyecto. Muchas de estas cosas tienen que hacerlas antes de que empecemos a programar — y algunas tardan días o semanas en activarse, así que cuanto antes las hagas, mejor.

---

## PASO 1 — Crear cuenta de Meta Business Manager
**⚠️ PRIORITARIO — hacé esto hoy. Puede tardar hasta 4 semanas en verificarse.**

Meta Business Manager es la plataforma de Meta (Facebook/Instagram/WhatsApp) desde donde se gestiona el WhatsApp Business API oficial. Sin esto no podemos activar el bot de WhatsApp.

### ¿Qué necesitás?

- Una cuenta de Facebook (personal, la que ya tenés sirve)
- El CUIT del negocio
- Un número de teléfono para el WhatsApp del negocio (puede ser el actual o uno nuevo)
- Dirección del negocio
- Sitio web del negocio (puede ser el link de Instagram o Tienda Nube — te lo damos nosotros)

### Paso a paso:

1. Entrá a **business.facebook.com**
2. Hacé clic en **"Crear cuenta"**
3. Completá el nombre del negocio: `Puerto Mascotas`
4. Ingresá tu nombre y email de trabajo
5. Seguí los pasos hasta que te pida verificar el negocio
6. En la sección **"Verificación del negocio"**:
   - Elegí **Argentina** como país
   - Ingresá el CUIT
   - Subí el documento que te pida (puede ser factura de servicios, constancia de AFIP, o estatuto)
7. Enviá la verificación y esperá la confirmación de Meta (puede tardar de 2 a 10 días hábiles)

**Avisanos cuando tengas el Business Manager creado** — nosotros te guiamos desde ahí para agregar el número de WhatsApp.

---

## PASO 2 — Crear o confirmar cuenta de Gmail para el negocio
**Tiempo estimado: 10 minutos**

Necesitamos una cuenta de Google para conectar el Google Calendar donde van a quedar registradas las entregas y turnos.

### Si ya tenés una cuenta de Gmail del negocio:
Avisanos cuál es.

### Si no tenés:
1. Entrá a **accounts.google.com/signup**
2. Creá una cuenta con el nombre del negocio. Por ejemplo: `puertomascotasmza@gmail.com`
3. Anotá el email y la contraseña en un lugar seguro
4. Avisanos cuál quedó

**Importante:** Esta misma cuenta la podés usar para Google Calendar, donde vas a ver todas tus entregas agendadas.

---

## PASO 3 — Preparar el catálogo de productos en Excel
**Tiempo estimado: variable según cuántos productos tengas**

Para cargar los productos en la tienda online, necesitamos que los pases a un Excel con este formato exacto:

| Columna | Qué poner | Obligatorio |
|---------|-----------|:-----------:|
| `nombre` | Nombre del producto | Sí |
| `descripcion` | Descripción breve (1-2 líneas) | No |
| `precio_venta` | Precio en pesos (solo números, sin $) | Sí |
| `costo` | Cuánto te cuesta a vos (para calcular ganancia) | No, pero recomendado |
| `stock` | Cuántas unidades tenés | Sí |
| `categoria` | Categoría (ej: Perros, Gatos, Veterinaria) | Sí |
| `imagen` | URL de la foto del producto (si tenés) | No |

**Te mandamos un template de Excel ya armado** — solo tenés que rellenarlo con tus productos.

### Sobre las fotos:
Las fotos son MUY importantes para que los clientes compren. Si tenés fotos de tus productos en el celular, mandánoslas por WhatsApp. Si no tenés, podemos arrancar sin fotos y las agregamos después.

---

## PASO 4 — Definir cómo van a hacer las entregas
**Tiempo estimado: 5 minutos de pensar**

Para que el bot pueda coordinar automáticamente las entregas con los clientes, necesitamos saber:

1. **¿Dónde entregan?** ¿Tienen zonas específicas en Mendoza? ¿Hacen envíos a toda la ciudad?
2. **¿Con qué frecuencia salen a entregar?** ¿Todos los días? ¿Lunes, miércoles y viernes?
3. **¿Cuánto tarda una entrega desde que se pide?** ¿El mismo día? ¿Al día siguiente?
4. **¿El delivery es propio o usan un servicio de mensajería?**

Con esa información configuramos el calendario para que los clientes puedan elegir el horario de entrega directamente desde WhatsApp.

---

## PASO 5 — Definir los métodos de pago
**Tiempo estimado: 5 minutos**

Ya confirmamos que van a aceptar:
- **Mercado Pago** — los clientes pagan con tarjeta, QR o link desde WhatsApp
- **Transferencia bancaria** — CBU/alias del negocio
- **Efectivo** — se paga al recibir el pedido

Para Mercado Pago, necesitamos que tengas una **cuenta de Mercado Pago a nombre del negocio** (o a nombre tuyo si vas a manejar todo vos). Si no la tenés, es gratis crearla en mercadopago.com.ar.

**Para las transferencias**, avisanos el CBU o alias de la cuenta donde querés recibir los pagos.

---

## PASO 6 — Revisar y aprobar los textos del bot
**Tiempo estimado: 15-20 minutos cuando te lo mandemos**

Nosotros vamos a redactar los textos que el bot va a usar para hablar con los clientes:
- Mensaje de bienvenida
- Respuestas a preguntas frecuentes (horarios, formas de pago, zonas de entrega)
- Mensaje fuera de horario
- Confirmación de pedidos

Te los mandamos para que los revises y cambies lo que no te convenza. Queda a tu gusto.

---

## PASO 7 — Darnos el logo y los colores del negocio
**Tiempo estimado: el tiempo que lleve encontrar los archivos**

Para armar la tienda online necesitamos:
- **Logo** en buena calidad (PNG con fondo transparente si tenés, sino cualquier formato)
- **Colores** del negocio (si tenés un manual de marca, cualquier referencia sirve)
- **Cómo querés que aparezca el nombre**: "Puerto Mascotas" o alguna variación

Si no tenés logo todavía, avisanos — podemos usar texto simple para arrancar.

---

## Resumen: ¿qué hacer primero?

| Tarea | Urgencia | Tiempo estimado |
|-------|:--------:|-----------------|
| Crear Meta Business Manager y arrancar verificación | 🔴 HOY | 30 minutos + espera de Meta |
| Crear Gmail del negocio | 🟡 Esta semana | 10 minutos |
| Preparar catálogo en Excel | 🟡 Esta semana | Según cantidad de productos |
| Definir zonas y frecuencia de entrega | 🟡 Esta semana | 5 minutos |
| Crear cuenta Mercado Pago | 🟡 Esta semana | 15 minutos |
| Logo y colores | 🟢 Cuando puedas | Variable |

---

**¿Dudas?** Escribile a Tiziano directamente — estamos para ayudarte en cada paso.

---
*Documento preparado por Soluway — uso interno y del cliente*
