from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import List
import os
import models
import schemas
from database import get_db
from auth import get_current_admin

router = APIRouter(prefix="/api/orders", tags=["orders"])


@router.post("/", response_model=schemas.OrderWithItems, status_code=201)
def create_order(order_data: schemas.OrderCreate, db: Session = Depends(get_db)):
    """
    Crea un nuevo pedido con sus items.
    Valida que los productos existan y tengan stock suficiente.
    """
    if not order_data.items:
        raise HTTPException(status_code=400, detail="El pedido debe tener al menos un item")

    total = 0.0

    # Validar productos y calcular total
    for item in order_data.items:
        product = db.query(models.Product).filter(
            models.Product.id == item.product_id,
            models.Product.active == True
        ).first()

        if not product:
            raise HTTPException(
                status_code=404,
                detail=f"Producto con ID {item.product_id} no encontrado"
            )

        if product.stock < item.quantity:
            raise HTTPException(
                status_code=400,
                detail=f"Stock insuficiente para {product.name}. Disponible: {product.stock}"
            )

        total += item.unit_price * item.quantity

    # Crear orden
    db_order = models.Order(
        customer_name=order_data.customer_name,
        customer_phone=order_data.customer_phone,
        customer_address=order_data.customer_address,
        payment_method=order_data.payment_method,
        notes=order_data.notes,
        total=total,
        status="pendiente"
    )
    db.add(db_order)
    db.flush()

    # Crear items de la orden y actualizar stock
    for item in order_data.items:
        db_item = models.OrderItem(
            order_id=db_order.id,
            product_id=item.product_id,
            quantity=item.quantity,
            unit_price=item.unit_price
        )
        db.add(db_item)

        # Reducir stock
        product = db.query(models.Product).filter(
            models.Product.id == item.product_id
        ).first()
        product.stock -= item.quantity

    db.commit()
    db.refresh(db_order)

    # Si el método de pago es Mercado Pago, crear preferencia de pago
    if order_data.payment_method == "mercado_pago":
        mp_token = os.getenv("MP_ACCESS_TOKEN", "")
        if mp_token:
            try:
                import mercadopago
                sdk = mercadopago.SDK(mp_token)
                frontend_url = os.getenv("FRONTEND_URL", "http://localhost:3000")

                preference_data = {
                    "items": [{
                        "title": f"Pedido #{db_order.id} — Puerto Mascotas",
                        "quantity": 1,
                        "unit_price": float(total),
                        "currency_id": "ARS",
                    }],
                    "external_reference": str(db_order.id),
                    "back_urls": {
                        "success": f"{frontend_url}/confirmacion?id={db_order.id}",
                        "failure": f"{frontend_url}/checkout?error=pago_fallido",
                        "pending": f"{frontend_url}/confirmacion?id={db_order.id}&pago=pendiente",
                    },
                    "auto_return": "approved",
                    "metadata": {
                        "pedido_id": db_order.id,
                        "cliente": order_data.customer_name,
                    },
                }

                result = sdk.preference().create(preference_data)
                if result["status"] in (200, 201):
                    response = result["response"]
                    db_order.preference_id = response.get("id")
                    db_order.mp_init_point = response.get("init_point")
                    db.commit()
                    db.refresh(db_order)
            except Exception as e:
                print(f"Warning: No se pudo crear preferencia MP: {e}")

    return db_order


@router.get("/{order_id}", response_model=schemas.OrderWithItems)
def get_order(order_id: int, db: Session = Depends(get_db)):
    """Obtiene el detalle de un pedido por ID"""
    order = db.query(models.Order).filter(models.Order.id == order_id).first()

    if not order:
        raise HTTPException(status_code=404, detail="Pedido no encontrado")

    return order


@router.get("/", response_model=List[schemas.OrderWithItems])
def list_orders(db: Session = Depends(get_db), admin: models.AdminUser = Depends(get_current_admin)):
    """Lista todos los pedidos ordenados por fecha descendente"""
    orders = db.query(models.Order).order_by(models.Order.created_at.desc()).all()
    return orders


class StatusUpdate(BaseModel):
    status: str


@router.put("/{order_id}/status")
def update_order_status(order_id: int, req: StatusUpdate, db: Session = Depends(get_db), admin: models.AdminUser = Depends(get_current_admin)):
    """Actualiza el estado de un pedido"""
    valid_statuses = ["pendiente", "confirmado", "enviado", "entregado", "cancelado"]
    if req.status not in valid_statuses:
        raise HTTPException(status_code=400, detail=f"Estado inválido. Válidos: {', '.join(valid_statuses)}")

    order = db.query(models.Order).filter(models.Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Pedido no encontrado")

    order.status = req.status
    db.commit()
    return {"message": "Estado actualizado", "status": order.status}
