# Plan de Tareas — Puerto Mascotas
**Version**: 1.0
**Fecha**: 2026-04-11
**Horas totales estimadas**: 74h (optimista) / 124h (realista + buffer 15%)

---

## Resumen de fases

| Fase | Descripcion | Horas opt. | Horas real. | Responsable | Dependencias |
|------|-------------|:----------:|:-----------:|-------------|--------------|
| 0 | Kickoff y accesos | 4 | 8 | PM + Dev | — |
| 1 | Setup infraestructura | 10 | 14 | Dev | Fase 0 completa |
| 2 | Bot WhatsApp (nucleo) | 16 | 22 | Dev | Fase 1 + Meta BM verificado |
| 3 | Integraciones | 16 | 22 | Dev | Fase 2 |
| 4 | Reportes + Pagos | 8 | 12 | Dev | Fase 3 |
| 5 | Testing + Docs + Capacitacion | 12 | 18 | Dev + PM | Fase 4 |
| | **TOTAL** | **66** | **96** | | |
| | **Buffer 15%** | — | **+28** | | |
| | **TOTAL CON BUFFER** | **66** | **124** | | |

---

## Fase 0 — Kickoff y accesos

**Objetivo**: Tener todos los accesos configurados y el cliente alineado antes de tocar codigo.
**Horas**: 4h opt / 8h real
**Responsable**: PM + Dev

| # | Tarea | Responsable | Horas | Estado | Notas |
|---|-------|-------------|:-----:|--------|-------|
| 0.1 | Kickoff formal con cliente: alinear scope, pendientes y proximos pasos | PM (Tiziano) | 1 | Pendiente | Agendar esta semana |
| 0.2 | Asistir al cliente en creacion de Meta Business Manager | PM + Cliente | 2 | Pendiente | BLOQUEANTE — sin esto no hay bot |
| 0.3 | Iniciar proceso de verificacion de Meta BM (puede tomar 2-4 semanas) | Cliente con soporte PM | — | Pendiente | Proceso del cliente, PM hace seguimiento |
| 0.4 | Crear / configurar cuenta de Gmail del negocio | Cliente | 0.5 | Pendiente | Necesaria para Google Calendar API |
| 0.5 | Crear cuenta Tienda Nube | Dev | 0.5 | Pendiente | Soluway puede gestionarla |
| 0.6 | Obtener API keys: Claude API, Google Calendar, Tienda Nube | Dev | 1 | Pendiente | Documentar en vault/secretos |
| 0.7 | Confirmar metodo de pago con cliente | PM | — | PENDIENTE CLIENTE | Impacta scope de Fase 4 |
| 0.8 | Confirmar zonas de entrega y logistica | PM | — | PENDIENTE CLIENTE | Impacta logica del bot |
| 0.9 | Recibir / confirmar fotos y lista de productos | PM | — | PENDIENTE CLIENTE | Necesario para setup Tienda Nube |

---

## Fase 1 — Setup infraestructura

**Objetivo**: Tienda Nube operativa con catalogo y backend base deployado.
**Horas**: 10h opt / 14h real
**Responsable**: Dev
**Dependencias**: Fase 0 completa, acceso a Tienda Nube

| # | Tarea | Responsable | Horas | Estado | Notas |
|---|-------|-------------|:-----:|--------|-------|
| 1.1 | Configurar Tienda Nube: branding, categorias, informacion del negocio | Dev | 2 | Pendiente | Necesita logo y colores del cliente |
| 1.2 | Subir productos iniciales al catalogo (con fotos y precios) | Dev | 2 | Pendiente | Necesita lista de productos del cliente |
| 1.3 | Configurar Mercado Pago en Tienda Nube (si el cliente lo confirma) | Dev | 1 | Pendiente | Esperar decision del cliente |
| 1.4 | Setup del proyecto FastAPI: estructura, dependencias, configuracion | Dev | 2 | Pendiente | |
| 1.5 | Configurar base de datos SQLite: modelos, migraciones | Dev | 2 | Pendiente | Dejar DB preparada para extension a Fase 2 |
| 1.6 | Deploy en Railway/Render: configurar entorno, variables de entorno, CI | Dev | 2 | Pendiente | Validar tier gratuito suficiente para MVP |
| 1.7 | Verificar URL publica accesible para webhook de WhatsApp | Dev | 0.5 | Pendiente | Necesaria para Meta Cloud API |
| 1.8 | Configurar dominio / HTTPS si es necesario | Dev | 0.5 | Pendiente | Railway/Render lo proveen por defecto |

---

## Fase 2 — Bot WhatsApp (nucleo)

**Objetivo**: Bot funcional que responde consultas, muestra el catalogo y guia pedidos conversacionales.
**Horas**: 16h opt / 22h real
**Responsable**: Dev
**Dependencias**: Fase 1 completa + Meta Business Manager verificado (BLOQUEANTE)

| # | Tarea | Responsable | Horas | Estado | Notas |
|---|-------|-------------|:-----:|--------|-------|
| 2.1 | Configurar webhook de WhatsApp Cloud API en FastAPI | Dev | 2 | Pendiente | Requiere Meta BM verificado |
| 2.2 | Integracion con Claude API Haiku: sistema de prompts base | Dev | 3 | Pendiente | Definir prompt de sistema con restricciones del bot |
| 2.3 | Flujo de saludo y consultas generales | Dev | 2 | Pendiente | Incluye info del negocio, horarios, contacto |
| 2.4 | Flujo de catalogo: mostrar link a Tienda Nube, responder consultas de productos | Dev | 2 | Pendiente | Consulta API de Tienda Nube |
| 2.5 | Flujo de pedido conversacional paso a paso | Dev | 4 | Pendiente | El flujo mas complejo: productos → cantidad → direccion → horario |
| 2.6 | Manejo de estados de conversacion (estado por numero de WhatsApp) | Dev | 2 | Pendiente | Persistir en SQLite |
| 2.7 | Logica de horario: fuera de L-S 8-19 coordina para proximo espacio libre | Dev | 1 | Pendiente | |
| 2.8 | Notificacion al admin cuando llega un nuevo pedido | Dev | 1 | Pendiente | Mensaje WhatsApp al numero admin |
| 2.9 | Manejo de errores y mensajes de fallback | Dev | 1 | Pendiente | El bot nunca debe quedar sin respuesta |

---

## Fase 3 — Integraciones

**Objetivo**: Bot integrado con Google Calendar (entregas) y Tienda Nube (stock/productos) y sistema de carga via Excel.
**Horas**: 16h opt / 22h real
**Responsable**: Dev
**Dependencias**: Fase 2 funcional

| # | Tarea | Responsable | Horas | Estado | Notas |
|---|-------|-------------|:-----:|--------|-------|
| 3.1 | Integracion Google Calendar API: autenticacion con service account | Dev | 1 | Pendiente | Requiere cuenta Google del negocio |
| 3.2 | Crear evento en calendario al confirmar pedido | Dev | 2 | Pendiente | Incluye: cliente, productos, direccion, horario |
| 3.3 | Consultar disponibilidad del calendario antes de proponer horarios | Dev | 2 | Pendiente | |
| 3.4 | Integracion Tienda Nube API: consultar stock de productos | Dev | 2 | Pendiente | Antes de confirmar pedido verificar disponibilidad |
| 3.5 | Integracion Tienda Nube API: crear / registrar pedidos | Dev | 2 | Pendiente | Registrar pedido en Tienda Nube ademas de en la DB |
| 3.6 | Parser Excel: endpoint de upload en el panel admin | Dev | 2 | Pendiente | Formulario simple de subida de archivo |
| 3.7 | Parser Excel: logica de parseo y validacion con openpyxl | Dev | 2 | Pendiente | Validar: nombre, precio > 0, categoria, stock |
| 3.8 | Parser Excel: sync con Tienda Nube API (create/update productos) | Dev | 2 | Pendiente | Batch updates, rate limiting |
| 3.9 | Parser Excel: reporte de resultado al admin (errores + exitos) | Dev | 1 | Pendiente | |
| 3.10 | Proveer template Excel al cliente y validar que puede completarlo | PM + Dev | 0.5 | Pendiente | |

---

## Fase 4 — Reportes + Pagos

**Objetivo**: Reportes automaticos enviados al admin y flujo de pago integrado.
**Horas**: 8h opt / 12h real
**Responsable**: Dev
**Dependencias**: Fase 3 completa, decision de metodo de pago del cliente

| # | Tarea | Responsable | Horas | Estado | Notas |
|---|-------|-------------|:-----:|--------|-------|
| 4.1 | Logica de reportes: calcular ventas, ganancia, top productos, ticket promedio | Dev | 2 | Pendiente | Lee de SQLite |
| 4.2 | Cron job: reporte diario a las 20:00 + reporte semanal lunes 8:00 | Dev | 1 | Pendiente | |
| 4.3 | Envio de reporte por WhatsApp al admin (mensaje formateado) | Dev | 1 | Pendiente | |
| 4.4 | Panel admin web: visualizacion de reportes y metricas | Dev | 4 | Pendiente | UI basica — pendiente de scope exacto |
| 4.5 | Integracion Mercado Pago: generar link de pago desde el bot | Dev | 3 | Pendiente | Solo si cliente confirma MP — sino transferencia manual |
| 4.6 | Webhook de confirmacion de pago MP → actualizar estado del pedido | Dev | 2 | Pendiente | Condicional a 4.5 |
| 4.7 | Flujo alternativo: transferencia bancaria con confirmacion manual del admin | Dev | 1 | Pendiente | Minimo viable si no se usa MP |

---

## Fase 5 — Testing + Documentacion + Capacitacion

**Objetivo**: Sistema validado end-to-end, cliente capacitado y documentado.
**Horas**: 12h opt / 18h real
**Responsable**: Dev + PM
**Dependencias**: Fase 4 completa

| # | Tarea | Responsable | Horas | Estado | Notas |
|---|-------|-------------|:-----:|--------|-------|
| 5.1 | Testing end-to-end: flujo de pedido completo | Dev | 3 | Pendiente | Con datos reales del cliente |
| 5.2 | Testing de carga de Excel con datos reales del cliente | Dev | 1 | Pendiente | |
| 5.3 | Testing de reportes con datos reales | Dev | 1 | Pendiente | |
| 5.4 | Testing de pagos (sandbox Mercado Pago) | Dev | 1 | Pendiente | Condicional a integracion MP |
| 5.5 | Ajustes de UX del bot segun feedback del testing | Dev | 2 | Pendiente | |
| 5.6 | Correccion de bugs identificados en testing | Dev | 2 | Pendiente | |
| 5.7 | Documentacion tecnica: arquitectura final, variables de entorno, deploy | Dev | 2 | Pendiente | |
| 5.8 | Manual de uso para admin: subir Excel, ver reportes, configurar bot | PM | 2 | Pendiente | Para el equipo del cliente |
| 5.9 | Sesion de capacitacion con el equipo del cliente (2 admins) | Tiziano | 2 | Pendiente | Go-live + primeros pasos |
| 5.10 | Go-live en produccion | Dev + PM | 1 | Pendiente | |
| 5.11 | Soporte post-lanzamiento (1 semana) | Dev + PM | 1 | Pendiente | |

---

## Alertas y riesgos activos

| # | Riesgo | Probabilidad | Impacto | Accion |
|---|--------|:--:|:--:|--------|
| 1 | Verificacion de Meta BM demorada o rechazada | Media | CRITICO | Iniciar YA. Plan B: Twilio (+USD 15-30/mes) |
| 2 | Cliente no define metodo de pago | Media | Medio | Confirmar en kickoff — impacta scope Fase 4 |
| 3 | Cliente sin fotos de productos | Media | Medio | Preguntar en kickoff — sin fotos el catalogo no vende |
| 4 | API de Tienda Nube con limitaciones no documentadas | Baja | Medio | Validar en Fase 0 antes de comprometer arquitectura |

---

## Notas para Tiziano

- Las horas de Fase 0.3 (proceso Meta BM) no son horas de desarrollo — es tiempo de espera del proceso de Meta que el cliente debe gestionar. Arrancar ESTO PRIMERO.
- El proyecto puede avanzar en paralelo (Fase 1 no necesita Meta BM), pero la Fase 2 esta completamente bloqueada hasta tener Meta BM verificado.
- Si el cliente no quiere pago online, la Fase 4 se reduce aproximadamente en 5-6 horas.
- El presupuesto al cliente (si Tiziano decide cotizarlo) es sobre las 124 horas con buffer. Tiziano decide tarifa considerando que es contacto cercano.

---

*Clasificacion: INTERNO SOLUWAY — No compartir con cliente*
*Generado por Agente PM — 2026-04-11*
