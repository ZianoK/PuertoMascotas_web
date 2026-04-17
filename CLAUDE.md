# Puerto Mascotas — Contexto del Proyecto

## Datos del cliente

| Campo | Detalle |
|-------|---------|
| **Empresa** | Puerto Mascotas |
| **Industria** | Alimentos para mascotas + veterinaria a domicilio |
| **Ciudad** | Mendoza, Argentina |
| **Contacto** | Puerto Mascotas (sin WhatsApp aun; email pendiente de crear por el cliente) |
| **Equipo cliente** | 3 personas, 2 admins para el sistema |
| **Origen** | Contacto cercano de Tiziano |
| **Situacion actual** | Sin presencia digital. WhatsApp Business con numero comun (sin API oficial). Gestion en Excel. |

---

## Stack tecnologico

| Capa | Tecnologia |
|------|------------|
| Catalogo / E-commerce | Tienda Nube (plan basico) |
| Backend / Webhook | Python + FastAPI |
| Modelo de IA | Claude API (Haiku por defecto; Sonnet si se necesita mas calidad) |
| Base de datos | SQLite (MVP) → PostgreSQL si escala |
| Hosting | Railway o Render |
| Calendario | Google Calendar API (service account) |
| Pagos | Mercado Pago (link de pago desde el bot) — pendiente de confirmar |
| Parser Excel | openpyxl (Python) |

---

## Canales

- **WhatsApp Business API oficial de Meta (Cloud API)** — canal principal
  - Requiere verificacion de Meta Business Manager por parte del cliente (2-4 semanas, BLOQUEANTE)
  - Plan B si Meta se demora: Twilio (USD 15-30/mes adicional)
  - NUNCA usar librerias no oficiales (Baileys, WPPConnect, UltraMsg)
- **Instagram DMs** — DIFERIDO a Fase 2 (misma verificacion de Meta, agrega complejidad sin ser canal principal)

---

## Restricciones del bot

- Solo en espanol
- Nombre del bot: "Puerto Mascotas"
- Horario de atencion: Lunes a Sabado, 8:00 a 19:00
- Fuera de horario: el bot coordina entrega para el proximo espacio libre (NO corta la conversacion)
- No compartir datos sensibles de clientes ni del negocio

---

## Scope del proyecto

### P0 — Minimo viable
- Tienda Nube configurada con catalogo
- Bot WhatsApp basico: responde consultas y envia link al catalogo

### P1 — MVP completo
- Pedidos conversacionales (guia al cliente paso a paso)
- Integracion Google Calendar (coordina horarios de entrega)
- Reportes automaticos (diario 20:00, semanal lunes 8:00) enviados por WhatsApp al admin
- Parser Excel (admin sube Excel → actualiza catalogo en Tienda Nube automaticamente)

### P2 — Fase 2
- Instagram DMs
- Panel admin custom (UI web completa)
- Modulo de proveedores

---

## Pendientes a confirmar con cliente (kickoff)

| # | Pendiente | Impacto si no se resuelve |
|---|-----------|--------------------------|
| 1 | Metodo de pago: Mercado Pago / transferencia / efectivo / combinacion | Define complejidad de la etapa de pagos (4-6 hs con MP vs 1 hora sin pago online) |
| 2 | Lista de proveedores y si va modulo de proveedores en MVP o Fase 2 | Scope del MVP |
| 3 | Fotos de productos (calidad suficiente para catalogo) | Sin fotos el catalogo no vende |
| 4 | Zonas de entrega y logistica propia vs tercerizada | Afecta logica de coordinacion del calendario |
| 5 | Textos del bot (bienvenida, FAQs, politica de devolucion) | Soluway puede redactarlos con aprobacion del cliente |

---

## Bloqueantes activos

| # | Bloqueante | Quien lo resuelve | Accion |
|---|------------|-------------------|--------|
| 1 | Verificacion de Meta Business Manager (2-4 semanas) | Cliente | Iniciar el proceso LO ANTES POSIBLE — Soluway asiste |
| 2 | Definicion de metodo de pago | Cliente | Confirmar en kickoff |

---

## Estado actual del proyecto

- **Etapa**: Discovery completado
- **Arquitectura tecnica**: Lista (ver `arquitectura-tecnica.md`)
- **Fecha de inicio**: 2026-04-11
- **Proximos pasos**: Kickoff formal con cliente, iniciar proceso Meta BM, definir pagos

---

## Archivos del proyecto

| Archivo | Descripcion |
|---------|-------------|
| `arquitectura-tecnica.md` | Documento tecnico completo (Agente Arquitecto) — NO MODIFICAR |
| `CLAUDE.md` | Este archivo — contexto del proyecto para agentes |
| `plan-tareas.md` | Plan de tareas por fases con responsables y horas estimadas |
| `minuta-discovery.md` | Minuta de la reunion de discovery (2026-04-11) |

---

*Clasificacion: INTERNO SOLUWAY — No compartir con cliente*
*Generado por Agente PM — 2026-04-11*
