# Minuta — Cliente — 2026-04-11

**Participantes**: Tiziano (Soluway) + Equipo Puerto Mascotas
**Proyecto / Contexto**: Puerto Mascotas — Discovery inicial
**Duracion**: N/D
**Fecha**: 2026-04-11

---

## Temas tratados

**Problema actual del negocio**
Puerto Mascotas opera sin presencia digital. Todas las ventas y consultas se atienden manualmente por WhatsApp Business (numero comun, sin API oficial) e Instagram DMs. La gestion interna de precios y ganancias se lleva en Excel con errores frecuentes. El equipo de 3 personas no da abasto con el volumen de mensajes y se pierden ventas por respuesta lenta o fuera de horario.

**Solucion propuesta**
Implementacion en fases: catalogo digital en Tienda Nube + bot de WhatsApp automatizado con pedidos conversacionales, integracion con Google Calendar para coordinar entregas, reportes automaticos y carga de catalogo via Excel. Canal principal: WhatsApp Business API oficial de Meta.

**Canales y restricciones del bot**
El bot operara exclusivamente en WhatsApp (canal principal). Instagram DMs se difiere a Fase 2 por agregar complejidad al MVP sin ser el canal principal. El bot respondera solo en espanol, con horario L-S 8-19, y coordinara entregas fuera de ese horario para el proximo espacio disponible.

**Expectativas del cliente**
Dejar de perder ventas por respuesta lenta. Que los clientes puedan ver productos, hacer pedidos y recibir confirmacion automatica 24/7. Que el admin tenga visibilidad de ganancias y pedidos sin calcular en Excel.

**Stack tecnico acordado**
Tienda Nube (catalogo), FastAPI + Python (backend), Claude API Haiku (motor del bot), SQLite (DB MVP), Railway/Render (hosting), Google Calendar API, Mercado Pago (pendiente de confirmar).

---

## Decisiones tomadas

- **Canal WhatsApp**: Meta Cloud API oficial. Se descarta Baileys/UltraMsg/librerias no oficiales. — Tiziano (Soluway)
- **Instagram**: Diferido a Fase 2. Para MVP se deja mensaje en Instagram invitando a escribir por WhatsApp. — Tiziano (Soluway)
- **E-commerce**: Tienda Nube (plan basico). Se descarta desarrollo a medida para MVP. — Tiziano (Soluway)
- **Scope MVP**: P1 completo (pedidos + calendario + reportes + parser Excel). P2 diferido. — Tiziano (Soluway)
- **Inicio del proceso de Meta BM**: El cliente debe iniciar la verificacion de Meta Business Manager de inmediato. Soluway asiste en el proceso. — Acordado en reunion.

---

## Compromisos y proximos pasos

| Tarea | Responsable | Fecha limite |
|-------|-------------|-------------|
| Iniciar proceso de verificacion de Meta Business Manager | Cliente (Puerto Mascotas) | Lo antes posible — BLOQUEANTE |
| Crear cuenta de Gmail/Google para el negocio (si no existe) | Cliente (Puerto Mascotas) | Antes del kickoff tecnico |
| Definir metodo de pago (Mercado Pago / transferencia / efectivo) | Cliente (Puerto Mascotas) | Antes de etapa de desarrollo de pagos |
| Confirmar si tienen fotos de productos en calidad suficiente | Cliente (Puerto Mascotas) | Antes de setup Tienda Nube |
| Definir zonas de entrega y logistica (propia vs tercerizada) | Cliente (Puerto Mascotas) | Antes de desarrollo del bot |
| Aprobar textos del bot (bienvenida, FAQs, politica devolucion) | Cliente con soporte Soluway | Antes de desarrollo del bot |
| Preparar plan de tareas detallado con horas | Tiziano / PM Soluway | 2026-04-11 |
| Agendar kickoff formal con cliente | Tiziano | Esta semana |

---

## Puntos abiertos

- Metodo de pago: el cliente no definio aun si quiere Mercado Pago, transferencia o efectivo.
- Modulo de proveedores: se menciono como posibilidad pero no esta claro si va en MVP o Fase 2.
- Fotos de productos: no se confirmo si el cliente tiene material fotografico de calidad.
- Logistica de entrega: no se aclaró si las entregas son propias o tercerizadas, ni las zonas cubiertas.
- Presupuesto: el cliente quiere ver el MVP antes de definir precio. Tiziano decide si aplica tarifa preferencial (contacto cercano).

**Proxima reunion tentativa**: Kickoff formal — a coordinar por Tiziano con el cliente

---

*Clasificacion: INTERNO SOLUWAY — No compartir con cliente*
*Generada por Agente PM — 2026-04-11*
