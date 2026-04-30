"""
Webhook de MercadoPago — recibe notificaciones de pago y actualiza el estado del pedido.
Registrar la URL en: MP Dashboard → Tus integraciones → Webhooks
URL de producción: https://TU_DOMINIO/api/webhooks/mercadopago
"""

import os
from fastapi import APIRouter, Depends, Request
from sqlalchemy.orm import Session
from database import get_db
import models

router = APIRouter(prefix="/api/webhooks", tags=["webhooks"])

MP_STATUS_MAP = {
    "approved": "confirmado",
    "pending": "pendiente",
    "in_process": "pendiente",
    "rejected": "cancelado",
    "cancelled": "cancelado",
    "refunded": "cancelado",
}


@router.post("/mercadopago")
async def mercadopago_webhook(request: Request, db: Session = Depends(get_db)):
    """
    Recibe notificaciones de MercadoPago (IPN/Webhooks).
    MP envía un POST con el tipo de evento y el ID del recurso.
    """
    try:
        body = await request.json()
    except Exception:
        return {"status": "ignored"}

    # Solo procesar notificaciones de tipo "payment"
    topic = body.get("type") or request.query_params.get("topic")
    if topic != "payment":
        return {"status": "ignored", "topic": topic}

    payment_id = (
        body.get("data", {}).get("id")
        or request.query_params.get("id")
    )
    if not payment_id:
        return {"status": "ignored", "reason": "no payment_id"}

    mp_token = os.getenv("MP_ACCESS_TOKEN", "")
    if not mp_token:
        return {"status": "error", "reason": "MP_ACCESS_TOKEN no configurado"}

    try:
        import mercadopago
        sdk = mercadopago.SDK(mp_token)
        result = sdk.payment().get(payment_id)

        if result["status"] != 200:
            return {"status": "error", "reason": "no se pudo obtener el pago"}

        payment = result["response"]
        mp_status = payment.get("status")
        external_ref = payment.get("external_reference")

        if not external_ref:
            return {"status": "ignored", "reason": "sin external_reference"}

        order_id = int(external_ref)
        order = db.query(models.Order).filter(models.Order.id == order_id).first()

        if not order:
            return {"status": "not_found", "order_id": order_id}

        new_status = MP_STATUS_MAP.get(mp_status)
        if new_status and order.status != new_status:
            order.status = new_status
            db.commit()

        return {"status": "ok", "order_id": order_id, "mp_status": mp_status}

    except Exception as e:
        return {"status": "error", "detail": str(e)}
