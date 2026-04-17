# DOCUMENTO INTERNO — PRESUPUESTO PUERTO MASCOTAS

**Preparado para:** Tiziano (revisión y ajuste)
**Fecha:** 11 de abril de 2026
**Proyecto:** Puerto Mascotas — Sistema conversacional WhatsApp + Tienda Online + Agendamiento

---

## 1. RESUMEN DE ESTIMACIÓN

### Desglose de horas (MVP Completo):

| Componente | Horas técnicas | Fundamento |
|------------|:--------------:|------------|
| Estimación del Arquitecto (realista) | 124h | Incluye buffer de 15% sobre 108h optimistas |
| Horas de PM (20% del técnico, proyecto > 120h) | 25h | Coordinación, demos semanales, gestión de accesos y validaciones |
| **TOTAL HORAS FACTURABLES** | **149h** | |

### Cálculo de precio base:

**Tarifa aplicada:** USD 27/hora (tarifa preferencial — contacto cercano, confirmado por Tiziano)

**Precio base:** 149h × USD 27/h = **USD 4,023**

**Precio propuesto al cliente:** USD 4,023 + IVA

---

### Desglose de horas (Opción P0 — Mínimo Viable):

| Componente | Horas técnicas |
|------------|:--------------:|
| Tienda Nube setup | 6h |
| Bot WhatsApp básico (consultas + link catálogo + recepción pedidos manual) | 18h |
| Backend mínimo (FastAPI + webhook) | 6h |
| Deploy + testing básico | 8h |
| Documentación + capacitación reducida | 3h |
| Discovery y accesos | 6h |
| **Subtotal técnico** | **47h** |
| Buffer 15% | 7h |
| **Total técnico con buffer** | **54h** |
| Horas de PM (15%, proyecto < 120h) | 8h |
| **TOTAL P0** | **62h** |

**Nota:** La estimación original de "50% del total" era aproximada. Haciendo el desglose técnico real, quedan 62h en vez de las 90h que había estimado inicialmente. Voy a ajustar el precio de P0.

**Precio P0:** Sin cargo (Tiziano confirmó que P0 va incluida gratis como punto de entrada del proyecto)

**Nota:** P0 se entrega sin costo como gesto comercial por ser contacto cercano. Permite al cliente validar el modelo antes de comprometerse con el MVP completo.

---

## 2. SUPUESTOS DEL PRESUPUESTO

### Supuestos técnicos:

1. **Catálogo inicial tiene < 200 SKUs** — Si son miles de productos, el parseo y validación del Excel requiere más tiempo.
2. **WhatsApp número nuevo o ya tienen Meta Business Manager** — Si hay que migrar número existente con historial complejo, agregar 4-6h.
3. **Google Calendar es cuenta de Google Workspace o personal sin restricciones de API** — Si tienen G Suite legacy con políticas restrictivas, puede complicarse.
4. **El equipo tiene capacidad de responder consultas técnicas en < 48hs** — Los plazos asumen respuestas ágiles para validaciones y accesos.
5. **Productos del catálogo no requieren configuradores complejos** (ej: peso/tamaño/variantes) — Si hay variantes complejas, agregar horas de lógica.
6. **Base de datos en SQLite es suficiente (volumen esperado < 10k transacciones/mes)** — Si escalan muy rápido, migrar a PostgreSQL agrega complejidad.
7. **No hay integraciones con sistemas legacy del cliente** — Asumimos que no tienen ERP/CRM previo a integrar.

### Supuestos comerciales:

1. **Cliente es contacto cercano de Tiziano** — Relación de confianza, comunicación fluida, pago sin riesgo.
2. **No hay urgencia de entrega** — Plazo de 10-12 semanas es razonable y permite trabajar sin presión.
3. **Presupuesto no definido por el cliente** — No sabemos si USD 5,215 cabe en su capacidad de inversión. Alternativa P0 es plan B.
4. **Emprendimiento nuevo sin facturación previa** — Riesgo de que el negocio no despegue o que postergen el proyecto. Mitigar con pago inicial del 40%.

---

## 3. RIESGOS COMERCIALES

| Riesgo | Probabilidad | Impacto | Mitigación propuesta |
|--------|:------------:|---------|----------------------|
| **Alcance expansivo** ("Ya que están, agreguemos...") | Alta | +15-30h | Dejar MUY claro qué NO incluye. Documento de alcance firmado. Cualquier cambio es change request. |
| **Demoras en accesos y validaciones** | Media | +2-4 semanas | Cláusula en contrato: plazos corren desde que tenemos accesos completos. Kick-off con checklist de accesos. |
| **Catálogo más complejo de lo esperado** | Media | +8-12h | En Discovery, revisar Excel real antes de confirmar precio final. Si es complejo, cobrar diferencia. |
| **Cliente no tiene capacidad de pago completa** | Media-Baja | Proyecto no arranca | Ofrecer P0 primero (USD 2,500). Validar modelo de negocio. Si funciona, escalar a MVP completo. |
| **Cambio de prioridades del cliente** | Media | Proyecto pausado | Pago inicial no reembolsable. Si se pausa > 30 días, cobrar horas trabajadas y cerrar fase. |
| **Dependencia de datos del cliente** (ej: fotos de productos) | Alta | +1-2 semanas | Definir en kick-off qué entrega el cliente y en qué formato. Plazos condicionados a entrega completa. |
| **Restricciones de Meta Business Manager** (cuenta nueva, verificación lenta) | Media | +1-2 semanas | Arrancar verificación de Meta BM en paralelo a firma del contrato. No esperar a kick-off. |

---

## 4. ANÁLISIS DE MARGEN (estimado)

### Estructura de costos de Soluway (asumo, Tiziano tiene los números reales):

- **Costo técnico por hora** (sueldo dev + cargas + overhead): ~USD 20-25/h (estimación conservadora)
- **Tarifa facturada**: USD 35/h
- **Margen bruto por hora**: USD 10-15/h

### MVP Completo (149h):

- **Ingreso:** USD 4,023
- **Costo estimado (149h × USD 22.5/h promedio):** USD 3,352
- **Margen bruto estimado:** USD 671 (~17%)

**⚠️ Margen reducido por tarifa preferencial.** El proyecto se hace por relación comercial. Si hay scope creep, el margen desaparece — mantener el alcance firmado con disciplina.

### P0 (62h):

- **Ingreso:** USD 0 (gratis, decisión de Tiziano)
- **Costo estimado (62h × USD 22.5/h):** USD 1,395
- **Margen:** Negativo. Es inversión relacional.

**Nota:** P0 se hace como gesto de entrada. El valor real viene del MVP completo y el potencial de soporte mensual posterior.

---

## 5. RECOMENDACIÓN DE TARIFA

### Tarifa aplicada: USD 27/h (preferencial — contacto cercano)

Confirmado por Tiziano. Precio final MVP: **USD 4,023**.

**⚠️ Consideraciones con esta tarifa:**
- Margen bruto: ~17%. Cualquier hora extra no cobrada impacta directamente.
- Scope creep CERO tolerancia. Cada cambio fuera del alcance firmado es change request.
- Prioridad: entregar en las horas estimadas o por debajo.

---

## 6. COSTOS OPERATIVOS DEL CLIENTE (validar con cliente)

| Servicio | Costo mensual | Comentario |
|----------|---------------|------------|
| Railway/Render | USD 0-7 | Plan hobby (gratis) puede alcanzar al inicio. Si crecen, USD 7/mes. |
| Claude API (Haiku) | USD 5-15 | Depende del volumen. 1000 conversaciones/mes ~ USD 10. |
| Tienda Nube | ARS 15.000 ~USD 15 | Plan básico. Verificar tipo de cambio al momento de contratar. |
| WhatsApp Cloud API | USD 0 | Gratis hasta 1000 conversaciones/mes. Luego escala. |
| Google Calendar API | USD 0 | Gratis sin límites para uso razonable. |
| Mercado Pago | 4-5% por venta | Comisión sobre transacciones exitosas. |

**Total estimado:** USD 15-37/mes + comisiones MP.

**Riesgo:** Si el cliente no sabe que hay costos mensuales operativos y solo piensa en el desarrollo, puede sorprenderse. Dejar MUY claro en la propuesta y en el contrato.

**Validar con el cliente en kick-off:**
- ¿Tienen cuenta de Mercado Pago? ¿Conocen las comisiones?
- ¿Tienen tarjeta de crédito para servicios cloud (Railway/Render)?
- ¿Están OK con que la facturación de algunos servicios sea en USD?

---

## 7. PENDIENTES DE CONFIRMAR ANTES DE ENVIAR PROPUESTA

### Antes de mandar la propuesta al cliente:

1. **Tiziano confirma tarifa:** ¿USD 35/h estándar o aplicamos descuento por contacto cercano?
2. **Tiziano confirma precio de P0:** ¿USD 2,500 o lo subimos a USD 2,800 por contingencia?
3. **Tiziano confirma condiciones de pago:** ¿40-30-30 o preferís otra estructura?
4. **Tiziano confirma validez de propuesta:** ¿15 días es razonable o preferís más/menos?
5. **Tiziano confirma si incluir soporte mensual en la propuesta** o lo dejamos como "opcional a conversar después".

### Antes de arrancar el proyecto (post-firma):

1. **Validar catálogo real:** Pedir Excel de muestra para confirmar que entra en las horas estimadas.
2. **Confirmar accesos:** Meta Business Manager, Tienda Nube, Google Calendar — ¿ya tienen cuentas o hay que crearlas?
3. **Confirmar volumen esperado:** ¿Cuántos pedidos/día estiman? ¿Cuántos turnos/semana? (para validar que SQLite alcanza).
4. **Confirmar equipo del cliente disponible para validaciones:** ¿Quién va a las demos semanales? ¿Quién aprueba avances?

---

## 8. COMPARACIÓN CON PROYECTOS SIMILARES (si hay historial)

**Nota para Tiziano:** No tengo historial de proyectos previos de Soluway. Si ya hicieron algo similar (bot WhatsApp + integración e-commerce + agendamiento), revisar:

- ¿Cuántas horas reales consumió?
- ¿Hubo scope creep? ¿Qué tanto?
- ¿El cliente pagó en tiempo y forma?
- ¿Los plazos se cumplieron o se estiraron?

Usar esos datos para calibrar el buffer de contingencia (si los proyectos se estiran, agregar más buffer; si Soluway es eficiente, el buffer actual está bien).

---

## 9. DECISIONES QUE TIZIANO NECESITA TOMAR

| Decisión | Opciones | Recomendación del Presupuestador |
|----------|----------|----------------------------------|
| **Tarifa por hora** | USD 35/h estándar vs USD 28-30/h preferencial | USD 35/h (margen saludable, precio justo) |
| **Precio P0** | USD 2,170 (62h reales) vs USD 2,500 vs USD 2,800 | USD 2,500 (margen de contingencia razonable) |
| **Condiciones de pago** | 40-30-30 vs 50-50 vs otra | 40-30-30 (balancea riesgo y flujo del cliente) |
| **Descuento por pago adelantado** | Ofrecer vs No ofrecer | Ofrecer 10% si paga 100% al inicio (mejora flujo Soluway) |
| **Soporte post-entrega** | Incluir en propuesta vs Conversarlo después | Incluir (transparencia total) |
| **Validez de propuesta** | 15 días vs 30 días | 15 días (protege de cambios en costos de APIs/servicios) |

---

## 10. PRÓXIMOS PASOS INTERNOS

1. **Tiziano revisa este documento** y confirma/ajusta precios, tarifa y condiciones.
2. **Presupuestador incorpora ajustes** en la propuesta comercial final.
3. **Tiziano envía propuesta al cliente** (el Presupuestador NO envía nada directamente).
4. **Si el cliente acepta:** Preparar contrato formal con alcance detallado.
5. **Si el cliente pide ajustes:** Volver a este documento, revisar qué se puede negociar sin romper el margen.

---

**Preparado por:** Agente Presupuestador de Soluway
**Revisión requerida:** Tiziano (Fundador)
**Estado:** Borrador para revisión interna — NO ENVIAR AL CLIENTE
