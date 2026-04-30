# PROPUESTA COMERCIAL — PUERTO MASCOTAS

**Mendoza, Argentina**
**Fecha:** 11 de abril de 2026
**Preparado para:** Puerto Mascotas
**Preparado por:** Soluway

---

## 1. EL PROBLEMA QUE RESOLVEMOS

Puerto Mascotas está arrancando con una combinación de negocio que hoy es difícil de manejar sin presencia digital: venta de alimentos balanceados + veterinaria a domicilio. El cliente necesita:

- **Ver productos disponibles** sin estar llamando por teléfono o yendo a la tienda
- **Agendar turnos de veterinaria** sin que se superpongan ni se pierdan en mensajes
- **Hacer pedidos desde WhatsApp** (donde ya hablan con ustedes) sin fricciones
- **Procesar pagos online** de forma segura
- **Actualizar catálogo fácilmente** sin depender de un programador

Hoy, sin sistema, cada pedido es manual, cada turno se anota a mano, y escalar significa más tiempo de ustedes haciendo tareas operativas en vez de hacer crecer el negocio.

---

## 2. LA SOLUCIÓN

Un sistema integrado donde **el cliente hace todo desde WhatsApp**, conversando con un asistente inteligente que:

- Muestra el catálogo de productos de la tienda online
- Recibe pedidos conversacionales y genera el checkout
- Agenda turnos de veterinaria verificando disponibilidad en tiempo real
- Confirma pagos automáticamente
- Envía reportes diarios al equipo (pedidos, turnos, stock bajo)

**Para el equipo de Puerto Mascotas:**

- Un panel web donde suben el catálogo desde un Excel
- Tienda online profesional (Tienda Nube) visible en Google
- Gestión del calendario desde Google Calendar (herramienta que ya conocen)
- Reportes automáticos de lo que pasó en el día

**Tecnología base:**
- Tienda online: Tienda Nube (plataforma argentina, fácil de usar)
- Bot de WhatsApp: Oficial de Meta (no es número personal)
- Asistente conversacional: Inteligencia artificial de Claude (Anthropic)
- Pagos: Mercado Pago
- Calendario: Google Calendar

---

## 3. IMPACTO ESPERADO

| Antes | Después |
|-------|---------|
| Cliente llama/escribe → alguien atiende → busca info → responde | Cliente pregunta por WhatsApp → bot responde instantáneamente |
| Cada pedido se toma a mano, se confirma pago, se coordina entrega | Pedido automatizado, pago confirmado por sistema, reporte automático |
| Turnos en cuaderno o notas → riesgo de superposición | Agenda en tiempo real, sin turnos duplicados |
| Actualizar precios = modificar cada publicación a mano | Actualizar Excel → subir → listo |
| Sin visibilidad online | Tienda profesional indexada en Google |

**Métricas medibles:**
- Tiempo de respuesta a consultas: de minutos/horas → segundos
- Errores en agendamiento de turnos: ~80% de reducción
- Tiempo de actualización de catálogo: de horas → 10 minutos
- Disponibilidad del canal: 24/7 sin intervención humana para consultas frecuentes

---

## 4. ALCANCE DEL PROYECTO

### ✓ INCLUYE (Opción MVP Completo):

**Sistema conversacional en WhatsApp:**
- Consultas sobre productos, precios, disponibilidad
- Pedidos conversacionales (cliente describe qué necesita, bot arma el pedido)
- Link directo al catálogo completo en Tienda Nube
- Agendamiento de turnos de veterinaria con verificación de disponibilidad
- Confirmación de pagos vía Mercado Pago
- Flujos con restricciones (horarios, días no laborables, cupos)

**Tienda online (Tienda Nube):**
- Configuración completa de la tienda
- Carga del catálogo inicial
- Branding básico (logo, colores)
- Integración con Mercado Pago

**Panel administrativo web:**
- Carga de catálogo vía Excel (parseo + validación + sincronización con Tienda Nube)
- Reporte de pedidos del día/semana/mes
- Reporte de turnos programados
- Configuración de horarios de atención y restricciones

**Integración con Google Calendar:**
- Turnos agendados desde WhatsApp se guardan automáticamente
- Verificación de disponibilidad en tiempo real
- Notificaciones por email al equipo

**Reportes automáticos:**
- Resumen diario enviado por WhatsApp al equipo (pedidos, turnos, alertas)
- Alertas de stock bajo (configurable)

**Hosting e infraestructura:**
- Deploy completo en plataforma cloud (Railway/Render)
- Configuración de APIs (Meta WhatsApp, Claude, Google Calendar)
- Backup diario de base de datos

**Capacitación:**
- Documentación paso a paso de cómo operar el sistema
- Sesión de capacitación en vivo (2 horas)
- Soporte post-capacitación (primeras 2 semanas)

---

### ✗ NO INCLUYE EN ESTA ETAPA:

- Integración con Instagram (se puede agregar en Fase 2)
- Módulo de gestión de proveedores o compras
- App móvil nativa (todo funciona vía web y WhatsApp)
- Diseño gráfico avanzado de la tienda (más allá del branding básico)
- Campañas publicitarias o marketing digital
- Migración de datos de sistemas previos (asumimos catálogo nuevo)
- Integraciones con otros sistemas contables o ERPs

---

### ✓ INCLUYE (Opción P0 — Mínimo Viable):

Si el presupuesto es ajustado, ofrecemos una primera etapa reducida:

- Tienda online (Tienda Nube) configurada con catálogo
- Bot de WhatsApp básico:
  - Responde consultas frecuentes
  - Envía link al catálogo
  - Recibe pedidos y los reenvía al equipo (sin procesamiento automático)
- Sin agendamiento automático de turnos (se coordina manualmente)
- Sin panel admin web (catálogo se actualiza directo en Tienda Nube)
- Sin reportes automáticos

**Esta opción permite arrancar rápido y validar el modelo sin inversión inicial. Luego se puede escalar al MVP completo.**

---

## 5. ETAPAS Y PLAZOS

| Etapa | Entregable | Plazo estimado |
|-------|------------|----------------|
| **1. Discovery** | Accesos configurados (Meta Business, Tienda Nube, Google Calendar, APIs) | 1 semana |
| **2. Tienda online** | Tienda Nube en vivo con catálogo inicial | 1 semana |
| **3. Bot WhatsApp core** | Bot funcionando con consultas y pedidos básicos | 2 semanas |
| **4. Integraciones** | Google Calendar + Mercado Pago + Tienda Nube API | 2 semanas |
| **5. Panel admin + Reportes** | Panel web operativo + reportes automáticos | 1.5 semanas |
| **6. Testing y ajustes** | Sistema probado end-to-end con casos reales | 1.5 semanas |
| **7. Capacitación** | Equipo capacitado + documentación entregada | 1 semana |

**Plazo total estimado:** 10-12 semanas desde firma de acuerdo hasta entrega final.

**Nota:** Los plazos dependen de la velocidad de respuesta para accesos y validaciones. Trabajamos en sprints iterativos, con demos semanales para validar avance.

---

## 6. INVERSIÓN

### Opción MVP Completo (recomendada):

**Inversión total de desarrollo:** USD 4,023 + IVA

**Condiciones de pago:**
- 40% al inicio (firma de acuerdo y comienzo de desarrollo)
- 30% a mitad de proyecto (entrega de Etapa 3 — Bot WhatsApp core)
- 30% contra entrega final y capacitación

**Medios de pago aceptados:** Mercado Pago · Transferencia bancaria · Efectivo

**Costos operativos mensuales estimados (a cargo del cliente):**

| Concepto | Costo mensual |
|----------|---------------|
| Hosting (Railway/Render) | USD 0-7 |
| Inteligencia artificial (Claude API, volumen bajo) | USD 5-15 |
| Tienda Nube (plan básico) | ARS 0-15.000 (~USD 10-15 aprox) |
| WhatsApp Cloud API (< 1000 conversaciones/mes) | USD 0 |
| Google Calendar API | USD 0 |
| Mercado Pago (comisión por transacción) | ~4-5% por venta |

**Total estimado mensual:** USD 15-37 + comisiones por venta

**Nota:** Los costos operativos pueden ser menores en el arranque (varios servicios tienen planes gratuitos hasta cierto volumen). A medida que crezca el negocio, algunos servicios escalarán.

---

### Opción P0 — Mínimo Viable:

**Inversión total de desarrollo:** Sin costo adicional (incluida como punto de partida del proyecto)

**Plazo estimado:** 5-6 semanas

---

## 7. SOPORTE POST-ENTREGA

**Incluido en el proyecto:**
- 2 semanas de soporte post-entrega sin cargo (ajustes menores, dudas del equipo)
- Garantía de 30 días contra errores de funcionamiento del sistema

**Soporte mensual opcional (post-garantía):**
- Plan Básico: USD 150/mes — 4 horas de soporte mensual, respuesta en < 48hs
- Plan Estándar: USD 300/mes — 8 horas de soporte mensual, respuesta en < 24hs, ajustes y mejoras menores incluidas

No es obligatorio contratar soporte mensual. Se puede contratar por demanda (tarifa hora en ese caso: USD 50/h).

---

## 8. PRÓXIMOS PASOS

Para avanzar:

1. **Confirmación de alcance:** ¿MVP Completo o P0?
2. **Firma de acuerdo:** Enviamos contrato formal con términos y condiciones
3. **Pago inicial:** Transferencia o Mercado Pago
4. **Kick-off:** Reunión de inicio (1 hora) para coordinar accesos y prioridades
5. **Arranque:** Comenzamos desarrollo con demos semanales

**Validez de esta propuesta:** 15 días corridos desde la fecha.

---

## Sobre Soluway

Soluway construye software a medida para PyMEs que quieren escalar sin explotar operativamente. Nos especializamos en automatización conversacional, integraciones con sistemas existentes y desarrollo ágil con entregas iterativas.

**Contacto:**
Tiziano — soluway.group@gmail.com
Web: soluway.com.ar

---

**¿Preguntas?** Estamos disponibles para una reunión sin compromiso donde podamos charlar el proyecto en detalle.
