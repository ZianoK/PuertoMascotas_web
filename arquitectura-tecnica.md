# Documento de Arquitectura Tecnica
## Puerto Mascotas — MVP

---

## 1. Resumen Ejecutivo

| Campo | Detalle |
|-------|---------|
| **Proyecto** | Puerto Mascotas — MVP Digital |
| **Cliente** | Puerto Mascotas (Mendoza, Argentina) |
| **Fecha** | 2026-04-11 |
| **Tipo de solucion** | Catalogo digital con bot de WhatsApp, carrito de compra y reportes automaticos |
| **Resultado esperado** | El cliente deja de perder ventas por respuesta lenta y falta de catalogo. Los clientes pueden ver productos, hacer pedidos y recibir confirmacion automatica 24/7. El admin tiene visibilidad de ganancias y pedidos sin hacer calculos manuales en Excel. |

---

## 2. Contexto Tecnico del Cliente

### Situacion actual
- **Sin presencia digital**: no tiene web, ni catalogo, ni sistema de gestion
- **Comunicacion**: WhatsApp Business (numero comun, SIN API oficial de Meta) + Instagram DMs, todo manual
- **Gestion interna**: Excel para calculos de ganancias (con errores)
- **Equipo**: 3 personas, 2 admins para el sistema
- **APIs disponibles**: ninguna configurada
- **Sistemas instalados**: ninguno
- **Integraciones existentes**: ninguna

### Restricciones
- Presupuesto no definido — el cliente quiere MVP primero
- Sin urgencia de entrega
- Bot solo en espanol, con nombre "Puerto Mascotas"
- Horario de atencion: Lunes a Sabado, 8:00 a 19:00
- Fuera de horario: el bot coordina entrega para proximo espacio libre
- Sin datos sensibles compartidos por el bot

---

## 3. Arquitectura de la Solucion

### 3.1 Clasificacion del proyecto

**Combinacion de varios**: Catalogo web + Bot conversacional + Integracion de sistemas + Procesamiento documental (Excel)

### 3.2 Decisiones de tecnologia

#### A. Canal de WhatsApp — DECISION CRITICA

**Problema**: El cliente tiene un numero comun de WhatsApp Business. No tiene acceso a la API oficial de Meta (Cloud API / Business API), que requiere verificacion de empresa y numero dedicado.

**Alternativas evaluadas**:

| Opcion | Pros | Contras | Costo aprox. |
|--------|------|---------|-------------|
| **Twilio WhatsApp API** | Confiable, soporte, legal, buena documentacion | Requiere migrar numero o usar uno nuevo de Twilio. Costo por mensaje (~USD 0.005-0.05/msg segun tipo) | USD 15-30/mes base + mensajes |
| **Meta Cloud API (directo)** | Gratis hasta cierto volumen, oficial | Requiere Business Manager verificado, proceso lento (2-4 semanas) | Gratis / bajo costo |
| **Baileys / WPPConnect (no oficial)** | Usa el numero actual, gratis | ILEGAL segun TOS de Meta. Baneos frecuentes. Sin soporte. Inestable. | Gratis pero riesgoso |
| **UltraMsg** | Facil de integrar, bajo costo | Wrapper no oficial, mismos riesgos de baneo que Baileys | USD 13/mes |

**RECOMENDACION: Meta Cloud API (directo) via numero nuevo o migrado.**

**Justificacion**:
1. Es la unica opcion 100% legal y estable a largo plazo
2. Es gratis para volumenes bajos (1.000 conversaciones/mes gratis en Argentina)
3. Para un emprendimiento nuevo el volumen es bajo — el costo va a ser minimo o cero
4. El proceso de verificacion toma tiempo pero NO hay urgencia de entrega
5. Baileys/UltraMsg son opciones tentadoras por la facilidad, pero un baneo de numero para un emprendimiento que vive de WhatsApp seria catastrofico

**Alternativa de contingencia**: Si Meta rechaza la verificacion o el proceso se demora demasiado, Twilio como plan B (mas caro pero igualmente oficial y estable).

**Accion requerida**: El cliente necesita crear una cuenta de Meta Business Manager y verificar su negocio. Soluway lo asiste en el proceso.

#### B. Instagram DMs

**DECISION: Diferir a Fase 2.**

**Justificacion**: La integracion con Instagram Messaging API requiere el mismo Business Manager de Meta verificado, pero agrega complejidad al MVP sin ser el canal principal del cliente. Una vez que Meta Business Manager este verificado para WhatsApp, agregar Instagram es incremental (3-5 horas adicionales). Para MVP, se deja un mensaje en Instagram del tipo "Escribinos por WhatsApp para hacer tu pedido" con link directo.

#### C. Catalogo digital y carrito

**Alternativas evaluadas**:

| Opcion | Pros | Contras |
|--------|------|---------|
| **Tienda Nube** | Armada, soporte, pagos integrados, popular en Argentina | Costo mensual, menos control, dependencia |
| **WooCommerce (WordPress)** | Flexible, plugins | Requiere hosting, mantenimiento, mas complejo para MVP |
| **Web a medida (Next.js/Astro + API)** | Control total | Mas horas de desarrollo, mas mantenimiento |
| **Web estatica + Listado dinamico** | Rapido de construir, bajo costo | Menos features de e-commerce |

**RECOMENDACION: Tienda Nube (plan basico).**

**Justificacion**:
1. Es la plataforma de e-commerce mas usada en Argentina — los clientes ya la conocen
2. Plan gratuito o de muy bajo costo para empezar
3. Integracion nativa con Mercado Pago
4. Catalogo visual listo para usar con fotos de productos
5. El admin puede gestionar productos desde el panel sin conocimiento tecnico
6. Tiene API REST para integrar con el bot y con la carga automatica desde Excel
7. NO tiene sentido construir un carrito a medida cuando Tienda Nube lo resuelve en horas, no en semanas

**Alternativa descartada — web a medida**: Sobrediseno. Para un emprendimiento nuevo sin volumen estimado, Tienda Nube es la opcion correcta. Si en el futuro necesitan algo custom, se migra.

#### D. Bot conversacional

**Stack**:
- **Modelo de IA**: Claude API (Haiku para mantener costos bajos, Sonnet si se necesita mas calidad)
- **Backend del bot**: Python + FastAPI
- **Webhook**: Recibe mensajes de WhatsApp Cloud API, procesa con Claude, responde
- **Base de datos**: SQLite para MVP (migracion a PostgreSQL si escala)
- **Hosting**: Railway o Render (bajo costo, deploy facil, buen tier gratuito)

**Justificacion**:
- Claude API como modelo base es estandar de Soluway
- FastAPI es liviano y el equipo lo domina
- SQLite es suficiente para MVP con 2 admins y volumen bajo
- Railway/Render eliminan la complejidad de infraestructura para MVP

#### E. Carga de catalogo via Excel

**Flujo**:
1. Admin sube Excel por panel web simple (formulario de upload) o envia por WhatsApp al bot admin
2. Backend parsea el Excel con `openpyxl` (Python)
3. Valida datos (nombre, precio, stock, categoria)
4. Actualiza productos en Tienda Nube via su API REST
5. Confirma al admin que productos fueron actualizados (con detalle de errores si los hay)

**Justificacion**: openpyxl es la libreria estandar de Python para Excel, liviana y confiable. La API de Tienda Nube permite CRUD de productos.

#### F. Google Calendar

**Integracion**: Google Calendar API via service account
- Cuando se confirma un pedido, se crea un evento en el calendario del negocio con: nombre del cliente, productos, direccion de entrega, horario coordinado
- El bot consulta disponibilidad del calendario antes de proponer horarios de entrega

#### G. Reportes

**Datos a capturar**:
- Cada pedido: productos, cantidades, precios, fecha, cliente, estado
- Costo de productos (margen de ganancia)
- Canal de origen (WhatsApp)

**Presentacion**:
- Dashboard simple en el panel admin (web)
- Reporte diario/semanal automatico enviado por WhatsApp al admin
- Metricas: ventas totales, ganancia neta, productos mas vendidos, pedidos por dia

**Stack**: Los datos se almacenan en la DB del backend. El reporte se genera con Python y se envia como mensaje formateado o PDF simple.

#### H. Pagos (pendiente de confirmar con cliente)

**Recomendacion para Argentina**: Mercado Pago.
- Es el medio de pago mas usado en Argentina
- Integracion nativa con Tienda Nube
- Para pedidos via WhatsApp: se genera un link de pago de Mercado Pago y se envia al cliente
- Alternativa: transferencia bancaria con confirmacion manual (para MVP minimo)

---

### 3.3 Diagrama de arquitectura

```
                    +------------------+
                    |   CLIENTE FINAL  |
                    +--------+---------+
                             |
              +--------------+--------------+
              |                             |
              v                             v
    +-------------------+        +-------------------+
    |    WhatsApp        |        |   Tienda Nube     |
    |  (Cloud API Meta)  |        |   (Catalogo/Web)  |
    +--------+----------+        +--------+----------+
             |                            |
             v                            v
    +-------------------+        +-------------------+
    |   Webhook          |        |   Mercado Pago    |
    |   (FastAPI)        |        |   (Pagos)         |
    +--------+----------+        +-------------------+
             |
             v
    +-------------------+
    |   BOT ENGINE       |
    |   - Claude API     |
    |   - Logica negocio |
    |   - Estado pedido  |
    +--------+----------+
             |
     +-------+-------+-------+
     |       |       |       |
     v       v       v       v
  +------+ +------+ +------+ +------+
  | DB   | | GCal | | TN   | | Excel|
  |SQLite| | API  | | API  | |Parser|
  +------+ +------+ +------+ +------+
             |         |
             v         v
    +-------------+ +-----------+
    | Google      | | Tienda    |
    | Calendar    | | Nube      |
    +-------------+ +-----------+

    +-------------------+
    |   ADMIN            |
    |   - Panel web      |
    |   - Upload Excel   |
    |   - Reportes       |
    |   - Config bot     |
    +-------------------+
```

### 3.4 Flujos principales

#### Flujo 1: Pedido completo via WhatsApp

```
1. Cliente escribe al WhatsApp de Puerto Mascotas
2. Webhook recibe el mensaje -> FastAPI
3. Bot Engine procesa con Claude API:
   a. Si es saludo/consulta general -> responde con info del negocio
   b. Si pide ver productos -> envia link al catalogo (Tienda Nube)
   c. Si quiere hacer pedido -> guia el proceso conversacional:
      - Pregunta productos y cantidades
      - Confirma disponibilidad (consulta Tienda Nube API)
      - Pregunta direccion de entrega
      - Consulta Google Calendar para horarios disponibles
      - Propone horarios
      - Cliente elige horario
   d. Bot genera resumen del pedido
   e. Si hay integracion de pago: envia link de Mercado Pago
   f. Si es transferencia: indica datos y espera confirmacion admin
4. Al confirmar pago/pedido:
   a. Se crea evento en Google Calendar
   b. Se registra pedido en DB
   c. Se notifica al admin por WhatsApp
   d. Se envia confirmacion al cliente con detalle
5. Fuera de horario (fuera de L-S 8-19):
   a. Bot informa que esta fuera de horario
   b. Toma el pedido igual
   c. Coordina entrega para proximo espacio libre
```

#### Flujo 2: Carga de catalogo via Excel

```
1. Admin accede al panel web o envia Excel al bot (canal admin)
2. Sistema recibe archivo Excel
3. Parsea con openpyxl:
   - Columnas esperadas: nombre, descripcion, precio, stock, categoria, imagen (URL)
4. Valida cada fila:
   - Precio > 0, nombre no vacio, categoria valida
5. Por cada producto valido:
   - Si existe en Tienda Nube (match por nombre/SKU) -> actualiza
   - Si no existe -> crea nuevo
6. Genera reporte de resultado:
   - X productos actualizados
   - Y productos creados
   - Z errores (con detalle)
7. Envia reporte al admin
```

#### Flujo 3: Reporte automatico

```
1. Cron job (diario a las 20:00, semanal lunes 8:00)
2. Consulta DB: pedidos del periodo
3. Calcula:
   - Total vendido ($)
   - Ganancia neta (si hay costos cargados)
   - Cantidad de pedidos
   - Productos mas vendidos (top 5)
   - Ticket promedio
4. Formatea mensaje legible
5. Envia por WhatsApp al admin
```

---

## 4. Estimacion de Tiempo

### Etapas y horas

| # | Etapa | Detalle | Horas Optimista | Horas Realista | Responsable |
|---|-------|---------|:-:|:-:|-------------|
| 1 | **Discovery y accesos** | Crear Meta Business Manager, verificar negocio, configurar WhatsApp Cloud API, crear cuenta Tienda Nube, Google Calendar API, API keys | 4 | 8 | PM + Dev |
| 2 | **Setup Tienda Nube** | Configurar tienda, subir productos iniciales, personalizar con branding, configurar Mercado Pago | 4 | 6 | Dev |
| 3 | **Backend base** | FastAPI + estructura del proyecto + DB + deploy en Railway/Render | 6 | 8 | Dev |
| 4 | **Bot WhatsApp** | Webhook + integracion Claude API + flujo conversacional + logica de negocio + manejo de estados + restricciones (horario, contexto, idioma) | 16 | 22 | Dev |
| 5 | **Integracion Google Calendar** | Auth + crear eventos + consultar disponibilidad | 4 | 6 | Dev |
| 6 | **Integracion Tienda Nube API** | Consultar productos + stock + crear pedidos | 6 | 8 | Dev |
| 7 | **Parser Excel** | Upload + parseo + validacion + sync con Tienda Nube | 6 | 8 | Dev |
| 8 | **Panel admin web** | UI basica: upload Excel, ver reportes, config basica | 8 | 12 | Dev |
| 9 | **Reportes automaticos** | Logica de reportes + cron + envio por WhatsApp | 4 | 6 | Dev |
| 10 | **Integracion pagos (link MP)** | Generar link de pago desde bot + webhook de confirmacion | 4 | 6 | Dev |
| 11 | **Testing y ajustes** | Testing end-to-end, ajustes de flujo, correccion de bugs | 8 | 12 | Dev |
| 12 | **Documentacion y capacitacion** | Manual de uso para admin, capacitacion al equipo del cliente | 4 | 6 | PM + Dev |
| | | | | | |
| | **SUBTOTAL** | | **74** | **108** | |
| | **Buffer 15%** | | — | **16** | |
| | **TOTAL** | | **74** | **124** | |

### Costos recurrentes estimados (mensuales)

| Servicio | Costo estimado |
|----------|---------------|
| Railway/Render (hosting backend) | USD 0-7/mes |
| Claude API (Haiku, volumen bajo) | USD 5-15/mes |
| Tienda Nube (plan basico) | ARS 0-15.000/mes (plan inicial gratis o promo) |
| WhatsApp Cloud API (< 1000 conv) | USD 0/mes |
| Google Calendar API | USD 0/mes |
| Mercado Pago | Comision por transaccion (~4-5%) |
| **Total estimado** | **USD 5-22/mes + comisiones MP** |

---

## 5. Lista de Riesgos

| # | Riesgo | Probabilidad | Impacto | Plan de Contingencia |
|---|--------|:--:|:--:|----------------------|
| 1 | **Verificacion de Meta Business Manager rechazada o demorada** | Media | Alto — sin esto no hay bot de WhatsApp | Iniciar el proceso PRIMERO. Si se demora > 3 semanas, usar Twilio como puente temporal. Costo adicional estimado: USD 15-30/mes. |
| 2 | **API de Tienda Nube con limitaciones no documentadas** | Baja | Medio | Validar endpoints necesarios en Discovery (etapa 1) antes de comprometer la arquitectura. Si la API no soporta algo critico, evaluar alternativas (WooCommerce). |
| 3 | **Cliente no puede proveer datos de productos en formato Excel correcto** | Media | Bajo | Proveer template Excel con validaciones + instructivo. El parser debe ser tolerante a errores y reportar problemas claros. |
| 4 | **Costos de Claude API mayores a lo esperado por volumen inesperado** | Baja | Medio | Monitorear uso desde el dia 1. Si escala, migrar a Haiku (mas barato) o implementar cache de respuestas frecuentes para reducir llamadas a la API. |
| 5 | **Baneo de numero de WhatsApp por mal uso de API** | Muy baja (si se usa API oficial) | Critico | Usar SOLO la API oficial de Meta. NUNCA librerias no oficiales. Respetar politicas de messaging (no spam, templates aprobados). |
| 6 | **El cliente abandona el proceso de verificacion de Meta** | Media | Alto | Explicar claramente en el kickoff que SIN la verificacion no hay bot. Soluway puede asistir en el proceso pero el cliente debe proveer documentacion del negocio. |
| 7 | **Cambios de precio/producto frecuentes saturan la API de Tienda Nube** | Baja | Bajo | Rate limiting en el parser. Batch updates en lugar de uno por uno. |

---

## 6. Requerimientos del Cliente

| # | Requerimiento | Para que etapa | Que pasa si no esta disponible |
|---|---------------|:-:|-------------------------------|
| 1 | **Crear cuenta de Meta Business Manager** y verificar el negocio (CUIT, datos fiscales) | Etapa 1 — Discovery | BLOQUEANTE. Sin esto no se puede configurar WhatsApp Cloud API. Todo el bot queda en stand-by. |
| 2 | **Numero de telefono** dedicado para WhatsApp Business API (puede ser el actual si se migra, o uno nuevo) | Etapa 1 — Discovery | BLOQUEANTE. Se necesita un numero para registrar en la API. |
| 3 | **Lista de productos** con nombre, descripcion, precio de venta, costo, categoria y fotos | Etapa 2 — Setup Tienda Nube | Se puede avanzar con datos de ejemplo, pero la tienda no se puede publicar sin productos reales. |
| 4 | **Logo y branding** (colores, logo en alta, nombre como quiere que aparezca) | Etapa 2 — Setup Tienda Nube | Se usa placeholder. No es bloqueante pero atrasa el lanzamiento. |
| 5 | **Cuenta de Google** (Gmail) para el negocio | Etapa 5 — Google Calendar | BLOQUEANTE para la integracion de calendario. |
| 6 | **Definicion de zonas de entrega** y horarios disponibles por zona | Etapa 4 — Bot | El bot no puede coordinar entregas sin saber donde y cuando entregan. |
| 7 | **Definicion de metodo de pago** (Mercado Pago, transferencia, efectivo, combinacion) | Etapa 10 — Pagos | Se puede hacer MVP sin pagos online (solo transferencia/efectivo), pero limita la experiencia. |
| 8 | **Template Excel de productos** aprobado (Soluway lo provee, el cliente lo valida) | Etapa 7 — Parser Excel | Soluway arma el template y el cliente valida que puede completarlo. |
| 9 | **Textos del bot**: mensaje de bienvenida, respuestas a preguntas frecuentes, politica de devolucion, info del negocio | Etapa 4 — Bot | Se pueden redactar desde Soluway con aprobacion del cliente, pero atrasa el desarrollo. |
| 10 | **Acceso a cuenta de Tienda Nube** (Soluway la crea o el cliente provee si ya tiene) | Etapa 2 — Setup | Se crea en Discovery. No es bloqueante si Soluway la gestiona. |

---

## 7. Ambiguedades Residuales (No Bloqueantes para Diseno)

Estas preguntas NO bloquean el diseno pero deben resolverse antes de la etapa indicada:

1. **Pagos**: El cliente aun no definio si quiere pago online (Mercado Pago) o solo transferencia/efectivo. **Impacto**: Cambia la complejidad de la etapa 10 (4-6 hs con MP link vs 1 hora sin pago online). **Accion**: Confirmar en kickoff.

2. **Modulo de proveedores**: El brief menciona un posible modulo futuro. **Impacto**: No afecta MVP. Se deja la DB preparada para extender. **Accion**: Diferir a Fase 2.

3. **Fotos de productos**: No esta claro si el cliente tiene fotos de calidad de sus productos. **Impacto**: El catalogo sin fotos no vende. **Accion**: Preguntar en kickoff. Si no tiene, considerar sesion de fotos basica.

4. **Envio/delivery propio o tercerizado**: No se menciona como hacen las entregas. **Impacto**: Afecta la logica de coordinacion del calendario. **Accion**: Confirmar en kickoff.

---

## 8. Recomendaciones para Tiziano

### Decisiones que necesitan validacion:

1. **Tienda Nube vs desarrollo a medida**: Recomiendo fuertemente Tienda Nube para MVP. Es la diferencia entre 4-6 horas de setup vs 40+ horas de desarrollo de un e-commerce. Si Tiziano tiene una preferencia diferente, necesito saberlo antes de arrancar.

2. **Meta Cloud API vs alternativas no oficiales**: El proceso de verificacion de Meta puede tomar 2-4 semanas. Eso es timeline, no esfuerzo de desarrollo. Si hay presion para entregar rapido, la alternativa es Twilio (mas caro) o Baileys (riesgoso). Recomiendo esperar la verificacion.

3. **Scope del MVP**: El brief pide bastante para un MVP. Si hay que recortar, el orden de prioridad seria:
   - **P0 (minimo viable)**: Tienda Nube + Bot WhatsApp basico (consultas + link al catalogo)
   - **P1 (MVP completo)**: + Pedidos conversacionales + Google Calendar + Reportes
   - **P2 (Fase 2)**: + Instagram + Parser Excel avanzado + Panel admin custom + Modulo proveedores

### Precio estimado para presupuestador:
- **Horas para presupuesto**: 124 horas (realista + buffer)
- **Costos de infraestructura primer ano**: ~USD 60-260 (depende del volumen)
- **Nota**: El cliente es contacto cercano y emprendimiento nuevo. Tiziano decide si se aplica tarifa preferencial.

---

*Documento generado por Agente Arquitecto — Soluway*
*Fecha: 2026-04-11*
*Version: 1.0*
*Clasificacion: INTERNO SOLUWAY — No compartir con cliente*
